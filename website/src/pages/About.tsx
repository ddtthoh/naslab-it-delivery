/**
 * /about — naslabtec.com/about 全文(2026-07-17 P1 补齐,文案 1:1)。
 * Peter Kovac 人像用 PDF p5 真实照片(铁律:真人不得 AI 伪造),
 * 图待批4定稿后接入。
 */

import { ABOUT_PAGE, ROUTES, S1_HERO } from "../content/frozen";
import { Block, CtaLink, CtaRow, ImageSlot, PageHead } from "../components/ui";

export default function About() {
  const a = ABOUT_PAGE;

  return (
    <Block>
      <PageHead kicker={a.title} title={a.subtitle} body={a.intro}>
        <CtaRow>
          <CtaLink to={ROUTES.strategy} variant="solid">
            Look At Our Strategy
          </CtaLink>
          <CtaLink to={ROUTES.contact}>{S1_HERO.ctaPrimary}</CtaLink>
        </CtaRow>
      </PageHead>

      <ImageSlot
        label="About hero — NASLAB marble lobby"
        ratio="16 / 9"
        src="/img/about-hero.jpg"
        video="/video/about-hero.mp4"
        videoPoster="/video/about-hero-poster.jpg"
      />

      <dl className="tokstats">
        <div className="tokstats__item">
          <dt className="tokstats__label">{a.founded.label}</dt>
          <dd className="tokstats__value">{a.founded.value}</dd>
        </div>
      </dl>

      <section className="xsec">
        <h2 className="xsec__h">{a.story.heading}</h2>
        <ImageSlot
          label="Our story"
          src="/img/about-story.jpg"
          video="/video/about-story.mp4"
          videoPoster="/video/about-story-poster.jpg"
        />
        {a.story.paragraphs.map((p) => (
          <p className="xsec__p" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
      </section>

      <section className="xsec">
        <h2 className="xsec__h">{a.mission.heading}</h2>
        <ImageSlot
          label="Mission"
          src="/img/about-mission.jpg"
          video="/video/about-mission.mp4"
          videoPoster="/video/about-mission-poster.jpg"
        />
        <p className="xsec__p">{a.mission.body}</p>
      </section>

      <section className="xsec">
        <h2 className="xsec__h">{a.vision.heading}</h2>
        <ImageSlot
          label="Vision — telescope at dawn"
          src="/img/about-vision.jpg"
          video="/video/about-vision.mp4"
          videoPoster="/video/about-vision-poster.jpg"
        />
        <p className="xsec__p">{a.vision.body}</p>
      </section>

      <section className="xsec">
        <h2 className="xsec__h">{a.leadership.heading}</h2>
        <p className="xsec__p">{a.leadership.sub}</p>
        {/* PDF p5 内嵌原图直抽(1536×2048),铁律:真人不得 AI 伪造。
            2026-07-22 用户验收通过做成视频:人物全程完全静止(不眨眼/不转头/
            不改表情/不改外貌),只有周围光效和图形动 —— 肖像本身没有被 AI 改动。 */}
        <ImageSlot
          label="Peter Kovac — CEO of Naslab & Nastech Global Limited"
          ratio="3 / 4"
          src="/img/about-peter-kovac.jpg"
          video="/video/about-peter-kovac.mp4"
          videoPoster="/video/about-peter-kovac-poster.jpg"
        />
        <h3 className="scenario__title">
          {a.leadership.name} — {a.leadership.role}
        </h3>
        <p className="xsec__p">{a.leadership.quote}</p>
        {a.leadership.bio.map((p) => (
          <p className="xsec__p" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
      </section>

      <section className="xsec">
        <h2 className="xsec__h">{a.values.heading}</h2>
        <ImageSlot
          label="Core values — six alcoves"
          src="/img/about-values.jpg"
          video="/video/about-values.mp4"
          videoPoster="/video/about-values-poster.jpg"
        />
        <dl className="pointlist">
          {a.values.items.map((v) => (
            <div className="pointlist__item" key={v.title}>
              <dt className="pointlist__title">{v.title}</dt>
              <dd className="pointlist__body">{v.body}</dd>
            </div>
          ))}
        </dl>
      </section>
    </Block>
  );
}
