/**
 * 手机滚动交互三件套(2026-07-20 用户选定 M1+M2+M4;M5/M6 明确不做):
 *   M1 导航滚动隐藏 —— 下滚收起顶栏,上滚立刻回来;
 *   M2 回到顶部    —— 滚过两屏后右下角浮出;
 *   M4 阅读进度条  —— 顶栏下沿一条金线,跟随 M1 一起收起/回来。
 *
 * 只在手机端生效:JS 全端运行,但视觉全部由 site.css 里
 * @media (max-width:900px) 把关(900 = 汉堡抽屉断点,与「手机版 chrome」一致)。
 *
 * ⚠️ M1 在菜单展开(body.nav-open)时必须停用:
 *   .nav__menu 是 header 里的 fixed 子元素,.nav 一旦带 transform
 *   就成了它的 containing block,全屏菜单会被困进 64px 的条里。
 */

import { useEffect, useRef, useState } from "react";
import { scrollToTop } from "../scroll/scrollToTop";

export function ScrollUx() {
  const progRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      if (!document.body.classList.contains("nav-open")) {
        // 顶部 80px 内永远显示;±4px 死区滤掉橡皮筋回弹的抖动
        if (y < 80) document.body.classList.remove("nav-hid");
        else if (y > lastY + 4) document.body.classList.add("nav-hid");
        else if (y < lastY - 4) document.body.classList.remove("nav-hid");
      }
      lastY = y;

      // 进度条直接写 DOM,不走 setState —— 滚动每帧都在变,不值得整棵重渲
      if (progRef.current) {
        progRef.current.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
      }
      setShowTop(y > window.innerHeight * 2);
      ticking = false;
    };

    const listener = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };
    window.addEventListener("scroll", listener, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", listener);
      document.body.classList.remove("nav-hid");
    };
  }, []);

  return (
    <>
      <div className="scroll-prog" ref={progRef} aria-hidden="true" />
      <button
        className={`top-btn${showTop ? " top-btn--show" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={scrollToTop}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
