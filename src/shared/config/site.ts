/** 站点级文案与外链。改名、换域名时只改这里。 */
export const SITE = {
  owner: "KazeRush",
  title: "导航",
  lede: "常用工具、自建服务和社区入口。博客首页的导航读的是同一份数据。",
  blogUrl: (import.meta.env.VITE_BLOG_URL as string | undefined) || "https://zxublog.com",
} as const;
