"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import { useAssetsCount } from "@/hooks/useVeraLayer";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { count, isLoading: countLoading } = useAssetsCount();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard/archives");
  }

  const STATS = [
    {
      value: countLoading ? "…" : count !== undefined ? count.toString() : "0",
      label: "ITEMS ARCHIVED",
    },
    { value: "450K+", label: "HERITAGE NAMES", highlight: true },
    { value: "1.2M", label: "VERIFIED EMAILS" },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: "#0A0E1A", color: "#8A919F" }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pt-12 pb-20">
        {/* Badge */}
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full border text-xs mb-8"
          style={{
            borderColor: "#4AE183",
            color: "#4AE183",
            backgroundColor: "rgba(74, 225, 131, 0.06)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#4AE183" }}
          />
          MAINNET v2.1 / 16M
        </div>

        {/* Heading */}
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-4 max-w-lg"
          style={{ color: "#DFE2F3" }}
        >
          The Verifiable Foundation
          <br />
          for Global Data
        </h1>

        {/* Subheading */}
        <p
          className="text-sm max-w-md leading-relaxed mb-10"
          style={{ color: "#8A919F" }}
        >
          Archive. Prove. Preserve. On Filecoin. Empowering institutions to
          secure human history with cryptographic permanence.
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full max-w-md rounded-md border px-3 py-2 gap-2 mb-14"
          style={{
            borderColor: "rgba(138, 145, 159, 0.25)",
            backgroundColor: "rgba(255,255,255,0.03)",
          }}
        >
          <Search size={14} style={{ color: "#8A919F" }} />
          <input
            type="text"
            placeholder="Search archives…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none placeholder:opacity-50"
            style={{ color: "#DFE2F3" }}
          />
          <button
            type="submit"
            className="text-xs px-3 py-1 rounded transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "rgba(164, 201, 255, 0.12)",
              color: "#A4C9FF",
            }}
          >
            ⌘F
          </button>
        </form>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-12">
          {STATS.map(({ value, label, highlight }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className="text-2xl font-bold"
                style={{
                  color: highlight ? "#FFB955" : "#DFE2F3",
                }}
              >
                {value}
              </span>
              <span
                className="text-[10px] tracking-widest font-medium"
                style={{ color: "#8A919F" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
