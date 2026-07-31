import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 内容出现动效 —— 全站滚动淡入(2026-07-19 用户定稿)。
 *
 * 【定稿参数】淡入 + 上移 28px · 0.8s · 每次进入视野都播(2026-07-19 用户定稿)。
 *   用户在 /preview-reveal2.html 逐档对比八种效果后选定。
 *   图片和文字【同一套处理】,不做遮罩擦除 ——
 *   用户明确说过「照片自身没必要从下面显示到上面」。
 *
 * 【触发点比时长更关键】
 *   最初 threshold:0.15 会在元素刚从屏幕底边冒头时就触发,视线移过去时早演完了
 *   (用户反馈:「出现的速度太快看不到 effect」)。
 *   解法不是拉长时长,而是把判定线上提(rootMargin 负下边距)。
 *   参考站 demo-rm.dothouz.com 用 react-reveal,时长 1500ms —— 明显是另一条路子
 *   (靠慢),我们这里靠触发点,视觉更利落。
 *
 * 【为什么不用 clip-path】
 *   预览版曾用 clip-path: inset(100%) 做图片擦除,结果图片永远不出现:
 *   clip-path 把元素裁成零可见面积后,IntersectionObserver 判定它完全不可见,
 *   于是永不触发。若日后再想做擦除,必须把 clip-path 加在【内层 img】上,
 *   被观察的外框要保持完整几何。
 *
 * 【为什么用选择器扫描而不是逐个组件加 prop】
 *   10 个页面、几十个区块,逐个改动噪音大且容易漏。这里集中维护一份选择器表,
 *   新增区块只要用了既有 class 就自动获得动效。
 */

/** 参与动效的区块。新增版式组件时把它的根 class 加进来即可。 */
const TARGETS = [
  ".page-head",
  ".slot-img",
  ".slot",
  ".msec",
  ".state",
  ".full",
  ".asym",
  ".panel",
  ".card",
  ".stat-bar",
  ".chips",
  ".tl__row",
  ".cgrid > *",
].join(",");

/** 组内错开步长(毫秒):同一容器里的兄弟元素依次入场,形成序列感。 */
const STAGGER = 70;

export function useReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // 无障碍:直接呈现,不做动画

    const all = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));

    const els = all.filter((el) => {
      // 首屏不做动效 —— 一进站就该是完整画面,不该等它淡出来
      if (el.closest("#hero")) return false;
      // 避免嵌套双重动画(如 .page-head 里的 .cta-row):祖先已是目标就跳过
      return !all.some((other) => other !== el && other.contains(el));
    });

    els.forEach((el) => {
      el.dataset.reveal = "";
      // 同一父容器下的第几个目标 → 入场延迟。
      // ⚠️ 必须走 CSS 变量,不能直接设 style.transitionDelay:
      // 后者会作用于该元素【所有】transition,把 hover 反馈也一起延迟
      // (实测图片 hover 要等 70ms 才响应),而且和 hover 规则互相打架。
      const sibs = els.filter((o) => o.parentElement === el.parentElement);
      const i = sibs.indexOf(el);
      if (sibs.length > 1 && i > 0) {
        el.style.setProperty("--rv-d", `${i * STAGGER}ms`);
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // 每次都播:进入视野加类,离开移除,回滚时重新淡入
          e.target.classList.toggle("is-in", e.isIntersecting);
        });
      },
      {
        // threshold:0.15 会在元素【刚从屏幕底边冒头】时就触发,
        // 等视线移过去动画早演完了 —— 用户反馈「出现的速度太快看不到」的真正原因。
        // 改用负的下边距:把判定线从视口底边上提 15%,元素要进到画面里一点才触发。
        threshold: 0.01,
        rootMargin: "0px 0px -15% 0px",
      },
    );
    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      els.forEach((el) => {
        delete el.dataset.reveal;
        el.style.removeProperty("--rv-d");
        el.classList.remove("is-in");
      });
    };
  }, [pathname]); // 换页后重新扫描本页区块
}
