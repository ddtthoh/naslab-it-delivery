/**
 * Section copy is taken verbatim from CONTENT-FREEZE.md (S1 / S2 / S3).
 * Do not edit wording here without user approval — content is frozen.
 */

const STATS: Array<{ value: string; label: string }> = [
  { value: "24/7", label: "Trading Operations" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "<50ms", label: "Execution Latency" },
  { value: "Global", label: "Market Coverage" },
];

export function HeroSection() {
  return (
    <section className="section section--hero" id="hero">
      <div className="section__inner">
        <p className="kicker">The Marketing Engine of Nastech Global.</p>
        <h1 className="hero-title">
          We power the next era of <em>digital wealth.</em>
        </h1>
        <p className="body-copy">
          We empower individuals and businesses to access next-generation
          digital finance solutions through secure, scalable, and
          forward-looking strategies. By helping clients stay ahead of market
          trends and make smarter decisions, Naslab drives sustainable growth
          and long-term value in an ever-evolving digital economy.
        </p>
        <div className="cta-row">
          <a className="btn btn--solid" href="#contact-us">
            Get In Touch
          </a>
          <a className="btn" href="#products">
            Explore Products
          </a>
        </div>
      </div>
    </section>
  );
}

export function NewEraSection() {
  return (
    <section className="section section--era" id="new-era">
      <div className="section__inner section__inner--bottom">
        <p className="kicker">A New Paradigm</p>
        <h2 className="section-title">
          A new era of <em>digital wealth.</em>
        </h2>
        <p className="body-copy">
          Build your crypto reserve with confidence, enjoying secure and steady
          growth with Naslab.
        </p>
        <div className="cta-row">
          <a className="btn" href="#products">
            Explore Products
          </a>
        </div>
        <ul className="stats">
          {STATS.map((stat) => (
            <li className="stats__item" key={stat.label}>
              <span className="stats__value">{stat.value}</span>
              <span className="stats__label">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MissionSection() {
  return (
    <section className="section section--mission" id="mission">
      <div className="section__inner section__inner--left">
        <p className="kicker">01 · Mission — What We Do</p>
        <h2 className="section-title">
          What We Do for the next <em>financial era.</em>
        </h2>
        <p className="body-copy">
          Naslab connects businesses and individuals with innovative digital
          finance solutions by strategically positioning Nastech Global&apos;s
          advanced products for sustainable, long-term growth.
        </p>
        <div className="cta-row">
          <a className="btn" href="#strategy">
            Look at Our Strategy
          </a>
        </div>
      </div>
    </section>
  );
}
