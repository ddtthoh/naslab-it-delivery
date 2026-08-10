/**
 * Home — the 一镜到底 page: S1 → S11, with CTAs pointing at the subpages.
 * All copy is read from ../content/frozen (1:1 with CONTENT-FREEZE.md).
 */

import {
  ROUTES,
  S1_HERO,
  S2_NEW_ERA,
  S3_MISSION,
  S4_DIRECTION,
  S5_NCORE_3,
  S6_NCORE_X,
  S7_NCT,
  S8_CAREERS,
  S9_COLLABORATION,
  S10_ROADMAP,
  S11_CONTACT,
} from "../content/frozen";
import {
  Block,
  CtaLink,
  CtaRow,
  ImageSlot,
  Kicker,
  Lead,
  SectionHead,
} from "../components/ui";
import { HeroGlobeLayer } from "../components/HeroGlobeLayer";
import { CountUp } from "../components/CountUp";
import { useLenis } from "../scroll/useLenis";

export default function Home() {
  // 平滑滚动 —— 地球编排由 scrollState.progress 驱动
  useLenis();

  return (
    <>
      {/* 3D 地球背景层(方案 B:hero 在右侧,文字在左半屏,互不重叠 → 首屏无遮罩)。
          滚过 hero 后完全淡出,把舞台交给 50 张定稿图。
          手机/省电/WebGL 不可用时自动降级为视频或静图,见组件内部。 */}
      <HeroGlobeLayer />

      {/* S1 · Hero — 方案 B:左右分区(2026-07-19 用户定稿) */}
      <Block id="hero">
        <div className="hero-b">
          <div className="hero-b__text">
            <Kicker>{S1_HERO.kicker}</Kicker>
            {/* 金色流光 6s(2026-07-19 用户定稿)—— 全站仅此一处,用多了会腻 */}
            <h1 className="page-title page-title--hero shimmer">{S1_HERO.h1}</h1>
            <Lead>{S1_HERO.body}</Lead>
            <CtaRow>
              <CtaLink to={ROUTES.contact} variant="solid">
                {S1_HERO.ctaPrimary}
              </CtaLink>
              <CtaLink to={ROUTES.ncoreBasic}>{S1_HERO.ctaSecondary}</CtaLink>
            </CtaRow>
          </div>
          {/* 右栏刻意留空 —— 这是给地球的区域,不放任何内容 */}
          <div className="hero-b__stage" aria-hidden="true" />
        </div>
      </Block>

      {/* S2 · A New Era */}
      <Block id="new-era">
        <SectionHead
          kicker={S2_NEW_ERA.kicker}
          title={S2_NEW_ERA.h2}
          body={S2_NEW_ERA.body}
        >
          <CtaRow>
            <CtaLink to={ROUTES.ncoreBasic}>{S2_NEW_ERA.cta}</CtaLink>
          </CtaRow>
        </SectionHead>
        {/* 数字滚动计数:只动画呈现,终值 1:1 等于冻结原文(见 CountUp.tsx) */}
        <ul className="stat-bar">
          {S2_NEW_ERA.stats.map((stat) => (
            <li className="stat-bar__item" key={stat}>
              <CountUp>{stat}</CountUp>
            </li>
          ))}
        </ul>
      </Block>

      {/* S3 · 01 · MISSION — What We Do(定稿:N 标金库→产品传送→楼宇住宅) */}
      <Block id="mission">
        <SectionHead
          kicker={S3_MISSION.kicker}
          title={S3_MISSION.h2}
          body={S3_MISSION.body}
        >
          <CtaRow>
            <CtaLink to={ROUTES.strategy}>{S3_MISSION.cta}</CtaLink>
          </CtaRow>
        </SectionHead>
        <ImageSlot
          label="What We Do — vault to businesses & individuals"
          ratio="16 / 9"
          src="/img/home-what-we-do.jpg"
          video="/video/whatwedo-hero.mp4"
          videoPoster="/video/whatwedo-poster.jpg"
        />
      </Block>

      {/* S4 · 02 · DIRECTION — Strategic Direction(定稿:NASLAB 罗盘指针) */}
      <Block id="direction">
        <SectionHead
          kicker={S4_DIRECTION.kicker}
          title={S4_DIRECTION.h2}
          body={S4_DIRECTION.body}
        >
          <CtaRow>
            <CtaLink to={ROUTES.roadmap}>{S4_DIRECTION.cta}</CtaLink>
          </CtaRow>
        </SectionHead>
        <ImageSlot
          label="Strategic Direction — compass needle"
          ratio="16 / 9"
          src="/img/home-strategic-direction.jpg"
          video="/video/home-strategic-direction.mp4"
          videoPoster="/video/home-strategic-direction-poster.jpg"
        />
      </Block>

      {/* S5 · 03 · Ncore 3.0 */}
      <Block id="ncore-3">
        <SectionHead
          kicker={S5_NCORE_3.kicker}
          title={S5_NCORE_3.h2}
          body={S5_NCORE_3.body}
        >
          <CtaRow>
            <CtaLink to={ROUTES.ncoreBasic}>{S1_HERO.ctaSecondary}</CtaLink>
          </CtaRow>
        </SectionHead>
        <ImageSlot
          label="Ncore 3.0 product visual"
          ratio="16 / 9"
          src="/img/ncore3-hero.jpg"
          video="/video/ncore3-hero.mp4"
          videoPoster="/video/ncore3-hero-poster.jpg"
        />
      </Block>

      {/* S6 · 04 · Ncore X */}
      <Block id="ncore-x">
        <SectionHead
          kicker={S6_NCORE_X.kicker}
          title={S6_NCORE_X.h2}
          body={S6_NCORE_X.body}
        >
          <CtaRow>
            <CtaLink to={ROUTES.ncoreX}>{S6_NCORE_X.cta}</CtaLink>
          </CtaRow>
        </SectionHead>
        {/* 2026-07-18 补:此段原先漏了图位,是三个产品段里唯一没图的
            (Ncore X hero 是本轮才定稿的,当初接图时还不存在)。 */}
        <ImageSlot
          label="Ncore X product visual — orrery arbitrage engine"
          ratio="16 / 9"
          src="/img/ncorex-hero.jpg"
          video="/video/ncorex-hero.mp4"
          videoPoster="/video/ncorex-poster.jpg"
        />
      </Block>

      {/* S7 · 05 · NCT */}
      <Block id="nct">
        <SectionHead
          kicker={S7_NCT.kicker}
          title={S7_NCT.h2}
          body={S7_NCT.body}
        >
          <CtaRow>
            <CtaLink to={ROUTES.ncoreToken}>{S7_NCT.cta}</CtaLink>
          </CtaRow>
        </SectionHead>
        {/* 2026-07-21 用户定稿:首页这一处换成 ncore-token-front 那枚金币
            (左右补纯黑扩成 16:9,币一个像素没动)。框必须是 16/9,
            21/9 会把币的上下切掉约四分之一。NCT 子页 /ncore/token 维持原图不动。 */}
        <ImageSlot
          label="NCT coin visual"
          ratio="16 / 9"
          src="/img/nct-hero-home.jpg"
          video="/video/nct-hero-home.mp4"
          videoPoster="/video/nct-hero-home-poster.jpg"
        />
      </Block>

      {/* S8 · 06 · Careers */}
      <Block id="careers">
        <SectionHead
          kicker={S8_CAREERS.kicker}
          title={S8_CAREERS.h2}
          body={S8_CAREERS.body}
        >
          <CtaRow>
            <CtaLink to={ROUTES.careers}>{S8_CAREERS.cta}</CtaLink>
          </CtaRow>
        </SectionHead>
      </Block>

      {/* S9 · 07 · Collaboration */}
      <Block id="collaboration">
        <SectionHead
          kicker={S9_COLLABORATION.kicker}
          title={S9_COLLABORATION.h2}
          body={S9_COLLABORATION.body}
        >
          <CtaRow>
            <CtaLink to={ROUTES.collaboration}>{S9_COLLABORATION.cta}</CtaLink>
          </CtaRow>
        </SectionHead>
        <ul className="chips">
          {S9_COLLABORATION.chips.map((chip) => (
            <li className="chip" key={chip}>
              {chip}
            </li>
          ))}
        </ul>
      </Block>

      {/* S10 · 08 · Strategic Roadmap */}
      <Block id="roadmap">
        <SectionHead
          kicker={S10_ROADMAP.kicker}
          title={S10_ROADMAP.h2}
          body={S10_ROADMAP.body}
        >
          <CtaRow>
            <CtaLink to={ROUTES.roadmap}>{S4_DIRECTION.cta}</CtaLink>
          </CtaRow>
        </SectionHead>
      </Block>

      {/* S11 · 09 · Contact */}
      <Block id="contact">
        <SectionHead
          kicker={S11_CONTACT.kicker}
          title={S11_CONTACT.h2}
          body={S11_CONTACT.body}
        >
          <CtaRow>
            <CtaLink to={ROUTES.contact} variant="solid">
              {S1_HERO.ctaPrimary}
            </CtaLink>
          </CtaRow>
        </SectionHead>
      </Block>
    </>
  );
}
