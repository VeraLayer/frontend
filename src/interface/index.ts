export interface HealthStatus {
  status: string;
  contract: string;
  network?: string;
  rpc_reachable: boolean;
  contract_reachable: boolean;
  gemini_reachable?: boolean;
  filfox_reachable?: boolean;
}
 
export interface ArchiveSummary {
  id: number;
  creator: string;
  cid_hash: string;
  deal_id: number;
  archive_type: number; // 0=talent, 1=heritage, 2=datasets
  provenance_hash: string;
  entry_count: number;
  created_at: number;
  revoked: boolean;
  verified_by: string;
  verified_at: number;
}
 
export interface ArchiveDetail extends ArchiveSummary {
  deal_status: string;
  deal_provider: string;
  deal_active: boolean;
}
 
export interface ArchivesPage {
  items: ArchiveSummary[];
  total: number;
  after_id: number;
  has_more: boolean;
}
 
export interface ArchiveCounts {
  total: number;
  talent: number;
  heritage: number;
  datasets: number;
}
 
export interface DealStatus {
  deal_id: number;
  state: string;
  provider: string;
  piece_cid: string;
  active: boolean;
}
 
export interface QueryResponse {
  answer: string;
  tools_used: string[];
}