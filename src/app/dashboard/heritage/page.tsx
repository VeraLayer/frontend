"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Star,
  GitBranch,
  Award,
  Shield,
  Loader2,
  ExternalLink,
  Upload,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  Archive,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Aside from "@/app/components/Aside";
import { useAccount, useReadContract } from "wagmi";
import { useSynapse } from "@/hooks/useSynapse";
import { ArchiveType, VERALAYER_ABI, VERALAYER_ADDRESS } from "@/lib/veralayer-abi";
import { toast } from "@/lib/toast";
import { PaymentPanel } from "@/app/components/PaymentPanel";
import { ChainAsset } from "@/hooks/useVeraLayer";


const SIDEBAR_NAV = [
  { icon: <LayoutDashboard size={13} />, label: "Dashboard", href: "#" },
  { icon: <Upload size={13} />, label: "My Uploads", href: "#" },
  { icon: <Archive size={13} />, label: "Heritage Assets", href: "#", active: true },
  { icon: <Settings size={13} />, label: "Settings", href: "#" },
];

const BERYX_ADDR  = "https://beryx.io/fil/calibration/address/";
const BERYX_TX    = "https://beryx.io/fil/calibration/tx/";

const FILTER_TABS = [
  "All Assets",
  "Search Program",
  "Legacy Performances",
  "Music & Art",
];

const ASSET_CARDS = [
  {
    id: 1,
    label: "ARCHIVAL",
    sublabel: "1234 Contributions",
    title: "Opening Ceremony: Unified Flag Raise",
    type: "FIL Archive",
    imageBg: "#0D1A12",
    imageAccent: "#1c3820",
    starred: false,
  },
  {
    id: 2,
    label: "ARCHIVAL",
    sublabel: "5,042 Contributions",
    title: "Imperial Weave by Patterns Collective",
    type: "FIL Archive",
    imageBg: "#0A0A0A",
    imageAccent: "#1a1a1a",
    starred: false,
  },
  {
    id: 3,
    label: "ARCHIVAL",
    sublabel: "924 Contributions",
    title: "Oral Poetry: The Sokoto Man of Loss",
    type: "FIL Archive",
    imageBg: "#100A0A",
    imageAccent: "#2a1010",
    starred: true,
  },
];

const FEATURE_CARDS = [
  { id: 1, icon: <GitBranch size={18} />, iconColor: "#A4C9FF", iconBg: "rgba(164,201,255,0.1)",  title: "Provenance Graph",    body: "Track authenticity back to physical origin with cryptographic last-mile lineage & proof of registration." },
  { id: 2, icon: <Award     size={18} />, iconColor: "#4AE183", iconBg: "rgba(74,225,131,0.1)",   title: "Heritage Attribution", body: "Intelligent attribution enforcing community equitable credit in every archival artefact." },
  { id: 3, icon: <Shield    size={18} />, iconColor: "#FFB955", iconBg: "rgba(255,185,85,0.1)",   title: "Curated Authority",   body: "Vetted by an international council of librarians and archivists for the highest metadata fidelity." },
];

function gradientFromId(id: bigint) {
  const palettes = [
    { bg: "#0D1A12", accent: "#1c3820" },
    { bg: "#0A0A0A", accent: "#1a1a1a" },
    { bg: "#100A0A", accent: "#2a1010" },
    { bg: "#0A0F1A", accent: "#1a2030" },
    { bg: "#0F0A1A", accent: "#22103a" },
    { bg: "#1A0A0A", accent: "#3a1010" },
  ];
  return palettes[Number(id % 6n)];
}

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function HeritageCard({ asset }: { asset: ChainAsset }) {
  const { bg, accent } = gradientFromId(asset.id);
  const date = new Date(Number(asset.createdAt) * 1000).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
  const ipfsUrl = asset.dealId ? `/api/ipfs/${asset.dealId}` : null;
  return (
    <div
      className="flex items-stretch gap-3 rounded-xl border overflow-hidden"
      style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div className="w-28 flex-shrink-0 relative" style={{ backgroundColor: bg, minHeight: "80px" }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 40% 50%, ${accent} 0%, ${bg} 80%)` }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.03) 3px,rgba(255,255,255,0.03) 4px)" }} />
        {ipfsUrl && (
          <img
            src={ipfsUrl}
            alt="Heritage asset"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        )}
        <span className="absolute top-1.5 left-1.5 text-[7px] px-1.5 py-0.5 rounded font-medium z-10" style={{ backgroundColor: "#FFB955", color: "#0A0E1A" }}>
          ARCHIVAL
        </span>
      </div>
      <div className="flex flex-col justify-center gap-1 py-3 pr-3 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] mb-0.5" style={{ color: "#8A919F" }}>{date}</p>
            <p className="text-xs font-semibold leading-snug" style={{ color: "#DFE2F3" }}>
              Archive #{asset.id.toString()}
            </p>
            <p className="text-[9px] font-mono mt-0.5" style={{ color: "#8A919F" }}>{shortAddr(asset.creator)}</p>
          </div>
          {asset.verifiedBy !== "0x0000000000000000000000000000000000000000" && (
            <Star size={11} style={{ color: "#FFB955" }} />
          )}
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[9px]" style={{ color: "#8A919F" }}>FIL Archive</span>
          <a href={`${BERYX_ADDR}${asset.creator}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-0.5 text-[9px] transition-opacity hover:opacity-70" style={{ color: "#A4C9FF" }}>
            FIL <ExternalLink size={8} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function HeritageAssetsPage() {
  const [activeTab,    setActiveTab]    = useState("All Assets");
  const [searchQuery,  setSearchQuery]  = useState("");
  const [dragging,     setDragging]     = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cid,          setCid]          = useState("");
  const [dealId,       setDealId]       = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isConnected, chainId } = useAccount();
  const { synapse, initializing, initError } = useSynapse();
  const { upload, uploading, uploadStatus, uploadError, commitWarning } = useStorageUpload();
  const { archive, txHash, isPending, isConfirming, isSuccess, error: archiveError } = useArchiveData();

  const wrongNetwork = isConnected && chainId !== 314159;
  const cidReady     = !!cid;

  // ── on-chain reads ──────────────────────────────────────────────────
  const { data: countData } = useReadContract({
    address: VERALAYER_ADDRESS, abi: VERALAYER_ABI, functionName: "getHeritageArchiveCount",
  });
  const heritageCount = countData ? Number(countData) : 0;

  const { data: archivesData, isLoading } = useReadContract({
    address: VERALAYER_ADDRESS, abi: VERALAYER_ABI,
    functionName: "getHeritageArchives",
    args: [0n, BigInt(Math.min(heritageCount, 50))],
    query: { enabled: heritageCount > 0 },
  });

  const archives = (archivesData as unknown as ChainAsset[] | undefined) ?? [];
  const filtered = searchQuery
    ? archives.filter((a) =>
        a.id.toString().includes(searchQuery) ||
        a.creator.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : archives;

  // ── file helpers ────────────────────────────────────────────────────
  function pickFile(file: File) {
    setSelectedFile(file);
    setCid("");
    setDealId("");
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
    archive({ cid, dealId, archiveType: ArchiveType.Heritage });
  }

  // ── toasts ──────────────────────────────────────────────────────────
  useEffect(() => { if (uploadError)    toast.error(uploadError.message.slice(0, 100)); },   [uploadError]);
  useEffect(() => { if (commitWarning)  toast.warning(commitWarning); },                      [commitWarning]);
  useEffect(() => { if (isSuccess)      toast.success("Heritage archive confirmed on Filecoin!"); }, [isSuccess]);
  useEffect(() => { if (archiveError)   toast.error(archiveError.message.slice(0, 100)); },   [archiveError]);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0A0E1A", color: "#8A919F" }}>
      <Aside />

      <main className="flex-1 overflow-auto">
        {/* Top nav */}
        <div
          className="flex items-center justify-between px-6 py-3 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-5">
            {["Archive", "Heritage", "Explore"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs transition-opacity hover:opacity-70"
                style={{
                  color: l === "Heritage" ? "#DFE2F3" : "#8A919F",
                  textDecoration: l === "Heritage" ? "underline" : "none",
                  textUnderlineOffset: "4px",
                }}
              >
                {l}
              </a>
            ))}
          </div>
          <ConnectButton chainStatus="icon" showBalance={false} label="Connect Wallet" />
        </div>

        <div className="p-6">
          <p className="text-[9px] uppercase tracking-widest mb-3" style={{ color: "#8A919F" }}>PROFESSIONAL ARCHIVE</p>

          {/* Hero heading + search */}
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold leading-tight" style={{ color: "#DFE2F3" }}>FESTAC '77:</h1>
              <h1 className="text-2xl font-bold leading-tight" style={{ color: "#1A92FF" }}>The Black World Archival</h1>
              <p className="text-xs mt-2 max-w-lg leading-relaxed" style={{ color: "#8A919F" }}>
                A decentralized repository of the 2nd World Black and African Festival of Arts and Culture.
                Preserving digital assets from the Black Kingdom to the Lagos shores on Filecoin Web3.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <Search size={12} style={{ color: "#8A919F" }} />
                <input type="text" placeholder="Search by ID or address…" value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-xs w-36 placeholder:opacity-40" style={{ color: "#DFE2F3" }} />
              </div>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 mb-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {FILTER_TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="text-[11px] px-3 pb-2.5 transition-colors whitespace-nowrap"
                style={{ color: activeTab === tab ? "#DFE2F3" : "#8A919F", borderBottom: activeTab === tab ? "2px solid #1A92FF" : "2px solid transparent" }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Two-column: archive list + upload panel */}
          <div className="flex gap-5">

            {/* ── Left: real archive list ─────────────────────────── */}
            <div className="flex-1 flex flex-col gap-3">
              {isLoading ? (
                <div className="flex items-center gap-2 py-10 justify-center">
                  <Loader2 size={14} className="animate-spin" style={{ color: "#1A92FF" }} />
                  <p className="text-xs" style={{ color: "#8A919F" }}>Loading heritage archives…</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <p className="text-sm" style={{ color: "#8A919F" }}>
                    {heritageCount === 0 ? "No heritage archives yet — be the first!" : "No results."}
                  </p>
                </div>
              ) : (
                filtered.map((asset) => <HeritageCard key={asset.id.toString()} asset={asset} />)
              )}
            </div>

            {/* ── Right: upload panel (mirrors upload page) ────────── */}
            <div className="w-64 flex-shrink-0 flex flex-col gap-4">

              {/* Filecoin Pay */}
              <PaymentPanel synapse={synapse} initializing={initializing} initError={initError} />

              {/* Drop zone */}
              <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="px-4 pt-4 pb-2">
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-1" style={{ color: "#FFB955" }}>
                    Heritage Archive
                  </p>
                  <p className="text-[9px]" style={{ color: "#8A919F" }}>Upload & archive a heritage asset on Filecoin.</p>
                </div>

                {/* Drop zone area */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) pickFile(f); }}
                  onClick={() => fileInputRef.current?.click()}
                  className="mx-4 mb-4 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
                  style={{
                    border: `1.5px dashed ${dragging ? "#FFB955" : selectedFile ? "rgba(74,225,131,0.4)" : "rgba(255,255,255,0.1)"}`,
                    backgroundColor: dragging ? "rgba(255,185,85,0.04)" : selectedFile ? "rgba(74,225,131,0.03)" : "rgba(255,255,255,0.02)",
                    height: "120px",
                  }}
                >
                  <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />
                  {selectedFile ? (
                    <>
                      <FileCheck size={20} style={{ color: "#4AE183" }} />
                      <p className="text-[11px] font-medium text-center px-2" style={{ color: "#DFE2F3" }}>{selectedFile.name}</p>
                      <p className="text-[9px]" style={{ color: "#8A919F" }}>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Click to change</p>
                    </>
                  ) : (
                    <>
                      <Upload size={20} style={{ color: "#FFB955" }} />
                      <p className="text-[11px]" style={{ color: "#DFE2F3" }}>Drag & drop or click</p>
                      <p className="text-[9px]" style={{ color: "#8A919F" }}>Max 50 GB</p>
                    </>
                  )}
                </div>

                {/* Wrong network */}
                {wrongNetwork && (
                  <div className="mx-4 mb-3 flex items-start gap-2 p-2 rounded"
                    style={{ backgroundColor: "rgba(255,185,85,0.08)", border: "1px solid rgba(255,185,85,0.25)" }}>
                    <AlertCircle size={11} style={{ color: "#FFB955", flexShrink: 0, marginTop: 1 }} />
                    <p className="text-[9px]" style={{ color: "#FFB955" }}>Switch to Filecoin Calibration Testnet.</p>
                  </div>
                )}

                {/* Step 1 */}
                <div className="px-4 mb-3 flex flex-col gap-2">
                  {!isConnected ? (
                    <ConnectButton.Custom>
                      {({ openConnectModal }) => (
                        <button onClick={openConnectModal}
                          className="w-full py-2 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80"
                          style={{ backgroundColor: "#FFB955", color: "#0A0E1A" }}>
                          Connect Wallet
                        </button>
                      )}
                    </ConnectButton.Custom>
                  ) : (
                    <button onClick={handleUploadToFilecoin}
                      disabled={!selectedFile || uploading || cidReady}
                      className="w-full py-2 rounded-lg text-xs font-semibold transition-opacity hover:opacity-80 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: cidReady ? "rgba(74,225,131,0.12)" : "rgba(255,185,85,0.15)",
                        color: cidReady ? "#4AE183" : "#FFB955",
                        border: cidReady ? "1px solid rgba(74,225,131,0.3)" : "1px solid rgba(255,185,85,0.3)",
                      }}>
                      {uploading && <Loader2 size={12} className="animate-spin" />}
                      {cidReady ? "Step 1 Done — Stored ✓" : uploading ? uploadStatus : "Step 1: Upload to Filecoin"}
                    </button>
                  )}

                  {commitWarning && cidReady && (
                    <div className="flex items-start gap-1.5 p-2 rounded" style={{ backgroundColor: "rgba(255,185,85,0.08)", border: "1px solid rgba(255,185,85,0.2)" }}>
                      <AlertCircle size={10} style={{ color: "#FFB955", flexShrink: 0, marginTop: 1 }} />
                      <p className="text-[9px]" style={{ color: "#FFB955" }}>{commitWarning}</p>
                    </div>
                  )}
                  {uploadError && (
                    <div className="flex items-start gap-1.5 p-2 rounded" style={{ backgroundColor: "rgba(255,107,107,0.08)", border: "1px solid rgba(255,107,107,0.2)" }}>
                      <AlertCircle size={10} style={{ color: "#FF6B6B", flexShrink: 0, marginTop: 1 }} />
                      <p className="text-[9px]" style={{ color: "#FF6B6B" }}>{uploadError.message.slice(0, 80)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* On-Chain Status (Step 2) — mirrors upload page exactly */}
              <div className="rounded-xl p-4 border"
                style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: isSuccess ? "rgba(74,225,131,0.3)" : "rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-1.5 mb-4">
                  <CheckCircle2 size={13} style={{ color: isSuccess ? "#4AE183" : "#8A919F" }} />
                  <p className="text-[10px] font-semibold tracking-widest uppercase"
                    style={{ color: isSuccess ? "#4AE183" : "#8A919F" }}>
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
                        style={{ maxHeight: "100px" }}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                      />
                      <a
                        href={`https://ipfs.io/ipfs/${cid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[9px] px-2 py-1.5 transition-opacity hover:opacity-70"
                        style={{ color: "#FFB955" }}
                      >
                        <ExternalLink size={8} />
                        View on IPFS
                      </a>
                    </div>
                  )}

                  <div>
                    <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#8A919F" }}>CID</p>
                    <p className="text-[9px] font-mono break-all" style={{ color: cid ? "#C0C7D6" : "#404753" }}>
                      {cid || "Waiting for upload…"}
                    </p>
                  </div>

                  {isSuccess && txHash && (
                    <a href={`${BERYX_TX}${txHash}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[10px] transition-opacity hover:opacity-70" style={{ color: "#4AE183" }}>
                      <ExternalLink size={10} /> View on Beryx
                    </a>
                  )}
                  {archiveError && (
                    <p className="text-[10px]" style={{ color: "#FF6B6B" }}>{archiveError.message.slice(0, 60)}</p>
                  )}
                </div>

                {/* Step 2 button */}
                {!isConnected ? (
                  <ConnectButton.Custom>
                    {({ openConnectModal }) => (
                      <button onClick={openConnectModal}
                        className="w-full py-2 rounded-md text-xs font-semibold transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}>
                        Connect Wallet
                      </button>
                    )}
                  </ConnectButton.Custom>
                ) : (
                  <button onClick={handleArchiveOnChain}
                    disabled={!cidReady || isPending || isConfirming || isSuccess}
                    className="w-full py-2 rounded-md text-xs font-semibold transition-opacity hover:opacity-80 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: isSuccess ? "rgba(74,225,131,0.15)" : "#1A92FF",
                      color: isSuccess ? "#4AE183" : "#0A0E1A",
                      border: isSuccess ? "1px solid rgba(74,225,131,0.3)" : "none",
                    }}>
                    {(isPending || isConfirming) && <Loader2 size={12} className="animate-spin" />}
                    {isSuccess ? "Archived On-Chain ✓" : isPending ? "Confirm in Wallet…" : isConfirming ? "Confirming…" : "Step 2: Archive On-Chain"}
                  </button>
                )}

                {isSuccess && (
                  <div className="mt-3 w-full flex items-center justify-center py-2 rounded border"
                    style={{ borderColor: "rgba(74,225,131,0.25)", backgroundColor: "rgba(74,225,131,0.05)" }}>
                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: "#4AE183", opacity: 0.8 }}>
                      VeraLayer Verified
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {FEATURE_CARDS.map(({ id, icon, iconColor, iconBg, title, body }) => (
              <div key={id} className="rounded-xl p-4 border"
                style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: iconBg }}>
                  <span style={{ color: iconColor }}>{icon}</span>
                </div>
                <p className="text-sm font-semibold mb-1.5" style={{ color: "#DFE2F3" }}>{title}</p>
                <p className="text-[11px] leading-relaxed" style={{ color: "#8A919F" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
