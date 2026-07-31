/**
 * /ncore/token — S7 teaser + naslabtec.com/ncore/token 子页全文
 * (2026-07-17 补抓,文案 1:1,见 NASLABTEC-CAPTURE.md)。
 * 原 CONTENT GAP 已由官方站数据填平:tokenomics / allocation / revenue /
 * utility / compliance / Mastercard 全部齐。
 *
 * 2026-07-18 版式节奏改造(用户定稿,继 /strategy · /ncore/x 之后):
 * 原先 6 连击 MediaSection → 降到 2 次。
 * 关键判断:Utility 四组各自带图 → 2×2 卡片网格;
 *           Tokenomics 用通栏大图当章节封面,把数据卡与分配表让出来当独立节奏。
 */

import { ROUTES, S1_HERO, S4_DIRECTION, S7_NCT, NCT_PAGE } from "../content/frozen";
import { card43 } from "../content/card43";
import { useDesktop } from "../hooks/useDesktop";
import {
  Block,
  CardGrid,
  CtaLink,
  CtaRow,
  DataCard,
  FullBleed,
  GridCard,
  ImageSlot,
  Kicker,
  MediaSection,
  PageHead,
  Statement,
} from "../components/ui";

/**
 * 定稿图 → 视频查表(2026-07-22 第五批上架)。沿用 /ncore 的写法:
 * 按定稿图路径查表,frozen.ts 的内容不动。首帧是空场景 ≠ 定稿图,
 * 所以 poster 取同名 -poster.jpg(视频第 0 帧),开播前先显示空场、播完定格回定稿图。
 *
 * nct-revenue 这里挂的是桌面用的 16:9;手机版框是 4:3,另有一条 4:3 素材,
 * 做好后按 strategy-security 那套断点切换接进来。
 */
const NCT_VIDEOS: Record<string, string | undefined> = {
  "/img/nct-tokenomics.jpg": "/video/nct-tokenomics.mp4",
  "/img/nct-revenue.jpg": "/video/nct-revenue.mp4",
  "/img/nct-utility.jpg": "/video/nct-utility.mp4",
  "/img/nct-scarcity.jpg": "/video/nct-scarcity.mp4",
  "/img/nct-access.jpg": "/video/nct-access.mp4",
  "/img/nct-compliance.jpg": "/video/nct-compliance.mp4",
  "/img/naslab-mastercard.jpg": "/video/naslab-mastercard.mp4",
};

const poster = (v?: string) => v?.replace(".mp4", "-poster.jpg");

export default function NcoreToken() {
  const t = NCT_PAGE;
  // 手机框 4:3 / 电脑框 16:9 → nct-revenue 用两套素材(2026-07-22 用户定案)
  const desktop = useDesktop();

  return (
    <Block>
      <PageHead kicker={S7_NCT.kicker} title={S7_NCT.h2} body={S7_NCT.body}>
        <CtaRow>
          <CtaLink to={ROUTES.contact} variant="solid">
            {S1_HERO.ctaPrimary}
          </CtaLink>
          <CtaLink to={ROUTES.roadmap}>{S4_DIRECTION.cta}</CtaLink>
        </CtaRow>
      </PageHead>

      <ImageSlot
        label="NCT coin visual"
        ratio="16 / 9"
        src="/img/nct-hero.jpg"
        video="/video/nct-hero.mp4"
      />

      {/* 首段抬为宣言,其余走正文 */}
      <Statement>{t.intro[0]}</Statement>
      <section className="xsec">
        <h2 className="xsec__h">{t.subtitle}</h2>
        {t.intro.slice(1).map((p) => (
          <p className="xsec__p" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
      </section>

      {/* Tokenomics — 通栏大图当章节封面,数据卡与分配表独立成节奏 */}
      {/* 2026-07-21 用户要求:去掉压在图上的 "Tokenomics" 叠加大字 ——
          下面那张 DataCard 已经带同名标题,图上再压一次是重复。 */}
      <FullBleed
        title={t.tokenomics.heading}
        img={t.tokenomics.img}
        video={
          desktop ? NCT_VIDEOS[t.tokenomics.img] : "/video/nct-tokenomics-4x3.mp4"
        }
        videoPoster={
          desktop
            ? poster(NCT_VIDEOS[t.tokenomics.img])
            : "/video/nct-tokenomics-4x3-poster.jpg"
        }
        hideTitle
      />

      <DataCard title={t.tokenomics.heading}>
        <dl className="tokstats">
          {t.tokenomics.stats.map((s) => (
            <div className="tokstats__item" key={s.label}>
              <dt className="tokstats__label">{s.label}</dt>
              <dd className="tokstats__value">{s.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="bullets">
          {t.tokenomics.initialSplit.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </DataCard>

      <section className="xsec">
        <h3 className="scenario__title">{t.tokenomics.allocationHeading}</h3>
        <dl className="alloc">
          {t.tokenomics.allocation.map((a) => (
            <div className="alloc__row" key={a.label}>
              <dt className="alloc__pct">{a.pct}</dt>
              <dd className="alloc__label">{a.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Revenue Model — 保留 Media 左右交替 */}
      <MediaSection
        index={1}
        title={t.revenue.heading}
        img={t.revenue.img}
        video={desktop ? NCT_VIDEOS[t.revenue.img] : "/video/nct-revenue-4x3.mp4"}
        videoPoster={
          desktop
            ? poster(NCT_VIDEOS[t.revenue.img])
            : "/video/nct-revenue-4x3-poster.jpg"
        }
      >
        <ul className="bullets">
          {t.revenue.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </MediaSection>

      {/* Utility & Advantages — 四组各自带图 → 2×2 卡片网格 */}
      <section>
        <Kicker>{t.utility.heading}</Kicker>
        <CardGrid cols={2}>
          {t.utility.groups.map((g) => (
            <GridCard
              key={g.title}
              title={g.title}
              img={card43(g.img)}
              video={NCT_VIDEOS[g.img]}
              videoPoster={poster(NCT_VIDEOS[g.img])}
            >
              <ul className="bullets">
                {g.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </GridCard>
          ))}
        </CardGrid>
      </section>

      {/* Naslab Mastercard — 卡片是横构图,保留 Media 收尾 */}
      <MediaSection
        index={2}
        title={t.mastercard.heading}
        img={t.mastercard.img}
        video={NCT_VIDEOS[t.mastercard.img]}
        videoPoster={poster(NCT_VIDEOS[t.mastercard.img])}
        native43
        flip
      >
        <dl className="pointlist">
          {t.mastercard.points.map((pt) => (
            <div className="pointlist__item" key={pt.title}>
              <dt className="pointlist__title">{pt.title}</dt>
              <dd className="pointlist__body">{pt.body}</dd>
            </div>
          ))}
        </dl>
      </MediaSection>
    </Block>
  );
}
