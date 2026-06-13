"use client";

import { Archive, LayoutDashboard, Plus, Upload, FolderOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { VERALAYER_ABI, VERALAYER_ADDRESS } from "@/lib/veralayer-abi";

const SIDEBAR_NAV = [
  { icon: <LayoutDashboard size={13} />, label: "Dashboard",    href: "/dashboard" },
  { icon: <Archive size={13} />,         label: "All Archives", href: "/dashboard/archives" },
  { icon: <FolderOpen size={13} />,      label: "Heritage",     href: "/dashboard/heritage" },
  { icon: <Upload size={13} />,          label: "Upload",       href: "/dashboard/upload" },
];

export default function Aside() {
  const pathname   = usePathname();
  const { address, isConnected } = useAccount();

  const { data: archiveIds } = useReadContract({
    address: VERALAYER_ADDRESS,
    abi:     VERALAYER_ABI,
    functionName: "getArchiveIdsByCreator",
    args:  [(address ?? "0x0000000000000000000000000000000000000000") as `0x${string}`],
    query: { enabled: isConnected && !!address },
  });

  const { data: totalCount } = useReadContract({
    address: VERALAYER_ADDRESS,
    abi:     VERALAYER_ABI,
    functionName: "getArchiveCount",
  });

  const { data: talentCount }  = useReadContract({
    address: VERALAYER_ADDRESS,
    abi:     VERALAYER_ABI,
    functionName: "getTalentArchiveCount",
  });

  const { data: heritageCount } = useReadContract({
    address: VERALAYER_ADDRESS,
    abi:     VERALAYER_ABI,
    functionName: "getHeritageArchiveCount",
  });

  const userCount   = archiveIds  ? (archiveIds  as readonly bigint[]).length : 0;
  const global      = totalCount  ? Number(totalCount)  : 0;
  const talent      = talentCount  ? Number(talentCount)  : 0;
  const heritage    = heritageCount ? Number(heritageCount) : 0;
  const pct         = global > 0 && userCount > 0
    ? Math.min(100, Math.round((userCount / global) * 100))
    : 0;

  const avatarChar = address ? address.slice(2, 3).toUpperCase() : "?";
  const shortAddr  = address
    ? `${address.slice(0, 6)}…${address.slice(-4)}`
    : "Not connected";

  return (
    <aside
      className="w-52 flex-shrink-0 flex flex-col justify-between border-r py-5 px-4"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div>
        {/* Avatar + ID */}
        <div className="flex flex-col items-center mb-5">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-2 text-lg font-bold"
            style={{ backgroundColor: "#1A2540", color: "#A4C9FF" }}
          >
            {avatarChar}
          </div>
          <p className="text-xs font-semibold" style={{ color: "#DFE2F3" }}>
            Sovereign ID
          </p>
          <p className="text-[10px] mt-0.5 font-mono" style={{ color: "#8A919F" }}>
            {shortAddr}
          </p>
          {isConnected && (
            <span
              className="mt-1.5 text-[9px] px-2 py-0.5 rounded-full font-medium tracking-wider"
              style={{ backgroundColor: "rgba(74,225,131,0.12)", color: "#4AE183" }}
            >
              VERIFIED NODE
            </span>
          )}
        </div>

        {/* My contribution bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px]" style={{ color: "#8A919F" }}>
              My Archives
            </p>
            <p className="text-[10px] font-semibold font-mono" style={{ color: "#DFE2F3" }}>
              {isConnected ? userCount : "—"}
            </p>
          </div>
          <div
            className="w-full h-1 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, backgroundColor: "#1A92FF" }}
            />
          </div>
          <p className="text-[9px] mt-1" style={{ color: "#8A919F" }}>
            {isConnected
              ? global > 0
                ? `${userCount} of ${global} on-chain`
                : "No archives yet"
              : "Connect wallet to track"}
          </p>
        </div>

        {/* Global network stats */}
        <div
          className="flex items-center justify-between px-3 py-2 rounded-lg mb-5"
          style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xs font-bold font-mono" style={{ color: "#A4C9FF" }}>
              {global}
            </span>
            <span className="text-[8px] uppercase tracking-wider" style={{ color: "#8A919F" }}>
              Total
            </span>
          </div>
          <div className="w-px h-6" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xs font-bold font-mono" style={{ color: "#A4C9FF" }}>
              {talent}
            </span>
            <span className="text-[8px] uppercase tracking-wider" style={{ color: "#8A919F" }}>
              Talent
            </span>
          </div>
          <div className="w-px h-6" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} />
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xs font-bold font-mono" style={{ color: "#FFB955" }}>
              {heritage}
            </span>
            <span className="text-[8px] uppercase tracking-wider" style={{ color: "#8A919F" }}>
              Heritage
            </span>
          </div>
        </div>

        {/* Nav */}
        <p
          className="text-[9px] uppercase tracking-widest mb-2"
          style={{ color: "#8A919F" }}
        >
          Navigate
        </p>
        <div className="flex flex-col gap-0.5">
          {SIDEBAR_NAV.map(({ icon, label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-2 px-2.5 py-2 rounded-md text-xs transition-colors"
                style={{
                  backgroundColor: active ? "rgba(26,146,255,0.12)" : "transparent",
                  color: active ? "#A4C9FF" : "#8A919F",
                }}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* New Archive CTA */}
      <Link
        href="/dashboard/upload"
        className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-opacity hover:opacity-80"
        style={{ backgroundColor: "#1A2540", color: "#A4C9FF" }}
      >
        <Plus size={13} />
        New Archive
      </Link>
    </aside>

  )
}
  