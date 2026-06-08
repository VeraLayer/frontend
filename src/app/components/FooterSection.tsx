"use client";

import { useEffect, useRef } from "react";
import { Cpu, Home, Globe, Shield } from "lucide-react";

const PARTNERS = [
  { icon: <Cpu size={12} />, name: "PROTOCOL LABS" },
  { icon: <Home size={12} />, name: "FILECOIN FOUNDATION" },
  { icon: <Globe size={12} />, name: "GLOBAL HERITAGE FUND" },
  { icon: <Shield size={12} />, name: "WEB3 TRUST GROUP" },
  { icon: <Cpu size={12} />, name: "PROTOCOL LABS" },
  { icon: <Home size={12} />, name: "FILECOIN FOUNDATION" },
  { icon: <Globe size={12} />, name: "GLOBAL HERITAGE FUND" },
  { icon: <Shield size={12} />, name: "WEB3 TRUST GROUP" },
];

const FOOTER_LINKS = [
  { label: "Legal", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Filecoin Status", href: "#" },
  { label: "Network Protocol", href: "#" },
];

export default function FooterSection() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    let frame: number;
    let x = 0;
    const speed = 0.5;
    const totalWidth = ticker.scrollWidth / 2;

    const animate = () => {
      x -= speed;
      if (Math.abs(x) >= totalWidth) x = 0;
      ticker.style.transform = `translateX(${x}px)`;
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div style={{ backgroundColor: "#0A0E1A" }} className="w-full">
      {/* Partner Ticker */}
      <div
        className="w-full overflow-hidden py-3 border-y"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div ref={tickerRef} className="flex items-center gap-10 w-max">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2 whitespace-nowrap text-[11px] tracking-widest font-medium select-none"
              style={{ color: "#8A919F" }}
            >
              <span style={{ color: "#8A919F" }}>{p.icon}</span>
              {p.name}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bar */}
      <div
        className="w-full px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        {/* Brand + copyright */}
        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1"
            style={{ color: "#DFE2F3" }}
          >
            VeraLayer
          </p>
          <p className="text-xs" style={{ color: "#C0C7D6" }}>
            VeraLayer © 2024. The Verifiable Foundation for Global Data.
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5 flex-wrap">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs transition-opacity hover:opacity-70"
              style={{ color: "#C0C7D6" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
