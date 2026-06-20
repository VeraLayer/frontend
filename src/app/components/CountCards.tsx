import { ArchiveCounts } from "@/interface";

export default function CountCards({ counts }: { counts: ArchiveCounts | null }) {
  if (!counts) return null;
  const cards = [
    { label: "Total", value: counts.total, color: "#ccc" },
    { label: "Talent", value: counts.talent, color: "#7C9EFF" },
    { label: "Heritage", value: counts.heritage, color: "#F2A65A" },
    { label: "Datasets", value: counts.datasets, color: "#6FEBA0" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
      {cards.map((c) => (
        <div
          key={c.label}
          style={{
            background: "#0d0d0d",
            border: "1px solid #1e1e1e",
            borderRadius: 10,
            padding: "16px 14px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700, color: c.color, letterSpacing: -1 }}>
            {c.value}
          </div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 2, textTransform: "uppercase", letterSpacing: 1 }}>
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}