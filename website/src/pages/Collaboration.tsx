/**
 * /collaboration — S9 · 07 · PARTNERSHIP.
 *
 * 2026-07-18 版式节奏落地(继 /strategy · /ncore/x · /ncore/token · /careers):
 * 本页原本没有排版,全是连续 xsec 文字块。
 * 现改为:chips → 通栏大图 → 宣言段 → 3-up 协作方向网格 → 3-up 合作对象 → 收尾 CTA。
 */

import { COLLAB_PAGE, ROUTES, S9_COLLABORATION } from "../content/frozen";
import {
  Block,
  CardGrid,
  CtaLink,
  CtaRow,
  FullBleed,
  GridPoint,
  Kicker,
  PageHead,
  Statement,
} from "../components/ui";

export default function Collaboration() {
  return (
    <Block>
      <PageHead
        kicker={S9_COLLABORATION.kicker}
        title={S9_COLLABORATION.h2}
        body={S9_COLLABORATION.body}
      >
        <CtaRow>
          <CtaLink to={ROUTES.contact} variant="solid">
            {S9_COLLABORATION.cta}
          </CtaLink>
        </CtaRow>
      </PageHead>

      <ul className="chips">
        {S9_COLLABORATION.chips.map((chip) => (
          <li className="chip" key={chip}>
            {chip}
          </li>
        ))}
      </ul>

      {/* 通栏大图当开篇章节封面 */}
      {/* 2026-07-22 用户复核后定案:叠加标题【留着】—— 只有下面本来就有同名标题的
          版位(NcoreToken 的 Tokenomics)才去掉,其余不能变成无标题的一节。 */}
      <FullBleed
        title={COLLAB_PAGE.subtitle}
        img="/img/collaboration.jpg"
        video="/video/collaboration.mp4"
        videoPoster="/video/collaboration-poster.jpg"
        imgLabel="Collaboration visual — partnership / integration imagery"
      />

      {/* 开篇宣言 */}
      <Statement>{COLLAB_PAGE.intro}</Statement>

      <section className="xsec">
        <h3 className="scenario__title">{COLLAB_PAGE.approach.heading}</h3>
        <p className="xsec__p">{COLLAB_PAGE.approach.body}</p>
      </section>

      {/* 三个协作方向并列 → 3-up 网格 */}
      <section>
        <Kicker>{COLLAB_PAGE.focus.heading}</Kicker>
        <CardGrid cols={3}>
          {COLLAB_PAGE.focus.groups.map((g) => (
            <GridPoint key={g.title} title={g.title}>
              <ul className="bullets">
                {g.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </GridPoint>
          ))}
        </CardGrid>
      </section>

      {/* 合作对象 */}
      <section className="xsec">
        <h2 className="xsec__h">{COLLAB_PAGE.who.heading}</h2>
        <p className="xsec__p">{COLLAB_PAGE.who.intro}</p>
        <ul className="bullets">
          {COLLAB_PAGE.who.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="xsec__p">{COLLAB_PAGE.who.closing}</p>
      </section>

      {/* 收尾宣言 + CTA */}
      <Statement>{COLLAB_PAGE.build.body}</Statement>
      <CtaRow>
        <CtaLink to={ROUTES.contact} variant="solid">
          {COLLAB_PAGE.build.cta}
        </CtaLink>
      </CtaRow>
    </Block>
  );
}
