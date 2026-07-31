/**
 * 解析层 —— 页面继续 `import { S1_HERO } from "../content/frozen"`,一行都不用改。
 *
 * 2026-07-22 多语言改造:
 *   en.ts      英文源(原 frozen.ts 原样搬过去,字面量一个字符没动)
 *   locales/   14 语种覆盖字典,键路径与 EN 相同
 *   frozen.ts  ← 本文件。按当前语种深合并 EN + 字典,再以**原来的具名 const** 重新导出
 *
 * 铁律不变:**改文案只改 en.ts**(并同步 CONTENT-FREEZE.md)。
 * 这里只做合并与再导出,不含任何字面量。
 *
 * 未提供译文的键自动回落英文 —— 图片路径、路由、邮箱因此无需在字典里重复。
 */

import * as EN from "./en";
import { t } from "./i18n";

/* 类型原样透传 */
export type { NavChild, NavItem, RoadmapPhase } from "./en";

/* ---- 永不翻译:路由与外部 URL ---------------------------------------- */
export const ROUTES = EN.ROUTES;

/**
 * 本机预览时 Login 指向**我们自己的门户设计稿**(portal-auth,:4185),
 * 不要跳去线上 member.naslabtec.com —— 那样点一下就跳出设计稿,连不成一条验收动线。
 *
 * 只在 localhost / 127.0.0.1 / 局域网内网段改写(手机实机验收走的是局域网 IP,
 * portal-auth 那个 server 也绑了 0.0.0.0,所以把主机名原样换过去就能通)。
 * 打包上线时 hostname 不匹配,自动走回 EN.LOGIN_URL 原值 —— **交付内容不受影响**。
 */
const PORTAL_PREVIEW_PORT = 4185;

function isLocalHost(h: string): boolean {
  return (
    h === "localhost" ||
    h === "127.0.0.1" ||
    /^10\./.test(h) ||
    /^192\.168\./.test(h) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(h)
  );
}

/* 公网预览(higgsfield.app)与本机同理:官网和门户挂在同一个域,
   Login 走站内 /portal/,不跳线上 member.naslabtec.com。
   正式域名两条都不匹配,回落 EN.LOGIN_URL —— 交付内容不受影响。 */
export const LOGIN_URL: string =
  typeof window !== "undefined" && isLocalHost(window.location.hostname)
    ? `${window.location.protocol}//${window.location.hostname}:${PORTAL_PREVIEW_PORT}/login.html`
    : typeof window !== "undefined" &&
        window.location.hostname.endsWith(".higgsfield.app")
      ? "/portal/login.html"
      : EN.LOGIN_URL;

/* ---- 导航 ------------------------------------------------------------ */
export const NAV = t("NAV", EN.NAV);

/* ---- 首页 S1–S12 ----------------------------------------------------- */
export const S1_HERO = t("S1_HERO", EN.S1_HERO);
export const S2_NEW_ERA = t("S2_NEW_ERA", EN.S2_NEW_ERA);
export const S3_MISSION = t("S3_MISSION", EN.S3_MISSION);
export const S4_DIRECTION = t("S4_DIRECTION", EN.S4_DIRECTION);
export const S5_NCORE_2 = t("S5_NCORE_2", EN.S5_NCORE_2);
export const S6_NCORE_X = t("S6_NCORE_X", EN.S6_NCORE_X);
export const S7_NCT = t("S7_NCT", EN.S7_NCT);
export const S8_CAREERS = t("S8_CAREERS", EN.S8_CAREERS);
export const S9_COLLABORATION = t("S9_COLLABORATION", EN.S9_COLLABORATION);
export const S10_ROADMAP = t("S10_ROADMAP", EN.S10_ROADMAP);
export const S11_CONTACT = t("S11_CONTACT", EN.S11_CONTACT);
export const S12_FOOTER = t("S12_FOOTER", EN.S12_FOOTER);

/* ---- 内页 ------------------------------------------------------------ */
export const ABOUT_PAGE = t("ABOUT_PAGE", EN.ABOUT_PAGE);
export const STRATEGY_PAGE = t("STRATEGY_PAGE", EN.STRATEGY_PAGE);
export const ROADMAP_EXTRA = t("ROADMAP_EXTRA", EN.ROADMAP_EXTRA);
export const BASIC_PAGE = t("BASIC_PAGE", EN.BASIC_PAGE);
export const TRADING_PAGE = t("TRADING_PAGE", EN.TRADING_PAGE);
export const FEATURES_PAGE = t("FEATURES_PAGE", EN.FEATURES_PAGE);
export const TRENDS_PAGE = t("TRENDS_PAGE", EN.TRENDS_PAGE);
export const X_PAGE = t("X_PAGE", EN.X_PAGE);
export const NCT_PAGE = t("NCT_PAGE", EN.NCT_PAGE);
export const CAREERS_PAGE = t("CAREERS_PAGE", EN.CAREERS_PAGE);
export const COLLAB_PAGE = t("COLLAB_PAGE", EN.COLLAB_PAGE);
export const CONTACT_PAGE = t("CONTACT_PAGE", EN.CONTACT_PAGE);

/* ---- 页面里散落的硬编码 UI 字眼 --------------------------------------
   这些原本写死在 Nav.tsx / ScrollUx.tsx / Roadmap.tsx / ui.tsx 里,
   英文源在 i18n/en-extra.json。接线时组件改成读这里即可。 */
const UI_EN = {
  memberLogin: "Member Login",
  connect: "Connect",
  toggleNav: "Toggle navigation",
  langLabel: "Language",
  imageSlot: "IMAGE SLOT",
  backToTop: "Back to top",
  roadmapPhases: "Roadmap phases",
};
export const UI = t("UI", UI_EN);
