export type ToastVariant = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  variant: ToastVariant;
  message: string;
  duration: number;
}

type Listener = (toasts: Toast[]) => void;

let _toasts: Toast[] = [];
const _listeners = new Set<Listener>();

function _emit(next: Toast[]) {
  _toasts = next;
  _listeners.forEach((l) => l(_toasts));
}

export const toastStore = {
  subscribe(listener: Listener) {
    _listeners.add(listener);
    return () => _listeners.delete(listener);
  },
  getSnapshot() {
    return _toasts;
  },
  getServerSnapshot(): Toast[] {
    return [];
  },
  dismiss(id: string) {
    _emit(_toasts.filter((t) => t.id !== id));
  },
};

function add(variant: ToastVariant, message: string, duration = 4500) {
  const id = Math.random().toString(36).slice(2, 9);
  _emit([..._toasts, { id, variant, message, duration }]);
  if (duration > 0) {
    setTimeout(() => toastStore.dismiss(id), duration);
  }
}

export const toast = {
  success: (msg: string, dur?: number) => add("success", msg, dur),
  error: (msg: string, dur?: number) => add("error", msg, dur),
  warning: (msg: string, dur?: number) => add("warning", msg, dur),
  info: (msg: string, dur?: number) => add("info", msg, dur),
};
