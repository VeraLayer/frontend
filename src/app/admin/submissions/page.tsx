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
  Loader2,
  ExternalLink,
} from "lucide-react";
import AdminSidebar from "@/app/components/AdminSidebar";
import { useAllAssets, ArchiveType } from "@/hooks/useVeraLayer";

const CONTENT_TYPES = ["All Types", "Heritage", "Talent"];
const STATUSES      = ["All Statuses", "Verified", "Pending", "Flagged"];
const DATE_RANGES   = ["All Time", "Last 30 Days", "Last 7 Days", "This Year"];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  VERIFIED: { bg: "rgba(74,225,131,0.12)",  color: "#4AE183" },
  PENDING:  { bg: "rgba(255,185,85,0.12)",  color: "#FFB955" },
  FLAGGED:  { bg: "rgba(255,107,107,0.12)", color: "#FF6B6B" },
};

const BERYX_ADDR = "https://beryx.io/fil/calibration/address/";

const THUMBNAIL_PALETTES = [
  "#0D1A12", "#0A0A0A", "#100A0A", "#0A0F1A", "#0F0A1A", "#1A0A0A",
];

function shortAddr(addr: string) { return `${addr.slice(0, 6)}…${addr.slice(-4)}`; }
function shortCid(cid: string)   { return `${cid.slice(0, 10)}…${cid.slice(-4)}`; }

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
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [dateRange, setDateRange]       = useState("All Time");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage]   = useState(1);
  const [displayCount, setDisplayCount] = useState(25);

  const { assets, isLoading, count, talentCount, heritageCount } = useAllAssets();

  const filtered = assets.filter((a) => {
    const isHeritage = a.archiveType === ArchiveType.Heritage;
    const derivedStatus = a.revoked
      ? "FLAGGED"
      : a.verifiedBy !== "0x0000000000000000000000000000000000000000"
      ? "VERIFIED"
      : "PENDING";
    const typeLabel = isHeritage ? "Heritage" : "Talent";

    if (contentType !== "All Types" && typeLabel !== contentType) return false;
    if (statusFilter !== "All Statuses" && derivedStatus !== statusFilter.toUpperCase()) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!a.creator.toLowerCase().includes(q) && !a.dealId.toLowerCase().includes(q) && !a.id.toString().includes(q)) return false;
    }
    return true;
  });

  const paginated = filtered.slice((currentPage - 1) * displayCount, currentPage * displayCount);
  const totalPages = Math.ceil(filtered.length / displayCount);

  const allSelected = selectedRows.length === paginated.length && paginated.length > 0;
  const toggleAll   = () => setSelectedRows(allSelected ? [] : paginated.map((a) => a.id.toString()));
  const toggleRow   = (id: string) => setSelectedRows((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);
  const clearFilters = () => { setContentType("All Types"); setStatusFilter("All Statuses"); setDateRange("All Time"); setSearchQuery(""); };

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
                  <span className="text-[10px] px-2 py-0.5 rounded font-semibold" style={{ backgroundColor: "#1A92FF", color: "#0A0E1A" }}>
                    {isLoading ? "…" : `${count} ON-CHAIN`}
                  </span>
                </div>
                <p className="text-xs" style={{ color: "#8A919F" }}>
                  {isLoading ? "Loading…" : `${talentCount} Talent · ${heritageCount} Heritage · Filecoin Calibration`}
                </p>
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
                <FilterDropdown options={STATUSES} value={statusFilter} onChange={setStatusFilter} />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "#8A919F" }}>Date Range</p>
                <FilterDropdown options={DATE_RANGES} value={dateRange} onChange={setDateRange} />
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
              {isLoading ? (
                <div className="flex items-center gap-2 justify-center py-10">
                  <Loader2 size={14} className="animate-spin" style={{ color: "#1A92FF" }} />
                  <p className="text-xs" style={{ color: "#8A919F" }}>Loading on-chain archives…</p>
                </div>
              ) : paginated.length === 0 ? (
                <p className="text-xs text-center py-10" style={{ color: "#8A919F" }}>No results.</p>
              ) : paginated.map((row) => {
                const id = row.id.toString();
                const selected = selectedRows.includes(id);
                const isHeritage = row.archiveType === ArchiveType.Heritage;
                const derivedStatus = row.revoked ? "FLAGGED" : row.verifiedBy !== "0x0000000000000000000000000000000000000000" ? "VERIFIED" : "PENDING";
                const thumb = THUMBNAIL_PALETTES[Number(row.id % BigInt(THUMBNAIL_PALETTES.length))];
                const date = new Date(Number(row.createdAt) * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
                return (
                  <div key={id} className="grid px-4 py-3 border-b items-center transition-colors hover:bg-white/[0.02]"
                    style={{ gridTemplateColumns: "32px 80px 2fr 1.2fr 1fr 1fr 1fr 1fr 40px", borderColor: "rgba(255,255,255,0.04)", backgroundColor: selected ? "rgba(26,146,255,0.04)" : "transparent" }}>
                    <button onClick={() => toggleRow(id)}>
                      {selected ? <CheckSquare size={12} style={{ color: "#1A92FF" }} /> : <Square size={12} style={{ color: "#8A919F" }} />}
                    </button>
                    <div className="w-14 h-10 rounded-md relative overflow-hidden" style={{ backgroundColor: thumb }}>
                      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${thumb}bb 0%, ${thumb} 100%)` }} />
                      <img src={`/api/ipfs/${row.dealId}`} alt="" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                      {derivedStatus === "FLAGGED" && (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(255,107,107,0.2)" }}>
                          <span className="text-xs" style={{ color: "#FF6B6B" }}>⚑</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium font-mono leading-tight" style={{ color: "#DFE2F3" }}>Archive #{id}</p>
                      <p className="text-[9px] font-mono mt-0.5" style={{ color: "#8A919F" }}>{date}</p>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded font-medium w-fit"
                      style={{ backgroundColor: isHeritage ? "rgba(255,185,85,0.12)" : "rgba(164,201,255,0.12)", color: isHeritage ? "#FFB955" : "#A4C9FF" }}>
                      {isHeritage ? "Heritage" : "Talent"}
                    </span>
                    <p className="text-[10px] font-mono" style={{ color: "#8A919F" }}>
                      {isHeritage ? "Cultural Asset" : "3MTT Talent"}
                    </p>
                    <a href={`${BERYX_ADDR}${row.creator}`} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] font-mono transition-opacity hover:opacity-70" style={{ color: "#C0C7D6" }}>
                      {shortAddr(row.creator)}
                    </a>
                    <div>
                      <a href={`https://ipfs.io/ipfs/${row.dealId}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-0.5 text-[10px] font-mono hover:opacity-70 transition-opacity" style={{ color: "#1A92FF" }}>
                        {shortCid(row.dealId)} <ExternalLink size={7} />
                      </a>
                      <p className="text-[9px] font-mono mt-0.5" style={{ color: "#8A919F" }}>#{id}</p>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 w-fit"
                      style={{ backgroundColor: STATUS_STYLES[derivedStatus].bg, color: STATUS_STYLES[derivedStatus].color }}>
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: STATUS_STYLES[derivedStatus].color }} />
                      {derivedStatus}
                    </span>
                    <p className="text-[10px]" style={{ color: "#8A919F" }}>{date}</p>
                    <button className="transition-opacity hover:opacity-70" style={{ color: "#8A919F" }}><MoreHorizontal size={14} /></button>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-xs" style={{ color: "#8A919F" }}>
                Showing {Math.min((currentPage - 1) * displayCount + 1, filtered.length)}–{Math.min(currentPage * displayCount, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs" style={{ color: "#8A919F" }}>Display:</p>
                  <select value={displayCount} onChange={(e) => { setDisplayCount(Number(e.target.value)); setCurrentPage(1); }} className="text-xs px-2 py-1 rounded outline-none" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#C0C7D6" }}>
                    {[10, 25, 50].map((n) => <option key={n} value={n} style={{ backgroundColor: "#0D1424" }}>{n}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setCurrentPage(p)} className="w-7 h-7 flex items-center justify-center rounded text-xs" style={{ backgroundColor: currentPage === p ? "#1A92FF" : "rgba(255,255,255,0.04)", color: currentPage === p ? "#0A0E1A" : "#8A919F", border: "1px solid rgba(255,255,255,0.07)" }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom stats bar */}
          <div className="flex items-center justify-around px-6 py-4 border-t flex-shrink-0" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "#080C16" }}>
            {[
              { icon: <HardDrive size={18} />, iconColor: "#1A92FF", label: "TOTAL ARCHIVES",    value: isLoading ? "…" : count.toLocaleString(),         sub: "ON-CHAIN" },
              { icon: <BarChart2 size={18} />, iconColor: "#FFB955", label: "HERITAGE ITEMS",    value: isLoading ? "…" : heritageCount.toLocaleString(),  sub: "FESTAC" },
              { icon: <Shield size={18} />,    iconColor: "#4AE183", label: "TALENT ARCHIVES",   value: isLoading ? "…" : talentCount.toLocaleString(),    sub: "3MTT" },
            ].map(({ icon, iconColor, label, value, sub }) => (
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
