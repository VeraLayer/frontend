"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Code2,
  FileImage,
  FileText,
  Upload,
  CheckCircle2,
  ExternalLink,
  Loader2,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Aside from "@/app/components/Aside";
import Navbar from "@/app/components/Navbar";
import { useArchiveData, ArchiveType } from "@/hooks/useVeraLayer";
import { useStorageUpload } from "@/hooks/useStorageUpload";
import { useSynapse } from "@/hooks/useSynapse";
import { toast } from "@/lib/toast";
import { PaymentPanel } from "@/app/components/PaymentPanel";

const FILE_TYPES = [
  { icon: <Code2 size={18} />, label: "Code" },
  { icon: <FileImage size={18} />, label: "Design" },
  { icon: <FileText size={18} />, label: "Document" },
];

const BERYX_TX_URL = "https://beryx.io/fil/calibration/tx/";

function UploadAssetsPage() {
  const searchParams = useSearchParams();
  const vaultParam = searchParams?.get("vault") ?? null;
  const defaultVault = vaultParam === "heritage" ? "heritage" : "talent";
  const [activeTab, setActiveTab] = useState<"talent" | "heritage">(defaultVault);
  const [activeFileType, setActiveFileType] = useState("Document");
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [archiveTitle, setArchiveTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cid, setCid] = useState("");
  const [dealId, setDealId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isConnected, chainId } = useAccount();
  const { synapse, initializing, initError } = useSynapse();
  const { upload, uploading, uploadStatus, uploadError, commitWarning } = useStorageUpload();
  const { archive, txHash, isPending, isConfirming, isSuccess, error: archiveError } = useArchiveData();
  const wrongNetwork = isConnected && chainId !== 314159;

  function pickFile(file: File) {
    setSelectedFile(file);
    setCid("");
    setDealId("");
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) pickFile(file);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) pickFile(file);
  }

  async function handleUploadToFilecoin() {
    if (!selectedFile) return;
    const result = await upload(selectedFile);
    if (result) {
      setCid(result.cid);
      setDealId(result.dealId);
    }
  }

  function handleArchiveOnChain() {
    if (!cid) return;
    archive({
      cid,
      dealId: dealId || cid,
      archiveType: activeTab === "talent" ? ArchiveType.Talent : ArchiveType.Heritage,
    });
  }

  // ── Toast triggers ─────────────────────────────────────────────────
  useEffect(() => {
    if (uploadError) toast.error(uploadError.message.slice(0, 100));
  }, [uploadError]);

  useEffect(() => {
    if (commitWarning) toast.warning(commitWarning);
  }, [commitWarning]);

  useEffect(() => {
    if (isSuccess) toast.success("Archive confirmed on Filecoin Calibration!");
  }, [isSuccess]);

  useEffect(() => {
    if (archiveError) toast.error(archiveError.message.slice(0, 100));
  }, [archiveError]);
  // ───────────────────────────────────────────────────────────────────

  // uploadReady no longer depends on synapse
  const uploadReady = !!selectedFile && !uploading;
  const cidReady = !!cid;

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: "#0A0E1A", color: "#8A919F" }}
    >
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Aside />

        <main className="flex-1 overflow-auto p-6 flex gap-4">
          {/* ── Left column ─────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Tabs */}
            <div
              className="flex items-center gap-0 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {(["talent", "heritage"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="text-xs px-4 pb-2.5 capitalize transition-colors"
                  style={{
                    color: activeTab === tab ? "#DFE2F3" : "#8A919F",
                    borderBottom:
                      activeTab === tab
                        ? "2px solid #1A92FF"
                        : "2px solid transparent",
                  }}
                >
                  {tab === "talent" ? "Talent Archive" : "Heritage Archive"}
                </button>
              ))}
            </div>

            {/* Header */}
            <div>
              <h2 className="text-base font-semibold mb-0.5" style={{ color: "#DFE2F3" }}>
                Upload Your Work
              </h2>
              <p className="text-xs" style={{ color: "#8A919F" }}>
                Immutable proof of sovereign talent. Secured via Filecoin.
              </p>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
              style={{
                border: `1.5px dashed ${
                  dragging
                    ? "#1A92FF"
                    : selectedFile
                    ? "rgba(74,225,131,0.4)"
                    : "rgba(255,255,255,0.1)"
                }`,
                backgroundColor: dragging
                  ? "rgba(26,146,255,0.05)"
                  : selectedFile
                  ? "rgba(74,225,131,0.03)"
                  : "rgba(255,255,255,0.02)",
                height: "160px",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileInput}
              />
              {selectedFile ? (
                <>
                  <FileCheck size={22} style={{ color: "#4AE183" }} />
                  <p className="text-xs font-medium" style={{ color: "#DFE2F3" }}>
                    {selectedFile.name}
                  </p>
                  <p className="text-[10px]" style={{ color: "#8A919F" }}>
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Click to change
                  </p>
                </>
              ) : (
                <>
                  <Upload size={22} style={{ color: "#1A92FF" }} />
                  <p className="text-xs" style={{ color: "#DFE2F3" }}>
                    Drag & drop files to upload
                  </p>
                  <p className="text-[10px]" style={{ color: "#8A919F" }}>
                    Maximum file size: 50 GB
                  </p>
                </>
              )}
            </div>

            {/* File type selector */}
            <div className="flex items-center gap-3">
              {FILE_TYPES.map(({ icon, label }) => (
                <button
                  key={label}
                  onClick={() => setActiveFileType(label)}
                  className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-lg text-xs transition-colors"
                  style={{
                    backgroundColor:
                      activeFileType === label
                        ? "rgba(26,146,255,0.12)"
                        : "rgba(255,255,255,0.03)",
                    border: `1px solid ${
                      activeFileType === label
                        ? "rgba(26,146,255,0.3)"
                        : "rgba(255,255,255,0.06)"
                    }`,
                    color: activeFileType === label ? "#A4C9FF" : "#8A919F",
                  }}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Form fields */}
            <div className="flex flex-col gap-3">
              <div>
                <label
                  className="text-[10px] uppercase tracking-wider mb-1.5 block"
                  style={{ color: "#8A919F" }}
                >
                  Archive Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Genesis Smart Contract Suite"
                  value={archiveTitle}
                  onChange={(e) => setArchiveTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg outline-none placeholder:opacity-40"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#DFE2F3",
                  }}
                />
              </div>
              <div>
                <label
                  className="text-[10px] uppercase tracking-wider mb-1.5 block"
                  style={{ color: "#8A919F" }}
                >
                  Description
                </label>
                <textarea
                  placeholder="Describe the significance of this work..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full text-xs px-3 py-2.5 rounded-lg outline-none placeholder:opacity-40 resize-none"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#DFE2F3",
                  }}
                />
              </div>
            </div>

            {/* Wrong network banner */}
            {wrongNetwork && (
              <div
                className="flex items-start gap-2 p-3 rounded-lg"
                style={{
                  backgroundColor: "rgba(255,185,85,0.08)",
                  border: "1px solid rgba(255,185,85,0.25)",
                }}
              >
                <AlertCircle size={12} style={{ color: "#FFB955", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p className="text-[10px] font-semibold mb-0.5" style={{ color: "#FFB955" }}>
                    Wrong Network
                  </p>
                  <p className="text-[9px]" style={{ color: "#FFB955", opacity: 0.8 }}>
                    Switch to Filecoin Calibration Testnet in your wallet.
                  </p>
                </div>
              </div>
            )}

            {/* ── Step 1: Upload to Filecoin ── */}
            <div className="flex flex-col gap-2">
              {!isConnected ? (
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <button
                      onClick={openConnectModal}
                      className="w-full py-2.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80"
                      style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}
                    >
                      Connect Wallet to Upload
                    </button>
                  )}
                </ConnectButton.Custom>
              ) : (
                <button
                  onClick={handleUploadToFilecoin}
                  disabled={!uploadReady || !!cidReady}
                  className="w-full py-2.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: cidReady
                      ? "rgba(74,225,131,0.12)"
                      : "rgba(26,146,255,0.15)",
                    color: cidReady ? "#4AE183" : "#A4C9FF",
                    border: cidReady
                      ? "1px solid rgba(74,225,131,0.3)"
                      : "1px solid rgba(26,146,255,0.3)",
                  }}
                >
                  {uploading && <Loader2 size={12} className="animate-spin" />}
                  {cidReady
                    ? "Step 1 Done — Stored on Filecoin ✓"
                    : uploading
                    ? uploadStatus
                    : wrongNetwork
                    ? "Switch Network First"
                    : "Step 1: Upload to Filecoin"}
                </button>
              )}

              {/* Commit warning */}
              {commitWarning && cidReady && (
                <div
                  className="flex items-start gap-2 p-2 rounded"
                  style={{
                    backgroundColor: "rgba(255,185,85,0.08)",
                    border: "1px solid rgba(255,185,85,0.2)",
                  }}
                >
                  <AlertCircle size={11} style={{ color: "#FFB955", flexShrink: 0, marginTop: 1 }} />
                  <p className="text-[10px]" style={{ color: "#FFB955" }}>{commitWarning}</p>
                </div>
              )}

              {/* Upload error */}
              {uploadError && (
                <div
                  className="flex items-start gap-2 p-2 rounded"
                  style={{
                    backgroundColor: "rgba(255,107,107,0.08)",
                    border: "1px solid rgba(255,107,107,0.2)",
                  }}
                >
                  <AlertCircle size={11} style={{ color: "#FF6B6B", flexShrink: 0, marginTop: 1 }} />
                  <p className="text-[10px]" style={{ color: "#FF6B6B" }}>
                    {uploadError.message.slice(0, 120)}
                  </p>
                </div>
              )}
            </div>

            {/* Mini footer */}
            <div
              className="mt-auto pt-4 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-[10px] font-semibold tracking-widest uppercase mb-0.5"
                    style={{ color: "#DFE2F3" }}
                  >
                    VeraLayer Protocol
                  </p>
                  <p className="text-[10px]" style={{ color: "#8A919F" }}>
                    © 2024 Sovereign · Technically Secured.
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  {["Documentation", "Smart Contracts", "Privacy", "Nodes"].map((l) => (
                    <a
                      key={l}
                      href="#"
                      className="text-[10px] transition-opacity hover:opacity-70"
                      style={{ color: "#8A919F" }}
                    >
                      {l}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column ─────────────────────────────────────── */}
          <div className="w-56 flex-shrink-0 flex flex-col gap-4">
            {/* Filecoin Pay */}
            <PaymentPanel synapse={synapse} initializing={initializing} initError={initError} />
            {/* Sovereignty Status */}
            <div
              className="rounded-xl p-4 border"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: isSuccess
                  ? "rgba(74,225,131,0.3)"
                  : "rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-4">
                <CheckCircle2
                  size={13}
                  style={{ color: isSuccess ? "#4AE183" : "#8A919F" }}
                />
                <p
                  className="text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: isSuccess ? "#4AE183" : "#8A919F" }}
                >
                  On-Chain Status
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-4">
                {/* File preview */}
                {cid && (
                  <div
                    className="w-full rounded-lg overflow-hidden"
                    style={{ border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.02)" }}
                  >
                    <img
                      src={`/api/ipfs/${cid}`}
                      alt="Uploaded file"
                      className="w-full object-cover"
                      style={{ maxHeight: "120px" }}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                    <a
                      href={`https://ipfs.io/ipfs/${cid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[9px] px-2 py-1.5 transition-opacity hover:opacity-70"
                      style={{ color: "#A4C9FF" }}
                    >
                      <ExternalLink size={8} />
                      View on IPFS
                    </a>
                  </div>
                )}

                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#8A919F" }}>
                    CID
                  </p>
                  <p
                    className="text-[9px] font-mono break-all"
                    style={{ color: cid ? "#C0C7D6" : "#404753" }}
                  >
                    {cid || "Waiting for upload…"}
                  </p>
                </div>

                {isSuccess && txHash && (
                  <a
                    href={`${BERYX_TX_URL}${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] transition-opacity hover:opacity-70"
                    style={{ color: "#4AE183" }}
                  >
                    <ExternalLink size={10} />
                    View on Beryx
                  </a>
                )}

                {archiveError && (
                  <p className="text-[10px]" style={{ color: "#FF6B6B" }}>
                    {archiveError.message.slice(0, 60)}
                  </p>
                )}
              </div>

              {/* Step 2: Archive on-chain */}
              {!isConnected ? (
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <button
                      onClick={openConnectModal}
                      className="w-full py-2 rounded-md text-xs font-semibold transition-opacity hover:opacity-80"
                      style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}
                    >
                      Connect Wallet
                    </button>
                  )}
                </ConnectButton.Custom>
              ) : (
                <button
                  onClick={handleArchiveOnChain}
                  disabled={!cidReady || isPending || isConfirming || isSuccess}
                  className="w-full py-2 rounded-md text-xs font-semibold transition-opacity hover:opacity-80 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: isSuccess ? "rgba(74,225,131,0.15)" : "#1A92FF",
                    color: isSuccess ? "#4AE183" : "#0A0E1A",
                    border: isSuccess ? "1px solid rgba(74,225,131,0.3)" : "none",
                  }}
                >
                  {(isPending || isConfirming) && <Loader2 size={12} className="animate-spin" />}
                  {isSuccess
                    ? "Archived On-Chain ✓"
                    : isPending
                    ? "Confirm in Wallet…"
                    : isConfirming
                    ? "Confirming…"
                    : "Step 2: Archive On-Chain"}
                </button>
              )}

              {isSuccess && (
                <div
                  className="mt-3 w-full flex items-center justify-center py-2 rounded border"
                  style={{
                    borderColor: "rgba(74,225,131,0.25)",
                    backgroundColor: "rgba(74,225,131,0.05)",
                  }}
                >
                  <p
                    className="text-[9px] font-bold tracking-[0.2em] uppercase"
                    style={{ color: "#4AE183", opacity: 0.8 }}
                  >
                    VeraLayer Verified
                  </p>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default function UploadPage() {
  return (
    <Suspense fallback={null}>
      <UploadAssetsPage />
    </Suspense>
  );
}