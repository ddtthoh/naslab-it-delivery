/**
 * 统一的「回到顶部」入口。
 *
 * ⚠️ 为什么不能直接 window.scrollTo({behavior:'smooth'}):
 * 首页跑 Lenis(见 useLenis.ts),它的 RAF 每帧把滚动位置写回自己的目标值,
 * 原生平滑滚动会被它一路拽回去 —— 实测点了之后先往上、再被拉回原处。
 * 所以首页必须交给 Lenis 自己滚;其余页面没有 Lenis,走原生。
 *
 * useLenis 挂载时把实例登记进来,卸载时清掉。
 */

type LenisLike = { scrollTo: (target: number, opts?: object) => void };

let active: LenisLike | null = null;

export function registerLenis(instance: LenisLike | null): void {
  active = instance;
}

export function scrollToTop(): void {
  if (active) {
    active.scrollTo(0, { duration: 1.1 });
    return;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}
