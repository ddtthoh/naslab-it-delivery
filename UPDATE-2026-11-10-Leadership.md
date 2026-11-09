# NASLAB 官网 · 领导层改双人卡（2026-11-10）

> 📌 **主要看这张图**：Release `v2026.11.10` 的附件 **`naslab-leadership-changes-20261110.png`**
> —— 改了哪 4 个地方、没动哪些、怎么部署、怎么验收，全在那一张图里。本文只是同内容的文字版。
> **对照基准 = 你现在线上的 `v2026.08.10`。**

## 一句话

About 页的领导层区块从**一位**变成**两位**：Fabian Vossberg（Chief Executive Officer）在左、Peter Kovac（Chief Technology Officer）在右。13 个语种同步。

**其余 9 个页面、路由、部署配置、72 支影片 —— 一个字都没动。**

---

## 部署：两种选一种

### A. 整包覆盖（跟 v2026.08.10 同样流程，最稳）

到 Releases 下载本版的 `naslab-website.zip`，解压覆盖站点根目录 → 完成。
**SPA 回落配置沿用原来的，不用动**（见 `IT部署说明.md`）。

### B. 增量覆盖（只传约 1.9 MB，赶时间用这个）

只替换这 4 个档案：

| 动作 | 路径 |
|---|---|
| 覆盖 | `index.html` |
| 新增 | `assets/index-<hash>.js` |
| 新增 | `assets/index-<hash>.css` |
| 新增 | `img/about-fabian-vossberg.jpg` |

（实际 hash 档名以 zip 内的为准。）
然后**删掉 `assets/` 里旧的那一组 `index-*.js` 与 `index-*.css`**（不删也不会出错，只是占空间）。

⚠️ `index.html` 必须一起换 —— 它指向新的 hash 档名，不换会继续载入旧版。

---

## 上线后 30 秒验收

1. 打开 **`/about`** → 领导层区块是**两张并排、等大**的卡；左 Fabian Vossberg、右 Peter Kovac
2. 缩到手机宽度 → 变成**单栏**，**Fabian 在上**
3. 打开 **`/zh/about`** → 同样两张卡，职称与简介是中文
4. 打开 **`/ar/about`** → 右至左镜像，**Fabian 在右边**

任何一项不对 → 多半是 `index.html` 没换到新的。

---

## 完全没有变的东西（不用重新设定）

- **路由**：`/`、`/naslab`、`/strategy`、`/ncore/basic`、`/ncore/x`、`/ncore/token`、`/careers`、`/collaboration`、`/roadmap`、`/contact` —— 清单不变
- **SPA 回落**：Nginx `try_files` / Apache `.htaccess` / Cloudflare fallback，全部沿用
- **缓存与压缩建议**：不变
- **影片**：72 支共约 265 MB，**一支都没动**
- **其他 9 个页面**：零改动
- Ncore 3.0 的图与影片是 `v2026.08.10` 已交付的内容，**不是这次的改动**

---

## 本次改动源档

| 档案 | 改了什么 |
|---|---|
| `src/content/en.ts` | `ABOUT_PAGE.leadership` 单人 → `people[]` 双人 |
| `src/content/locales/*.json` | 13 个语种同一个区块（ar de es fa hi id it ja ko th tr vi zh） |
| `src/pages/About.tsx` | 领导层区块改成 `people.map()` 双卡 |
| `src/styles/site.css` | 新增 `.leaders` / `.leader` / `.leader__role` / `.leader__scope` / `.leader__quote` |
| `public/img/about-fabian-vossberg.jpg` | 新增人像 1350×1800，与 Peter 同规格 |

## 验收数据（交付前已跑）

`tsc -b` + `vite build` 零报错 ｜ 桌面双栏 485 / 485 px（等宽）｜ 人像同高 646 px
手机 375 单栏 335 px、无横向溢出 ｜ 各段文字溢出量 0 px ｜ RTL（ar/fa）镜像正确
