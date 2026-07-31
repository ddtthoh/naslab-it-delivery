/**
 * HeroGlobeLayer — 首页地球背景层(2026-07-19 用户定稿)。
 *
 * 【地球用什么】option 3 —— 视频由 option 3 定稿图当第一帧生成,
 * 屏幕上转的就是用户批准的那颗地球,设计零漂移。
 * (未采用 src/three 的 FinalGlobe 3D:那套用的是「虚构大陆」贴图 + 电路/蜂窝
 *  图层,和 option 3 是两套设计。FinalGlobe 代码保留未删,日后若做 option 3
 *  风格的等距柱状贴图可回用,那时才能做到真 3D + option 3 外观。)
 *
 * 【earth-spin.mp4 = 用户 2026-07-19 提供的外部素材,已验收为真无缝】
 * 此前所有自制版本都卡在循环接缝上:AI 生成的视频转角是任意的,地球不回起点,
 * 全片不存在无缝剪辑点;试过双视频错开半周期交叉淡化 —— 更糟,错开半周期时
 * 另一个视频正显示【地球的另一面】,只是把硬跳换成软糊;改乒乓循环(正放+倒放)
 * 虽绝对无缝,但地球会倒转。用户最终自行提供了本素材。
 *
 * 【验收方法很重要,别再用错的指标】
 * 不能拿"首末帧色差"的绝对值判断,必须【和片内正常的帧间步长比】。
 * 本片实测(全分辨率):正常相邻帧步长中位数 5.35、最大 6.84;跨接缝那一步 6.61,
 * 比值 0.97 ≤ 1 —— 即接缝跳动不比片中任何一次正常帧变化更明显 = 察觉不到。
 * (曾因在 220px 缩略图上拿两个【重复帧】当基准而误判为"有缝";本片 30fps 是
 *  灌水的,298 帧里有 59 处重复帧,缩略图上测相邻帧会得到假的 0.01 基准。)
 * 压制成 720p/CRF30 后比值 0.99,仍然合格;体积 9.2MB → 686KB。
 * 试过再加 0.5s 交叉淡化,比值仅从 0.97 降到 0.87,提升微弱却引入重影,不采用。
 *
 * 【过渡】跟 alpha web:滚动时旋转 + 缩小 + 上移 + 完全淡出,
 * 滚过 hero 后地球退场,把舞台交给 50 张定稿图。
 *
 * 【版式】方案 B:桌面地球在右、文字在左;手机地球在上、文字在下。
 * 两者不重叠 → 首屏不需要遮罩。
 *
 * 【降级】prefers-reduced-motion → 静图(无障碍要求)。
 * 手机不降级为静图 —— 手机是主力用户(用户 2026-07-19 指出)。
 */

import { useEffect, useRef, useState } from "react";

const SRC = "/earth-spin.mp4";
const POSTER = "/earth-spin-poster.jpg";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);

export function HeroGlobeLayer() {
  const stageRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // 自动播放:部分浏览器会拒绝首次 play(),回退到首次交互时再播
  useEffect(() => {
    if (reduceMotion) return;
    const v = vidRef.current;
    if (!v) return;
    const kick = () => void v.play().catch(() => {});
    kick();
    window.addEventListener("pointerdown", kick, { once: true });
    return () => window.removeEventListener("pointerdown", kick);
  }, [reduceMotion]);

  // 滚动编排(alpha 风格):旋转 + 缩小 + 上移 + 淡出
  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    let last = -1;

    const tick = () => {
      const el = stageRef.current;
      if (el) {
        const vh = window.innerHeight;
        const raw = clamp(window.scrollY / (vh * 0.95), 0, 1);
        if (Math.abs(raw - last) > 0.001) {
          last = raw;
          const t = ease(raw);
          const rot = lerp(0, 42, raw);
          const sc = lerp(1, 0.55, t);
          const y = lerp(0, -22, t);
          const op = lerp(1, 0, t);
          el.style.transform = `translate(-50%, calc(-50% + ${y}vh)) scale(${sc}) rotate(${rot}deg)`;
          el.style.opacity = String(op);
          el.style.visibility = op < 0.01 ? "hidden" : "visible";
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  return (
    <div className="globe-layer" aria-hidden="true">
      <div className="globe-layer__stage" ref={stageRef}>
        {reduceMotion ? (
          <img src={POSTER} alt="" />
        ) : (
          <video
            ref={vidRef}
            className="globe-layer__vid"
            src={SRC}
            poster={POSTER}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
          />
        )}
      </div>
    </div>
  );
}
