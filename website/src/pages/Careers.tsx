/**
 * /careers — S8 · 06 · OPEN ROLES.
 *
 * ⚠️ CONTENT GAP: role cards have a title and a meta line only. There are no
 * job descriptions, responsibilities or requirements in CONTENT-FREEZE.md.
 * Marketing Specialist 的 meta 为 null —— 页面上留空即可,不再显示英文占位提示
 * (用户 2026-07-18:站上不要出现给开发看的说明文字)。
 *
 * 2026-07-18 版式节奏落地(继 /strategy · /ncore/x · /ncore/token 之后):
 * 本页原本没有排版,只有一条竖排职位列表 + 两张图。
 * 现改为:宣言段 → 3-up 职位网格 → 通栏大图 → 3-up 要点网格。
 */

import { CAREERS_PAGE, ROUTES, S8_CAREERS } from "../content/frozen";
import { useDesktop } from "../hooks/useDesktop";
import {
  Block,
  CardGrid,
  CtaLink,
  CtaRow,
  FullBleed,
  GridPoint,
  ImageSlot,
  PageHead,
  Statement,
} from "../components/ui";

export default function Careers() {
  const desktop = useDesktop();

  return (
    <Block>
      <PageHead
        kicker={S8_CAREERS.kicker}
        title={S8_CAREERS.h2}
        body={S8_CAREERS.body}
      >
        <CtaRow>
          <CtaLink to={ROUTES.contact} variant="solid">
            {S8_CAREERS.cta}
          </CtaLink>
        </CtaRow>
      </PageHead>

      <ImageSlot
        label="Careers hero — night trading command room"
        ratio="16 / 9"
        src="/img/careers-hero.jpg"
        video="/video/careers-hero.mp4"
        videoPoster="/video/careers-hero-poster.jpg"
      />

      {/* 开篇宣言 */}
      <Statement>{CAREERS_PAGE.intro}</Statement>

      {/* 开放职位 — 5 个并列职位 → 3-up 网格(比竖排列表好扫) */}
      <CardGrid cols={3}>
        {S8_CAREERS.roles.map((role) => (
          <GridPoint key={role.title} title={role.title}>
            {role.meta ? <p className="role__meta">{role.meta}</p> : null}
          </GridPoint>
        ))}
      </CardGrid>

      {/* 通栏大图当章节封面 */}
      {/* 2026-07-22 用户定案:手机框保持 4:3、电脑框改 16:9 → 两套素材。
          同一条视频塞进比例不同的两个框会被 cover 裁掉,所以按断点切换。 */}
      {/* 2026-07-22 用户复核后定案:叠加标题【留着】—— 只有下面本来就有同名标题的
          版位(NcoreToken 的 Tokenomics)才去掉,其余不能变成无标题的一节。 */}
      <FullBleed
        title={CAREERS_PAGE.title}
        img="/img/careers-team-trading.jpg"
        video={
          desktop
            ? "/video/careers-team-trading.mp4"
            : "/video/careers-team-trading-4x3.mp4"
        }
        videoPoster={
          desktop
            ? "/video/careers-team-trading-poster.jpg"
            : "/video/careers-team-trading-4x3-poster.jpg"
        }
        imgLabel="Team trading — holographic desk"
      />

      {/* 三段说明 → 3-up 要点网格 */}
      <CardGrid cols={3}>
        <GridPoint title={CAREERS_PAGE.why.heading}>
          <p>{CAREERS_PAGE.why.body}</p>
        </GridPoint>
        <GridPoint title={CAREERS_PAGE.lookingFor.heading}>
          <p>{CAREERS_PAGE.lookingFor.body}</p>
        </GridPoint>
        <GridPoint title={CAREERS_PAGE.ready.heading}>
          <p>{CAREERS_PAGE.ready.body}</p>
        </GridPoint>
      </CardGrid>

      <CtaRow>
        <CtaLink to={ROUTES.contact} variant="solid">
          {CAREERS_PAGE.ready.cta}
        </CtaLink>
      </CtaRow>
    </Block>
  );
}
