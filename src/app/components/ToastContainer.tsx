"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { toastStore, type Toast } from "@/lib/toast";

const VARIANTS = {
  success: {
    icon: CheckCircle2,
    accent: "#4AE183",
    bg: "rgba(74,225,131,0.07)",
    border: "rgba(74,225,131,0.2)",
  },
  error: {
    icon: XCircle,
    accent: "#FF6B6B",
    bg: "rgba(255,107,107,0.07)",
    border: "rgba(255,107,107,0.2)",
  },
  warning: {
    icon: AlertTriangle,
    accent: "#FFB955",
    bg: "rgba(255,185,85,0.07)",
    border: "rgba(255,185,85,0.2)",
  },
  info: {
    icon: Info,
    accent: "#A4C9FF",
    bg: "rgba(164,201,255,0.07)",
    border: "rgba(164,201,255,0.2)",
  },
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);
  const v = VARIANTS[toast.variant];
  const Icon = v.icon;

  useEffect(() => {
    // mount → enter
    const enter = requestAnimationFrame(() => setVisible(true));
    // auto exit before store removes it
    const exit = setTimeout(() => setVisible(false), toast.duration - 400);
    return () => {
      cancelAnimationFrame(enter);
      clearTimeout(exit);
    };
  }, [toast.duration]);

  return (
    <div
      role="alert"
      onClick={onDismiss}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        padding: "12px 14px",
        borderRadius: "10px",
        border: `1px solid ${v.border}`,
        backgroundColor: v.bg,
        backdropFilter: "blur(12px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        cursor: "pointer",
        maxWidth: "340px",
        width: "100%",
        // slide-in from right + fade
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(20px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        borderLeft: `3px solid ${v.accent}`,
      }}
    >
      <Icon size={15} style={{ color: v.accent, flexShrink: 0, marginTop: 1 }} />
      <p
        style={{
          fontSize: "11px",
          color: "#DFE2F3",
          lineHeight: "1.5",
          flex: 1,
          wordBreak: "break-word",
        }}
      >
        {toast.message}
      </p>
      <X
        size={12}
        style={{ color: "#8A919F", flexShrink: 0, marginTop: 2 }}
        onClick={(e) => { e.stopPropagation(); onDismiss(); }}
      />
    </div>
  );
}

function ToastList() {
  const toasts = useSyncExternalStore(
    toastStore.subscribe,
    toastStore.getSnapshot,
    toastStore.getServerSnapshot
  );

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <div key={t.id} style={{ pointerEvents: "auto" }}>
          <ToastItem toast={t} onDismiss={() => toastStore.dismiss(t.id)} />
        </div>
      ))}
    </div>
  );
}

export function ToastContainer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(<ToastList />, document.body);
}
