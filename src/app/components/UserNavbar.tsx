"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const USER_NAV = [
  { label: "Dashboard",      href: "/dashboard" },
  { label: "Archive",        href: "/dashboard/archives" },
  { label: "Heritage Assets",href: "/dashboard/heritage" },
];

export default function UserNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="border-b"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      {/* Main row */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3">

        {/* Desktop nav links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-5">
          {USER_NAV.map(({ label, href }) => {
            const isActive =
              pathname === href ||
              (href !== "/dashboard" && pathname?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className="text-xs transition-opacity hover:opacity-70"
                style={{
                  color: isActive ? "#DFE2F3" : "#8A919F",
                  textDecoration: isActive ? "underline" : "none",
                  textUnderlineOffset: "4px",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile: current page label */}
        <p className="md:hidden text-xs font-medium" style={{ color: "#DFE2F3" }}>
          {USER_NAV.find(({ href }) =>
            pathname === href || (href !== "/dashboard" && pathname?.startsWith(href))
          )?.label ?? "Dashboard"}
        </p>

        {/* Right side: ConnectButton + mobile hamburger */}
        <div className="flex items-center gap-3">
          <ConnectButton chainStatus="icon" showBalance={false} label="Connect" />
          <button
            className="md:hidden p-1 rounded-md transition-colors"
            style={{ color: "#8A919F" }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {USER_NAV.map(({ label, href }) => {
            const isActive =
              pathname === href ||
              (href !== "/dashboard" && pathname?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-xs transition-colors"
                style={{
                  color: isActive ? "#DFE2F3" : "#8A919F",
                  backgroundColor: isActive
                    ? "rgba(26,146,255,0.06)"
                    : "transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                {label}
                {isActive && (
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(26,146,255,0.12)",
                      color: "#1A92FF",
                    }}
                  >
                    Current
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}