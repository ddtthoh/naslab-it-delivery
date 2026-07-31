/** /ncore/trading — naslabtec.com/ncore/trading 全文(2026-07-17 P1 补齐)。 */

import { ROUTES, TRADING_PAGE } from "../content/frozen";
import { Block, CtaLink, CtaRow, ImageSlot, PageHead } from "../components/ui";

export default function NcoreTrading() {
  const t = TRADING_PAGE;

  return (
    <Block>
      <PageHead kicker={t.title} title={t.subtitle} body={t.origins.body}>
        <CtaRow>
          <CtaLink to={ROUTES.contact} variant="solid">
            CONTACT US
          </CtaLink>
        </CtaRow>
      </PageHead>

      {/* 2026-07-22 用户验收通过(v3):落位顺序按 front-run / back-run 语义 ——
          ①NCORE 2.0 长条(1.50s)→ ②TARGET 方块(2.92s)→ ③后方小方块(4.08s)。 */}
      <ImageSlot
        label="Trading logic hero — sandwich strategy"
        ratio="16 / 9"
        src="/img/ncore-trading.jpg"
        video="/video/ncore-trading.mp4"
        videoPoster="/video/ncore-trading-poster.jpg"
      />

      <section className="xsec">
        <h2 className="xsec__h">{t.origins.heading}</h2>
        <ul className="bullets">
          {t.origins.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <p className="xsec__p">{t.origins.closing}</p>
      </section>

      <section className="xsec">
        <h2 className="xsec__h">{t.sandwich.heading}</h2>
        <h3 className="scenario__title">{t.sandwich.sub}</h3>
        {t.sandwich.intro.map((p) => (
          <p className="xsec__p" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
        <div className="advantages">
          {t.sandwich.legs.map((leg) => (
            <article className="advantage" key={leg.title}>
              <h3 className="scenario__title">{leg.title}</h3>
              <ul className="bullets">
                {leg.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="xsec__p">{t.sandwich.closing}</p>
      </section>

      <section className="xsec">
        <h2 className="xsec__h">{t.coreFeatures.heading}</h2>
        <div className="advantages">
          {t.coreFeatures.items.map((f) => (
            <article className="advantage" key={f.title}>
              <h3 className="scenario__title">{f.title}</h3>
              <ul className="bullets">
                {f.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="xsec">
        <h2 className="xsec__h">{t.productized.heading}</h2>
        <p className="xsec__p">{t.productized.intro}</p>
        <dl className="pointlist">
          {t.productized.points.map((p) => (
            <div className="pointlist__item" key={p.title}>
              <dt className="pointlist__title">{p.title}</dt>
              <dd className="pointlist__body">{p.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="xsec">
        <h2 className="xsec__h">{t.useCase.heading}</h2>
        <p className="xsec__p">{t.useCase.intro}</p>
        <ol className="steps">
          {t.useCase.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="xsec__p">{t.useCase.closing}</p>
      </section>

      <section className="xsec">
        <h2 className="xsec__h">{t.devPath.heading}</h2>
        <p className="xsec__p">{t.devPath.intro}</p>
        <ul className="bullets">
          {t.devPath.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <h3 className="scenario__title">{t.devPath.resultHeading}</h3>
        <p className="xsec__p">{t.devPath.resultBody}</p>
      </section>

      <section className="xsec">
        <h2 className="xsec__h">{t.highlights.heading}</h2>
        <ul className="bullets">
          {t.highlights.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="xsec">
        <h2 className="xsec__h">{t.stayingAhead.heading}</h2>
        <p className="xsec__p">{t.stayingAhead.intro}</p>
        <dl className="pointlist">
          {t.stayingAhead.items.map((p) => (
            <div className="pointlist__item" key={p.title}>
              <dt className="pointlist__title">{p.title}</dt>
              <dd className="pointlist__body">{p.body}</dd>
            </div>
          ))}
        </dl>
        {t.stayingAhead.closing.map((p) => (
          <p className="xsec__p" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
      </section>

      <CtaRow>
        <CtaLink to={ROUTES.ncoreBasic}>{t.footNav.prev}</CtaLink>
        <CtaLink to={ROUTES.ncoreFeatures} variant="solid">
          {t.footNav.next}
        </CtaLink>
      </CtaRow>
    </Block>
  );
}
