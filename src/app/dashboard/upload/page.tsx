"use client";

import { useState, useRef } from "react";
import {
  Code2,
  FileImage,
  FileText,
  FolderOpen,
  Globe,
  HardDrive,
  Plus,
  Settings,
  Upload,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import Aside from "@/app/components/Aside";
import Navbar from "@/app/components/Navbar";




const FILE_TYPES = [
  { icon: <Code2 size={18} />, label: "Code" },
  { icon: <FileImage size={18} />, label: "Design" },
  { icon: <FileText size={18} />, label: "Document" },
];

const NODE_HEALTH = [
  { label: "Active Deals", value: "1,204", highlight: false },
  { label: "Node Uptime", value: "99.99%", highlight: true },
  { label: "Latency", value: "14ms", highlight: false },
];

export default function UploadAssetsPage() {
  const [activeTab, setActiveTab] = useState<"talent" | "heritage">("talent");
  const [activeFileType, setActiveFileType] = useState("Document");
  const [dragging, setDragging] = useState(false);
  const [archiveTitle, setArchiveTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: "#0A0E1A", color: "#8A919F" }}
    >
      {/* Top Nav */}
        <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Aside />
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 flex gap-4">
          {/* Left column */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Tabs */}
            <div
              className="flex items-center gap-0 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {(["talent", "heritage"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="text-xs px-4 pb-2.5 capitalize transition-colors"
                  style={{
                    color: activeTab === tab ? "#DFE2F3" : "#8A919F",
                    borderBottom:
                      activeTab === tab
                        ? "2px solid #1A92FF"
                        : "2px solid transparent",
                  }}
                >
                  {tab === "talent" ? "Talent Archive" : "Heritage Archive"}
                </button>
              ))}
            </div>

            {/* Upload header */}
            <div>
              <h2
                className="text-base font-semibold mb-0.5"
                style={{ color: "#DFE2F3" }}
              >
                Upload Your Work
              </h2>
              <p className="text-xs" style={{ color: "#8A919F" }}>
                Immutable proof of sovereign talent. Secured via Filecoin.
              </p>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => { e.preventDefault(); setDragging(false); }}
              onClick={() => fileInputRef.current?.click()}
              className="rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
              style={{
                border: `1.5px dashed ${dragging ? "#1A92FF" : "rgba(255,255,255,0.1)"}`,
                backgroundColor: dragging
                  ? "rgba(26,146,255,0.05)"
                  : "rgba(255,255,255,0.02)",
                height: "160px",
              }}
            >
              <input ref={fileInputRef} type="file" className="hidden" multiple />
              <Upload size={22} style={{ color: "#1A92FF" }} />
              <p className="text-xs" style={{ color: "#DFE2F3" }}>
                Drag & drop files to upload
              </p>
              <p className="text-[10px]" style={{ color: "#8A919F" }}>
                Maximum file size: 50GB
              </p>
            </div>

            {/* File type selector */}
            <div className="flex items-center gap-3">
              {FILE_TYPES.map(({ icon, label }) => (
                <button
                  key={label}
                  onClick={() => setActiveFileType(label)}
                  className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-lg text-xs transition-colors"
                  style={{
                    backgroundColor:
                      activeFileType === label
                        ? "rgba(26,146,255,0.12)"
                        : "rgba(255,255,255,0.03)",
                    border: `1px solid ${
                      activeFileType === label
                        ? "rgba(26,146,255,0.3)"
                        : "rgba(255,255,255,0.06)"
                    }`,
                    color:
                      activeFileType === label ? "#A4C9FF" : "#8A919F",
                  }}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Form fields */}
            <div className="flex flex-col gap-3">
              <div>
                <label
                  className="text-[10px] uppercase tracking-wider mb-1.5 block"
                  style={{ color: "#8A919F" }}
                >
                  Archive Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Genesis Smart Contract Suite"
                  value={archiveTitle}
                  onChange={(e) => setArchiveTitle(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 rounded-lg outline-none placeholder:opacity-40"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#DFE2F3",
                  }}
                />
              </div>
              <div>
                <label
                  className="text-[10px] uppercase tracking-wider mb-1.5 block"
                  style={{ color: "#8A919F" }}
                >
                  Description
                </label>
                <textarea
                  placeholder="Describe the significance of this work..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full text-xs px-3 py-2.5 rounded-lg outline-none placeholder:opacity-40 resize-none"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#DFE2F3",
                  }}
                />
              </div>
            </div>

            {/* Mini footer */}
            <div
              className="mt-auto pt-4 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="text-[10px] font-semibold tracking-widest uppercase mb-0.5"
                    style={{ color: "#DFE2F3" }}
                  >
                    VeraLayer Protocol
                  </p>
                  <p className="text-[10px]" style={{ color: "#8A919F" }}>
                    © 2024 Sovereign
                  </p>
                  <p className="text-[10px]" style={{ color: "#8A919F" }}>
                    Technically Secured.
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  {["Documentation", "Smart Contracts", "Privacy", "Nodes"].map(
                    (l) => (
                      <a
                        key={l}
                        href="#"
                        className="text-[10px] transition-opacity hover:opacity-70"
                        style={{ color: "#8A919F" }}
                      >
                        {l}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="w-56 flex-shrink-0 flex flex-col gap-4">
            {/* Sovereignty Status */}
            <div
              className="rounded-xl p-4 border"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: "rgba(74,225,131,0.3)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-4">
                <CheckCircle2 size={13} style={{ color: "#4AE183" }} />
                <p
                  className="text-[10px] font-semibold tracking-widest uppercase"
                  style={{ color: "#4AE183" }}
                >
                  Sovereignty Status
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <p
                    className="text-[9px] uppercase tracking-widest mb-1"
                    style={{ color: "#8A919F" }}
                  >
                    Content Identifier (CID)
                  </p>
                  <p
                    className="text-[10px] font-mono break-all"
                    style={{ color: "#C0C7D6" }}
                  >
                    bafybeiqdyrt2Sfq7ud
                  </p>
                </div>

                <div>
                  <p
                    className="text-[9px] uppercase tracking-widest mb-1"
                    style={{ color: "#8A919F" }}
                  >
                    Deal ID
                  </p>
                  <p
                    className="text-[10px] font-mono"
                    style={{ color: "#C0C7D6" }}
                  >
                    #96201 · FIL · VERA
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p
                    className="text-[10px]"
                    style={{ color: "#C0C7D6" }}
                  >
                    Verified On-Chain
                  </p>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#4AE183" }}
                  />
                </div>
              </div>

              {/* Stamp */}
              <div
                className="mt-4 w-full flex items-center justify-center py-2 rounded border"
                style={{
                  borderColor: "rgba(74,225,131,0.25)",
                  backgroundColor: "rgba(74,225,131,0.05)",
                }}
              >
                <p
                  className="text-[9px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: "#4AE183", opacity: 0.6 }}
                >
                  VeraLayer Verified
                </p>
              </div>
            </div>

            {/* Node Health */}
            <div
              className="rounded-xl p-4 border"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="text-[9px] uppercase tracking-widest mb-3 font-semibold"
                style={{ color: "#8A919F" }}
              >
                Node Health
              </p>
              <div className="flex flex-col gap-2.5">
                {NODE_HEALTH.map(({ label, value, highlight }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <p className="text-[10px]" style={{ color: "#8A919F" }}>
                      {label}
                    </p>
                    <p
                      className="text-[10px] font-semibold"
                      style={{
                        color: highlight ? "#4AE183" : "#DFE2F3",
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
