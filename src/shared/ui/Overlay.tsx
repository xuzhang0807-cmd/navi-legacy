import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import "./overlay.css";

type OverlayProps = {
  /** dialog 居中弹窗；drawer 右侧抽屉（窄屏变为底部面板） */
  variant?: "dialog" | "drawer";
  title: string;
  description?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  /** 表单提交；提供时整个面板是一个 <form> */
  onSubmit?: () => void;
};

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** 带焦点管理的弹层：打开时聚焦首个控件，Tab 不会跑出面板，Esc 和点击遮罩关闭。 */
export function Overlay({ variant = "dialog", title, description, onClose, children, footer, onSubmit }: OverlayProps) {
  const panelRef = useRef<HTMLDivElement & HTMLFormElement>(null);
  const titleId = useId();
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel?.querySelector<HTMLElement>("input, select, textarea") ?? panel?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
    const rootStyle = document.documentElement.style;
    const overflow = rootStyle.overflow;
    rootStyle.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); closeRef.current(); return; }
      if (event.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((item) => item.offsetParent !== null);
      if (!items.length) return;
      const [head, tail] = [items[0], items[items.length - 1]];
      if (event.shiftKey && document.activeElement === head) { event.preventDefault(); tail.focus(); }
      else if (!event.shiftKey && document.activeElement === tail) { event.preventDefault(); head.focus(); }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      rootStyle.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  const content = (
    <>
      <header className="overlay-head">
        <div>
          <h2 id={titleId}>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        <button className="icon-btn is-small" type="button" aria-label="关闭" onClick={onClose}><X /></button>
      </header>
      <div className="overlay-body">{children}</div>
      {footer && <footer className="overlay-foot">{footer}</footer>}
    </>
  );

  return (
    <div className={`overlay is-${variant}`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      {onSubmit ? (
        <form ref={panelRef} className="overlay-panel" role="dialog" aria-modal="true" aria-labelledby={titleId} noValidate
          onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
          {content}
        </form>
      ) : (
        <div ref={panelRef} className="overlay-panel" role="dialog" aria-modal="true" aria-labelledby={titleId}>{content}</div>
      )}
    </div>
  );
}
