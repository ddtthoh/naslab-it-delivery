/**
 * /contact — naslabtec.com/contact 版(2026-07-17 P1 补齐)。
 * 表单按 naslabtec 实际结构:First/Last Name 双栏、无 ORGANIZATION、
 * 必填 Title 主题下拉(CONFLICT 15,按「内容以 naslabtec 为主」采用;
 * 原 alpha [01]-[05] 5 字段版保留在 S11_CONTACT 未删)。
 * 表单仍为 inert——无后端 endpoint。
 *
 * 2026-07-19 排版改造(用户定稿:方案 A):
 * 旧版是「左邮箱 / 右表单」+ 图垫在最底 —— 左栏只有三行却要和 6 字段表单并排,
 * 重心严重偏右;且图的位置与全站其他页(标题 → hero 图 → 内容)不一致。
 * 现改为:标题 → hero 图 → 单栏表单(姓名/邮箱电话各并两栏)→ 邮箱收尾。
 * 另删掉「Customer Support」空值标签(内容缺失,页面上显示为挂着标题没有内容)。
 */

import { CONTACT_PAGE, S11_CONTACT } from "../content/frozen";
import { Block, ImageSlot, PageHead } from "../components/ui";

/** 并两栏显示的字段(其余占满整行) */
const PAIRED = new Set(["firstName", "lastName", "email", "phone"]);

export default function Contact() {
  const c = CONTACT_PAGE;

  return (
    <Block>
      <PageHead kicker={S11_CONTACT.kicker} title={c.title} body={c.body} />

      {/* 图升到页首 —— 与 Strategy / Careers / Roadmap 同结构 */}
      <ImageSlot
        label="Contact visual — channel-open / connection imagery"
        ratio="16 / 9"
        src="/img/contact-hero.jpg"
        video="/video/contact-hero.mp4"
        videoPoster="/video/contact-hero-poster.jpg"
      />

      <form className="form form--contact" onSubmit={(e) => e.preventDefault()}>
        {c.fields.map((field) => {
          const id = `field-${field.name}`;
          const paired = PAIRED.has(field.name);
          return (
            <p
              className={`form__field${paired ? " form__field--half" : ""}`}
              key={field.name}
            >
              <label className="form__label" htmlFor={id}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea className="form__input" id={id} rows={5} />
              ) : field.type === "select" ? (
                <select className="form__input" id={id} defaultValue="">
                  {("options" in field ? field.options : []).map((opt) => (
                    <option key={opt} value={opt === "Select a topic" ? "" : opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input className="form__input" id={id} type={field.type} />
              )}
            </p>
          );
        })}

        {/* 表单为静态原型:提交后端(邮件/接口)尚未接,按钮先禁用。
            页面上不再显示英文占位注释(用户 2026-07-17 反馈看不懂)。 */}
        <p className="form__actions">
          <button className="btn btn--solid" type="submit" disabled>
            {c.submit}
          </button>
        </p>
      </form>

      {/* 邮箱收尾。原「Customer Support」标签的值在内容里是空的,
          页面上会显示成挂着标题没有内容,故移除(2026-07-19 用户指出)。 */}
      <dl className="contact__details">
        <div className="contact__detail">
          <dt className="contact__detail-label">{c.emailLabel}</dt>
          <dd className="contact__detail-value">
            <a className="contact__mail" href={`mailto:${c.email}`}>
              {c.email}
            </a>
          </dd>
        </div>
      </dl>
    </Block>
  );
}
