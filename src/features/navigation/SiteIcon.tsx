import { useState, type CSSProperties } from "react";
import { isImageIcon } from "@/shared/lib/site-icons";

/** 由名称算出稳定的色相，没有图标时用作字母底色。 */
export function nameHue(name: string): number {
  let hue = 0;
  for (const char of name) hue = (hue * 31 + (char.codePointAt(0) ?? 0)) % 360;
  return hue;
}

/** 图片图标保留原样和透明背景；文字图标或加载失败时显示名称首字。 */
export function SiteIcon({ icon, name }: { icon: string | null; name: string }) {
  const value = icon?.trim() ?? "";
  const [failed, setFailed] = useState("");
  if (value && isImageIcon(value) && failed !== value) {
    return (
      <span className="site-icon is-image" aria-hidden="true">
        <img src={value} alt="" width={24} height={24} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(value)} />
      </span>
    );
  }
  const text = value && !isImageIcon(value) ? value : [...name.trim()][0]?.toUpperCase() || "?";
  return (
    <span className={`site-icon is-text${[...text].length > 2 ? " is-long" : ""}`} style={{ "--h": nameHue(name) } as CSSProperties} aria-hidden="true">
      {text}
    </span>
  );
}
