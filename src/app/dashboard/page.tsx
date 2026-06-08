"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, Upload } from "lucide-react";

const SIDEBAR_LINKS = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Uploads", href: "#", active: false },
  { label: "Archive", href: "#", active: false },
];

const ARCHIVE_TIERS = [
  {
    id: "general",
    title: "General Data",
    subtitle: "Cold storage tier",
    active: false,
  },
  {
    id: "fesbac",
    title: "FES&AC Heritage",
    subtitle: "Precision Grade",
    active: true,
  },
  {
    id: "blockchain",
    title: "3⋈∆∆",
    subtitle: "Educational Ledger",
    active: false,
  },
];

const TASK_META = [
  { label: "Content ID", value: "bafybeidr5..." },
  { label: "Storage Deal", value: "#981,382: active" },
  { label: "Precision", value: "Project (USA)" },
  { label: "Replication", value: "5/5 Segments" },
];

const PROGRESS_STEPS = [
  { label: "Encrypting ...", done: true },
  { label: "Generating CID ...", done: true },
  { label: "Storing on Filecoin ...", done: false },
];

export default function DashboardPage() {
  const [activeTier, setActiveTier] = useState("fesbac");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Animate progress bar widths
  const [progress, setProgress] = useState([100, 72, 8]);
  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        const next = [...p];
        if (next[2] < 95) next[2] = Math.min(95, next[2] + 0.4);
        return next;
      });
    }, 120);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "#0A0E1A", color: "#8A919F" }}
    >
      {/* Sidebar */}
      <aside
        className="w-20 md:w-[88px] flex-shrink-0 flex flex-col justify-between py-5 px-3 border-r"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex flex-col gap-1">
          {SIDEBAR_LINKS.map(({ label, href, active }) => (
            <a
              key={label}
              href={href}
              className="text-[11px] px-3 py-2 rounded-md transition-colors"
              style={{
                backgroundColor: active
                  ? "rgba(26,146,255,0.15)"
                  : "transparent",
                color: active ? "#A4C9FF" : "#8A919F",
              }}
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="#"
          className="text-[11px] px-3 py-2 rounded-md transition-colors hover:opacity-70"
          style={{ color: "#8A919F" }}
        >
          Settings
        </a>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 flex flex-col gap-5 max-w-2xl">

        {/* Archive Tier Selector */}
        <div>
          <p
            className="text-[9px] uppercase tracking-widest mb-3 font-medium"
            style={{ color: "#8A919F" }}
          >
            Select Archive Tier
          </p>
          <div className="grid grid-cols-3 gap-3">
            {ARCHIVE_TIERS.map(({ id, title, subtitle, active: defaultActive }) => {
              const isActive = activeTier === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTier(id)}
                  className="text-left p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: isActive
                      ? "transparent"
                      : "rgba(255,255,255,0.02)",
                    border: `1.5px solid ${
                      isActive
                        ? "#1A92FF"
                        : "rgba(255,255,255,0.07)"
                    }`,
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
            onDrop={(e) => { e.preventDefault(); setDragging(false); }}
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-3 py-10 cursor-pointer transition-colors"
            style={{
              backgroundColor: dragging ? "rgba(26,146,255,0.04)" : "transparent",
            }}
          >
            <input ref={fileInputRef} type="file" className="hidden" multiple />

            {/* Cloud icon */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(26,146,255,0.15)" }}
            >
              <Upload size={22} style={{ color: "#1A92FF" }} />
            </div>

            <div className="text-center">
              <h3
                className="text-base font-semibold mb-1"
                style={{ color: "#1A92FF" }}
              >
                Upload to Filecoin
              </h3>
              <p
                className="text-xs max-w-xs leading-relaxed"
                style={{ color: "#8A919F" }}
              >
                Drag and drop your encrypted files here or click to browse.
                Files are processed through VeraLayer's cryptographic pipeline.
              </p>
            </div>

            {/* Badges */}
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
          </div>
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
                Storing: archive_festac_77_v4.car
              </p>
            </div>
            <div className="text-right">
              <p
                className="text-[9px] uppercase tracking-widest mb-0.5"
                style={{ color: "#8A919F" }}
              >
                Network Status
              </p>
              <p className="text-[10px]" style={{ color: "#4AE183" }}>
                Synchronized
              </p>
            </div>
          </div>

          {/* Progress steps */}
          <div className="flex flex-col gap-2 mb-4">
            {PROGRESS_STEPS.map(({ label, done }, i) => (
              <div key={label} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p
                    className="text-[10px]"
                    style={{ color: done ? "#4AE183" : "#8A919F" }}
                  >
                    {label}
                  </p>
                </div>
                <div
                  className="w-full h-1 rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progress[i]}%`,
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
                <p
                  className="text-[9px] uppercase tracking-wider mb-0.5"
                  style={{ color: "#8A919F" }}
                >
                  {label}
                </p>
                <p className="text-[10px] font-mono" style={{ color: "#C0C7D6" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
