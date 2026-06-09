"use client";

import { useWriteContract, useReadContract, useReadContracts, useWaitForTransactionReceipt } from "wagmi";
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
  return { count: data, isLoading };
}

// Legacy alias used by HeroSection
export { useArchiveCount as useAssetsCount };

export function useAllAssets() {
  const { count, isLoading: countLoading } = useArchiveCount();
  const archiveCount = count !== undefined ? Number(count) : 0;

  const { data: talentData, isLoading: talentLoading } = useReadContract({
    address: VERALAYER_ADDRESS,
    abi: VERALAYER_ABI,
    functionName: "getTalentArchiveCount",
  });

  const { data: heritageData, isLoading: heritageLoading } = useReadContract({
    address: VERALAYER_ADDRESS,
    abi: VERALAYER_ABI,
    functionName: "getHeritageArchiveCount",
  });

  const { data, isLoading: assetsLoading } = useReadContract({
    address: VERALAYER_ADDRESS,
    abi: VERALAYER_ABI,
    functionName: "getArchives",
    args: [0n, BigInt(Math.min(archiveCount, 100))],
    query: { enabled: archiveCount > 0 },
  });

  const raw = (data as unknown as ChainAsset[] | undefined) ?? [];
  const assets: ChainAsset[] = raw.map((a) => ({
    id: a.id,
    creator: a.creator,
    cidHash: a.cidHash,
    dealId: a.dealId,
    archiveType: Number(a.archiveType) as ArchiveType,
    createdAt: a.createdAt,
    revoked: a.revoked,
    verifiedBy: a.verifiedBy,
  }));

  return {
    assets,
    isLoading: countLoading || assetsLoading || talentLoading || heritageLoading,
    count: archiveCount,
    talentCount: talentData !== undefined ? Number(talentData) : 0,
    heritageCount: heritageData !== undefined ? Number(heritageData) : 0,
  };
}
