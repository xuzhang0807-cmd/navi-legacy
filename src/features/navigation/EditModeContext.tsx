import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type EditModeValue = { editing: boolean; setEditing: (value: boolean) => void };

const EditModeContext = createContext<EditModeValue | null>(null);

/**
 * 编辑模式开关。enabled 由 app 层传入（站长视图才为 true），
 * 退出登录或开启访客预览时编辑模式自动关闭。
 */
export function EditModeProvider({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  const [editing, setEditing] = useState(false);
  const value = useMemo(() => ({ editing: enabled && editing, setEditing }), [enabled, editing]);
  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>;
}

export function useEditMode(): EditModeValue {
  const value = useContext(EditModeContext);
  if (!value) throw new Error("useEditMode must be used inside EditModeProvider");
  return value;
}
