// types/health.ts
export interface HealthStatus {
  status: string;
  network: string;
  contract: string;
  rpc_reachable: boolean;
  contract_reachable: boolean;
  gemini_reachable: boolean;
  filfox_reachable: boolean;
}