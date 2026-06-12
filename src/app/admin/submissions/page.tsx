"use client";

import { useState } from "react";
import {
  Bell,
  Rss,
  Search,
  Download,
  Plus,
  MoreHorizontal,
  ChevronDown,
  X,
  CheckSquare,
  Square,
  BarChart2,
  HardDrive,
  Shield,
} from "lucide-react";
import AdminSidebar from "@/app/components/AdminSidebar";

const CONTENT_TYPES = ["All Types", "Heritage", "Artifact", "Audio", "Document", "Manuscript", "Textile", "Map", "Registry"];
const STATUSES      = ["All Statuses", "Verified", "Pending", "Flagged", "Under Review"];
const DATE_RANGES   = ["Last 30 Days", "Last 7 Days", "Last 90 Days", "This Year", "Custom"];
const CATEGORIES    = ["All Categories", "Infrastructure", "Cultural Asset", "Authentication", "System Migration"];

const SUBMISSIONS = [
  { id: "sub-001", thumbnail: "#1a3020", title: "Protocol_Delta_V4_Snapshot",       metadata: "b7f203-2024",      type: "INFRASTRUCTURE", typeColor: "#A4C9FF", typeBg: "rgba(164,201,255,0.12)", category: "CORE.LOGIC",        wallet: "KY5...3baj", cid: "0xf1...172b", deal: "1241", status: "VERIFIED", date: "Oct 24" },
  { id: "sub-002", thumbnail: "#1A2540", title: "Yoruba_Adire_Pattern_Scan_009",    metadata: "e9a011-2024",      type: "HERITAGE",       typeColor: "#FFB955", typeBg: "rgba(255,185,85,0.12)",  category: "CULTURAL_ASSET",   wallet: "P22k...71a", cid: "0x4a...e813", deal: "1238", status: "PENDING",  date: "Oct 24" },
  { id: "sub-003", thumbnail: "#2a0a0a", title: "Unauthorized_Access_Log_Est",      metadata: "b7f207-2023-5290", type: "IDENTITY_PROOF", typeColor: "#FF6B6B", typeBg: "rgba(255,107,107,0.12)", category: "AUTHENTICATION",   wallet: "43xb...4242",cid: "0xc9...d4fa", deal: "1234", status: "FLAGGED",  date: "Oct 23" },
  { id: "sub-004", thumbnail: "#0D1A24", title: "Migration_Task_Queue_List",        metadata: "a2c019-2024",      type: "INFRASTRUCTURE", typeColor: "#A4C9FF", typeBg: "rgba(164,201,255,0.12)", category: "SYSTEM_MIGRATION", wallet: "XC2...wA30", cid: "0x8b...1c90", deal: "1230", status: "VERIFIED", date: "Oct 22" },
  { id: "sub-005", thumbnail: "#1a2a10", title: "Benin_Bronze_3D_Scan_Master",      metadata: "c3d401-2024",      type: "HERITAGE",       typeColor: "#FFB955", typeBg: "rgba(255,185,85,0.12)",  category: "CULTURAL_ASSET",   wallet: "9Rk2...5xqP",cid: "0x2d...8fa4", deal: "1228", status: "VERIFIED", date: "Oct 22" },
  { id: "sub-006", thumbnail: "#100A1A", title: "Kente_Weave_Pattern_Catalog",      metadata: "f8b112-2024",      type: "HERITAGE",       typeColor: "#FFB955", typeBg: "rgba(255,185,85,0.12)",  category: "CULTURAL_ASSET",   wallet: "7Yk3...3mnR",cid: "0x5e...c321", deal: "1225", status: "PENDING",  date: "Oct 21" },
  { id: "sub-007", thumbnail: "#0A0A1a", title: "Oyo_Empire_Oral_Registry_v2",      metadata: "d9e007-2024",      type: "INFRASTRUCTURE", typeColor: "#A4C9FF", typeBg: "rgba(164,201,255,0.12)", category: "CORE.LOGIC",       wallet: "Q9xL...b4d1",cid: "0x7f...d901", deal: "1221", status: "VERIFIED", date: "Oct 21" },
  { id: "sub-008", thumbnail: "#1A1000", title: "Nok_Terracotta_Photogrammetry",    metadata: "a1f309-2024",      type: "HERITAGE",       typeColor: "#FFB955", typeBg: "rgba(255,185,85,0.12)",  category: "CULTURAL_ASSET",   wallet: "V3wP...9kT2",cid: "0xb2...e450", deal: "1219", status: "FLAGGED",  date: "Oct 20" },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  VERIFIED: { bg: "rgba(74,225,131,0.12)",  color: "#4AE183" },
  PENDING:  { bg: "rgba(255,185,85,0.12)",  color: "#FFB955" },
  FLAGGED:  { bg: "rgba(255,107,107,0.12)", color: "#FF6B6B" },
};

const BOTTOM_STATS = [
  { icon: <HardDrive size={18} />, iconColor: "#1A92FF", label: "STORAGE UTILIZATION", value: "2.4 PB", sub: "+12k" },
  { icon: <BarChart2 size={18} />, iconColor: "#FFB955", label: "NETWORK NODES",        value: "1,242", sub: "ACTIVE" },
  { icon: <Shield size={18} />,    iconColor: "#4AE183", label: "SECURITY INTEGRITY",   value: "99.99%", sub: "SECURE" },
];

function FilterDropdown({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-md"
        style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#C0C7D6" }}
      >
        {value}
        <ChevronDown size={11} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 rounded-lg overflow-hidden min-w-[160px] shadow-xl" style={{ backgroundColor: "#0D1424", border: "1px solid rgba(255,255,255,0.1)" }}>
          {options.map((opt) => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }} className="w-full text-left px-3 py-2 text-xs transition-colors hover:bg-white/5" style={{ color: value === opt ? "#A4C9FF" : "#8A919F" }}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AllSubmissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contentType, setContentType] = useState("All Types");
  const [status, setStatus]           = useState("All Statuses");
  const [dateRange, setDateRange]     = useState("Last 30 Days");
  const [category, setCategory]       = useState("All Categories");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage]   = useState(1);
  const [displayCount, setDisplayCount] = useState(25);

  const totalItems = 487;
  const allSelected = selectedRows.length === SUBMISSIONS.length;
  const toggleAll   = () => setSelectedRows(allSelected ? [] : SUBMISSIONS.map((s) => s.id));
  const toggleRow   = (id: string) => setSelectedRows((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);
  const clearFilters = () => { setContentType("All Types"); setStatus("All Statuses"); setDateRange("Last 30 Days"); setCategory("All Categories"); };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0A0E1A", color: "#8A919F" }}>
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3 border-b flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg w-72" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Search size={13} style={{ color: "#8A919F" }} />
            <input type="text" placeholder="Search CID, Wallet, or Title..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none text-xs flex-1 placeholder:opacity-50" style={{ color: "#DFE2F3" }} />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" style={{ backgroundColor: "rgba(74,225,131,0.1)", border: "1px solid rgba(74,225,131,0.25)", color: "#4AE183" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4AE183" }} />
              Filecoin Calibration — Live
            </div>
            <button className="transition-opacity hover:opacity-70" style={{ color: "#8A919F" }}><Bell size={16} /></button>
            <button className="transition-opacity hover:opacity-70" style={{ color: "#8A919F" }}><Rss size={16} /></button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "#1A2540", color: "#A4C9FF" }}>A</div>
              <div>
                <p className="text-[10px] font-medium leading-none" style={{ color: "#DFE2F3" }}>VeraLayer Admin</p>
                <p className="text-[9px]" style={{ color: "#8A919F" }}>SUPER_ADMIN</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto flex flex-col">
          <div className="p-6 flex-1">
            {/* Heading */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold" style={{ color: "#DFE2F3" }}>All Submissions</h1>
                  <span className="text-[10px] px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}>487 NODES TOTAL</span>
                </div>
                <p className="text-xs" style={{ color: "#8A919F" }}>· Managed across 14 distributed nodes</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 text-xs px-4 py-2 rounded-md transition-opacity hover:opacity-80" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#C0C7D6" }}>
                  <Download size={13} />Export CSV
                </button>
                <button className="flex items-center gap-2 text-xs px-4 py-2 rounded-md font-medium transition-opacity hover:opacity-80" style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}>
                  <Plus size={13} />New Submission
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-end gap-3 p-3 rounded-lg mb-4 flex-wrap" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#8A919F" }}>Content Type</p>
                <FilterDropdown options={CONTENT_TYPES} value={contentType} onChange={setContentType} />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#8A919F" }}>Status</p>
                <FilterDropdown options={STATUSES} value={status} onChange={setStatus} />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#8A919F" }}>Date Range</p>
                <FilterDropdown options={DATE_RANGES} value={dateRange} onChange={setDateRange} />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#8A919F" }}>Category</p>
                <FilterDropdown options={CATEGORIES} value={category} onChange={setCategory} />
              </div>
              <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-opacity hover:opacity-70" style={{ color: "#8A919F", border: "1px solid rgba(255,255,255,0.08)" }}>
                <X size={11} />Clear Filters
              </button>
            </div>

            {/* Bulk actions bar */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <button onClick={toggleAll} className="flex items-center gap-2 text-xs transition-opacity hover:opacity-70" style={{ color: "#8A919F" }}>
                  {allSelected ? <CheckSquare size={14} style={{ color: "#1A92FF" }} /> : <Square size={14} />}
                  {selectedRows.length > 0 ? `${selectedRows.length} Items Selected` : "0 Items Selected"}
                </button>
                {selectedRows.length > 0 && (
                  <button className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-md" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#C0C7D6" }}>
                    Bulk Actions <ChevronDown size={10} />
                  </button>
                )}
              </div>
              <p className="text-[10px]" style={{ color: "#8A919F" }}>⌘ AUTO-REFRESH 15s</p>
            </div>

            {/* Table */}
            <div className="rounded-xl border overflow-hidden mb-4" style={{ backgroundColor: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.07)" }}>
              {/* Header row */}
              <div className="grid px-4 py-2.5 border-b" style={{ gridTemplateColumns: "32px 80px 2fr 1.2fr 1fr 1fr 1fr 1fr 40px", borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.01)" }}>
                <button onClick={toggleAll}>
                  {allSelected ? <CheckSquare size={12} style={{ color: "#1A92FF" }} /> : <Square size={12} style={{ color: "#8A919F" }} />}
                </button>
                {["THUMBNAIL", "TITLE / METADATA", "TYPE", "CATEGORY", "WALLET", "CID / DEAL ID", "STATUS", "DATE", ""].map((h) => (
                  <p key={h} className="text-[9px] uppercase tracking-widest" style={{ color: "#8A919F" }}>{h}</p>
                ))}
              </div>

              {/* Data rows */}
              {SUBMISSIONS.map((row) => {
                const selected = selectedRows.includes(row.id);
                return (
                  <div key={row.id} className="grid px-4 py-3 border-b items-center transition-colors hover:bg-white/[0.02]"
                    style={{ gridTemplateColumns: "32px 80px 2fr 1.2fr 1fr 1fr 1fr 1fr 40px", borderColor: "rgba(255,255,255,0.04)", backgroundColor: selected ? "rgba(26,146,255,0.04)" : "transparent" }}>
                    <button onClick={() => toggleRow(row.id)}>
                      {selected ? <CheckSquare size={12} style={{ color: "#1A92FF" }} /> : <Square size={12} style={{ color: "#8A919F" }} />}
                    </button>
                    <div className="w-14 h-10 rounded-md relative overflow-hidden" style={{ backgroundColor: row.thumbnail }}>
                      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${row.thumbnail}bb 0%, ${row.thumbnail} 100%)` }} />
                      {row.status === "FLAGGED" && (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(255,107,107,0.2)" }}>
                          <span className="text-xs" style={{ color: "#FF6B6B" }}>⚑</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium leading-tight" style={{ color: "#DFE2F3" }}>{row.title}</p>
                      <p className="text-[9px] font-mono mt-0.5" style={{ color: "#8A919F" }}>{row.metadata}</p>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded font-medium w-fit" style={{ backgroundColor: row.typeBg, color: row.typeColor }}>{row.type}</span>
                    <p className="text-[10px] font-mono" style={{ color: "#8A919F" }}>{row.category}</p>
                    <p className="text-[10px] font-mono" style={{ color: "#C0C7D6" }}>{row.wallet}</p>
                    <div>
                      <p className="text-[10px] font-mono cursor-pointer hover:opacity-70" style={{ color: "#1A92FF" }}>{row.cid}</p>
                      <p className="text-[9px] font-mono mt-0.5" style={{ color: "#8A919F" }}>#{row.deal}</p>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 w-fit" style={{ backgroundColor: STATUS_STYLES[row.status].bg, color: STATUS_STYLES[row.status].color }}>
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: STATUS_STYLES[row.status].color }} />
                      {row.status}
                    </span>
                    <p className="text-[10px]" style={{ color: "#8A919F" }}>{row.date}</p>
                    <button className="transition-opacity hover:opacity-70" style={{ color: "#8A919F" }}><MoreHorizontal size={14} /></button>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-xs" style={{ color: "#8A919F" }}>Showing 1 to {Math.min(displayCount, totalItems)} of {totalItems.toLocaleString()}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs" style={{ color: "#8A919F" }}>Display:</p>
                  <select value={displayCount} onChange={(e) => setDisplayCount(Number(e.target.value))} className="text-xs px-2 py-1 rounded outline-none" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#C0C7D6" }}>
                    {[10, 25, 50, 100].map((n) => <option key={n} value={n} style={{ backgroundColor: "#0D1424" }}>{n}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, "...", 20].map((p, i) => (
                    <button key={i} onClick={() => typeof p === "number" && setCurrentPage(p)} className="w-7 h-7 flex items-center justify-center rounded text-xs" style={{ backgroundColor: currentPage === p ? "#1A92FF" : "rgba(255,255,255,0.04)", color: currentPage === p ? "#0A0E1A" : "#8A919F", border: "1px solid rgba(255,255,255,0.07)" }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom stats bar */}
          <div className="flex items-center justify-around px-6 py-4 border-t flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "#080C16" }}>
            {BOTTOM_STATS.map(({ icon, iconColor, label, value, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ color: iconColor }}>{icon}</span>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-0.5" style={{ color: "#8A919F" }}>{label}</p>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-base font-bold" style={{ color: "#DFE2F3" }}>{value}</p>
                    <p className="text-[10px]" style={{ color: iconColor }}>{sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
