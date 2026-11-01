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
  const [index, setIndex] = useState(0);
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
    if (pageHidden || reducedMotion) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % posters.length), 6500);
    return () => window.clearInterval(timer);
  }, [pageHidden, reducedMotion]);

  const poster = posters[index];
  return (
    <section className="poster-carousel" aria-label={language === "zh" ? "时尚人像海报" : "Fashion portrait posters"}>
      <div className="poster-slides" aria-live="off">
        <div className={`poster-slide poster-tone-${index}`} key={poster.image}>
          <div className="poster-backdrop" aria-hidden="true" style={{ backgroundImage: `url(${poster.image})` }} />
          {!failedImages.includes(poster.image) && <img className="poster-image" src={poster.image} srcSet={`${poster.image.replace(".webp", "-small.webp")} 800w, ${poster.image} 1600w`} sizes="(max-width: 700px) 100vw, (max-width: 1440px) 80vw, 1200px" alt={poster.alt[language]} width="1600" height="900" style={{ objectPosition: poster.position }} decoding="async" onError={() => setFailedImages(current => [...current, poster.image])} />}
        </div>
      </div>
    </section>
  );
}