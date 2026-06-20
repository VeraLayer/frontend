import { ArchiveCounts, ArchiveSummary, HealthStatus } from "@/interface";
import { useCallback, useEffect, useState } from "react";
import { veraLayerApi } from "../api/veralayer.api";
import { HealthPanel } from "../components/HealthPanel";
import CountCards from "../components/CountCards";
import AIQueryPanel from "../components/AIQueryPanel";
import ArchiveRow from "../components/ArchiveRow";
import ArchiveDetailPanel from "../components/ArchiveDetailPanel";

type FilterType = "all" | "talent" | "heritage" | "datasets";
 
export default function Dataset() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [counts, setCounts] = useState<ArchiveCounts | null>(null);
  const [archives, setArchives] = useState<ArchiveSummary[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [afterId, setAfterId] = useState(0);
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
 
  // Bootstrap health + counts
  useEffect(() => {
    veraLayerApi.getHealth().then(setHealth).catch(console.error);
    veraLayerApi.getArchiveCounts().then(setCounts).catch(console.error);
  }, []);
 
  // Fetch archives on filter change
  const loadArchives = useCallback(
    async (reset = false) => {
      setLoading(true);
      const cursor = reset ? 0 : afterId;
      try {
        const page = await veraLayerApi.getArchives(
          cursor,
          20,
          filter === "all" ? undefined : (filter as "talent" | "heritage" | "datasets")
        );
        setArchives((prev) => (reset ? page.items : [...prev, ...page.items]));
        setHasMore(page.has_more);
        setAfterId(page.after_id);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [filter, afterId]
  );
 
  useEffect(() => {
    setAfterId(0);
    setArchives([]);
    setHasMore(false);
    loadArchives(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
 
  const filterTabs: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "talent", label: "Talent" },
    { key: "heritage", label: "Heritage" },
    { key: "datasets", label: "Datasets" },
  ];
 
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070707",
        color: "#ccc",
        fontFamily:
          "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "32px 24px",
        maxWidth: 960,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#6FEBA0",
              boxShadow: "0 0 8px #6FEBA0",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#6FEBA0",
            }}
          >
            VeraLayer
          </span>
        </div>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#eee",
            margin: 0,
            letterSpacing: -0.5,
          }}
        >
          Archive Explorer
        </h1>
        <p style={{ fontSize: 13, color: "#444", margin: "4px 0 0" }}>
          Filecoin Calibration Testnet · Heritage & Dataset Provenance
        </p>
      </div>
 
      {/* Health */}
      <div style={{ marginBottom: 20 }}>
        <HealthPanel health={health} />
      </div>
 
      {/* Counts */}
      <div style={{ marginBottom: 24 }}>
        <CountCards counts={counts} />
      </div>
 
      {/* AI Query */}
      <div style={{ marginBottom: 28 }}>
        <AIQueryPanel />
      </div>
 
      {/* Archives Table */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "#444",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Archives
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {filterTabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  borderColor: filter === t.key ? "#333" : "#1a1a1a",
                  background: filter === t.key ? "#1a1a1a" : "transparent",
                  color: filter === t.key ? "#ddd" : "#555",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
 
        <div
          style={{
            background: "#090909",
            border: "1px solid #1a1a1a",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["ID", "Type", "Creator", "Deal", "Entries", "Created", "Status"].map((h) => (
                  <th key={h} className="px-[8px] py-[12px] text-[10px] tracking-normal upercase text-[#444] text-left border border-solid border-[#1e1e1e]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {archives.map((a) => (
                <ArchiveRow key={a.id} archive={a} onSelect={(a) => setSelectedId(a.id)} />
              ))}
              {archives.length === 0 && !loading && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-[10px] py-[12px] text-[14px] text-[#bbb] align-middle"
                    style={{ textAlign: "center", color: "#333", padding: 32 }}
                  >
                    No archives found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
 
          {(loading || hasMore) && (
            <div style={{ padding: "12px 16px", borderTop: "1px solid #141414" }}>
              {loading ? (
                <span style={{ fontSize: 12, color: "#333" }}>Loading…</span>
              ) : (
                <button
                  onClick={() => loadArchives()}
                  style={{
                    background: "none",
                    border: "1px solid #222",
                    borderRadius: 6,
                    color: "#555",
                    fontSize: 12,
                    padding: "5px 14px",
                    cursor: "pointer",
                  }}
                >
                  Load more
                </button>
              )}
            </div>
          )}
        </div>
      </div>
 
      {/* Archive Detail Modal */}
      {selectedId !== null && (
        <ArchiveDetailPanel id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}