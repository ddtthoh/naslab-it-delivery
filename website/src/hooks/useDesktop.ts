import { useEffect, useState } from "react";

/**
 * 901px = site.css 里桌面版式的统一断点 —— `.asym__img`、`.msec__img`、
 * `.full__img` 都在 `@media (min-width: 901px)` 里换比例。
 *
 * 用途:同一个版位手机和电脑框比例不同时,要给两套素材。
 * 比例不一致的框配同一条视频,object-fit:cover 就会把画面裁掉
 * (2026-07-22 用户定案:手机保持现状的框 = 4:3,电脑改成 16:9)。
 *
 * 断点必须和 CSS 里的一致,否则视频比例和框对不上。
 */
const DESKTOP_QUERY = "(min-width: 901px)";

export function useDesktop(): boolean {
  const [match, setMatch] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const sync = () => setMatch(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    /* 2026-07-22 修「中途改窗口宽度不换素材」:只挂 matchMedia 的 change
       不保险(实测有环境根本不派发 —— 首次加载对、拖窗口就不换了)。
       ResizeObserver 盯根元素,视口只要真的重排就一定会响,兜住这个洞。 */
    const ro = new ResizeObserver(sync);
    ro.observe(document.documentElement);
    return () => {
      mq.removeEventListener("change", sync);
      ro.disconnect();
    };
  }, []);

  return match;
}
