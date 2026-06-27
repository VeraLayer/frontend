"use client";

import { ARCHIVE_TYPE_COLOR, ARCHIVE_TYPE_LABEL, shortAddr, tsToDate } from "@/helpers";
import { ArchiveDetail } from "@/interface";
import { useEffect, useState } from "react";
import { veraLayerApi } from "../api/veralayer.api";

export default function ArchiveDetailPanel({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<ArchiveDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    setLoading(true);
    setError(null);
    veraLayerApi
      .getArchiveDetail(id)
      .then(setDetail)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);
 
  const typeColor = detail ? ARCHIVE_TYPE_COLOR[detail.archive_type] ?? "#888" : "#888";
  const typeLabel = detail ? ARCHIVE_TYPE_LABEL[detail.archive_type] ?? "Unknown" : "";
 
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#0d0d0d",
          border: "1px solid #222",
          borderRadius: 14,
          padding: 28,
          width: 520,
          maxWidth: "90vw",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{ fontSize: 13, color: "#555" }}>Archive Detail</span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 18 }}
          >
            ✕
          </button>
        </div>
 
        {loading && <p style={{ color: "#555" }}>Loading…</p>}
        {error && <p style={{ color: "#FF6B6B", fontSize: 13 }}>{error}</p>}
 
        {detail && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#eee" }}>#{detail.id}</span>
              <span
                style={{
                  padding: "3px 10px",
                  borderRadius: 5,
                  fontSize: 11,
                  fontWeight: 600,
                  color: typeColor,
                  border: `1px solid ${typeColor}44`,
                  background: `${typeColor}11`,
                }}
              >
                {typeLabel}
              </span>
              {detail.deal_active !== undefined && (
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: 5,
                    fontSize: 11,
                    color: detail.deal_active ? "#6FEBA0" : "#FF6B6B",
                    border: `1px solid ${detail.deal_active ? "#6FEBA022" : "#FF6B6B22"}`,
                    background: detail.deal_active ? "#6FEBA008" : "#FF6B6B08",
                  }}
                >
                  Deal {detail.deal_status ?? (detail.deal_active ? "Active" : "Inactive")}
                </span>
              )}
            </div>
 
            {[
              ["Creator", shortAddr(detail.creator)],
              ["CID Hash", detail.cid_hash ? shortAddr(detail.cid_hash) : "—"],
              ["Deal ID", `#${detail.deal_id}`],
              ["Provider", detail.deal_provider ?? "—"],
              ["Entries", detail.entry_count?.toLocaleString()],
              ["Created", tsToDate(detail.created_at)],
              ["Verified By", shortAddr(detail.verified_by)],
              ["Verified At", detail.verified_at ? tsToDate(detail.verified_at) : "—"],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "9px 0",
                  borderBottom: "1px solid #161616",
                }}
              >
                <span style={{ fontSize: 12, color: "#444", textTransform: "uppercase", letterSpacing: 1 }}>
                  {label}
                </span>
                <span style={{ fontSize: 12, color: "#aaa", fontFamily: "monospace" }}>{value}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
 