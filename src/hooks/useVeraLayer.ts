"use client";

import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi";
import { VERALAYER_ABI, VERALAYER_ADDRESS, ArchiveType } from "@/lib/veralayer-abi";

export { ArchiveType };

export interface ArchiveParams {
  cid: string;
  dealId: string;
  archiveType: ArchiveType;
}

export interface ChainAsset {
  id: bigint;
  creator: `0x${string}`;
  cidHash: `0x${string}`;
  dealId: string;
  archiveType: ArchiveType;
  createdAt: bigint;
  revoked: boolean;
  verifiedBy: `0x${string}`;
}

// Contract MAX_PAGE_SIZE = 50
const MAX_PAGE = 50;

function mapAssets(raw: unknown): ChainAsset[] {
  if (!Array.isArray(raw)) return [];
  return (raw as ChainAsset[]).map((a) => ({
    id: a.id,
    creator: a.creator,
    cidHash: a.cidHash,
    dealId: a.dealId,
    archiveType: Number(a.archiveType) as ArchiveType,
    createdAt: a.createdAt,
    revoked: a.revoked,
    verifiedBy: a.verifiedBy,
  }));
}

export function useArchiveData() {
  const { writeContract, data: txHash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    pollingInterval: 4_000,
  });

  function archive(params: ArchiveParams) {
    writeContract({
      address: VERALAYER_ADDRESS,
      abi: VERALAYER_ABI,
      functionName: "archiveData",
      args: [params.cid, params.dealId, params.archiveType],
    });
  }

  return { archive, txHash, isPending, isConfirming, isSuccess, error };
}

export function useArchiveCount() {
  const { data, isLoading } = useReadContract({
    address: VERALAYER_ADDRESS,
    abi: VERALAYER_ABI,
    functionName: "getArchiveCount",
  });
  return { count: data as bigint | undefined, isLoading };
}

export { useArchiveCount as useAssetsCount };

export function useAllAssets() {
  // ── counts ────────────────────────────────────────────────────────
  const { data: totalData,   isLoading: totalLoading }   = useReadContract({ address: VERALAYER_ADDRESS, abi: VERALAYER_ABI, functionName: "getArchiveCount" });
  const { data: talentData,  isLoading: talentCLoading }  = useReadContract({ address: VERALAYER_ADDRESS, abi: VERALAYER_ABI, functionName: "getTalentArchiveCount" });
  const { data: heritageData,isLoading: heritageCLoading }= useReadContract({ address: VERALAYER_ADDRESS, abi: VERALAYER_ABI, functionName: "getHeritageArchiveCount" });

  const total          = totalData    ? Number(totalData)    : 0;
  const talentCount    = talentData   ? Number(talentData)   : 0;
  const heritageCount  = heritageData ? Number(heritageData) : 0;

  const talentLimit   = Math.min(talentCount,   MAX_PAGE);
  const heritageLimit = Math.min(heritageCount, MAX_PAGE);

  // ── talent archives (offset-based) ────────────────────────────────
  const { data: talentRaw, isLoading: talentLoading } = useReadContract({
    address: VERALAYER_ADDRESS,
    abi:     VERALAYER_ABI,
    functionName: "getTalentArchives",
    args:  [0n, BigInt(talentLimit)],
    query: { enabled: talentCount > 0 },
  });

  // ── heritage archives (offset-based) ──────────────────────────────
  const { data: heritageRaw, isLoading: heritageLoading } = useReadContract({
    address: VERALAYER_ADDRESS,
    abi:     VERALAYER_ABI,
    functionName: "getHeritageArchives",
    args:  [0n, BigInt(heritageLimit)],
    query: { enabled: heritageCount > 0 },
  });

  const talentAssets  = mapAssets(talentRaw);
  const heritageAssets = mapAssets(heritageRaw);
  // Merge and sort by id ascending so "recent" is predictable
  const assets = [...talentAssets, ...heritageAssets].sort((a, b) =>
    a.id < b.id ? -1 : a.id > b.id ? 1 : 0
  );

  return {
    assets,
    talentAssets,
    heritageAssets,
    isLoading: totalLoading || talentCLoading || heritageCLoading || talentLoading || heritageLoading,
    count:        total,
    talentCount,
    heritageCount,
  };
}
