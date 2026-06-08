"use client";

import { Shield, Archive, Database } from "lucide-react";

export default function FeaturesSection() {
  return (
    <div
      className="w-full px-6 py-12"
      style={{ backgroundColor: "#0A0E1A" }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Card 1 — High-Integrity Storage Nodes (large, spans 2 rows on left) */}
        <div
          className="md:col-span-2 md:row-span-2 rounded-xl overflow-hidden relative flex flex-col justify-between p-6 min-h-[280px]"
          style={{ backgroundColor: "#0D1424", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Top label + heading */}
          <div>
            <p
              className="text-[10px] tracking-widest uppercase mb-3"
              style={{ color: "#C0C7D6" }}
            >
              Infrastructure
            </p>
            <h2
              className="text-xl font-semibold leading-snug max-w-xs"
              style={{ color: "#DFE2F3" }}
            >
              High-Integrity Storage Nodes
            </h2>
            <p
              className="text-xs mt-2 max-w-xs leading-relaxed"
              style={{ color: "#C0C7D6" }}
            >
              VeraLayer interfaces directly with the Filecoin network to ensure
              your data is distributed across multiple verified miners globally.
            </p>
          </div>

          {/* Dark visual placeholder — server rack atmosphere */}
          <div
            className="absolute inset-0 top-[120px] bottom-0 flex items-end justify-center overflow-hidden rounded-b-xl"
            style={{ background: "linear-gradient(180deg, transparent 0%, #060910 100%)" }}
          >
            {/* Faint grid lines suggesting server infrastructure */}
            <svg
              className="absolute inset-0 w-full h-full opacity-10"
              viewBox="0 0 600 200"
              preserveAspectRatio="none"
            >
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="0" y1={i * 28} x2="600" y2={i * 28}
                  stroke="#1A92FF" strokeWidth="0.5"
                />
              ))}
              {[...Array(12)].map((_, i) => (
                <line
                  key={i}
                  x1={i * 55} y1="0" x2={i * 55} y2="200"
                  stroke="#1A92FF" strokeWidth="0.5"
                />
              ))}
            </svg>
            {/* Simulated server rack silhouette */}
            <div className="relative w-48 h-32 mb-0 opacity-30">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-full mb-1 rounded-sm flex items-center px-2 gap-2"
                  style={{
                    height: "18px",
                    backgroundColor: "#1A92FF",
                    opacity: 0.2 + i * 0.05,
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4AE183" }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 2 — Heritage Preservation (top right) */}
        <div
          className="rounded-xl p-5 flex flex-col justify-between min-h-[130px]"
          style={{ backgroundColor: "#0D1424", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center mb-3"
              style={{ backgroundColor: "rgba(26, 146, 255, 0.12)" }}
            >
              <Archive size={16} style={{ color: "#A4C9FF" }} />
            </div>
            <h3
              className="text-sm font-semibold mb-2"
              style={{ color: "#DFE2F3" }}
            >
              Heritage Preservation
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "#C0C7D6" }}
            >
              Specialized archival workflows for museums, libraries, and cultural
              foundations with 100-year storage guarantees.
            </p>
          </div>
          <a
            href="#"
            className="text-xs mt-3 inline-flex items-center gap-1 transition-opacity hover:opacity-70"
            style={{ color: "#FFB955" }}
          >
            Explore Assets <span>→</span>
          </a>
        </div>


        <div className="md:col-span-3 rounded-xl p-5 flex flex-row gap-5 justify-between">
        {/* Card 3 — Proof of Storage (bottom left) */}
        <div
          className="md:col-span-1 rounded-xl p-5 flex flex-col justify-between min-h-[130px]"
          style={{ backgroundColor: "#0D1424", border: "1px solid rgba(255,255,255,0.06)" }}
        >
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center mb-3"
              style={{ backgroundColor: "rgba(26, 146, 255, 0.12)" }}
            >
              <Shield size={16} style={{ color: "#A4C9FF" }} />
            </div>
            <h3
              className="text-sm font-semibold mb-2"
              style={{ color: "#DFE2F3" }}
            >
              Proof of Storage
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "#C0C7D6" }}
            >
              Generate cryptographic proofs of existence and integrity on-demand
              for any archived dataset.
            </p>
        </div>

        {/* Card 4 — Stats inline (bottom center) */}
        <div
          className="md:col-span-1 rounded-xl p-5 flex flex-row justify-center items-center gap-3 min-h-[130px]"
          style={{ backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col gap-1">
            <span
              className="text-2xl font-bold"
              style={{ color: "#A4C9FF" }}
            >
              99.99%
            </span>
            <span
              className="text-[10px] tracking-wider uppercase"
              style={{ color: "#C0C7D6" }}
            >
              Availability Rate
            </span>
          </div>
          <div className="border-1 border-[#404753] h-12" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
          <div className="flex flex-col gap-1">
            <span
              className="text-2xl font-bold"
              style={{ color: "#A4C9FF" }}
            >
              256-bit
            </span>
            <span
              className="text-[10px] tracking-wider uppercase"
              style={{ color: "#C0C7D6" }}
            >
              Encryption Standard
            </span>
          </div>
        </div>

        {/* Card 5 — CTA (bottom right) */}
        <div
          className="md:col-span-1 rounded-xl p-5 flex flex-col justify-between min-h-[130px]"
          style={{ backgroundColor: "#1A92FF" }}
        >
          <div>
            <h3
              className="text-sm font-semibold mb-2"
              style={{ color: "#DFE2F3" }}
            >
              Ready to archive?
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: "#002A52" }}
            >
              Start preserving your critical data with VeraLayer today.
            </p>
          </div>
          <button
            className="w-full mt-4 py-2 rounded-md text-xs font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#002A52", color: "#A4C9FF" }}
          >
            Begin New Upload
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
