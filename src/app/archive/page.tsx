"use client";

import { CheckCircle2, ExternalLink, Shield } from "lucide-react";
import Navbar from "@/app/components/Navbar";

const ARCHIVE_CARDS = [
  {
    id: 1,
    title: "Afro Queen: Warrior Idu Black",
    category: "Portrait",
    year: "Mid Century ~1977 · 2nd Archive Series",
    type: "Photography",
    size: "1.2 GB",
    nodes: "5/5",
    replications: "4.2 FIL",
    verified: true,
    imageBg: "#0D1A12",
    imageAccent: "#1a3020",
  },
  {
    id: 2,
    title: "Opening Ceremony Package",
    category: "Events",
    year: "1977 Archives",
    type: "Video Digital Media",
    size: "8.6 GB",
    nodes: "5/5",
    replications: "12.4 FIL",
    verified: true,
    imageBg: "#1A1408",
    imageAccent: "#3a2a10",
  },
  {
    id: 3,
    title: "Afro FESTAC Anthologies",
    category: "Literature · 512 FIL Secured",
    year: "Mid Century Files",
    type: "Manuscript Run",
    size: "3.1 GB",
    nodes: "5/5",
    replications: "8.1 FIL",
    verified: true,
    imageBg: "#0A0F1A",
    imageAccent: "#1a2030",
  },
];

const STATS = [
  { label: "Total Deals", value: "1,204" },
  { label: "NFT Assets", value: "Spl · 0.02551" },
  { label: "ETH · 0.0041", value: "BTC · 0.0014" },
];

export default function ArchivePage() {
  return (
    <>
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "#0A0E1A", color: "#8A919F" }}
    >
      <Navbar />
      <div className="max-w-4xl mx-auto px-5 py-8">

        {/* Breadcrumb */}
        <p
          className="text-[9px] uppercase tracking-widest mb-4"
          style={{ color: "#8A919F" }}
        >
          FESTAC Foundation Archive (2) · 2.1
        </p>

        {/* Hero heading */}
        <div className="mb-4">
          <h1
            className="text-3xl font-bold leading-tight mb-3"
            style={{ color: "#DFE2F3" }}
          >
            FESTAC '77 Vault —<br />
            <span style={{ color: "#1A92FF" }}>Preserving African Heritage</span>
          </h1>
          <p
            className="text-xs leading-relaxed max-w-xl"
            style={{ color: "#8A919F" }}
          >
            A decentralized sanctuary for the digital archives of the Festival of Art Black and
            African Festival of Arts and Culture, employing Filecoin's immutable storage to ensure
            the legacy of 1977 remains verifiable eternally.
          </p>
        </div>

        {/* Meta bar */}
        <div
          className="flex items-center gap-4 py-3 px-4 rounded-lg mb-6 flex-wrap"
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={11} style={{ color: "#4AE183" }} />
            <span className="text-[10px]" style={{ color: "#4AE183" }}>
              ARCHIVE · 20
            </span>
          </div>
          <span className="text-[10px]" style={{ color: "#8A919F" }}>
            NFT ASSETS · 148
          </span>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-[10px]" style={{ color: "#8A919F" }}>
              ETH · 0.0251 · FILM
            </span>
            <span className="text-[10px]" style={{ color: "#8A919F" }}>
              NFT · 0.035 · 0.01
            </span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {ARCHIVE_CARDS.map((card) => (
            <div
              key={card.id}
              className="rounded-xl overflow-hidden border flex flex-col"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              {/* Image placeholder */}
              <div
                className="w-full relative overflow-hidden"
                style={{
                  height: "120px",
                  backgroundColor: card.imageBg,
                }}
              >
                {/* Atmospheric gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at center, ${card.imageAccent} 0%, ${card.imageBg} 70%)`,
                  }}
                />
                {/* Scanline texture */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                  }}
                />
                {card.verified && (
                  <div
                    className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: "rgba(74,225,131,0.15)",
                      border: "1px solid rgba(74,225,131,0.3)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "#4AE183" }}
                    />
                    <span className="text-[8px]" style={{ color: "#4AE183" }}>
                      Verified
                    </span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="p-3 flex flex-col gap-2 flex-1">
                <div>
                  <p
                    className="text-xs font-semibold leading-tight mb-0.5"
                    style={{ color: "#DFE2F3" }}
                  >
                    {card.title}
                  </p>
                  <p className="text-[9px]" style={{ color: "#8A919F" }}>
                    {card.year}
                  </p>
                </div>

                <div
                  className="flex items-center justify-between pt-2 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div>
                    <p className="text-[9px]" style={{ color: "#8A919F" }}>
                      {card.type}
                    </p>
                    <p className="text-[10px] font-medium" style={{ color: "#C0C7D6" }}>
                      {card.size}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px]" style={{ color: "#8A919F" }}>
                      {card.nodes}
                    </p>
                    <p
                      className="text-[10px] font-medium"
                      style={{ color: "#FFB955" }}
                    >
                      {card.replications}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom section — 2 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Left — CTA banner */}
          <div
            className="rounded-xl p-5 border flex flex-col justify-between"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              borderColor: "rgba(255,255,255,0.07)",
            }}
          >
            <div>
              <p
                className="text-[9px] uppercase tracking-widest mb-2"
                style={{ color: "#8A919F" }}
              >
                · · · ORAL HISTORY ARCHIVE ·
              </p>
              <h3
                className="text-base font-bold leading-snug mb-3"
                style={{ color: "#DFE2F3" }}
              >
                The Complete Oral History
                Records of the Black Diaspora
              </h3>
              <p className="text-[11px] leading-relaxed" style={{ color: "#8A919F" }}>
                Over 2,000 oral accounts from 6,000 contributors from 55 1977
                Festive nations participating alongside their Filecoin upload with
                cryptographic proof of authenticity and origin.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <button
                className="text-xs px-4 py-2 rounded-md font-medium transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}
              >
                Access Archive
              </button>
              <button
                className="text-xs px-4 py-2 rounded-md font-medium transition-opacity hover:opacity-80 flex items-center gap-1.5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#C0C7D6",
                }}
              >
                <Shield size={11} />
                Verify Filecoin Them
              </button>
            </div>
          </div>

          {/* Right — Featured item + stats */}
          <div className="flex flex-col gap-3">
            {/* Featured archive item */}
            <div
              className="rounded-xl overflow-hidden border flex-1"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              {/* Image */}
              <div
                className="w-full relative overflow-hidden"
                style={{ height: "100px", backgroundColor: "#0A1208" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 30% 60%, #1a3018 0%, #0A1208 70%)",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.02) 4px, rgba(255,255,255,0.02) 5px)",
                  }}
                />
                {/* Verified badge */}
                <div
                  className="absolute bottom-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(26,146,255,0.2)",
                    border: "1px solid rgba(26,146,255,0.3)",
                  }}
                >
                  <span className="text-[8px]" style={{ color: "#A4C9FF" }}>
                    COLLECTION VERIFIED
                  </span>
                </div>
              </div>

              {/* Item info */}
              <div className="p-3">
                <p
                  className="text-[9px] uppercase tracking-wider mb-0.5"
                  style={{ color: "#8A919F" }}
                >
                  COLLECTION ·
                </p>
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "#DFE2F3" }}
                >
                  Kente Master Weaver Collection
                </p>

                {/* Stats inline */}
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[9px]" style={{ color: "#8A919F" }}>
                      10.5 Serving/pbn
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p
                      className="text-[10px] font-semibold"
                      style={{ color: "#FFB955" }}
                    >
                      ETH · 0.0241
                    </p>
                    <p className="text-[9px]" style={{ color: "#8A919F" }}>
                      FML · 0.474
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Node stats */}
            <div
              className="rounded-xl p-3 border"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px]" style={{ color: "#8A919F" }}>
                  312 Nodes
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px]" style={{ color: "#C0C7D6" }}>
                    NFT · 0.0055
                  </span>
                  <span className="text-[10px]" style={{ color: "#FFB955" }}>
                    FML · 6.71
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
