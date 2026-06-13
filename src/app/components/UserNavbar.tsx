"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const USER_NAV = [
  { label: "Dashboard",      href: "/dashboard" },
  { label: "Archive",        href: "/dashboard/archives" },
  { label: "Heritage Assets",href: "/dashboard/heritage" },
  { label: "Explore",        href: "/dashboard/explore" },
];

export default function UserNavbar() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-5">
      {USER_NAV.map(({ label, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            className="text-xs transition-opacity hover:opacity-70"
            style={{
              color: active ? "#DFE2F3" : "#8A919F",
              textDecoration: active ? "underline" : "none",
              textUnderlineOffset: "4px",
            }}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
