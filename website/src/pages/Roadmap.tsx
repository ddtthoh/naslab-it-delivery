/**
 * /roadmap — S10 · 08 · STRATEGIC ROADMAP. 5 phase cards, copy 1:1 frozen.
 *
 * 2026-07-19 版式改造(用户定稿:方案 A):
 * 旧版 5 张 1:1 图各占满内容宽 → 945×945、每卡 1300px+、全页 8333px,
 * 是全站最长的一页,且五段结构完全相同(模板感)。
 * 现改为【时间轴左右交替 + 顶部年份导航】:
 *   - 图收进半栏后 1:1 只有 433px 高 → 全页降到约 2600px
 *   - 因此【图保持原比例完全不裁】:验图证实 16:9 会切掉 2025 底座的
 *     NASLAB 字样与 2027 的塔尖,不值得为省高度牺牲品牌元素
 *   - 手机端塌成单列、轴线贴左 —— 滚动方向即时间方向
 */

import { ROADMAP_EXTRA, ROUTES, S1_HERO, S10_ROADMAP } from "../content/frozen";
import { Block, CtaLink, CtaRow, PageHead, SlotMedia } from "../components/ui";

/** 用户定稿的 5 张阶段视觉(2026-07-17),与 phases 顺序一一对应 */
const PHASE_IMAGES = [
  "/roadmap/2024.jpg",
  "/roadmap/2025.jpg",
  "/roadmap/2025q.jpg",
  "/roadmap/2026.jpg",
  "/roadmap/2027.jpg",
];

/** 静态转视频第二批(2026-07-21 用户验收通过):进视野播一次、播完定格在上面的定稿图 */
const PHASE_VIDEOS = [
  "/video/roadmap-2024.mp4",
  "/video/roadmap-2025.mp4",
  "/video/roadmap-2025q.mp4",
  "/video/roadmap-2026.mp4",
  "/video/roadmap-2027.mp4",
];

/** 视频首帧 = 空场景 ≠ 定稿图,必须给 poster,否则开播瞬间跳变 */
const PHASE_POSTERS = [
  "/video/roadmap-2024-poster.jpg",
  "/video/roadmap-2025-poster.jpg",
  "/video/roadmap-2025q-poster.jpg",
  "/video/roadmap-2026-poster.jpg",
  "/video/roadmap-2027-poster.jpg",
];

/** 年份导航用的短标签(取 period 破折号前半段) */
function shortLabel(period: string) {
  return period.split("—")[0].trim();
}

export default function Roadmap() {
  const phases = S10_ROADMAP.phases;

  return (
    <Block>
      <PageHead
        kicker={S10_ROADMAP.kicker}
        title={S10_ROADMAP.h2}
        body={S10_ROADMAP.body}
      >
        <CtaRow>
          <CtaLink to={ROUTES.contact} variant="solid">
            {S1_HERO.ctaPrimary}
          </CtaLink>
        </CtaRow>
      </PageHead>

      {/* 年份导航条 — 一眼看到全局,点击跳到对应阶段 */}
      <nav className="yrnav" aria-label="Roadmap phases">
        {phases.map((phase, i) => (
          <a className="yrnav__link" href={`#phase-${i + 1}`} key={phase.period}>
            {shortLabel(phase.period)}
          </a>
        ))}
      </nav>

      {/* 时间轴 */}
      <div className="tl">
        {phases.map((phase, i) => (
          <section
            className={`tl__row${i % 2 === 1 ? " tl__row--flip" : ""}`}
            id={`phase-${i + 1}`}
            key={phase.period}
          >
            <div className="tl__text">
              <h2 className="tl__period">{phase.period}</h2>
              <ul className="tl__list">
                {phase.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {phase.note ? <p className="tl__note">{phase.note}</p> : null}
            </div>
            <SlotMedia
              className="tl__img"
              img={PHASE_IMAGES[i]}
              video={PHASE_VIDEOS[i]}
              videoPoster={PHASE_POSTERS[i]}
              title={phase.period}
            />
          </section>
        ))}
      </div>

      {/* naslabtec /roadmap · Long-Term Vision(2026-07-17 P1 补齐) */}
      <section className="xsec">
        <h2 className="xsec__h">{ROADMAP_EXTRA.longTermVision.heading}</h2>
        <p className="xsec__p">
          <strong>{ROADMAP_EXTRA.longTermVision.sub}</strong>
        </p>
        <h3 className="scenario__title">{ROADMAP_EXTRA.longTermVision.lead}</h3>
        <p className="xsec__p">{ROADMAP_EXTRA.longTermVision.body}</p>
        <dl className="pointlist">
          {ROADMAP_EXTRA.longTermVision.cards.map((c) => (
            <div className="pointlist__item" key={c.title}>
              <dt className="pointlist__title">{c.title}</dt>
              <dd className="pointlist__body">{c.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </Block>
  );
}
