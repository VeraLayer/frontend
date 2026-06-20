import { shortAddr } from "@/helpers";
import { HealthStatus } from "@/interface";
import StatusDot from "./StatusBot";

export function HealthPanel({ health }: { health: HealthStatus | null }) {
  if (!health) return null;
  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: 10,
        padding: "14px 18px",
        display: "flex",
        flexWrap: "wrap",
        gap: "12px 24px",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: 11, color: "#555", letterSpacing: 1, textTransform: "uppercase" }}>
        Network
      </span>
      <span style={{ fontSize: 12, color: "#ccc" }}>{health.network ?? "Filecoin Calibration"}</span>
      <span style={{ fontSize: 11, color: "#555", letterSpacing: 1, textTransform: "uppercase" }}>
        Contract
      </span>
      <span style={{ fontSize: 11, color: "#666", fontFamily: "monospace" }}>
        {shortAddr(health.contract)}
      </span>
      <StatusDot ok={health.rpc_reachable} label="RPC" />
      <StatusDot ok={health.contract_reachable} label="Contract" />
      {health.gemini_reachable !== undefined && (
        <StatusDot ok={health.gemini_reachable} label="Gemini" />
      )}
      {health.filfox_reachable !== undefined && (
        <StatusDot ok={health.filfox_reachable} label="Filfox" />
      )}
    </div>
  );
}