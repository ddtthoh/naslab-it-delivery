/** /ncore/features — naslabtec.com/ncore/features 全文(12 条特性,4 条 Future)。 */

import { FEATURES_PAGE, ROUTES } from "../content/frozen";
import { Block, CtaLink, CtaRow, ImageSlot, PageHead } from "../components/ui";

export default function NcoreFeatures() {
  const f = FEATURES_PAGE;

  return (
    <Block>
      <PageHead kicker="Ncore 2.0" title={f.title} body={f.intro[0]}>
        <CtaRow>
          <CtaLink to={ROUTES.contact} variant="solid">
            CONTACT US
          </CtaLink>
        </CtaRow>
      </PageHead>

      <ImageSlot
        label="Features hero — exploded golden engine"
        ratio="16 / 9"
        src="/img/ncore-features.jpg"
        video="/video/ncore-features.mp4"
        videoPoster="/video/ncore-features-poster.jpg"
      />
      <p className="xsec__p">{f.intro[1]}</p>

      <div className="advantages">
        {f.features.map((item) => (
          <article className="advantage" key={item.n}>
            <h3 className="scenario__title">
              {String(item.n).padStart(2, "0")} · {item.title}
              {item.future ? " — Future Feature" : ""}
            </h3>
            <dl className="pointlist">
              <div className="pointlist__item">
                <dt className="pointlist__title">HOW IT WORKS</dt>
                <dd className="pointlist__body">{item.how}</dd>
              </div>
              <div className="pointlist__item">
                <dt className="pointlist__title">WHY IT MATTERS</dt>
                <dd className="pointlist__body">{item.why}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <p className="xsec__p">{f.conclusion}</p>

      <CtaRow>
        <CtaLink to={ROUTES.ncoreTrading}>{f.footNav.prev}</CtaLink>
        <CtaLink to={ROUTES.ncoreTrends} variant="solid">
          {f.footNav.next}
        </CtaLink>
      </CtaRow>
    </Block>
  );
}
