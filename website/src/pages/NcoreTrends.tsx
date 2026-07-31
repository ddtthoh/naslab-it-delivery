/** /ncore/trends — naslabtec.com/ncore/trends 全文(12 条趋势)。
 * 注:第 11 条 ADVANTAGE 与第 9 条逐字重复且数据过时(2023 Q4),
 * 站方原文即如此,已在 NASLABTEC-CAPTURE.md 标注待用户裁决。 */

import { ROUTES, TRENDS_PAGE } from "../content/frozen";
import { Block, CtaLink, CtaRow, ImageSlot, PageHead } from "../components/ui";

export default function NcoreTrends() {
  const t = TRENDS_PAGE;

  return (
    <Block>
      <PageHead kicker={t.title} title={t.subtitle} body={t.intro}>
        <CtaRow>
          <CtaLink to={ROUTES.contact} variant="solid">
            CONTACT US
          </CtaLink>
        </CtaRow>
      </PageHead>

      <ImageSlot
        label="Market trends hero — candlestick bull"
        ratio="16 / 9"
        src="/img/ncore-trends.jpg"
        video="/video/ncore-trends.mp4"
        videoPoster="/video/ncore-trends-poster.jpg"
      />

      <div className="advantages">
        {t.trends.map((item) => (
          <article className="advantage" key={item.n}>
            <h3 className="scenario__title">
              {String(item.n).padStart(2, "0")} · {item.title}
            </h3>
            <dl className="pointlist">
              <div className="pointlist__item">
                <dt className="pointlist__title">MARKET IMPACT</dt>
                <dd className="pointlist__body">{item.impact}</dd>
              </div>
              <div className="pointlist__item">
                <dt className="pointlist__title">NCORE 2.0 ADVANTAGE</dt>
                <dd className="pointlist__body">{item.advantage}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <p className="xsec__p">{t.conclusion}</p>

      <CtaRow>
        <CtaLink to={ROUTES.ncoreFeatures}>{t.footNav.prev}</CtaLink>
        <CtaLink to={ROUTES.ncoreX} variant="solid">
          {t.footNav.next}
        </CtaLink>
      </CtaRow>
    </Block>
  );
}
