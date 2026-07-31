/**
 * Skeleton UI primitives. Deliberately plain: structure only.
 * Visual design (liquid glass, motion, refined typography) is the user's call —
 * do not decorate these beyond black + champagne gold.
 */

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PlayOnceVideo } from "./PlayOnceVideo";
import { useDesktop } from "../hooks/useDesktop";

/**
 * Image slot. With `src` it renders the final artwork; without, a labeled
 * placeholder marking what belongs there.
 * 加 `video` 后升级为产品 hero 视频(2026-07-20 用户定稿):
 * 进入视野从头播一次、结束定格、回滚再进入重播;poster 即原静图,
 * 视频加载前观感与纯图版一致。沿用 .slot-img 类,reveal/金框 hover 全部继承。
 */
export function ImageSlot({
  label,
  ratio = "16 / 9",
  src,
  video,
  videoPoster,
}: {
  label: string;
  ratio?: string;
  src?: string;
  video?: string;
  /** 视频首帧 ≠ 定稿图时必传(如保险箱开场):开播前显示首帧防跳变,
      reduced-motion 降级仍回落到 src 定稿图。 */
  videoPoster?: string;
}) {
  if (src && video) {
    return (
      <PlayOnceVideo
        className="slot-img"
        ratio={ratio}
        src={video}
        poster={videoPoster ?? src}
        still={src}
      />
    );
  }
  if (src) {
    return (
      <img
        className="slot-img"
        style={{ aspectRatio: ratio }}
        src={src}
        alt=""
        loading="lazy"
      />
    );
  }
  return (
    <div className="slot" style={{ aspectRatio: ratio }} role="presentation">
      <span className="slot__tag">IMAGE SLOT</span>
      <span className="slot__label">{label}</span>
    </div>
  );
}


/**
 * 版式区块内的图位媒体(2026-07-21):与 ImageSlot 同款「静图→视频」升级,
 * 但供 MediaSection / FullBleed / GridCard / SplitAsym 复用 —— 这些区块
 * 各自有自己的 className 和比例,故抽成共用件而非改 ImageSlot。
 * 传了 video 就渲染 PlayOnceVideo(进视野播一次、播完定格),否则原样出图。
 */
export function SlotMedia({
  className,
  img,
  video,
  videoPoster,
  imgLabel,
  title,
}: {
  className: string;
  img?: string | null;
  video?: string;
  videoPoster?: string;
  imgLabel?: string;
  title: string;
}) {
  if (img && video) {
    return (
      <PlayOnceVideo
        className={className}
        src={video}
        poster={videoPoster ?? img}
        still={img}
      />
    );
  }
  if (img) {
    return <img className={className} src={img} alt="" loading="lazy" />;
  }
  return (
    <div className={`slot ${className}`} role="presentation">
      <span className="slot__tag">IMAGE SLOT</span>
      <span className="slot__label">{imgLabel ?? title}</span>
    </div>
  );
}

/**
 * 图文分节(用户 2026-07-17 定稿):
 * 手机 = 方案 B —— 金色大序号+细线分节、4:3 图、正文纵排;
 * 桌面 = 方案 C —— 图 55% / 文 45% 左右交替(flip 由父级按 index 轮换)。
 */
export function MediaSection({
  index,
  title,
  img,
  video,
  videoPoster,
  imgLabel,
  flip = false,
  native43 = false,
  children,
}: {
  index: number;
  title: string;
  img?: string | null;
  video?: string;
  videoPoster?: string;
  imgLabel?: string;
  flip?: boolean;
  /** 素材本身就是 4:3(如 naslab-mastercard)时打开:桌面框不套 16:9,
      否则 4:3 的片塞进 16:9 的框会被上下切掉 25%(2026-07-22 实测)。 */
  native43?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`msec${flip ? " msec--flip" : ""}${
        native43 ? " msec--native43" : ""
      }`}
    >
      <header className="msec__top">
        <span className="msec__num">{String(index).padStart(2, "0")}</span>
        <h2 className="msec__h">{title}</h2>
      </header>
      <div className="msec__media">
        <SlotMedia
          className="msec__img"
          img={img}
          video={video}
          videoPoster={videoPoster}
          imgLabel={imgLabel}
          title={title}
        />
      </div>
      <div className="msec__body">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 版式节奏区块(2026-07-18 用户定稿)                                    */
/* 目的:打破「标题+正文+图」连续重复的模板感(铁律⑨)。                  */
/* MediaSection 保留但少用,与下列区块交错编排。                          */
/* ------------------------------------------------------------------ */

/**
 * 宣言段 —— 无图纯文字,金色左边线 + 大号衬线。
 * 作用是节奏顿点:在连续图文之间制造留白与呼吸。
 */
export function Statement({ children }: { children: ReactNode }) {
  return (
    <section className="state">
      <p className="state__q">{children}</p>
    </section>
  );
}

/**
 * 通栏大图 —— 标题压在图上,当章节分隔用,气势最强。
 * 手机端图比例自动从 21:9 收成 4:3(21:9 在窄屏会细成一条)。
 */
export function FullBleed({
  title,
  img,
  video,
  videoPoster,
  imgLabel,
  hideTitle = false,
}: {
  title: string;
  img?: string | null;
  video?: string;
  videoPoster?: string;
  imgLabel?: string;
  /** 只藏叠加的大字,图/视频照旧;title 仍作为无障碍标签用(2026-07-21 用户要求) */
  hideTitle?: boolean;
}) {
  return (
    <section className="full" aria-label={hideTitle ? title : undefined}>
      <SlotMedia
        className="full__img"
        img={img}
        video={video}
        videoPoster={videoPoster}
        imgLabel={imgLabel}
        title={title}
      />
      {!hideTitle && (
        <div className="full__ov">
          <h2 className="full__h">{title}</h2>
        </div>
      )}
    </section>
  );
}

/**
 * 卡片网格 —— 并列关系用并列版式(2 列或 3 列),窄屏塌成单列。
 * cols=2 配图卡(图 4:3 在上),cols=3 用于无图要点(细分隔线在上)。
 */
export function CardGrid({
  cols = 2,
  children,
}: {
  cols?: 2 | 3;
  children: ReactNode;
}) {
  return <div className={`cgrid cgrid--${cols}`}>{children}</div>;
}

/**
 * 网格里的图文卡(配 CardGrid cols=2 / cols=3)。
 *
 * 2026-07-22 用户定案:**桌面并排的卡片一律只放静态图,不放视频** ——
 * 两三条视频并排同时播太乱。手机是单列堆叠、不并排,所以照常播动画。
 * 断点用 useDesktop(901px),和 CSS 一致。
 */
export function GridCard({
  title,
  img,
  video,
  videoPoster,
  imgLabel,
  children,
}: {
  title: string;
  img?: string | null;
  video?: string;
  videoPoster?: string;
  imgLabel?: string;
  children: ReactNode;
}) {
  const desktop = useDesktop();

  return (
    <article className="ccard">
      <SlotMedia
        className="ccard__img"
        img={img}
        video={desktop ? undefined : video}
        videoPoster={desktop ? undefined : videoPoster}
        imgLabel={imgLabel}
        title={title}
      />
      <h3 className="ccard__h">{title}</h3>
      <div className="ccard__body">{children}</div>
    </article>
  );
}

/** 网格里的纯文字要点(配 CardGrid cols=3)。 */
export function GridPoint({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="cpoint">
      <h3 className="cpoint__h">{title}</h3>
      <div className="cpoint__body">{children}</div>
    </article>
  );
}

/**
 * 不对称分栏 60/40 —— 打破 50/50 的呆板,默认配竖图(3:4)。
 * 窄屏塌成单列,图比例转 16:9。
 */
export function SplitAsym({
  title,
  img,
  video,
  videoPoster,
  imgLabel,
  children,
}: {
  title: string;
  img?: string | null;
  video?: string;
  videoPoster?: string;
  imgLabel?: string;
  children: ReactNode;
}) {
  return (
    <section className="asym">
      <div className="asym__text">
        <h2 className="asym__h">{title}</h2>
        {children}
      </div>
      <div className="asym__media">
        <SlotMedia
          className="asym__img"
          img={img}
          video={video}
          videoPoster={videoPoster}
          imgLabel={imgLabel}
          title={title}
        />
      </div>
    </section>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="kicker">{children}</p>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="lead">{children}</p>;
}

/** Internal route button. */
export function CtaLink({
  to,
  children,
  variant = "outline",
}: {
  to: string;
  children: ReactNode;
  variant?: "outline" | "solid";
}) {
  return (
    // 文字必须包一层 span:hover 时金色填充是 ::before 铺满按钮,
    // 需要一个能设 z-index 的元素把文字压在填充之上(纯文本节点做不到)。
    <Link className={`btn${variant === "solid" ? " btn--solid" : ""}`} to={to}>
      <span className="btn__t">{children}</span>
    </Link>
  );
}

export function CtaRow({ children }: { children: ReactNode }) {
  return <div className="cta-row">{children}</div>;
}

/** Page masthead: kicker + serif title + body + CTAs. */
export function PageHead({
  kicker,
  title,
  body,
  children,
}: {
  kicker?: string;
  title: string;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-head">
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <h1 className="page-title">{title}</h1>
      {body ? <Lead>{body}</Lead> : null}
      {children}
    </header>
  );
}

/** Section masthead used inside a page (renders an h2, not an h1). */
export function SectionHead({
  kicker,
  title,
  body,
  children,
}: {
  kicker?: string;
  title: string;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <header className="page-head">
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <h2 className="page-title page-title--section">{title}</h2>
      {body ? <Lead>{body}</Lead> : null}
      {children}
    </header>
  );
}

/** Labelled prose block (Ncore 2.0 fundamentals / logic / features panels). */
export function Panel({ label, body }: { label: string; body: string }) {
  return (
    <article className="panel">
      <h2 className="panel__label">{label}</h2>
      <p className="panel__body">{body}</p>
    </article>
  );
}

/** Bordered card used for the frozen "附属 UI 卡" data mock-ups. */
export function DataCard({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <section className="card">
      <header className="card__head">
        <h3 className="card__title">{title}</h3>
        {meta ? <span className="card__meta">{meta}</span> : null}
      </header>
      <div className="card__body">{children}</div>
    </section>
  );
}

/** Section wrapper inside a page. */
export function Block({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="block" id={id}>
      {children}
    </section>
  );
}
