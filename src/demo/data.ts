import type { NavGroup } from "@/features/navigation/types";

/** pnpm dev:demo 的示例数据，与线上数据无关。 */
type Seed = [name: string, description: string, url: string, isPublic?: boolean, notes?: string];

const seeds: Array<[name: string, isPublic: boolean, sites: Seed[]]> = [
  ["常用", true, [
    ["GitHub", "代码托管与开源项目", "https://github.com/"],
    ["Cloudflare", "域名、DNS 与 Workers", "https://dash.cloudflare.com/"],
    ["Google Drive", "谷歌硬盘", "https://drive.google.com/"],
    ["Notion", "教育版，HTML 文本托管", "https://www.notion.so/"],
    ["ChatGPT", "日常问答与写作", "https://chatgpt.com/"],
    ["Claude", "长文与代码协作", "https://claude.ai/"],
    ["博客后台", "文章、评论与访问统计", "https://blog.example.com/admin", false, "只有站长账号能进"],
  ]],
  ["自建服务", true, [
    ["komari", "服务器监控", "https://status.example.com/"],
    ["n8n", "工作流自动化", "https://n8n.example.com/"],
    ["MoviePilot", "影视订阅与整理", "https://movie.example.com/"],
    ["Telegraph 图床", "TG 图床上传", "https://img.example.com/"],
    ["qBittorrent", "下载管理", "https://qb.example.com/", false, "仅内网可访问"],
  ]],
  ["云与 VPS", true, [
    ["netcup", "德国 VPS", "https://www.netcup.com/"],
    ["Lightsail", "AWS 轻量服务器", "https://lightsail.aws.amazon.com/"],
    ["Leaflow", "容器平台", "https://leaflow.net/"],
    ["Oracle Cloud", "永久免费实例", "https://cloud.oracle.com/"],
  ]],
  ["IP 检测", true, [
    ["IPLark", "严格的全面自查", "https://iplark.com/"],
    ["whoer", "浏览器伪装测试", "https://whoer.net/"],
    ["ipinfo", "IP 归属与 ASN", "https://ipinfo.io/"],
    ["BrowserLeaks", "WebRTC 与指纹泄露", "https://browserleaks.com/"],
  ]],
  ["社区", true, [
    ["NodeSeek", "NS 交易论坛", "https://www.nodeseek.com/"],
    ["NodeLoc", "免费分享论坛", "https://www.nodeloc.com/"],
    ["V2EX", "创意工作者社区", "https://www.v2ex.com/"],
  ]],
  ["服务器后台", false, [
    ["1Panel", "服务器面板", "https://panel.example.com/", false, "限 IP 白名单"],
    ["Portainer", "容器管理", "https://docker.example.com/", false],
    ["WordPress", "文章源站后台", "https://wp.example.com/", false],
  ]],
];

export function createDemoGroups(): NavGroup[] {
  let siteId = 100;
  return seeds.map(([name, isPublic, sites], groupIndex) => {
    const id = groupIndex + 1;
    return {
      id, name, isPublic, order: id,
      sites: sites.map(([siteName, description, url, sitePublic = true, notes = ""], index) => ({
        id: ++siteId, groupId: id, name: siteName, url, icon: null, description, isPublic: sitePublic, order: index + 1, notes,
      })),
    };
  });
}

export const DEMO_FAVORITES = [101, 102, 108];
