import type { ReactNode } from "react";
import { HomePage } from "@/pages/home/HomePage";

/**
 * 页面路由表。新增模块：加一项，再在 src/pages/<名称>/ 写页面。
 * planned 的条目只在页头显示「规划」标记，不注册路由。
 * /api/、/healthz、/assets/ 是服务端保留前缀，不能用作页面路径。
 */
export type AppRoute = {
  path: string;
  label: string;
  status: "live" | "planned";
  /** 是否出现在页头导航 */
  inHeader: boolean;
  element?: ReactNode;
};

export const APP_ROUTES: AppRoute[] = [
  { path: "/", label: "导航", status: "live", inHeader: true, element: <HomePage /> },
  { path: "/news", label: "资讯", status: "planned", inHeader: true },
  { path: "/search", label: "搜索", status: "planned", inHeader: false },
];
