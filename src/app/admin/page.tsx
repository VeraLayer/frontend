"use client";

import { useState } from "react";
import {
  FileStack,
  Landmark,
  Clock,
  Settings,
  Bell,
  Rss,
  Search,
  Download,
  Server,
  FileCode2,
  History,
  Cloud,
  Shield,
  MoreHorizontal,
  Diamond,
  Loader2,
  ExternalLink,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import { useAllAssets, ArchiveType } from "@/hooks/useVeraLayer";

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  VERIFIED: { bg: "rgba(74,225,131,0.12)",  color: "#4AE183" },
  PENDING:  { bg: "rgba(255,185,85,0.12)",  color: "#FFB955" },
  FLAGGED:  { bg: "rgba(255,107,107,0.12)", color: "#FF6B6B" },
};

const BERYX_ADDR = "https://beryx.io/fil/calibration/address/";

const BAR_DATA = [
  { day: "MON", standard: 60, heritage: 30 },
  { day: "TUE", standard: 75, heritage: 45 },
  { day: "WED", standard: 90, heritage: 60 },
  { day: "THU", standard: 80, heritage: 50 },
  { day: "FRI", standard: 55, heritage: 35 },
  { day: "SAT", standard: 40, heritage: 25 },
  { day: "SUN", standard: 70, heritage: 40 },
];

const HEALTH_ITEMS = [
  { icon: <FileCode2 size={18} />, label: "SMART CONTRACT", value: "ACTIVE | V3.2.1" },
  { icon: <History size={18} />,   label: "LAST TRANSACTION", value: "CALIBRATION TESTNET" },
  { icon: <Cloud size={18} />,     label: "FILECOIN NETWORK", value: "ONLINE | CALIBRATION" },
  { icon: <Shield size={18} />,    label: "API PROXY STATUS", value: "SECURE | TLS 1.3" },
];

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function shortCid(cid: string) {
  return `${cid.slice(0, 8)}…${cid.slice(-4)}`;
}

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { assets, isLoading, count, talentCount, heritageCount } = useAllAssets();

  const filteredAssets = searchQuery
    ? assets.filter(
        (a) =>
          a.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.dealId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.id.toString().includes(searchQuery)
      )
    : assets.slice(0, 10);

  const STAT_CARDS = [
    {
      label: "TOTAL ASSETS",
      value: isLoading ? "—" : count.toLocaleString(),
      delta: `${talentCount} Talent`,
      deltaColor: "#4AE183",
      icon: <FileStack size={16} />,
      iconColor: "#A4C9FF",
      highlight: false,
    },
    {
      label: "HERITAGE ITEMS",
      value: isLoading ? "—" : heritageCount.toLocaleString(),
      delta: "On-Chain",
      deltaColor: "#FFB955",
      icon: <Landmark size={16} />,
      iconColor: "#FFB955",
      highlight: true,
    },
    {
      label: "ACTIVE DEALS",
      value: isLoading ? "—" : count.toLocaleString(),
      delta: "LIVE",
      deltaColor: "#4AE183",
      icon: <Diamond size={16} />,
      iconColor: "#A4C9FF",
      highlight: false,
    },
    {
      label: "TALENT ARCHIVES",
      value: isLoading ? "—" : talentCount.toLocaleString(),
      delta: "3MTT",
      deltaColor: "#A4C9FF",
      icon: <Clock size={16} />,
      iconColor: "#A4C9FF",
      highlight: false,
    },
  ];

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "#0A0E1A", color: "#8A919F" }}
    >
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      
      <AdminSidebar />
      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 py-3 border-b flex-shrink-0"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg w-72"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Search size={13} style={{ color: "#8A919F" }} />
            <input
              type="text"
              placeholder="Query asset CID or wallet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-xs flex-1 placeholder:opacity-50"
              style={{ color: "#DFE2F3" }}
            />
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{
                backgroundColor: "rgba(74,225,131,0.1)",
                border: "1px solid rgba(74,225,131,0.25)",
                color: "#4AE183",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4AE183" }} />
              Filecoin Calibration — Live
            </div>
            <button className="transition-opacity hover:opacity-70" style={{ color: "#8A919F" }}>
              <Bell size={16} />
            </button>
            <button className="transition-opacity hover:opacity-70" style={{ color: "#8A919F" }}>
              <Rss size={16} />
            </button>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: "#1A2540", color: "#A4C9FF" }}
            >
              A
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-auto p-6">

          {/* Page heading */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: "#DFE2F3" }}>
                System Overview
              </h1>
              <p className="text-xs" style={{ color: "#8A919F" }}>
                Real-time status of infrastructure and regional data submissions.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 text-xs px-4 py-2 rounded-md transition-opacity hover:opacity-80"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#C0C7D6",
                }}
              >
                <Download size={13} />
                Export Report
              </button>
              <button
                className="flex items-center gap-2 text-xs px-4 py-2 rounded-md font-medium transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}
              >
                <Server size={13} />
                Deploy Node
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {STAT_CARDS.map(({ label, value, delta, deltaColor, icon, iconColor, highlight }) => (
              <div
                key={label}
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: highlight ? "rgba(255,185,85,0.05)" : "rgba(255,255,255,0.02)",
                  borderColor: highlight ? "rgba(255,185,85,0.25)" : "rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: "#8A919F" }}>
                    {label}
                  </p>
                  <span style={{ color: iconColor }}>{icon}</span>
                </div>
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ color: highlight ? "#FFB955" : "#DFE2F3" }}
                >
                  {value}
                </p>
                <p className="text-[10px] font-medium" style={{ color: deltaColor }}>
                  ↑ {delta}
                </p>
              </div>
            ))}
          </div>

          {/* Two-column row */}
          <div className="flex gap-5 mb-6">

            {/* Recent Submissions table */}
            <div
              className="flex-1 rounded-xl border overflow-hidden"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              {/* Table header */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <p className="text-xs font-semibold" style={{ color: "#DFE2F3" }}>
                  Recent Submissions
                </p>
                <button
                  className="text-[10px] transition-opacity hover:opacity-70"
                  style={{ color: "#1A92FF" }}
                >
                  VIEW ALL
                </button>
              </div>

              {/* Column headers */}
              <div
                className="grid px-5 py-2 border-b"
                style={{
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 0.5fr",
                  borderColor: "rgba(255,255,255,0.04)",
                }}
              >
                {["ASSET TITLE", "TYPE", "WALLET", "CID", "STATUS", "DATE", ""].map((h) => (
                  <p key={h} className="text-[9px] uppercase tracking-widest" style={{ color: "#8A919F" }}>
                    {h}
                  </p>
                ))}
              </div>

              {/* Rows */}
              {isLoading ? (
                <div className="flex items-center gap-2 justify-center py-8">
                  <Loader2 size={14} className="animate-spin" style={{ color: "#1A92FF" }} />
                  <p className="text-xs" style={{ color: "#8A919F" }}>Loading on-chain data…</p>
                </div>
              ) : filteredAssets.length === 0 ? (
                <p className="text-xs text-center py-8" style={{ color: "#8A919F" }}>No archives found.</p>
              ) : filteredAssets.map((row) => {
                const isHeritage = row.archiveType === ArchiveType.Heritage;
                const date = new Date(Number(row.createdAt) * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
                const status = row.revoked ? "FLAGGED" : row.verifiedBy !== "0x0000000000000000000000000000000000000000" ? "VERIFIED" : "PENDING";
                return (
                  <div
                    key={row.id.toString()}
                    className="grid px-5 py-3 border-b items-center transition-colors hover:bg-white/[0.02]"
                    style={{
                      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 0.5fr",
                      borderColor: "rgba(255,255,255,0.04)",
                    }}
                  >
                    <p className="text-xs font-medium font-mono" style={{ color: "#DFE2F3" }}>
                      Archive #{row.id.toString()}
                    </p>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded w-fit"
                      style={{
                        backgroundColor: isHeritage ? "rgba(255,185,85,0.12)" : "rgba(164,201,255,0.12)",
                        color: isHeritage ? "#FFB955" : "#A4C9FF",
                      }}
                    >
                      {isHeritage ? "Heritage" : "Talent"}
                    </span>
                    <a
                      href={`${BERYX_ADDR}${row.creator}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono transition-opacity hover:opacity-70"
                      style={{ color: "#8A919F" }}
                    >
                      {shortAddr(row.creator)}
                    </a>
                    <a
                      href={`https://ipfs.io/ipfs/${row.dealId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-0.5 text-[10px] font-mono transition-opacity hover:opacity-70"
                      style={{ color: "#1A92FF" }}
                    >
                      {shortCid(row.dealId)} <ExternalLink size={8} />
                    </a>
                    <span
                      className="text-[9px] px-2 py-0.5 rounded-full w-fit flex items-center gap-1"
                      style={{
                        backgroundColor: STATUS_STYLES[status].bg,
                        color: STATUS_STYLES[status].color,
                      }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: STATUS_STYLES[status].color }} />
                      {status}
                    </span>
                    <p className="text-[10px]" style={{ color: "#8A919F" }}>{date}</p>
                    <button className="transition-opacity hover:opacity-70" style={{ color: "#8A919F" }}>
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Right column: chart + storage */}
            <div className="w-64 flex-shrink-0 flex flex-col gap-4">

              {/* Submission Activity chart */}
              <div
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "#8A919F" }}>
                    Submission Activity (7D)
                  </p>
                  <p className="text-[9px]" style={{ color: "#8A919F" }}>TOTAL: 2.1%</p>
                </div>

                {/* Bar chart */}
                <div className="flex items-end gap-1.5 h-24 mb-3">
                  {BAR_DATA.map(({ day, standard, heritage }) => {
                    const total = standard + heritage;
                    const maxVal = 150;
                    const heightPx = Math.round((total / maxVal) * 96);
                    const heritageH = Math.round((heritage / total) * heightPx);
                    const standardH = heightPx - heritageH;
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center gap-0.5">
                        <div className="w-full flex flex-col justify-end" style={{ height: "96px" }}>
                          <div
                            className="w-full rounded-sm"
                            style={{ height: `${heritageH}px`, backgroundColor: "#FFB955" }}
                          />
                          <div
                            className="w-full rounded-sm mt-0.5"
                            style={{ height: `${standardH}px`, backgroundColor: "#1A92FF" }}
                          />
                        </div>
                        <p className="text-[8px]" style={{ color: "#8A919F" }}>{day}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1A92FF" }} />
                    <p className="text-[9px]" style={{ color: "#8A919F" }}>Standard</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FFB955" }} />
                    <p className="text-[9px]" style={{ color: "#8A919F" }}>Heritage</p>
                  </div>
                </div>
              </div>

              {/* Storage Allocation donut */}
              <div
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <p className="text-[10px] uppercase tracking-widest font-semibold mb-4" style={{ color: "#8A919F" }}>
                  Storage Allocation
                </p>

                <div className="flex items-center gap-4">
                  {/* SVG donut */}
                  <div className="relative flex-shrink-0">
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      {/* Background circle */}
                      <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                      {/* IPFS 60% */}
                      <circle
                        cx="40" cy="40" r="30" fill="none"
                        stroke="#1A92FF" strokeWidth="10"
                        strokeDasharray={`${0.60 * 188.5} ${188.5}`}
                        strokeDashoffset="0"
                        transform="rotate(-90 40 40)"
                      />
                      {/* Filecoin 25% */}
                      <circle
                        cx="40" cy="40" r="30" fill="none"
                        stroke="#FFB955" strokeWidth="10"
                        strokeDasharray={`${0.25 * 188.5} ${188.5}`}
                        strokeDashoffset={`${-0.60 * 188.5}`}
                        transform="rotate(-90 40 40)"
                      />
                      {/* Off-chain 15% */}
                      <circle
                        cx="40" cy="40" r="30" fill="none"
                        stroke="#4AE183" strokeWidth="10"
                        strokeDasharray={`${0.15 * 188.5} ${188.5}`}
                        strokeDashoffset={`${-0.85 * 188.5}`}
                        transform="rotate(-90 40 40)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-sm font-bold" style={{ color: "#DFE2F3" }}>84%</p>
                      <p className="text-[8px]" style={{ color: "#8A919F" }}>utilized</p>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "IPFS Persistent (60%)", color: "#1A92FF" },
                      { label: "Filecoin Cold (25%)",   color: "#FFB955" },
                      { label: "Off-chain Cache (15%)", color: "#4AE183" },
                    ].map(({ label, color }) => (
                      <div key={label} className="flex items-start gap-1.5">
                        <span className="w-2 h-2 rounded-full mt-0.5 flex-shrink-0" style={{ backgroundColor: color }} />
                        <p className="text-[9px] leading-tight" style={{ color: "#8A919F" }}>{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* On-chain health monitor */}
          <div
            className="rounded-xl border p-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Settings size={14} style={{ color: "#1A92FF" }} />
              <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: "#8A919F" }}>
                On-Chain Health Monitor
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {HEALTH_ITEMS.map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-3 rounded-lg border"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  <span style={{ color: "#1A92FF" }}>{icon}</span>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color: "#8A919F" }}>
                      {label}
                    </p>
                    <p className="text-[10px] font-semibold" style={{ color: "#DFE2F3" }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
