/** Shared chrome: nav + routed page + footer, and reset scroll on navigation. */

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { ScrollUx } from "./ScrollUx";
import { useReveal } from "../scroll/useReveal";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  const { pathname } = useLocation();

  // 全站内容出现动效(淡入 + 上移,首屏除外)—— 参数与取舍见 useReveal.ts
  useReveal();

  /* 页面转场:淡入 + 上移(2026-07-20 用户定稿)。
     用 key={pathname} 让 <main> 在换页时【重新挂载】,CSS 动画自然重放 ——
     若只加 class 不换 key,同一个元素上的 animation 不会因为再次加类而重播。
     动画只作用于内容区,导航和页脚保持不动,换页时框架感更稳。 */
  return (
    <div className="shell">
      <ScrollToTop />
      <Nav />
      {/* 手机滚动三件套:导航隐藏 / 回顶钮 / 进度条(≤900px 生效,见 ScrollUx.tsx) */}
      <ScrollUx />
      <main className="shell__main page-in" key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
