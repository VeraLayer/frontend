"use client";

import { useState, useCallback } from "react";
import type { Synapse } from "@filoz/synapse-sdk";
import { calculate as calcPieceCID } from "@filoz/synapse-core/piece";
import { uploadPieceStreaming } from "@filoz/synapse-core/sp";

export interface StorageUploadResult {
  cid: string;
  dealId: string;
  size: number;
  dealActive: boolean;
}

export function useStorageUpload(synapse: Synapse | null) {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadError, setUploadError] = useState<Error | null>(null);
  const [commitWarning, setCommitWarning] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File): Promise<StorageUploadResult | null> => {
      if (!synapse || !file) return null;
      setUploading(true);
      setUploadError(null);
      setCommitWarning(null);
      setUploadStatus("Reading file…");

      try {
        const buffer = await file.arrayBuffer();
        const data = new Uint8Array(buffer);

        setUploadStatus("Computing Piece CID…");
        const pieceCid = calcPieceCID(data);
        const cid = pieceCid.toString();

        // Single provider — one wallet signature max
        setUploadStatus("Finding storage provider…");
        const ctx = await synapse.storage.createContext();
        const serviceURL = ctx.provider.pdp.serviceURL;

        // Stream bytes to SP — no findPiece polling
        setUploadStatus("Uploading to Filecoin…");
        const uploadResult = await uploadPieceStreaming({
          serviceURL,
          data,
          pieceCid,
        });

        // Commit on-chain (requires USDFC balance in Filecoin Pay)
        let dealId = "";
        let dealActive = false;
        try {
          setUploadStatus("Confirm in wallet…");
          const commitResult = await ctx.commit({
            pieces: [{ pieceCid: uploadResult.pieceCid }],
          });
          dealId = commitResult.dataSetId?.toString() ?? "";
          dealActive = true;
          setUploadStatus("Stored ✓");
        } catch (commitErr) {
          const msg = commitErr instanceof Error ? commitErr.message : String(commitErr);
          const isFunds = /insuf|insufficient|balance|funds/i.test(msg);
          setCommitWarning(
            isFunds
              ? "File uploaded but no active storage deal — deposit USDFC in Filecoin Pay to activate."
              : `Storage deal skipped: ${msg.slice(0, 80)}`
          );
          setUploadStatus("Uploaded ✓");
        }

        return { cid, dealId, size: data.length, dealActive };
      } catch (e: unknown) {
        const err = e instanceof Error ? e : new Error(String(e));
        setUploadError(err);
        setUploadStatus("");
        return null;
      } finally {
        setUploading(false);
      }
    },
    [synapse]
  );

  return { upload, uploading, uploadStatus, uploadError, commitWarning };
}
