import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <section className="site-container" style={{ display: "grid", gap: 12, justifyItems: "start", paddingBlock: "72px" }}>
      <p style={{ color: "var(--faint)", font: "12px/1 var(--font-mono)" }}>404</p>
      <h1 style={{ font: "700 32px/1.2 var(--font-serif)" }}>这个页面不存在</h1>
      <p style={{ color: "var(--muted)" }}>可能是地址写错了，或者这个功能还在规划中。</p>
      <Link className="btn" to="/">回到导航</Link>
    </section>
  );
}
