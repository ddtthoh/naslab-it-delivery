/**
 * /ncore/basic — naslabtec.com/ncore/basic 子页全文(2026-07-17 P1 补齐)
 * + alpha 设计侧的两张附属 UI 卡(MEMPOOL STREAM / TRADING LOGIC)保留。
 * 定稿视觉逐节嵌入。
 */

import { BASIC_PAGE, ROUTES, S5_NCORE_3 } from "../content/frozen";
import { useDesktop } from "../hooks/useDesktop";
import {
  Block,
  CtaLink,
  CtaRow,
  DataCard,
  ImageSlot,
  MediaSection,
  PageHead,
} from "../components/ui";

/**
 * 静态转视频第二批(2026-07-21 用户验收通过)—— 四节逐节配片。
 * 按定稿图路径查表,frozen.ts 的内容不动。首帧是空场景 ≠ 定稿图,
 * 所以 poster 取同名 -poster.jpg,开播前先显示首帧、播完定格回定稿图。
 */
const SECTION_VIDEOS: Record<string, string | undefined> = {
  "/img/ncore-blockchain-execution.jpg": "/video/ncore-blockchain-execution.mp4",
  "/img/ncore-swap-state.jpg": "/video/ncore-swap-state.mp4",
  // 2026-08-09 重做:静图与视频全部换成通用 NCORE 版(画面不刻版本号),
  // 视频用官网批原文 prompt(job 6d73cd25)重生成,5 秒压成 3.02 秒。
  "/img/ncore-execution-order.jpg": "/video/ncore-execution-order.mp4",
  "/img/ncore-summary.jpg": "/video/ncore-summary.mp4",
};

/**
 * 2026-07-22 用户定案:ncore-summary 的手机框保持 4:3、电脑框改 16:9 → 两套素材。
 * 同一条视频塞进比例不同的两个框会被 cover 裁掉,所以按 901px 断点切换。
 * 其余三条两端都是同一比例,不受影响。
 */
const MOBILE_43: Record<string, string | undefined> = {
  "/img/ncore-summary.jpg": "/video/ncore-summary-4x3.mp4",
};

function pickVideo(img: string, desktop: boolean) {
  if (!desktop && MOBILE_43[img]) return MOBILE_43[img];
  return SECTION_VIDEOS[img];
}

export default function NcoreBasic() {
  const b = BASIC_PAGE;
  const desktop = useDesktop();
  const { mempoolCard, logicCard } = S5_NCORE_3;

  return (
    <Block>
      <PageHead kicker={b.title} title={b.subtitle} body={b.leadBody}>
        <CtaRow>
          <CtaLink to={ROUTES.contact} variant="solid">
            CONTACT US
          </CtaLink>
          <CtaLink to={ROUTES.ncoreTrading}>{b.nextChapter.cta}</CtaLink>
        </CtaRow>
      </PageHead>

      <ImageSlot
        label="Ncore 3.0 hero visual"
        ratio="16 / 9"
        src="/img/ncore3-hero.jpg"
        video="/video/ncore3-hero.mp4"
        videoPoster="/video/ncore3-hero-poster.jpg"
      />

      {/* 附属 UI 卡 A(alpha 设计侧) */}
      <DataCard title={mempoolCard.title}>
        <table className="stream">
          <tbody>
            {mempoolCard.rows.map((row) => (
              <tr key={row.hash}>
                <td className="stream__hash">{row.hash}</td>
                <td className="stream__kind">{row.kind}</td>
                <td className="stream__gas">{row.gas}</td>
                <td className="stream__size">{row.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataCard>

      {b.sections.map((sec, i) => (
        <MediaSection
          index={i + 1}
          title={sec.heading}
          img={sec.img}
          video={pickVideo(sec.img, desktop)}
          videoPoster={pickVideo(sec.img, desktop)?.replace(".mp4", "-poster.jpg")}
          flip={i % 2 === 1}
          key={sec.heading}
        >
          {sec.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </MediaSection>
      ))}

      {/* 附属 UI 卡 B(alpha 设计侧) */}
      <DataCard title={logicCard.title} meta={logicCard.meta}>
        <p className="flow">{logicCard.flow}</p>
      </DataCard>

      <section className="xsec">
        <h2 className="xsec__h">{b.takeaways.heading}</h2>
        <p className="xsec__p">{b.takeaways.sub}</p>
        <dl className="pointlist">
          {b.takeaways.items.map((t) => (
            <div className="pointlist__item" key={t.num}>
              <dt className="pointlist__title">
                {t.num} · {t.title}
              </dt>
              <dd className="pointlist__body">{t.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="xsec">
        <p className="kicker">{b.nextChapter.kicker}</p>
        <h2 className="xsec__h">{b.nextChapter.heading}</h2>
        <p className="xsec__p">{b.nextChapter.body}</p>
        <CtaRow>
          <CtaLink to={ROUTES.ncoreTrading} variant="solid">
            {b.nextChapter.cta}
          </CtaLink>
        </CtaRow>
      </section>
    </Block>
  );
}
