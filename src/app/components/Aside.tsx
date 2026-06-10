import { FileText, FolderOpen, Globe, HardDrive, Plus, Settings } from "lucide-react";

export default function Aside() {
    const SIDEBAR_ARCHIVES = [
  { icon: <FolderOpen size={13} />, label: "Global Archive", active: true },
  { icon: <FileText size={13} />, label: "Heritage Docs", active: false },
  { icon: <Globe size={13} />, label: "Public Node", active: false },
  { icon: <Settings size={13} />, label: "Node Settings", active: false },
];
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
                        S
                      </div>
                      <p className="text-xs font-semibold" style={{ color: "#DFE2F3" }}>
                        Sovereign ID
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: "#8A919F" }}>
                        0x71C...8E3f
                      </p>
                      <span
                        className="mt-1.5 text-[9px] px-2 py-0.5 rounded-full font-medium tracking-wider"
                        style={{ backgroundColor: "rgba(74,225,131,0.12)", color: "#4AE183" }}
                      >
                        VERIFIED NODE
                      </span>
                    </div>
        
                    {/* Storage */}
                    <div className="mb-5">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <HardDrive size={11} style={{ color: "#8A919F" }} />
                        <p className="text-[10px]" style={{ color: "#8A919F" }}>
                          Storage Used 64.2 GB / 128 GB
                        </p>
                      </div>
                      <div
                        className="w-full h-1 rounded-full overflow-hidden"
                        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: "50%", backgroundColor: "#1A92FF" }}
                        />
                      </div>
                    </div>
        
                    {/* Archive list */}
                    <p
                      className="text-[9px] uppercase tracking-widest mb-2"
                      style={{ color: "#8A919F" }}
                    >
                      My Archives
                    </p>
                    <div className="flex flex-col gap-0.5">
                      {SIDEBAR_ARCHIVES.map(({ icon, label, active }) => (
                        <button
                          key={label}
                          onClick={() => {}}
                          className="flex items-center gap-2 px-2.5 py-2 rounded-md text-xs text-left transition-colors"
                          style={{
                            backgroundColor: active
                              ? "rgba(26,146,255,0.12)"
                              : "transparent",
                            color: active ? "#A4C9FF" : "#8A919F",
                          }}
                        >
                          {icon}
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
        
                  {/* New Archive CTA */}
                  <button
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-xs font-medium transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "#1A2540", color: "#A4C9FF" }}
                  >
                    <Plus size={13} />
                    New Archive
                  </button>
                </aside>
        
    )
}