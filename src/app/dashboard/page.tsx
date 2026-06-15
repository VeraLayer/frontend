"use client";

import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import Link from "next/link";
import Aside from "../components/Aside";
import { ArchiveType } from "@/lib/veralayer-abi";
import { useAccount } from "wagmi";
import { useStorageUpload } from "@/hooks/useStorageUpload";
import { useArchiveData } from "@/hooks/useVeraLayer";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import UserNavbar from "../components/UserNavbar";


const ARCHIVE_TIERS = [
  { id: "general",    title: "General Data",     subtitle: "Cold storage tier" },
  { id: "heritage",   title: "FES&AC Heritage", subtitle: "Precision Grade" },
  { id: "talent",     title: "3MTT Talent",       subtitle: "Educational Ledger" },
];

function tierToArchiveType(id: string): ArchiveType {
  if (id === "heritage") return ArchiveType.Heritage;
  return ArchiveType.Talent;
}

export default function DashboardPage() {
  const [activeTier, setActiveTier] = useState("heritage");
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cid, setCid] = useState("");
  const [dealId, setDealId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isConnected } = useAccount();
  const { upload, uploading, uploadError } = useStorageUpload();
  const { archive, isPending, isConfirming, isSuccess } = useArchiveData();

  const step1Done = !!cid;
  const step2Done = isSuccess;
  const step1Pct  = selectedFile ? 100 : 0;
  const step2Pct  = uploading ? 55 : step1Done ? 100 : 0;
  const step3Pct  = isSuccess ? 100 : isConfirming ? 60 : isPending ? 20 : step1Done ? 0 : 0;

  const PROGRESS_STEPS = [
    { label: "Encrypting & Calculating CID ...", pct: step1Pct,  done: !!selectedFile },
    { label: "Uploading to Filecoin ...",        pct: step2Pct,  done: step1Done },
    { label: "Archiving On-Chain ...",           pct: step3Pct,  done: step2Done },
  ];

  const TASK_META = [
    { label: "Content ID",    value: cid     ? `${cid.slice(0, 14)}…`    : "bafybeidr5…" },
    { label: "Storage Deal",  value: dealId  ? `#${dealId}: active`       : "Pending" },
    { label: "Archive Type",  value: activeTier === "heritage" ? "Heritage" : "Talent" },
    { label: "Replication",   value: step1Done ? "5/5 Segments" : "—" },
  ];

  function pickFile(file: File) {
    setSelectedFile(file);
    setCid("");
    setDealId("");
  }

  async function handleUpload() {
    if (!selectedFile) return;
    const result = await upload(selectedFile);
    if (result) {
      setCid(result.cid);
      setDealId(result.dealId);
      // Auto-trigger on-chain archive
      archive({
        cid: result.cid,
        dealId: result.dealId,
        archiveType: tierToArchiveType(activeTier),
      });
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col md:grid md:grid-cols-12" 
      style={{ backgroundColor: "#0A0E1A", color: "#8A919F" }}
    >
      {/* Sidebar */}
        <div className="hidden md:block md:col-span-2">
        <Aside />
      </div>

      {/* Main */}
      <main className="flex-1 md:col-span-10 p-4 md:p-6 flex flex-col gap-4 md:gap-5 pb-24 md:pb-6">

        {/* Archive Tier Selector */}
        <UserNavbar />
        <div>
          <p
            className="text-[9px] uppercase tracking-widest mb-3 font-medium"
            style={{ color: "#8A919F" }}
          >
            Select Archive Tier
          </p>
          <div className="grid grid-cols-3 gap-3">
            {ARCHIVE_TIERS.map(({ id, title, subtitle }) => {
              const isActive = activeTier === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTier(id)}
                  className="text-left p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: "transparent",
                    border: `1.5px solid ${isActive ? "#1A92FF" : "rgba(255,255,255,0.07)"}`,
                  }}
                >
                  <p
                    className="text-xs font-semibold mb-0.5"
                    style={{ color: isActive ? "#DFE2F3" : "#C0C7D6" }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{ color: isActive ? "#1A92FF" : "#8A919F" }}
                  >
                    {subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload to Filecoin */}
        <div
          className="rounded-xl overflow-hidden border"
          style={{
            backgroundColor: "rgba(255,255,255,0.015)",
            borderColor: "rgba(255,255,255,0.07)",
          }}
        >
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) pickFile(file);
            }}
            onClick={() => !uploading && fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-3 py-10 cursor-pointer transition-colors"
            style={{
              backgroundColor: dragging
                ? "rgba(26,146,255,0.04)"
                : selectedFile
                ? "rgba(74,225,131,0.02)"
                : "transparent",
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) pickFile(file);
              }}
            />

            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: selectedFile
                  ? "rgba(74,225,131,0.12)"
                  : "rgba(26,146,255,0.15)",
              }}
            >
              <Upload
                size={22}
                style={{ color: selectedFile ? "#4AE183" : "#1A92FF" }}
              />
            </div>

            <div className="text-center">
              <h3
                className="text-base font-semibold mb-1"
                style={{ color: selectedFile ? "#4AE183" : "#1A92FF" }}
              >
                {selectedFile ? selectedFile.name : "Upload to Filecoin"}
              </h3>
              <p
                className="text-xs max-w-xs leading-relaxed"
                style={{ color: "#8A919F" }}
              >
                {selectedFile
                  ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Click to change`
                  : "Drag and drop your files here or click to browse. Files are processed through VeraLayer's cryptographic pipeline."}
              </p>
            </div>

            {!selectedFile && (
              <div className="flex items-center gap-2 mt-1">
                {["Max 50GB", "CAR Files Accepted"].map((badge) => (
                  <span
                    key={badge}
                    className="text-[10px] px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#C0C7D6",
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Upload / Archive action */}
          {selectedFile && (
            <div
              className="px-5 pb-4 border-t pt-4"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
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
              ) : isSuccess ? (
                <div
                  className="w-full py-2.5 rounded-lg text-xs font-semibold text-center"
                  style={{ backgroundColor: "rgba(74,225,131,0.12)", color: "#4AE183", border: "1px solid rgba(74,225,131,0.25)" }}
                >
                  Archived On-Chain ✓
                </div>
              ) : (
                <button
                  onClick={handleUpload}
                  disabled={uploading || isPending || isConfirming || step1Done}
                  className="w-full py-2.5 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}
                >
                  {uploading
                    ? "Uploading to Filecoin…"
                    : isPending
                    ? "Confirm in Wallet…"
                    : isConfirming
                    ? "Confirming on-chain…"
                    : step1Done
                    ? "Upload Complete ✓"
                    : "Upload & Archive"}
                </button>
              )}
              {uploadError && (
                <p className="text-[10px] mt-2 text-center" style={{ color: "#FF6B6B" }}>
                  {uploadError.message.slice(0, 80)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Current Task */}
        <div
          className="rounded-xl p-4 border"
          style={{
            backgroundColor: "rgba(255,255,255,0.015)",
            borderColor: "rgba(255,255,255,0.07)",
          }}
        >
          {/* Task header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <p
                className="text-[9px] uppercase tracking-widest mb-0.5"
                style={{ color: "#8A919F" }}
              >
                Current Task
              </p>
              <p className="text-xs font-medium" style={{ color: "#DFE2F3" }}>
                {selectedFile
                  ? `Storing: ${selectedFile.name}`
                  : "Storing: archive_festac_77_v4.car"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest mb-0.5" style={{ color: "#8A919F" }}>
                Network Status
              </p>
              <p className="text-[10px]" style={{ color: isSuccess ? "#4AE183" : uploading || isPending || isConfirming ? "#FFB955" : "#4AE183" }}>
                {isSuccess ? "Archived" : uploading ? "Uploading" : isPending ? "Pending" : isConfirming ? "Confirming" : "Synchronized"}
              </p>
            </div>
          </div>

          {/* Progress steps */}
          <div className="flex flex-col gap-2 mb-4">
            {PROGRESS_STEPS.map(({ label, pct, done }) => (
              <div key={label} className="flex flex-col gap-1">
                <p className="text-[10px]" style={{ color: done ? "#4AE183" : "#8A919F" }}>
                  {label}
                </p>
                <div
                  className="w-full h-1 rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: done ? "#4AE183" : "#1A92FF",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Meta row */}
          <div
            className="grid grid-cols-4 gap-2 pt-3 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {TASK_META.map(({ label, value }) => (
              <div key={label}>
                <p className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "#8A919F" }}>
                  {label}
                </p>
                <p className="text-[10px] font-mono" style={{ color: "#C0C7D6" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Full archive link */}
          <div className="mt-3 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <Link
              href="/dashboard/archives"
              className="text-[10px] transition-opacity hover:opacity-70"
              style={{ color: "#1A92FF" }}
            >
              View all archives →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
