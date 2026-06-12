"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  BarChart2,
  FileStack,
  Users,
  Landmark,
  Clock,
  Flag,
  Monitor,
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
  LogOut,
  Diamond,
} from "lucide-react";
import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";

// ── Sidebar nav ──────────────────────────────────────────────────────────────


// ── Stat cards ───────────────────────────────────────────────────────────────
const STAT_CARDS = [
  {
    label: "TOTAL ASSETS",
    value: "12,847",
    delta: "+143",
    deltaColor: "#4AE183",
    icon: <FileStack size={16} />,
    iconColor: "#A4C9FF",
    highlight: false,
  },
  {
    label: "HERITAGE ITEMS",
    value: "3,291",
    delta: "+28",
    deltaColor: "#FFB955",
    icon: <Landmark size={16} />,
    iconColor: "#FFB955",
    highlight: true,
  },
  {
    label: "ACTIVE DEALS",
    value: "9,102",
    delta: "LIVE",
    deltaColor: "#4AE183",
    icon: <Diamond size={16} />,
    iconColor: "#A4C9FF",
    highlight: false,
  },
  {
    label: "PENDING REVIEWS",
    value: "47",
    delta: "CRITICAL",
    deltaColor: "#FF6B6B",
    icon: <Clock size={16} />,
    iconColor: "#FFB955",
    highlight: false,
  },
];

// ── Submissions table ─────────────────────────────────────────────────────────
const SUBMISSIONS = [
  { title: "Benin Bronze Scans",       type: "Heritage",   wallet: "0x3f...921", cid: "QmX7...2b1", status: "VERIFIED", date: "Oct 24" },
  { title: "Nok Terracotta 3D",        type: "Artifact",   wallet: "0xa2...77c", cid: "QmP4...9k0", status: "PENDING",  date: "Oct 24" },
  { title: "Kente Weaving Patterns",   type: "Textile",    wallet: "0x11...e45", cid: "QmL2...fv8", status: "VERIFIED", date: "Oct 23" },
  { title: "Adire Master Collection",  type: "Heritage",   wallet: "0x98...aa2", cid: "QmK9...3d2", status: "VERIFIED", date: "Oct 23" },
  { title: "Yoruba Oral Archive",      type: "Audio",      wallet: "0xbc...121", cid: "QmW1...4f6", status: "FLAGGED",  date: "Oct 22" },
  { title: "Lagos Modernist Maps",     type: "Document",   wallet: "0x55...343", cid: "QmZ3...8y9", status: "VERIFIED", date: "Oct 22" },
  { title: "Oyo Empire Ledger",        type: "Manuscript", wallet: "0x7a...bb0", cid: "QmA8...7c1", status: "PENDING",  date: "Oct 21" },
  { title: "Igbo Ukwu Bronzes",        type: "Artifact",   wallet: "0x22...f1a", cid: "QmE0...5t3", status: "VERIFIED", date: "Oct 21" },
  { title: "Historical Genealogies",   type: "Registry",   wallet: "0xdd...44e", cid: "QmR5...1q2", status: "VERIFIED", date: "Oct 20" },
  { title: "Coastal Trade Route",      type: "Map",        wallet: "0x66...cc9", cid: "QmN1...9p0", status: "VERIFIED", date: "Oct 20" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  VERIFIED: { bg: "rgba(74,225,131,0.12)",  color: "#4AE183" },
  PENDING:  { bg: "rgba(255,185,85,0.12)",  color: "#FFB955" },
  FLAGGED:  { bg: "rgba(255,107,107,0.12)", color: "#FF6B6B" },
};

// ── Bar chart data (7 days) ───────────────────────────────────────────────────
const BAR_DATA = [
  { day: "MON", standard: 60, heritage: 30 },
  { day: "TUE", standard: 75, heritage: 45 },
  { day: "WED", standard: 90, heritage: 60 },
  { day: "THU", standard: 80, heritage: 50 },
  { day: "FRI", standard: 55, heritage: 35 },
  { day: "SAT", standard: 40, heritage: 25 },
  { day: "SUN", standard: 70, heritage: 40 },
];

// ── On-chain health ───────────────────────────────────────────────────────────
const HEALTH_ITEMS = [
  { icon: <FileCode2 size={18} />, label: "SMART CONTRACT", value: "ACTIVE | V3.2.1" },
  { icon: <History size={18} />,   label: "LAST TRANSACTION", value: "2.4m AGO | 0x3d...ef1" },
  { icon: <Cloud size={18} />,     label: "FILECOIN NETWORK", value: "ONLINE | CALIBRATION" },
  { icon: <Shield size={18} />,    label: "API PROXY STATUS", value: "SECURE | TLS 1.3" },
];

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

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
              {SUBMISSIONS.map((row, i) => (
                <div
                  key={i}
                  className="grid px-5 py-3 border-b items-center transition-colors hover:bg-white/[0.02]"
                  style={{
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 0.5fr",
                    borderColor: "rgba(255,255,255,0.04)",
                  }}
                >
                  <p className="text-xs font-medium" style={{ color: "#DFE2F3" }}>
                    {row.title}
                  </p>
                  <span
                    className="text-[10px] px-2 py-0.5 rounded w-fit"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      color: "#C0C7D6",
                    }}
                  >
                    {row.type}
                  </span>
                  <p className="text-[10px] font-mono" style={{ color: "#8A919F" }}>
                    {row.wallet}
                  </p>
                  <p
                    className="text-[10px] font-mono cursor-pointer transition-opacity hover:opacity-70"
                    style={{ color: "#1A92FF" }}
                  >
                    {row.cid}
                  </p>
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full w-fit flex items-center gap-1"
                    style={{
                      backgroundColor: STATUS_STYLES[row.status].bg,
                      color: STATUS_STYLES[row.status].color,
                    }}
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: STATUS_STYLES[row.status].color }}
                    />
                    {row.status}
                  </span>
                  <p className="text-[10px]" style={{ color: "#8A919F" }}>{row.date}</p>
                  <button className="transition-opacity hover:opacity-70" style={{ color: "#8A919F" }}>
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              ))}
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
