"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Upload,
  Archive,
  Settings,
  HelpCircle,
  Search,
  Star,
  GitBranch,
  Shield,
  Award,
  ChevronRight,
  Bookmark,
} from "lucide-react";
import Aside from "@/app/components/Aside";

const SIDEBAR_NAV = [
  { icon: <LayoutDashboard size={13} />, label: "Dashboard", href: "#" },
  { icon: <Upload size={13} />, label: "My Uploads", href: "#" },
  { icon: <Archive size={13} />, label: "Heritage Assets", href: "#", active: true },
  { icon: <Settings size={13} />, label: "Settings", href: "#" },
];

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
  {
    id: 1,
    icon: <GitBranch size={18} />,
    iconColor: "#A4C9FF",
    iconBg: "rgba(164,201,255,0.1)",
    title: "Provenance Graph",
    body: "Track authenticity references back to its physical origin with cryptographic last-mile lineage & proof of registration.",
  },
  {
    id: 2,
    icon: <Award size={18} />,
    iconColor: "#4AE183",
    iconBg: "rgba(74,225,131,0.1)",
    title: "Heritage Attribution",
    body: "Intelligent attribution enforcing community equitable credit in every archival artefact, strengthening communities.",
  },
  {
    id: 3,
    icon: <Shield size={18} />,
    iconColor: "#FFB955",
    iconBg: "rgba(255,185,85,0.1)",
    title: "Curated Authority",
    body: "Vetted by international council of librarians and archivists to ensure the highest fidelity of metadata.",
  },
];

export default function HeritageAssetsPage() {
  const [activeTab, setActiveTab] = useState("All Assets");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "#0A0E1A", color: "#8A919F" }}
    >
      {/* Sidebar */}
      <Aside />

      {/* Main */}
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
          <button
            className="text-xs px-4 py-1.5 rounded-md font-medium"
            style={{ backgroundColor: "#A4C9FF", color: "#0A0E1A" }}
          >
            Connect Wallet
          </button>
        </div>

        <div className="p-6">
          {/* Breadcrumb */}
          <p className="text-[9px] uppercase tracking-widest mb-3" style={{ color: "#8A919F" }}>
            PROFESSIONAL ARCHIVE
          </p>

          {/* Hero heading + search row */}
          <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold leading-tight" style={{ color: "#DFE2F3" }}>
                FESTAC '77:
              </h1>
              <h1 className="text-2xl font-bold leading-tight" style={{ color: "#1A92FF" }}>
                The Black World Archival
              </h1>
              <p className="text-xs mt-2 max-w-lg leading-relaxed" style={{ color: "#8A919F" }}>
                A decentralized repository of the 2nd World Black and African Festival of Arts and
                Culture. Preserving 15,000+ digital assets from the Black Kingdom to the Lagos
                shores on the Filecoin Web3.
              </p>
            </div>

            {/* Search + buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Search size={12} style={{ color: "#8A919F" }} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-xs w-28 placeholder:opacity-40"
                  style={{ color: "#DFE2F3" }}
                />
              </div>
              <button
                className="text-[10px] px-3 py-1.5 rounded-lg"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#C0C7D6",
                }}
              >
                Filter
              </button>
              <button
                className="text-[10px] px-3 py-1.5 rounded-lg font-medium"
                style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}
              >
                Add CID
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div
            className="flex items-center gap-1 mb-5 border-b pb-0"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="text-[11px] px-3 pb-2.5 transition-colors whitespace-nowrap"
                style={{
                  color: activeTab === tab ? "#DFE2F3" : "#8A919F",
                  borderBottom:
                    activeTab === tab
                      ? "2px solid #1A92FF"
                      : "2px solid transparent",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Two-column layout: asset grid + featured */}
          <div className="flex gap-5">
            {/* Left: asset cards */}
            <div className="flex-1 flex flex-col gap-3">
              {ASSET_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="flex items-stretch gap-3 rounded-xl border overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    className="w-28 flex-shrink-0 relative"
                    style={{ backgroundColor: card.imageBg, minHeight: "80px" }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse at 40% 50%, ${card.imageAccent} 0%, ${card.imageBg} 80%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 4px)",
                      }}
                    />
                    {/* Label badge */}
                    <span
                      className="absolute top-1.5 left-1.5 text-[7px] px-1.5 py-0.5 rounded font-medium"
                      style={{
                        backgroundColor: "#FFB955",
                        color: "#0A0E1A",
                      }}
                    >
                      {card.label}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-center gap-1 py-3 pr-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[9px] mb-0.5" style={{ color: "#8A919F" }}>
                          {card.sublabel}
                        </p>
                        <p className="text-xs font-semibold leading-snug" style={{ color: "#DFE2F3" }}>
                          {card.title}
                        </p>
                      </div>
                      {card.starred && (
                        <Star size={11} style={{ color: "#FFB955" }} />
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[9px]" style={{ color: "#8A919F" }}>
                        {card.type}
                      </span>
                      <span
                        className="text-[9px] px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: "rgba(26,146,255,0.1)",
                          color: "#A4C9FF",
                        }}
                      >
                        FIL ↗
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: featured card */}
            <div
              className="w-56 flex-shrink-0 rounded-xl border overflow-hidden flex flex-col"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              {/* Large featured image */}
              <div
                className="relative w-full"
                style={{ height: "180px", backgroundColor: "#080808" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 40%, #2a1a08 0%, #080808 70%)",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.01) 8px, rgba(255,255,255,0.01) 9px)",
                  }}
                />
                <div
                  className="absolute top-2 left-2 text-[8px] px-1.5 py-0.5 rounded font-medium"
                  style={{ backgroundColor: "#1A92FF", color: "#fff" }}
                >
                  FEATURED
                </div>
              </div>

              {/* Featured info */}
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div>
                  <p className="text-[9px] uppercase tracking-wider mb-1" style={{ color: "#8A919F" }}>
                    HERITAGE · SCULPTURE
                  </p>
                  <p className="text-sm font-semibold leading-snug" style={{ color: "#DFE2F3" }}>
                    The Queen Idia Mask (Sigidatus Collection)
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {[
                    { label: "ARCHIVE", value: "Photography, Nigeria" },
                    { label: "FORMAT", value: "4 · Physical Resolve" },
                    { label: "CHAIN", value: "Filecoin + IPFS" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-2">
                      <p className="text-[9px]" style={{ color: "#8A919F" }}>
                        {label}
                      </p>
                      <p className="text-[9px] text-right" style={{ color: "#C0C7D6" }}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full py-2 rounded-md text-xs font-medium transition-opacity hover:opacity-80 mt-auto"
                  style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}
                >
                  Upload to Filecoin ↗
                </button>
              </div>
            </div>
          </div>

          {/* Bottom feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {FEATURE_CARDS.map(({ id, icon, iconColor, iconBg, title, body }) => (
              <div
                key={id}
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: iconBg }}
                >
                  <span style={{ color: iconColor }}>{icon}</span>
                </div>
                <p className="text-sm font-semibold mb-1.5" style={{ color: "#DFE2F3" }}>
                  {title}
                </p>
                <p className="text-[11px] leading-relaxed" style={{ color: "#8A919F" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
