import { useEffect, useId, useRef, useState } from "react";
import { Eye, EyeOff, LogOut, Pencil } from "lucide-react";
import { useSession } from "@/features/auth/SessionProvider";

function initials(name: string): string {
  const letters = [...name.trim()];
  if (!letters.length) return "用";
  return /^[a-z]/i.test(letters[0]) ? letters.slice(0, 2).join("").toUpperCase() : letters[0];
}

/** 已登录账号菜单：显示角色与登录方式、启用编辑、访客预览开关、退出。 */
export function AccountMenu() {
  const { session, isOwner, canEnableEdit, previewAsGuest, setPreviewAsGuest, enableEdit, logout } = useSession();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const name = session?.user?.name || (isOwner ? "站长" : "成员");
  const roleLabel = isOwner ? "站长" : "成员";
  const method = session?.user?.method === "blog" ? "通过 Xublog 账号登录" : "通过站长密码登录";

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onPointer); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div className="account" ref={rootRef}>
      <button className="account-trigger" type="button" aria-haspopup="menu" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)} title={name}>
        <span className="account-avatar" aria-hidden="true">{initials(name)}</span>
        <span className="sr-only">账号菜单</span>
      </button>
      {open && (
        <div className="account-menu" id={menuId} role="menu">
          <div className="account-who"><strong>{name}</strong><small>{roleLabel} · {method}</small></div>
          {canEnableEdit && (
            <button type="button" role="menuitem" onClick={() => { setOpen(false); void enableEdit(); }}>
              <Pencil />启用编辑
            </button>
          )}
          <button type="button" role="menuitem" onClick={() => { setPreviewAsGuest(!previewAsGuest); setOpen(false); }}>
            {previewAsGuest ? <EyeOff /> : <Eye />}{previewAsGuest ? (isOwner ? "返回站长视图" : "返回成员视图") : "以访客身份预览"}
          </button>
          <button type="button" role="menuitem" onClick={() => { setOpen(false); void logout(); }}>
            <LogOut />退出登录
          </button>
        </div>
      )}
    </div>
  );
}
