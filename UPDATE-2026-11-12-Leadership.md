# NASLAB 官网 · 领导层职称调整 + Fabian 人像更换（2026-11-12）

> 📌 **主要看这张图**：Release `v2026.11.12` 的附件 **`naslab-leadership-titles-20261112@3x.png`**
> —— 改了哪 6 个地方、没动哪些、怎么部署、怎么验收，全在那一张图里。本文只是同内容的文字版。
> **对照基准 = 上一版 `v2026.11.10`。**

## 一句话

About 页领导层区块：**Peter Kovac = Chief Executive Officer（排第一）**，**Fabian Vossberg = Chief Executive Officer-Designate（2027 年 1 月上任，排第二）**；文案 14 语种同步，Fabian 换新人像。

**其余页面、路由、部署配置、样式（CSS）、72 支影片 —— 一个都没动。**

---

## 部署：两种选一种

### A. 整包覆盖（建议，跟上次同样流程）

到 Releases 下载 `v2026.11.12` 的 `naslab-website.zip`，解压覆盖站点根目录 → 完成。
SPA 回落配置沿用原来的，不用动（见 `IT部署说明.md`）。

### B. 增量覆盖（赶时间用）

| 动作 | 路径 |
|---|---|
| 覆盖 | `index.html` |
| 新增 | `assets/index-C4CPUaad.js` |
| 覆盖 | `img/about-fabian-vossberg.jpg` |

CSS（`assets/index-B2I7D4nm.css`）**不变**。旧的 `assets/index-CWuziCMy.js` 可删（不删也不会出错）。

⚠️ `index.html` 必须一起换 —— 它指向新的 JS 档名，不换会继续载入旧版。
⚠️ 人像图是**同名覆盖**：若部署后 Fabian 仍显示旧照，清一次 CDN／浏览器缓存。

---

## 上线后 30 秒验收

1. 打开 **`/about`** → 左 **Peter Kovac「Chief Executive Officer」**、右 **Fabian Vossberg「Chief Executive Officer-Designate」**；Fabian 是新人像（扣西装扣）
2. 缩到手机宽度 → 单栏，**Peter 在上**
3. **`/zh/about`** → 首席执行官 / 候任首席执行官
4. **`/ar/about`** → 右至左镜像

---

## 本次改动源档

| 档案 | 改了什么 |
|---|---|
| `website/src/content/en.ts` | 领导层副标题、两人职称／职能行／引言／简介 |
| `website/src/content/locales/*.json` | 13 个语种同一区块（ar de es fa hi id it ja ko th tr vi zh） |
| `website/src/pages/About.tsx` | 只改渲染顺序（Peter 在前），数据结构不动 |
| `website/public/img/about-fabian-vossberg.jpg` | 新人像，同名同规格 1350×1800 |

## 验收数据（交付前已跑）

`tsc -b` + `vite build` 零报错 ｜ en / zh / ar 顺序抽验：Peter 第一 ｜ 手机 375（德文最长）无横向溢出 ｜ 全站「Chief Technology Officer／首席技术官」0 处 ｜ zip 档案清单与 v2026.11.10 相同，仅 JS hash 不同
