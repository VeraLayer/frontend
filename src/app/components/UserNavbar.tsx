import { ConnectButton } from "@rainbow-me/rainbowkit";

const USER_NAV = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Archive", href: "/dashboard/archives" },
  { label: "Heritage Assets", href: "/dashboard/heritage", active: true }
];

export default function UserNavbar() {

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b">
    <div className="flex items-center gap-5">
      {USER_NAV.map((navItem) => (
        <a
          key={navItem.label}
          href={navItem.href}
          className="text-xs transition-opacity hover:opacity-70"
          style={{
            color: navItem.active ? "#DFE2F3" : "#8A919F",
            textDecoration: navItem.active ? "underline" : "none",
            textUnderlineOffset: "4px",
          }}
        >
          {navItem.label}
        </a>
      ))}
    </div>
      <ConnectButton chainStatus="icon" showBalance={false} label="Connect Wallet" />
    </div>
  )
}