import { BarChart2, Clock, FileStack, Flag, Landmark, LayoutDashboard, LogOut, Monitor, Settings, Users } from "lucide-react";
import Link from "next/link";

const SYSTEM_NAV = [
  { icon: <Monitor size={15} />, label: "Monitor", href: "#" },
  { icon: <Settings size={15} />, label: "Settings", href: "#" },
];

const MAIN_NAV = [
  { icon: <LayoutDashboard size={15} />, label: "Dashboard", href: "/admin", active: true },
  { icon: <BarChart2 size={15} />, label: "Analytics", href: "#" },
  { icon: <FileStack size={15} />, label: "All Submissions", href: "/admin/submissions" },
  { icon: <Users size={15} />, label: "Talent", href: "#" },
  { icon: <Landmark size={15} />, label: "Heritage", href: "/dashboard/heritage" },
  { icon: <Clock size={15} />, label: "Pending", href: "#" },
  { icon: <Flag size={15} />, label: "Flagged", href: "#" },
];

export default function AdminSidebar() {
  return (
    <aside
            className="w-48 flex-shrink-0 flex flex-col justify-between py-6 px-4 border-r"
            style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "#080C16" }}
          >
            <div>
              {/* Brand */}
              <div className="mb-8 px-1">
                <p className="text-base font-bold" style={{ color: "#DFE2F3" }}>VeraLayer</p>
                <p className="text-[10px]" style={{ color: "#8A919F" }}>Admin Control Center</p>
              </div>
    
              {/* Main nav */}
              <div className="flex flex-col gap-0.5 mb-6">
                {MAIN_NAV.map(({ icon, label, href, active }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition-colors"
                    style={{
                      backgroundColor: active ? "rgba(26,146,255,0.15)" : "transparent",
                      color: active ? "#A4C9FF" : "#8A919F",
                    }}
                  >
                    {icon}
                    {label}
                  </Link>
                ))}
              </div>
    
              {/* System section */}
              <p className="text-[9px] uppercase tracking-widest px-3 mb-2" style={{ color: "#8A919F" }}>
                System
              </p>
              <div className="flex flex-col gap-0.5">
                {SYSTEM_NAV.map(({ icon, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition-colors hover:opacity-80"
                    style={{ color: "#8A919F" }}
                  >
                    {icon}
                    {label}
                  </Link>
                ))}
              </div>
            </div>
    
            {/* Sign Out */}
            <button
              className="flex items-center gap-2 px-3 py-2 text-xs transition-opacity hover:opacity-70"
              style={{ color: "#FF6B6B" }}
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </aside>
  )
}