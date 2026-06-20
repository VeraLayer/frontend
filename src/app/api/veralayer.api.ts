import { ArchiveCounts, ArchiveDetail, ArchivesPage, DealStatus, HealthStatus, QueryResponse } from "@/interface";

const API_BASE = "https://veralayer-backend.onrender.com";

export const veraLayerApi = {
  async getHealth(): Promise<HealthStatus> {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error("Health check failed");
    return res.json();
  },
 
  async getArchives(
    afterId = 0,
    limit = 20,
    type?: "talent" | "heritage" | "datasets"
  ): Promise<ArchivesPage> {
    const params = new URLSearchParams({
      after_id: String(afterId),
      limit: String(limit),
    });
    if (type) params.set("type", type);
    const res = await fetch(`${API_BASE}/archives?${params}`);
    if (!res.ok) throw new Error("Failed to fetch archives");
    return res.json();
  },
 
  async getArchiveCounts(): Promise<ArchiveCounts> {
    const res = await fetch(`${API_BASE}/archives/counts`);
    if (!res.ok) throw new Error("Failed to fetch counts");
    return res.json();
  },
 
  async getArchiveDetail(id: number): Promise<ArchiveDetail> {
    const res = await fetch(`${API_BASE}/archives/${id}`);
    if (!res.ok) throw new Error(`Archive #${id} not found`);
    return res.json();
  },
 
  async getDealStatus(dealId: number): Promise<DealStatus> {
    const res = await fetch(`${API_BASE}/deals/${dealId}/status`);
    if (!res.ok) throw new Error(`Deal #${dealId} unreachable`);
    return res.json();
  },
 
  async query(question: string): Promise<QueryResponse> {
    const res = await fetch(`${API_BASE}/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(`${err.error}: ${err.detail}`);
    }
    return res.json();
  },
};