import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import "./overlay.css";

type Tone = "info" | "error";
type ToastFn = (message: string, tone?: Tone) => void;

const ToastContext = createContext<ToastFn | null>(null);

/** 页面底部的一行提示。读屏器通过 aria-live 播报。 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ message: string; tone: Tone; visible: boolean }>({ message: "", tone: "info", visible: false });
  const timer = useRef<number | undefined>(undefined);

  const toast = useCallback<ToastFn>((message, tone = "info") => {
    window.clearTimeout(timer.current);
    setState({ message, tone, visible: true });
    timer.current = window.setTimeout(() => setState((current) => ({ ...current, visible: false })), tone === "error" ? 4200 : 2600);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={`toast${state.visible ? " is-visible" : ""}${state.tone === "error" ? " is-error" : ""}`} role="status" aria-live="polite">{state.message}</div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastFn {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used inside ToastProvider");
  return value;
}
