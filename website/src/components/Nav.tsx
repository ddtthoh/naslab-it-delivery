/**
 * Top navigation. Labels come from CONTENT-FREEZE.md · 导航 (Nav):
 * Home · Naslab · Products · Careers · Collaboration · Contact Us
 * · [语言切换 🇺🇸] · Login
 *
 * "Naslab" and "Products" have no single route of their own, so they group
 * their child routes — that keeps every one of the 10 routes reachable from
 * the chrome.
 *
 * 2026-07-22:语言 pill 从空壳换成 14 项下拉。每项是真 <a href>,整页跳转到
 * `/{lang}{当前路径}` —— 语种由 URL 前缀决定(方案 C1),跳过去后 content/i18n.ts
 * 在模块加载时读前缀,所以不需要 Context、也不会有切换时的闪烁。
 */

import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { LOGIN_URL, NAV, ROUTES, UI } from "../content/frozen";
import { LANG, LOCALES, localeHref } from "../content/i18n";
import { SOCIALS } from "./socials";
import { scrollToTop } from "../scroll/scrollToTop";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  /* 下拉里可折叠的父项(目前只有 Ncore 2.0)。**默认全部收起**,
     要看四页链式内容的人自己点开(2026-07-22 用户定案)。
     每次整个菜单关掉时重置,免得下次打开还记着上次展开的状态。 */
  const [expanded, setExpanded] = useState<string[]>([]);
  const toggleExpand = (label: string) =>
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  const close = () => {
    setOpen(false);
    setExpanded([]);
  };
  const { pathname } = useLocation();
  const current = LOCALES.find((l) => l.code === LANG) ?? LOCALES[0];

  /* 点空白处关掉语言下拉 */
  useEffect(() => {
    if (!langOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!(e.target as Element)?.closest(".nav__langwrap")) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLangOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  /* 点 logo/NASLAB 字回首页最顶(2026-07-21 用户要求)。
     已经在首页时路由不变 → Layout 的 ScrollToTop 不会触发,
     所以这里自己滚回去;不在首页则照常路由过去,由 ScrollToTop 归零。 */
  const onBrandClick = () => {
    close();
    if (pathname === ROUTES.home) {
      scrollToTop();
    }
  };

  // Fullscreen overlay menu: freeze the page behind it while open.
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  return (
    <header className="nav">
      <div className="nav__inner">
        {/* 手机版:三横线汉堡钮在最左(NASLAB logo 左边)——2026-07-17 用户指令 */}
        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-label={UI.toggleNav}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        <Link className="nav__brand" to={ROUTES.home} onClick={onBrandClick}>
          <img
            className="nav__brand-mark"
            src="/naslab-logo-mark.png"
            alt=""
            width={36}
            height={36}
          />
          <img
            className="nav__brand-word"
            src="/naslab-wordmark.png"
            alt="NASLAB"
          />
        </Link>

        <nav className={`nav__menu${open ? " nav__menu--open" : ""}`}>
          <ul className="nav__list">
            {NAV.map((item) =>
              item.children ? (
                <li className="nav__item nav__item--group" key={item.label}>
                  <span className="nav__link nav__link--group">
                    {item.label}
                  </span>
                  <ul className="nav__sub">
                    {item.children.map((child) => {
                      /* 缩进子项:只有它的父项被点开时才渲染 */
                      if (child.sub && !expanded.includes(child.parent!)) {
                        return null;
                      }
                      const hasKids = item.children!.some(
                        (c) => c.sub && c.parent === child.label,
                      );
                      const isOpen = expanded.includes(child.label);
                      return (
                        <li className="nav__subrow" key={child.label}>
                          <NavLink
                            /* --parent:自己有子项的行(Ncore 2.0)。它的 to 和
                               第一个子页(Basic Understanding)是同一条路由,
                               两行会同时拿到 .active,手机上就是两个高亮块叠着 ——
                               所以父行只留金字、不要底块,底块归具体子页。 */
                            className={
                              child.sub
                                ? "nav__sublink nav__sublink--sub"
                                : hasKids
                                  ? "nav__sublink nav__sublink--parent"
                                  : "nav__sublink"
                            }
                            to={child.to}
                            onClick={close}
                          >
                            {child.label}
                          </NavLink>
                          {hasKids && (
                            <button
                              type="button"
                              className={`nav__subtoggle${isOpen ? " is-open" : ""}`}
                              aria-expanded={isOpen}
                              aria-label={`${isOpen ? "Collapse" : "Expand"} ${child.label}`}
                              /* 必须拦住:否则点箭头会顺着冒泡触发导航/关菜单 */
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleExpand(child.label);
                              }}
                            >
                              <svg viewBox="0 0 10 6" aria-hidden="true">
                                <path
                                  d="M1 1l4 4 4-4"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.4"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ) : (
                <li className="nav__item" key={item.label}>
                  <NavLink className="nav__link" to={item.to!} onClick={close}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          {/* 手机版抽屉底部 footer:CONNECT 眉标 + 居中圆环社媒钮,整块贴到最底部。
              登录入口顶栏右上已有,这里不再重复(2026-07-18 用户指令)。桌面版隐藏。 */}
          <div className="nav__drawer-foot">
            <div className="nav__connect-eyebrow">
              <span className="nav__connect-line" aria-hidden="true" />
              <span className="nav__connect-label">{UI.connect}</span>
              <span className="nav__connect-line" aria-hidden="true" />
            </div>

            <div className="nav__socials">
              {SOCIALS.map((s) => (
                <a
                  className="nav__social"
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
        </nav>

        {/* 手机版常驻在顶栏右侧(语言圆 pill → login 圆 pill),桌面版原位。 */}
        <div className="nav__aside">
          {/* 14 语种切换。整页跳转(企业站标准做法)—— 语种由 URL 前缀决定,
              跳过去后 i18n.ts 在模块加载时读前缀,不需要 Context 或 re-render。 */}
          <div className="nav__langwrap">
            <button
              className="nav__lang"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={UI.langLabel}
              onClick={() => setLangOpen((v) => !v)}
            >
              <span aria-hidden="true">{current.flag}</span>
              <span className="nav__lang-label"> {current.code.toUpperCase()}</span>
            </button>
            {langOpen && (
              <ul className="nav__langmenu" role="listbox" aria-label={UI.langLabel}>
                {LOCALES.map((l) => (
                  <li key={l.code}>
                    <a
                      className={`nav__langitem${l.code === LANG ? " is-current" : ""}`}
                      href={localeHref(l.code, pathname)}
                      hrefLang={l.code}
                      lang={l.code}
                      role="option"
                      aria-selected={l.code === LANG}
                    >
                      <span className="nav__langflag" aria-hidden="true">{l.flag}</span>
                      <span className="nav__langname">{l.native}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* 按 memberportal landing 的按钮字眼/样式(2026-07-17 用户指令) */}
          <a className="nav__login" href={LOGIN_URL} aria-label={UI.memberLogin}>
            <span className="nav__login-label">{UI.memberLogin}</span>
            <span className="nav__login-arrow" aria-hidden="true">→</span>
            <svg className="nav__login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.6-3.2 4.6-5 8-5s6.4 1.8 8 5" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
