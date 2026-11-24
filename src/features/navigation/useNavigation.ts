import { useCallback, useEffect, useRef, useState } from "react";
import { errorMessage } from "@/shared/api/http";
import { fetchNavigation } from "./api";
import type { NavigationData } from "./types";

export type NavigationState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: NavigationData };

/**
 * 读取导航数据。identityKey 变化（登录、退出）时先清空旧数据再重新加载，
 * 避免退出后屏幕上还留着私密内容。
 */
export function useNavigation(identityKey: string) {
  const [state, setState] = useState<NavigationState>({ status: "loading" });
  const seq = useRef(0);

  const load = useCallback(async (options: { silent?: boolean } = {}) => {
    const id = ++seq.current;
    if (!options.silent) setState({ status: "loading" });
    try {
      const data = await fetchNavigation();
      if (id === seq.current) setState({ status: "ready", data });
    } catch (reason) {
      if (id !== seq.current) return;
      const message = errorMessage(reason, "导航暂时无法加载。");
      setState((current) => (options.silent && current.status === "ready" ? current : { status: "error", message }));
      if (options.silent) throw reason;
    }
  }, []);

  useEffect(() => {
    if (identityKey === "loading") return;
    void load();
  }, [identityKey, load]);

  /** 乐观更新：先改本地数据，接口失败时由调用方重新加载 */
  const update = useCallback((change: (data: NavigationData) => NavigationData) => {
    setState((current) => (current.status === "ready" ? { status: "ready", data: change(current.data) } : current));
  }, []);

  return { state, reload: load, update };
}
