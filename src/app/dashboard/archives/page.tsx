"use client";

import { useState } from "react";
import { Archive, ExternalLink, Loader2, Shield, User, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Aside from "@/app/components/Aside";
import { useAllAssets, type ChainAsset, ArchiveType } from "@/hooks/useVeraLayer";

const BERYX_ADDR = "https://beryx.io/fil/calibration/address/";

type Filter = "all" | "talent" | "heritage";

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function shortHash(hash: string) {
  return `${hash.slice(0, 10)}…${hash.slice(-6)}`;
}

function AssetCard({ asset }: { asset: ChainAsset }) {
  const isHeritage = asset.archiveType === ArchiveType.Heritage;
  const date = new Date(Number(asset.createdAt) * 1000).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="rounded-xl border flex flex-col gap-3 p-4 transition-colors hover:border-white/10"
      style={{
        backgroundColor: "rgba(255,255,255,0.02)",
        borderColor: asset.revoked
          ? "rgba(255,107,107,0.15)"
          : "rgba(255,255,255,0.07)",
      }}
    >
      {/* Top row: type badge + date */}
      <div className="flex items-center justify-between">
        <span
          className="text-[8px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
          style={
            isHeritage
              ? { backgroundColor: "rgba(255,185,85,0.12)", color: "#FFB955", border: "1px solid rgba(255,185,85,0.25)" }
              : { backgroundColor: "rgba(26,146,255,0.12)", color: "#A4C9FF", border: "1px solid rgba(26,146,255,0.25)" }
          }
        >
          {isHeritage ? "Heritage" : "Talent"}
        </span>
        <span className="text-[9px]" style={{ color: "#8A919F" }}>
          {date}
        </span>
      </div>

      {/* Archive ID */}
      <div className="flex items-baseline gap-1.5">
        <span className="text-[9px] uppercase tracking-wider" style={{ color: "#8A919F" }}>
          Archive
        </span>
        <span className="text-base font-bold font-mono" style={{ color: "#DFE2F3" }}>
          #{asset.id.toString()}
        </span>
      </div>

      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }} />

      {/* Meta */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] uppercase tracking-wider" style={{ color: "#8A919F" }}>
            Creator
          </span>
          <div className="flex items-center gap-1">
            <User size={8} style={{ color: "#8A919F" }} />
            <a
              href={`${BERYX_ADDR}${asset.creator}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] font-mono hover:opacity-70 transition-opacity"
              style={{ color: "#C0C7D6" }}
            >
              {shortAddr(asset.creator)}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] uppercase tracking-wider" style={{ color: "#8A919F" }}>
            CID Hash
          </span>
          <span className="text-[9px] font-mono" style={{ color: "#C0C7D6" }}>
            {shortHash(asset.cidHash)}
          </span>
        </div>

        {asset.dealId && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-[9px] uppercase tracking-wider" style={{ color: "#8A919F" }}>
              Deal ID
            </span>
            <span className="text-[9px] font-mono" style={{ color: "#C0C7D6" }}>
              {asset.dealId.length > 14 ? `${asset.dealId.slice(0, 14)}…` : asset.dealId}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        {asset.revoked ? (
          <span className="text-[8px] px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(255,107,107,0.1)", color: "#FF6B6B", border: "1px solid rgba(255,107,107,0.2)" }}>
            Revoked
          </span>
        ) : asset.verifiedBy !== "0x0000000000000000000000000000000000000000" ? (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(74,225,131,0.08)", border: "1px solid rgba(74,225,131,0.2)" }}>
            <CheckCircle2 size={8} style={{ color: "#4AE183" }} />
            <span className="text-[8px]" style={{ color: "#4AE183" }}>Verified</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(74,225,131,0.08)", border: "1px solid rgba(74,225,131,0.2)" }}>
            <Shield size={8} style={{ color: "#4AE183" }} />
            <span className="text-[8px]" style={{ color: "#4AE183" }}>On-Chain</span>
          </div>
        )}

        <a
          href={`${BERYX_ADDR}${asset.creator}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 transition-opacity hover:opacity-70 text-[9px]"
          style={{ color: "#8A919F" }}
        >
          Beryx <ExternalLink size={8} />
        </a>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3">
      <Archive size={32} style={{ color: "#2A3040" }} />
      <p className="text-sm" style={{ color: "#8A919F" }}>
        No archives yet
      </p>
      <Link
        href="/dashboard/upload"
        className="text-xs px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-80"
        style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}
      >
        Archive the first one
      </Link>
    </div>
  );
}

export default function ArchivesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const { assets, isLoading, count, talentCount, heritageCount } = useAllAssets();

  const filtered = assets.filter((a) => {
    if (filter === "talent") return a.archiveType === ArchiveType.Talent;
    if (filter === "heritage") return a.archiveType === ArchiveType.Heritage;
    return true;
  });

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: "#0A0E1A", color: "#8A919F" }}
    >
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Aside />

        <main className="flex-1 overflow-auto p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
            <div>
              <p className="text-[9px] uppercase tracking-widest mb-2" style={{ color: "#8A919F" }}>
                VERALAYER · LIVE REGISTRY
              </p>
              <h1 className="text-2xl font-bold mb-1" style={{ color: "#DFE2F3" }}>
                On-Chain Archive
              </h1>
              <p className="text-xs" style={{ color: "#8A919F" }}>
                Every item archived by the community, verifiable on Filecoin Calibration.
              </p>
            </div>

            <Link
              href="/dashboard/upload"
              className="text-xs px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-80 flex-shrink-0 self-start"
              style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}
            >
              + New Archive
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className="flex items-center gap-6 px-4 py-3 rounded-xl border mb-5 flex-wrap"
            style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center gap-2">
              {isLoading ? (
                <Loader2 size={12} className="animate-spin" style={{ color: "#1A92FF" }} />
              ) : (
                <span className="text-lg font-bold" style={{ color: "#DFE2F3" }}>{count}</span>
              )}
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "#8A919F" }}>
                Total Archives
              </span>
            </div>
            <div className="w-px h-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold" style={{ color: "#A4C9FF" }}>
                {isLoading ? "—" : talentCount}
              </span>
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "#8A919F" }}>Talent</span>
            </div>
            <div className="w-px h-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold" style={{ color: "#FFB955" }}>
                {isLoading ? "—" : heritageCount}
              </span>
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "#8A919F" }}>Heritage</span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 mb-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {(["all", "talent", "heritage"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="text-[11px] px-3 pb-2.5 capitalize transition-colors"
                style={{
                  color: filter === f ? "#DFE2F3" : "#8A919F",
                  borderBottom: filter === f ? "2px solid #1A92FF" : "2px solid transparent",
                }}
              >
                {f === "all" ? "All Archives" : f === "talent" ? "Talent" : "Heritage"}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border h-52 animate-pulse"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
                />
              ))
            ) : filtered.length === 0 ? (
              <EmptyState />
            ) : (
              filtered.map((asset) => (
                <AssetCard key={asset.id.toString()} asset={asset} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
