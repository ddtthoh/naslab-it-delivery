/**
 * /strategy — naslabtec.com/strategy 全文(文案 1:1 frozen)。
 *
 * 2026-07-18 版式节奏改造(用户定稿):
 * 原先全页 9 连击 MediaSection,节奏完全平 → 判定为模板感(铁律⑨)。
 * 现按六种区块交错编排,同样的文案与定稿图,只改结构:
 *   宣言段 → 2-up 卡片网格 → 通栏大图 → 3-up 要点 → 不对称分栏
 *   → Media → 通栏大图 → 3-up 要点 → 宣言段 → 不对称分栏 → Media 收尾
 * MediaSection 保留但只用 2 次。
 */

import { ROUTES, STRATEGY_PAGE } from "../content/frozen";
import { card43 } from "../content/card43";
import { useDesktop } from "../hooks/useDesktop";
import {
  Block,
  CardGrid,
  CtaLink,
  CtaRow,
  FullBleed,
  GridCard,
  GridPoint,
  ImageSlot,
  Kicker,
  MediaSection,
  PageHead,
  SplitAsym,
  Statement,
} from "../components/ui";

export default function Strategy() {
  const s = STRATEGY_PAGE;
  // 本页有 5 个「一个版位两套素材」的图位,按 901px 断点切换:
  //   security / vision  —— 桌面 3:4、手机 16:9(2026-07-21 用户定稿:方案 B)
  //   partnership / innovation —— 桌面 16:9、手机 4:3(2026-07-22 用户验收通过)
  //   growth —— 桌面 16:9,手机换成 4:3【框也一起变高】,用户要「放大框、主体也大」
  // 比例不一致的框配同一条视频,object-fit:cover 就会把画面裁掉。
  const desktop = useDesktop();

  return (
    <Block>
      <PageHead kicker={s.title} title={s.subtitle} body={s.intro[0]}>
        <CtaRow>
          <CtaLink to={ROUTES.roadmap} variant="solid">
            View Strategic Roadmap
          </CtaLink>
        </CtaRow>
      </PageHead>

      <ImageSlot
        label="Strategy hero"
        ratio="16 / 9"
        src="/img/strategy-hero.jpg"
        video="/video/strategy-hero.mp4"
        videoPoster="/video/strategy-hero-poster.jpg"
      />

      {/* 宣言段 — intro 第二段抬为大字,做开篇顿点 */}
      <Statement>{s.intro[1]}</Statement>

      {/* 2-up 卡片网格 — 两根支柱是并列关系,用并列版式 */}
      <section>
        <Kicker>{s.pillars.heading}</Kicker>
        <CardGrid cols={2}>
          {s.pillars.items.map((p, i) => (
            <GridCard
              key={p.title}
              title={p.title}
              img={card43(
                i === 0
                  ? "/img/strategy-holistic.jpg"
                  : "/img/strategy-tailored.jpg",
              )}
              video={
                i === 0
                  ? "/video/strategy-holistic.mp4"
                  : "/video/strategy-tailored.mp4"
              }
              videoPoster={
                i === 0
                  ? "/video/strategy-holistic-poster.jpg"
                  : "/video/strategy-tailored-poster.jpg"
              }
            >
              <p>{p.body}</p>
            </GridCard>
          ))}
        </CardGrid>
      </section>

      {/* 通栏大图 — Strategic Focus 当章节封面 */}
      {/* 2026-07-22 用户验收通过:首帧空场 → 山落位 → 云出现 → 旗落位 → 旗飘 → 定格。
          注意本版位手机框是 4:3、桌面框 16:9,素材是 16:9 → 手机端仍会 cover 裁 25.6%
          (与之前挂静图时相同,不是新引入)。用户已知,暂未要求出 4:3 手机版。 */}
      {/* 2026-07-22 用户复核后定案:叠加标题【留着】—— 只有下面本来就有同名标题的
          版位(NcoreToken 的 Tokenomics)才去掉,其余不能变成无标题的一节。 */}
      <FullBleed
        title={s.focus1.heading}
        img="/img/strategy-success.jpg"
        video="/video/strategy-success.mp4"
        videoPoster="/video/strategy-success-poster.jpg"
      />

      {/* 3-up 要点 — 三点横向排比 */}
      <CardGrid cols={3}>
        {s.focus1.items.map((p) => (
          <GridPoint key={p.title} title={p.title}>
            <p>{p.body}</p>
          </GridPoint>
        ))}
      </CardGrid>

      {/* 不对称分栏 60/40 + 竖图 — 锁的构图适合竖图,在整页横图里制造对比 */}
      <SplitAsym
        title={s.security.heading}
        img={
          desktop
            ? "/img/strategy-security-3x4.jpg"
            : "/img/strategy-security.jpg"
        }
        video={
          desktop
            ? "/video/strategy-security-3x4.mp4"
            : "/video/strategy-security.mp4"
        }
        videoPoster={
          desktop
            ? "/video/strategy-security-3x4-poster.jpg"
            : "/video/strategy-security-poster.jpg"
        }
      >
        <p>{s.security.body}</p>
        <ul className="chips">
          {s.security.chips.map((c) => (
            <li className="chip" key={c}>
              {c}
            </li>
          ))}
        </ul>
      </SplitAsym>

      {/* Media 左右交替(保留用法之一) */}
      {/* 2026-07-22 用户验收通过:补 4:3 手机素材。原来手机 cover 会切掉最左的青铜牌
          和最右带皇冠的金牌(上升叙事的首尾)。新版把斜链排陡 24°→33°、奖牌收紧,
          六枚全部完整入画,青铜牌反而放大 15.3%。尾帧 SSIM 0.984。 */}
      <MediaSection
        index={1}
        title={s.growth.heading}
        img={
          desktop
            ? "/img/strategy-partnership.jpg"
            : "/img/strategy-partnership-4x3.jpg"
        }
        video={
          desktop
            ? "/video/strategy-partnership.mp4"
            : "/video/strategy-partnership-4x3.mp4"
        }
        videoPoster={
          desktop
            ? "/video/strategy-partnership-poster.jpg"
            : "/video/strategy-partnership-4x3-poster.jpg"
        }
      >
        <p>{s.growth.body}</p>
        <h3 className="scenario__title">{s.growth.focusHeading}</h3>
        <dl className="pointlist">
          {s.growth.items.map((p) => (
            <div className="pointlist__item" key={p.title}>
              <dt className="pointlist__title">{p.title}</dt>
              <dd className="pointlist__body">{p.body}</dd>
            </div>
          ))}
        </dl>
      </MediaSection>

      {/* 通栏大图 — Innovation 当第二个章节封面 */}
      {/* 2026-07-22 用户验收通过:补 4:3 手机素材。注意这条的 4:3 就是 16:9 的中心裁切,
          和手机原本 cover 出来的画面几乎一样(实测 SSIM 0.977)—— 用户知情后仍选择用它,
          因为动画是按 4:3 重新生成的。发动机主体尺寸与原来逐像素相等,没有变小。 */}
      <FullBleed
        title={s.innovation.heading}
        img={
          desktop
            ? "/img/strategy-innovation.jpg"
            : "/img/strategy-innovation-4x3.jpg"
        }
        video={
          desktop
            ? "/video/strategy-innovation.mp4"
            : "/video/strategy-innovation-4x3.mp4"
        }
        videoPoster={
          desktop
            ? "/video/strategy-innovation-poster.jpg"
            : "/video/strategy-innovation-4x3-poster.jpg"
        }
      />

      {/* Innovation 两个子块 */}
      <section className="xsec">
        {s.innovation.blocks.map((b) => (
          <article key={b.title}>
            <h3 className="scenario__title">{b.title}</h3>
            <p className="xsec__p">{b.body}</p>
          </article>
        ))}
      </section>

      {/* 金树图(Ensuring Long-Term Growth)— 2026-07-19 接回:
          改造首版把这段做成纯文字网格,这张定稿图掉队了。
          此处「Strategic Focus」已用 Kicker 呈现,不再用 FullBleed 标题,
          避免与前面 focus1 的同名通栏标题重复。 */}
      {/* 2026-07-22 用户验收通过:手机端框从 16:9 换成 4:3(210px → 279px,高 +33%),
          素材同步换成 4:3 —— 主体(树+币)线性放大 1.345 倍。桌面保持 16:9 不变,
          免得比同页其它 hero 高出一截。代价:币扇最左最右两枚出血到画外,用户已确认接受。 */}
      <ImageSlot
        label="Long-term growth — NCT fund tree"
        ratio={desktop ? "16 / 9" : "4 / 3"}
        src={
          desktop ? "/img/strategy-growth.jpg" : "/img/strategy-growth-4x3.jpg"
        }
        video={
          desktop
            ? "/video/strategy-growth.mp4"
            : "/video/strategy-growth-4x3.mp4"
        }
        videoPoster={
          desktop
            ? "/video/strategy-growth-poster.jpg"
            : "/video/strategy-growth-4x3-poster.jpg"
        }
      />

      {/* 3-up 要点 — Ensuring Long-Term Growth */}
      <section>
        <Kicker>{s.innovation.focusHeading}</Kicker>
        <CardGrid cols={3}>
          {s.innovation.items.map((p) => (
            <GridPoint key={p.title} title={p.title}>
              <p>{p.body}</p>
            </GridPoint>
          ))}
        </CardGrid>
      </section>

      {/* Why Choose Naslab — 通栏封面(NASLAB 大脑图,2026-07-19 接回)+ 3-up 要点 */}
      <FullBleed
        title={s.whyChoose.heading}
        img="/img/strategy-intelligence.jpg"
        video="/video/strategy-intelligence.mp4"
        videoPoster="/video/strategy-intelligence-poster.jpg"
      />
      <CardGrid cols={3}>
        {s.whyChoose.items.map((p) => (
          <GridPoint key={p.title} title={p.title}>
            <p>{p.body}</p>
          </GridPoint>
        ))}
      </CardGrid>

      {/* Naslab's Vision — 不对称分栏(竖向铭牌图适合) */}
      <SplitAsym
        title={s.visionAhead.visionHeading}
        img={
          desktop ? "/img/strategy-vision-3x4.jpg" : "/img/strategy-vision.jpg"
        }
        video={
          desktop
            ? "/video/strategy-vision-3x4.mp4"
            : "/video/strategy-vision.mp4"
        }
        videoPoster={
          desktop
            ? "/video/strategy-vision-3x4-poster.jpg"
            : "/video/strategy-vision-poster.jpg"
        }
      >
        <h3 className="scenario__title">{s.visionAhead.commitHeading}</h3>
        <p>{s.visionAhead.commitBody}</p>
        <p>
          <strong>{s.visionAhead.visionSub}</strong>
        </p>
        <p>{s.visionAhead.visionBody}</p>
      </SplitAsym>

      {/* Media 收尾 — 全球枢纽 */}
      <MediaSection
        index={2}
        title={s.visionAhead.aheadHeading}
        img="/img/strategy-global.jpg"
        video={
          desktop
            ? "/video/strategy-global.mp4"
            : "/video/strategy-global-4x3.mp4"
        }
        videoPoster={
          desktop
            ? "/video/strategy-global-poster.jpg"
            : "/video/strategy-global-4x3-poster.jpg"
        }
        flip
      >
        <p>
          <strong>{s.visionAhead.aheadSub}</strong>
        </p>
        <dl className="pointlist">
          {s.visionAhead.items.map((p) => (
            <div className="pointlist__item" key={p.title}>
              <dt className="pointlist__title">{p.title}</dt>
              <dd className="pointlist__body">{p.body}</dd>
            </div>
          ))}
        </dl>
      </MediaSection>
    </Block>
  );
}
