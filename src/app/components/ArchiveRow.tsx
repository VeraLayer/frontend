import { ARCHIVE_TYPE_COLOR, ARCHIVE_TYPE_LABEL, shortAddr, tsToDate } from "@/helpers";
import { ArchiveSummary } from "@/interface";

export default function ArchiveRow({
  archive,
  onSelect,
}: {
  archive: ArchiveSummary;
  onSelect: (a: ArchiveSummary) => void;
}) {
  const typeColor = ARCHIVE_TYPE_COLOR[archive.archive_type] ?? "#888";
  const typeLabel = ARCHIVE_TYPE_LABEL[archive.archive_type] ?? "Unknown";
  return (
    <tr
      onClick={() => onSelect(archive)}
      style={{ cursor: "pointer", borderBottom: "1px solid #1a1a1a" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#111")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <td className="px-[10px] py-[12px] text-[14px] text-[#bbb] align-middle">{archive.id}</td>
      <td className="px-[10px] py-[12px] text-[14px] text-[#bbb] align-middle">
        <span
          style={{
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 600,
            color: typeColor,
            border: `1px solid ${typeColor}33`,
            background: `${typeColor}11`,
          }}
        >
          {typeLabel}
        </span>
      </td>
      <td className="px-[10px] py-[12px] text-[14px] text-[#bbb] align-middle" style={{ fontFamily: "monospace", fontSize: 11, color: "#666" }}>
        {shortAddr(archive.creator)}
      </td>
      <td className="px-[10px] py-[12px] text-[14px] text-[#bbb] align-middle" style={{fontFamily: "monospace", fontSize: 11, color: "#555" }}>
        #{archive.deal_id}
      </td>
      <td className="px-[10px] py-[12px] text-[14px] text-[#bbb] align-middle">{archive.entry_count.toLocaleString()}</td>
      <td className="px-[10px] py-[12px] text-[14px] text-[#bbb] align-middle">{tsToDate(archive.created_at)}</td>
      <td className="px-[10px] py-[12px] text-[14px] text-[#bbb] align-middle">
        {archive.revoked ? (
          <span style={{ color: "#FF6B6B", fontSize: 11 }}>Revoked</span>
        ) : archive.verified_by && archive.verified_by !== "0x0000000000000000000000000000000000000000" ? (
          <span style={{ color: "#6FEBA0", fontSize: 11 }}>Verified</span>
        ) : (
          <span style={{ color: "#555", fontSize: 11 }}>Pending</span>
        )}
      </td>
    </tr>
  );
}