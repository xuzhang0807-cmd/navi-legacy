import { useEffect, useState } from "react";
import "./PosterCarousel.css";

const posters = [
  {
    image: "/posters/editorial-evening.webp",
    alt: { zh: "成年女性身穿优雅晚装的时尚人像", en: "Fashion portrait of an adult woman in elegant evening wear" },
    position: "center top",
  },
  {
    image: "/posters/coastal-muse.webp",
    alt: { zh: "海岸日光中成年女性的时尚人像", en: "Fashion portrait of an adult woman in coastal sunlight" },
    position: "center top",
  },
  {
    image: "/posters/city-lights.webp",
    alt: { zh: "城市夜色中成年女性的时尚人像", en: "Fashion portrait of an adult woman against city lights" },
    position: "center top",
  },
];

export function PosterCarousel({ language }: { language: "zh" | "en" }) {
  const [index, setIndex] = useState(1);
  const [selectionRevision, setSelectionRevision] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageHidden, setPageHidden] = useState(document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [failedImages, setFailedImages] = useState<string[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReducedMotion(media.matches);
    const onVisibility = () => setPageHidden(document.hidden);
    media.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    return () => { media.removeEventListener("change", onMotion); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  useEffect(() => {
    if (pageHidden || reducedMotion || hovered || focused) return;
    const timer = window.setTimeout(() => setIndex(current => (current + 1) % posters.length), 2000);
    return () => window.clearTimeout(timer);
  }, [index, pageHidden, reducedMotion, hovered, focused, selectionRevision]);

  function selectPoster(nextIndex: number) {
    setIndex(nextIndex);
    // Restart the full display period, including when the active dot is selected again.
    setSelectionRevision(current => current + 1);
  }

  return (
    <section className="poster-carousel" aria-label={language === "zh" ? "时尚人像海报" : "Fashion portrait posters"}>
      <div className="poster-slides" aria-live="off">
        {posters.map((poster, posterIndex) => (
          <div className={`poster-slide poster-tone-${posterIndex}${posterIndex === index ? " is-active" : ""}`} key={poster.image} aria-hidden={posterIndex !== index}>
            <div className="poster-backdrop" aria-hidden="true" style={{ backgroundImage: `url(${poster.image})` }} />
            {!failedImages.includes(poster.image) && <div className="poster-photo">
              <img className="poster-soft-image" src={poster.image} srcSet={`${poster.image.replace(".webp", "-small.webp")} 800w, ${poster.image} 1600w`} sizes="(max-width: 700px) 100vw, (max-width: 1440px) 80vw, 1200px" alt="" aria-hidden="true" width="1600" height="900" loading="eager" decoding="async" />
              <img className="poster-image" src={poster.image} srcSet={`${poster.image.replace(".webp", "-small.webp")} 800w, ${poster.image} 1600w`} sizes="(max-width: 700px) 100vw, (max-width: 1440px) 80vw, 1200px" alt={posterIndex === index ? poster.alt[language] : ""} width="1600" height="900" style={{ objectPosition: poster.position }} loading="eager" decoding="async" onError={() => setFailedImages(current => [...current, poster.image])} />
            </div>}
          </div>
        ))}
      </div>
      <div className="poster-pagination" role="group" aria-label={language === "zh" ? "选择海报" : "Choose a poster"}
        onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onPointerDownCapture={() => setFocused(false)}
        onFocusCapture={event => setFocused(event.target instanceof HTMLElement && event.target.matches(":focus-visible"))}
        onKeyDownCapture={() => setFocused(true)}
        onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      >
        {posters.map((item, posterIndex) => (
          <button
            className={`poster-dot${posterIndex === index ? " is-active" : ""}`}
            type="button"
            key={item.image}
            aria-label={language === "zh" ? `查看第 ${posterIndex + 1} 张海报` : `Show poster ${posterIndex + 1}`}
            aria-pressed={posterIndex === index}
            onPointerEnter={event => { if (event.pointerType === "mouse") selectPoster(posterIndex); }}
            onFocus={() => selectPoster(posterIndex)}
            onClick={() => selectPoster(posterIndex)}
          />
        ))}
      </div>
    </section>
  );
}
