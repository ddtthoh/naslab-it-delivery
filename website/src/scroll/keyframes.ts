import gsap from "gsap";

/**
 * ============================================================
 * GLOBE SCROLL KEYFRAMES — tune the whole choreography here.
 * ============================================================
 *
 * One keyframe per section (S1 Hero, S2 New Era, S3 Mission).
 * Scroll progress 0 → 1 maps linearly across the keyframes,
 * with `power2.inOut` easing inside each segment plus an
 * exponential damp on top (see DAMP_LAMBDA) so the globe never
 * snaps, even on fast scroll or anchor jumps.
 *
 * Units:
 *  - x: fraction of the 3D viewport WIDTH  (0 = center, +right)
 *  - y: fraction of the 3D viewport HEIGHT (0 = center, +up)
 *  - scale: multiplier on the base globe radius (2 world units),
 *           additionally multiplied by a responsive factor so the
 *           globe never overwhelms narrow (mobile) viewports.
 *  - rotY: absolute Y rotation in radians at that keyframe.
 *  - rotX: absolute X rotation in radians — 转轴跟随移动方向：
 *          段内地球往上移就往上滚（rotX 负向），往下移就往下滚，
 *          左右移则以 rotY 左右转为主。
 */
export interface GlobeKeyframe {
  x: number;
  y: number;
  scale: number;
  rotY: number;
  rotX: number;
}

const PI = Math.PI;

/**
 * 2026-07-19 改为【方案 B · 左右分区】编排（用户定稿）：
 *   S1 Hero — 地球在右侧，文字占左半屏 → 两者不重叠，首屏无需遮罩
 *   S2 退场 — 缩小 + 向右上移 + 继续自转（"推远"）
 *   S3 让位 — 移出视口上方（此时 opacity 已淡到 0）
 * 依据：hero 地球是主角；滚过 hero 后由 50 张定稿图接手，地球完全退出，
 * 避免两套金色视觉抢戏（通栏大图本来也会把它整个盖住）。
 */
export const GLOBE_KEYFRAMES: GlobeKeyframe[] = [
  // S1 · Hero — 右侧（实测 1.42 过大、溢出视口，收到 0.95）
  { x: 0.3, y: -0.02, scale: 0.95, rotY: 0.0, rotX: 0.0 },
  // S2 · 退场中 — 缩小并向右上移
  { x: 0.42, y: 0.3, scale: 0.86, rotY: 0.62 * PI, rotX: -0.24 },
  // S3 · 完全让位 — 移出视口上方
  { x: 0.5, y: 0.92, scale: 0.6, rotY: 1.1 * PI, rotX: -0.34 },
];

/** 手机端：左右并排放不下，改为地球在上、文字在下（同一套编排，x 归零、y 上抬）。 */
export const GLOBE_KEYFRAMES_MOBILE: GlobeKeyframe[] = [
  { x: 0.0, y: 0.3, scale: 1.16, rotY: 0.0, rotX: 0.0 },
  { x: 0.0, y: 0.62, scale: 0.8, rotY: 0.62 * PI, rotX: -0.24 },
  { x: 0.0, y: 1.0, scale: 0.6, rotY: 1.1 * PI, rotX: -0.34 },
];

/** 地球整体透明度随滚动衰减：hero 区（p ≤ 0.18）满强度，0.62 之后彻底为 0。 */
export function globeOpacity(p: number): number {
  if (p <= 0.18) return 1;
  if (p >= 0.62) return 0;
  const t = (p - 0.18) / (0.62 - 0.18);
  return 1 - t * t * (3 - 2 * t); // smoothstep
}

/** Constant axis tilt (radians) applied on top of the spin. */
export const GLOBE_TILT_X = 0.16;
export const GLOBE_TILT_Z = -0.06;

/** Idle self-rotation speed, radians / second. */
export const IDLE_SPIN_SPEED = 0.055;

/** Exponential smoothing factor for scroll progress (higher = snappier). */
export const DAMP_LAMBDA = 3.4;

const segmentEase = gsap.parseEase("power2.inOut");

/** Sample the keyframe track at progress p ∈ [0, 1].
 *  传入 mobile=true 时使用手机端关键帧（地球在上、文字在下）。 */
export function sampleKeyframes(p: number, mobile = false): GlobeKeyframe {
  const frames = mobile ? GLOBE_KEYFRAMES_MOBILE : GLOBE_KEYFRAMES;
  const last = frames.length - 1;
  const clamped = Math.min(Math.max(p, 0), 1);
  const scaled = clamped * last;
  const i = Math.min(Math.floor(scaled), last - 1);
  const t = segmentEase(scaled - i);
  const a = frames[i];
  const b = frames[i + 1];
  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    scale: a.scale + (b.scale - a.scale) * t,
    rotY: a.rotY + (b.rotY - a.rotY) * t,
    rotX: a.rotX + (b.rotX - a.rotX) * t,
  };
}

/** Shared scroll state, written by the Lenis loop, read by the R3F loop.
 *  Initial progress honors the /?s=N QA param (N = 0-based section index)
 *  so a deep-linked section renders correctly from the very first frame. */
const initialSection = Number(
  new URLSearchParams(window.location.search).get("s"),
);
export const scrollState = {
  progress:
    Number.isFinite(initialSection) && initialSection > 0
      ? Math.min(initialSection / (GLOBE_KEYFRAMES.length - 1), 1)
      : 0,
};

// Debug markers (safe to remove): confirm which module build the page runs
// and what the seeded progress was at module-load time.
const w = window as unknown as Record<string, unknown>;
w.__naslabBuildTag = "kf-v6";
w.__naslabInitProgress = scrollState.progress;
