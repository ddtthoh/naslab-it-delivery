/**
 * Footer — structure and copy per CONTENT-FREEZE.md · S12.
 * Privacy Policy / Terms of Service render inert: no route was requested and
 * CONTENT-FREEZE.md carries no copy for them.
 * 底部社交跳转(Instagram / X / Website)按 memberportal social-links 同款
 * 图标与官方链接(2026-07-17 用户指令)。
 */

import { Link } from "react-router-dom";
import { S12_FOOTER } from "../content/frozen";
import { SOCIALS } from "./socials";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          {/* 用官方词标图,与导航同源;原先是 CSS 加宽字距的纯文字,
              和导航的品牌标志不一致(2026-07-18 用户指出)。 */}
          <img
            className="footer__wordmark"
            src="/naslab-wordmark.png"
            alt={S12_FOOTER.wordmark}
            width={900}
            height={178}
          />
          <p className="footer__blurb">{S12_FOOTER.blurb}</p>
          <a className="footer__email" href={`mailto:${S12_FOOTER.email}`}>
            {S12_FOOTER.email}
          </a>
        </div>

        <div className="footer__cols">
          {S12_FOOTER.columns.map((col) => (
            <nav className="footer__col" key={col.title}>
              <h2 className="footer__col-title">{col.title}</h2>
              <ul className="footer__col-list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link className="footer__link" to={link.to}>
                        {link.label}
                      </Link>
                    ) : (
                      <span
                        className="footer__link footer__link--pending"
                        title="No copy in CONTENT-FREEZE.md yet"
                      >
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        {/* CONNECT 眉标 + 居中圆环社媒钮 — 与手机版抽屉 footer 同款设计
            (2026-07-18 用户指令:四个 icon 居中) */}
        <div className="footer__connect">
          <div className="footer__connect-eyebrow">
            <span className="footer__connect-line" aria-hidden="true" />
            <span className="footer__connect-label">Connect</span>
            <span className="footer__connect-line" aria-hidden="true" />
          </div>
          <div className="footer__socials">
            {SOCIALS.map((s) => (
              <a
                className="footer__social"
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__legal">
          {S12_FOOTER.legal.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </footer>
  );
}
