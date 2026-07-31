import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { scrollState } from "./keyframes";
import { registerLenis } from "./scrollToTop";

/**
 * Smooth scrolling via Lenis, driven by GSAP's ticker so the
 * scroll interpolation and the R3F render loop share one clock.
 * Writes normalized progress (0..1) into `scrollState`.
 */
export function useLenis(): void {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });

    // 「回到顶部」必须走 Lenis,否则原生平滑滚动会被 Lenis 的 RAF 拽回去
    registerLenis(lenis);

    // QA freeze mode: /?s=N pins the page & globe to section N (0-based)
    // and ignores live scroll — used to inspect a keyframe in isolation.
    const sectionParam = Number(
      new URLSearchParams(window.location.search).get("s"),
    );
    const qaFrozen = Number.isFinite(sectionParam) && sectionParam > 0;

    lenis.on("scroll", ({ progress }: { progress: number }) => {
      if (!qaFrozen) {
        scrollState.progress = Number.isFinite(progress) ? progress : 0;
      }
    });

    // Dev/QA handle: lets tooling (or the console) inspect and drive the
    // globe's scroll progress directly.
    (window as unknown as Record<string, unknown>).__naslabScroll =
      scrollState;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    let seedInterval = 0;
    if (qaFrozen) {
      const seed = () => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const top = window.innerHeight * sectionParam;
        if (maxScroll > 0) {
          scrollState.progress = Math.min(top / maxScroll, 1);
        }
        if (Math.abs(window.scrollY - top) > 1) {
          window.scrollTo({ top, behavior: "instant" });
        }
      };
      seed();
      seedInterval = window.setInterval(seed, 250);
    }

    return () => {
      window.clearInterval(seedInterval);
      gsap.ticker.remove(update);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);
}
