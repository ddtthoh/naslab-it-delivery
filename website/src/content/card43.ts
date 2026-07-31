/**
 * 卡片位专用的 4:3 静态图查表(2026-07-22 用户验收 §F 通过)。
 *
 * 为什么需要这张表:
 * `.ccard__img` 在**所有视口**都是 `aspect-ratio: 4/3`,但定稿图原本是 1800×1004(≈16:9),
 * `object-fit: cover` 会把上下各切掉 25%。
 * 用户 2026-07-22 定案「桌面并排卡片只放静态图」之后,桌面直接显示这张图 ——
 * 于是卡片位必须换成 4:3 的图,否则等于白做了 4:3 视频。
 *
 * 表里的每张 4:3 图 = 对应那条 4:3 视频的**尾帧**,所以视频定格时图和视频不会打架。
 *
 * 原来的 16:9 图**没有删**,还在 `/img/<name>.jpg`,备份另存 `_masters/16x9-card-originals/`。
 * 要退回去只需删掉这张表里对应的一行。
 */
const CARD_43: Record<string, string> = {
  "/img/ncorex-dex-dex.jpg": "/img/ncorex-dex-dex-4x3.jpg",
  "/img/ncorex-cex-cex.jpg": "/img/ncorex-cex-cex-4x3.jpg",
  "/img/ncorex-dex-cex.jpg": "/img/ncorex-dex-cex-4x3.jpg",
  "/img/ncorex-monitoring.jpg": "/img/ncorex-monitoring-4x3.jpg",
  "/img/ncorex-latency.jpg": "/img/ncorex-latency-4x3.jpg",
  "/img/ncorex-cost.jpg": "/img/ncorex-cost-4x3.jpg",
  "/img/ncorex-risk.jpg": "/img/ncorex-risk-4x3.jpg",
  "/img/nct-utility.jpg": "/img/nct-utility-4x3.jpg",
  "/img/nct-scarcity.jpg": "/img/nct-scarcity-4x3.jpg",
  "/img/nct-access.jpg": "/img/nct-access-4x3.jpg",
  "/img/nct-compliance.jpg": "/img/nct-compliance-4x3.jpg",
  "/img/strategy-tailored.jpg": "/img/strategy-tailored-4x3.jpg",
};

/** 卡片位取图:有 4:3 版就用 4:3 版,没有就原样返回。 */
export function card43(img?: string | null): string | undefined {
  if (!img) return undefined;
  return CARD_43[img] ?? img;
}
