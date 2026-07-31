/**
 * 产品 hero 视频:滚动进入视野时【从头播一次】,结束定格在最后一帧;
 * 离开视野后再滚回来【重新播】(2026-07-20 用户定稿:
 * 「往下 scroll 了之后再往上也要播」—— 每次进入都重播,不是只播一次)。
 *
 * - poster = 原 hero 静图,视频加载前/失败时页面观感与纯图版完全一致;
 * - 进入视野 50% 才开播(太早开播用户看不到开头);离开即暂停,回来从 0 重播;
 * - prefers-reduced-motion:不加载视频,直接渲染原静图;
 * - 浏览器拒绝自动播(理论上 muted 不会,但保险):停在 poster,等同静图。
 */

import { useEffect, useRef } from "react";

export function PlayOnceVideo({
  src,
  poster,
  still,
  className,
  ratio,
}: {
  src: string;
  /** 开播前显示的帧 —— 必须等于视频首帧,否则开播瞬间会跳变 */
  poster: string;
  /** reduced-motion 降级用的静图(默认 = poster;保险箱这类
      「首帧≠定稿图」的视频要单独传定稿图,降级时不能停在起始状态) */
  still?: string;
  className?: string;
  ratio?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduce) return;
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // 每次进入都从头播(用户定稿:回滚也要播)
            v.currentTime = 0;
            void v.play().catch(() => {});
          } else {
            // 离开就停,避免屏外白耗解码;下次进入会归零重播
            v.pause();
          }
        });
      },
      { threshold: 0.5 },
    );
    io.observe(v);
    return () => io.disconnect();
    // src 进 deps:跨断点换素材时 <video> 会被 key 重建成新 DOM 节点,
    // 不重跑这个 effect 的话 observer 还盯着旧节点,新素材永远不播。
  }, [reduce, src]);

  if (reduce) {
    return (
      <img
        className={className}
        style={ratio ? { aspectRatio: ratio } : undefined}
        src={still ?? poster}
        alt=""
        loading="lazy"
      />
    );
  }

  return (
    <video
      /* 2026-07-22 修:SplitAsym / MediaSection 这类「一个版位两套素材」的图位,
         浏览器中途跨过 901px 断点时 src 会换,但改 <video> 的 src 属性
         并不会让已加载的媒体重新加载 —— 结果电脑上继续放 16:9 手机素材,
         塞进 3:4 的框里。key 让 React 直接换一个新的 video 节点。 */
      key={src}
      className={className}
      style={ratio ? { aspectRatio: ratio } : undefined}
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="metadata"
    />
  );
}
