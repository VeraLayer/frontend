"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const NAV_LINKS = [
  {label:"Home", href:"/"},
  { label: "Archive", href: "/archive" },
  {label:"Datasets", href:"/dataset"},
  { label: "Registry", href: "/dashboard/archives" },
  { label: "Heritage", href: "/dashboard/heritage" },
  { label: "Upload", href: "/dashboard/upload" },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-wide"
          style={{ color: "#DFE2F3" }}
        >
          VeraLayer
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-xs tracking-wide transition-colors hover:opacity-80"
              style={{ color: "#8A919F" }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <ConnectButton
        chainStatus="icon"
        label="Connect Wallet"
      />
    </nav>
  );
}
