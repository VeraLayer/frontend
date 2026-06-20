export default function StatusDot({ ok, label }: { ok: boolean | undefined; label: string }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: ok === undefined ? "#555" : ok ? "#6FEBA0" : "#FF6B6B",
          boxShadow: ok ? "0 0 6px #6FEBA0aa" : undefined,
          display: "inline-block",
        }}
      />
      <span style={{ color: "#999" }}>{label}</span>
    </span>
  );
}