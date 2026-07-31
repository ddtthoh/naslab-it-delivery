/**
 * 语言判定 + 字典深合并。
 *
 * 设计目标:**页面文件零改动。** 全站文案集中在 en.ts,13 个页面照旧
 * `import { S1_HERO } from "../content/frozen"`,不用改成 t() 调用 ——
 * frozen.ts 变成解析层,在这里把 EN 与语种字典合并后再重新导出同名 const。
 *
 * 语种来源 = URL 前缀(方案 C1):`/ja/about`、`/ar/ncore/x`;英文是 `/`(无前缀)。
 * 切换语言 = 整页跳转,所以语种在模块加载时就已确定,不需要 Context 或 re-render。
 */

/** 14 个语种。顺序 = 语言下拉的显示顺序。 */
export const LOCALES = [
  { code: "en", label: "English", native: "English", flag: "🇺🇸" },
  { code: "zh", label: "Chinese", native: "中文", flag: "🇨🇳" },
  { code: "ja", label: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "Korean", native: "한국어", flag: "🇰🇷" },
  { code: "th", label: "Thai", native: "ไทย", flag: "🇹🇭" },
  { code: "vi", label: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", label: "Indonesian", native: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "hi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "fa", label: "Persian", native: "فارسی", flag: "🇮🇷" },
  { code: "ar", label: "Arabic", native: "العربية", flag: "🇸🇦" },
  { code: "tr", label: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  { code: "es", label: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "it", label: "Italian", native: "Italiano", flag: "🇮🇹" },
  { code: "de", label: "German", native: "Deutsch", flag: "🇩🇪" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];

const CODES = LOCALES.map((l) => l.code) as readonly string[];

/** RTL 语种。整页镜像(方案 A1),只做左右镜像,字号/间距/配色/素材一律不动。 */
const RTL = new Set<string>(["ar", "fa"]);

/** `document.documentElement.lang` 用的 BCP 47 标签,与 code 不完全相同。 */
const HTML_LANG: Record<string, string> = { zh: "zh-CN" };

function detect(): LocaleCode {
  if (typeof window === "undefined") return "en";
  const seg = window.location.pathname.split("/")[1];
  return (CODES.includes(seg) ? seg : "en") as LocaleCode;
}

/** 当前语种。模块加载时定一次,整页跳转才会变。 */
export const LANG: LocaleCode = detect();
export const IS_RTL = RTL.has(LANG);

/** react-router 的 basename:英文无前缀,其余是 `/{lang}`。 */
export const BASENAME = LANG === "en" ? "/" : `/${LANG}`;

/**
 * 把当前路径换到另一个语种,用于语言下拉的 href。
 * `/ja/about` + "ar" → `/ar/about`;`/about` + "ja" → `/ja/about`。
 */
export function localeHref(target: LocaleCode, pathname?: string): string {
  const p = pathname ?? (typeof window === "undefined" ? "/" : window.location.pathname);
  const parts = p.split("/").filter(Boolean);
  if (parts.length && CODES.includes(parts[0]) && parts[0] !== "en") parts.shift();
  const rest = parts.length ? `/${parts.join("/")}` : "/";
  return target === "en" ? rest : `/${target}${rest === "/" ? "" : rest}`;
}

/* ---- 字典 ------------------------------------------------------------ */
/* eager 是硬要求:页面在模块作用域就 import 具名 const,拿不到异步结果。
   13 份字典静态打包约 200KB gzip;站点本身已有 15MB 级视频,可接受。 */
const FILES = import.meta.glob<Record<string, unknown>>("./locales/*.json", {
  eager: true,
  import: "default",
});

const DICT: Record<string, unknown> =
  LANG === "en" ? {} : ((FILES[`./locales/${LANG}.json`] as Record<string, unknown>) ?? {});

/**
 * 深合并规则(SPEC 已定):对象按键合并、**数组按下标合并**、标量直接替换。
 * 数组按下标是关键 —— 译文字典只提供需要翻译的下标,图片路径、路由这类
 * 未提供的位置自动保留英文。
 */
function merge<T>(base: T, over: unknown): T {
  if (over === undefined || over === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(over)) return base;
    return base.map((v, i) => merge(v, over[i])) as unknown as T;
  }
  if (base && typeof base === "object") {
    if (typeof over !== "object" || Array.isArray(over)) return base;
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const k of Object.keys(out)) out[k] = merge(out[k], (over as Record<string, unknown>)[k]);
    return out as T;
  }
  return (typeof over === "string" ? over : base) as T;
}

/** 按顶层块名取译文并与英文深合并。未提供译文的键自动回落英文。 */
export function t<T>(block: string, en: T): T {
  return merge(en, DICT[block]);
}

/* ---- 文档属性 --------------------------------------------------------
   在模块加载时就写,避免首屏闪一下再切。
   `lang` 不只是语义:CSS 的 text-transform 靠它决定用哪套大小写规则 ——
   土耳其语没有 lang="tr" 的话 i 会转成 I 而不是 İ,全站 CTA 静默出错。
   泰语的词典断行、日文/中文的断行规则同样依赖它。 */
if (typeof document !== "undefined") {
  document.documentElement.lang = HTML_LANG[LANG] ?? LANG;
  document.documentElement.dir = IS_RTL ? "rtl" : "ltr";
}
