/**
 * /about — naslabtec.com/about 全文(2026-07-17 P1 补齐,文案 1:1)。
 * 2026-10-11 领导层改双人:Fabian Vossberg(CEO)在上、Peter Kovac(Founder & CTO)在下,
 * 两张卡严格等大、人像同规格(3:4 · 1350×1800)——顺序不代表权重,版面才代表。
 * 铁律:真人不得 AI 伪造。两张都是真实照片;Fabian 那张只做了去背 + 背景色场对齐
 * Peter 的影棚光(人物本身零改动)。母版在 website-redesign/_incoming/fabian-portrait-20261011/。
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
        <div className="leaders">
          {a.leadership.people.map((person) => (
            <article className="leader" key={person.name}>
              <ImageSlot
                label={`${person.name} — ${person.role}`}
                ratio="3 / 4"
                src={person.img}
                video={person.video}
                videoPoster={person.videoPoster}
              />
              <h3 className="scenario__title">{person.name}</h3>
              <p className="leader__role">{person.role}</p>
              <p className="leader__scope">{person.scope}</p>
              <p className="xsec__p leader__quote">{person.quote}</p>
              {person.bio.map((para) => (
                <p className="xsec__p" key={para.slice(0, 24)}>
                  {para}
                </p>
              ))}
            </article>
          ))}
        </div>
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
