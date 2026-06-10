"use client";

import { useState, useCallback } from "react";

export interface StorageUploadResult {
  cid: string;
  dealId: string;
  size: number;
  dealActive: boolean;
}

export function useStorageUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadError, setUploadError] = useState<Error | null>(null);
  const [commitWarning, setCommitWarning] = useState<string | null>(null);

  const upload = useCallback(async (file: File): Promise<StorageUploadResult | null> => {
    setUploading(true);
    setUploadError(null);
    setCommitWarning(null);
    setUploadStatus("Uploading to Filecoin…");

    try {
      const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
      if (!apiKey) throw new Error("NEXT_PUBLIC_LIGHTHOUSE_API_KEY is not set");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("https://upload.lighthouse.storage/api/v0/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Lighthouse upload failed (${res.status}): ${errText.slice(0, 120)}`);
      }

      const data = await res.json();
      // Response shape: { Name, Hash, Size }
      const cid = data.Hash as string;
      const size = Number(data.Size ?? file.size);

      if (!cid) throw new Error("Lighthouse returned no CID");

      setUploadStatus("Stored ✓");
      return { cid, dealId: "", size, dealActive: true };

    } catch (e: unknown) {
      const err = e instanceof Error ? e : new Error(String(e));
      setUploadError(err);
      setUploadStatus("");
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, uploading, uploadStatus, uploadError, commitWarning };
}