const rasterDataImage = /^data:image\/(?:png|jpe?g|gif|webp|avif|x-icon|vnd\.microsoft\.icon);base64,[a-z\d+/=\r\n]+$/i;
const explicitScheme = /^[a-z][a-z\d+.-]*:/i;

export function normalizeWebsiteUrl(value: string): string {
  const input = value.trim();
  if (!input) throw new Error("请先填写网站地址。");
  if (explicitScheme.test(input) && !/^https?:\/\//i.test(input) && !/^[^/?#]+:\d+(?:[/?#]|$)/.test(input)) {
    throw new Error("网站地址仅支持 http:// 或 https://。");
  }
  let url: URL;
  try { url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`); }
  catch { throw new Error("请输入有效的网站地址，例如 example.com。"); }
  if (!["http:", "https:"].includes(url.protocol) || !url.hostname || url.username || url.password || /\s/.test(input)) {
    throw new Error("请输入有效的网站地址，不要包含账号、密码或空格。");
  }
  return url.href;
}

export function faviconUrl(value: string): string {
  const website = new URL(normalizeWebsiteUrl(value));
  return `https://www.faviconextractor.com/favicon/${encodeURIComponent(website.hostname)}?larger=true`;
}

export function normalizeIconInput(value: string): string {
  const input = value.trim();
  if (!input) return "";
  if (/^data:/i.test(input)) {
    if (rasterDataImage.test(input) && input.length <= 350_000) return input;
    throw new Error("图标请使用 PNG、JPEG、GIF、WebP、AVIF 或 ICO 图片，最大 256 KB。");
  }
  if (input.startsWith("/") && !input.startsWith("//") && !/[\s\\]/.test(input)) return input;
  if (/^https?:\/\//i.test(input) || input.startsWith("//") || /[./]/.test(input)) {
    return normalizeWebsiteUrl(input.startsWith("//") ? `https:${input}` : input);
  }
  if (explicitScheme.test(input)) throw new Error("图标地址仅支持 http://、https:// 或本地图片路径。");
  if ([...input].length > 8 || /[\u0000-\u001f\u007f]/.test(input)) {
    throw new Error("图标文字请控制在 8 个字符以内，也可以填写图片地址。");
  }
  return input;
}

export function isImageIcon(value: string): boolean {
  return /^https?:\/\//i.test(value) || (value.startsWith("/") && !value.startsWith("//")) || rasterDataImage.test(value);
}