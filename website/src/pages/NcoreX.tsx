/**
 * /ncore/x — naslabtec 全文 + 定稿视觉。
 *
 * 2026-07-18 版式节奏改造(用户定稿,继 /strategy 之后):
 * 原先 6 连击 MediaSection → 按内容性质选区块,MediaSection 降到 2 次。
 * 关键判断:「三种套利场景」各自带图 → 天生 3-up 网格;
 *           「四个关键优势」各自带图 → 天生 2×2 网格;
 *           Future Vision 用通栏大图收尾。
 */

import { ROUTES, S1_HERO, S6_NCORE_X, X_PAGE } from "../content/frozen";
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
  GridPoint,
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
 * 卡片位(GridCard)两端框都是 4:3,所以一条 4:3 素材通吃 —— 2026-07-22 验收后
 * dex-dex(顺滑版)/ risk v2 / cex-cex(去火花版)/ latency / cost 全部换成 4:3。
 *
 * 通栏(FullBleed)和图文(MediaSection)是**手机 4:3、桌面 16:9**,一条素材塞不进两个框,
 * 所以 product / future / arbitrage-concept / realworld 走 X_VIDEOS_43 按断点切换。
 */
const X_VIDEOS: Record<string, string | undefined> = {
  "/img/ncorex-arbitrage-concept.jpg": "/video/ncorex-arbitrage-concept.mp4",
  "/img/ncorex-dex-dex.jpg": "/video/ncorex-dex-dex.mp4",
  "/img/ncorex-cex-cex.jpg": "/video/ncorex-cex-cex.mp4",
  "/img/ncorex-dex-cex.jpg": "/video/ncorex-dex-cex.mp4",
  "/img/ncorex-monitoring.jpg": "/video/ncorex-monitoring.mp4",
  "/img/ncorex-latency.jpg": "/video/ncorex-latency.mp4",
  "/img/ncorex-cost.jpg": "/video/ncorex-cost.mp4",
  "/img/ncorex-risk.jpg": "/video/ncorex-risk.mp4",
  "/img/ncorex-product.jpg": "/video/ncorex-product.mp4",
  "/img/ncorex-realworld.jpg": "/video/ncorex-realworld.mp4",
  "/img/ncorex-future.jpg": "/video/ncorex-future.mp4",
};

/** 手机专用 4:3 素材(桌面框是 16:9,继续用 X_VIDEOS 里那条)。 */
const X_VIDEOS_43: Record<string, string | undefined> = {
  "/img/ncorex-arbitrage-concept.jpg": "/video/ncorex-arbitrage-concept-4x3.mp4",
  "/img/ncorex-realworld.jpg": "/video/ncorex-realworld-4x3.mp4",
  "/img/ncorex-product.jpg": "/video/ncorex-product-4x3.mp4",
  "/img/ncorex-future.jpg": "/video/ncorex-future-4x3.mp4",
};

const poster = (v?: string) => v?.replace(".mp4", "-poster.jpg");

export default function NcoreX() {
  const { spreadCard } = S6_NCORE_X;
  const x = X_PAGE;
  // 通栏/图文位手机 4:3、桌面 16:9 → 两套素材按断点切换(2026-07-22 用户定案)
  const desktop = useDesktop();
  const vid = (img: string) =>
    (desktop ? X_VIDEOS[img] : X_VIDEOS_43[img] ?? X_VIDEOS[img]);

  return (
    <Block>
      <PageHead
        kicker={S6_NCORE_X.kicker}
        title={S6_NCORE_X.h2}
        body={S6_NCORE_X.body}
      >
        <CtaRow>
          <CtaLink to={ROUTES.contact} variant="solid">
            {S1_HERO.ctaPrimary}
          </CtaLink>
        </CtaRow>
      </PageHead>

      <ImageSlot
        label="Ncore X hero — orrery arbitrage engine"
        ratio="16 / 9"
        src="/img/ncorex-hero.jpg"
        video="/video/ncorex-hero.mp4"
        videoPoster="/video/ncorex-poster.jpg"
      />

      {/* A New Era — 首段抬为宣言,其余走正文 */}
      <Statement>{x.newEra.paragraphs[0]}</Statement>
      <section className="xsec">
        <h2 className="xsec__h">{x.newEra.heading}</h2>
        {x.newEra.paragraphs.slice(1).map((p) => (
          <p className="xsec__p" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
      </section>

      {/* 附属 UI 卡 — 价差示意(数据块,本身就是不同节奏) */}
      <DataCard title={spreadCard.resultLabel}>
        <div className="spread">
          {spreadCard.legs.map((leg) => (
            <div className="spread__leg" key={leg.venue}>
              <span className="spread__venue">{leg.venue}</span>
              <span className="spread__meta">{leg.meta}</span>
              <span className="spread__price">{leg.price}</span>
            </div>
          ))}
        </div>
        <p className="spread__result">
          <span className="spread__result-label">{spreadCard.resultLabel}</span>
          <span className="spread__result-value">{spreadCard.resultValue}</span>
        </p>
      </DataCard>

      {/* Core Concept — Media 左右交替(保留用法之一) */}
      <MediaSection
        index={1}
        title={x.coreConcept.heading}
        img="/img/ncorex-arbitrage-concept.jpg"
        video={vid("/img/ncorex-arbitrage-concept.jpg")}
        videoPoster={poster(vid("/img/ncorex-arbitrage-concept.jpg"))}
      >
        <p>{x.coreConcept.intro}</p>
        <dl className="pointlist">
          {x.coreConcept.points.map((pt) => (
            <div className="pointlist__item" key={pt.title}>
              <dt className="pointlist__title">{pt.title}</dt>
              <dd className="pointlist__body">{pt.body}</dd>
            </div>
          ))}
        </dl>
        <p>{x.coreConcept.closing}</p>
      </MediaSection>

      {/* Three Arbitrage Scenarios — 三个并列场景各自带图 → 3-up 卡片网格 */}
      <section>
        <Kicker>{x.scenarios.heading}</Kicker>
        <CardGrid cols={3}>
          {x.scenarios.items.map((s) => (
            <GridCard
              key={s.title}
              title={s.title}
              img={card43(s.img)}
              video={X_VIDEOS[s.img]}
              videoPoster={poster(X_VIDEOS[s.img])}
            >
              <ul className="bullets">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </GridCard>
          ))}
        </CardGrid>
      </section>

      {/* Key Advantages — 四个优势各自带图 → 2×2 卡片网格 */}
      <section>
        <Kicker>{x.advantages.heading}</Kicker>
        <CardGrid cols={2}>
          {x.advantages.items.map((a) => (
            <GridCard
              key={a.title}
              title={a.title}
              img={card43(a.img)}
              video={a.img ? X_VIDEOS[a.img] : undefined}
              videoPoster={a.img ? poster(X_VIDEOS[a.img]) : undefined}
            >
              <ul className="bullets">
                {a.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </GridCard>
          ))}
        </CardGrid>
      </section>

      {/* Productized Value — 通栏大图当章节封面 + 要点网格 */}
      {/* 2026-07-22 用户复核后定案:叠加标题【留着】—— 只有下面本来就有同名标题的
          版位(NcoreToken 的 Tokenomics)才去掉,其余不能变成无标题的一节。 */}
      <FullBleed
        title={x.productized.heading}
        img={x.productized.img}
        video={vid(x.productized.img)}
        videoPoster={poster(vid(x.productized.img))}
      />
      <CardGrid cols={2}>
        {x.productized.points.map((pt) => (
          <GridPoint key={pt.title} title={pt.title}>
            <p>{pt.body}</p>
          </GridPoint>
        ))}
      </CardGrid>
      <p className="xsec__p">{x.productized.closing}</p>

      {/* Real-World Application — 步骤适合走文字列,保留 Media */}
      <MediaSection
        index={2}
        title={x.realWorld.heading}
        img={x.realWorld.img}
        video={vid(x.realWorld.img)}
        videoPoster={poster(vid(x.realWorld.img))}
        flip
      >
        <p>{x.realWorld.intro}</p>
        <ol className="steps">
          {x.realWorld.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p>{x.realWorld.closing}</p>
      </MediaSection>

      {/* Future Vision — 通栏大图收尾,气势最强 */}
      <FullBleed
        title={x.futureVision.heading}
        img={x.futureVision.img}
        video={vid(x.futureVision.img)}
        videoPoster={poster(vid(x.futureVision.img))}
      />
      <section className="xsec">
        <p className="xsec__p">{x.futureVision.intro}</p>
        <ul className="bullets">
          {x.futureVision.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="xsec__p">{x.futureVision.closing}</p>
      </section>

      {/* Key Highlights */}
      <section className="xsec">
        <h2 className="xsec__h">{x.highlights.heading}</h2>
        <ul className="bullets">
          {x.highlights.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>
    </Block>
  );
}
