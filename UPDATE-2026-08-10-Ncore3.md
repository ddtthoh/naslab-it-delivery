# NASLAB 官网更新说明 · 2026-08-10

**这次更新做了一件事：把产品从 Ncore 2.0 全面升级成 Ncore 3.0。**

包含三部分：① 文字改了（版本号 + 两页整篇重写）② 图片换了（4 张）③ 视频换了（4 条）。
网站的结构、路由、技术栈、部署方式**完全没有变**，你按原来的方式重新构建/部署就行。

---

## 一、你要做什么（最短路径）

### 如果你是从源码构建的
```bash
cd website
npm install      # 依赖没变，装过的话可以跳过
npm run build    # 产物在 website/dist/
```
把 `website/dist/` 全部内容覆盖到原来的站点目录 → 完成。
SPA 路由回落那条配置**沿用原来的，不用动**（说明见 `IT-website-deploy.md`）。

### 如果你是直接部署成品 zip 的
到 Releases 下载 **`v2026.08.10`** 里的 `naslab-website.zip`，解压覆盖原目录 → 完成。

> ⚠️ **不要再用 `v2026.07.31` 那个 zip**，那是升级前的 Ncore 2.0 版本，已标注为历史版本。

### 部署后请清一次 CDN 缓存
这次有 **8 个图片/视频文件是"同名换内容"**（文件名没变，里面的画面变了）。
如果你的 CDN / 浏览器缓存没清，用户看到的还会是旧图旧视频。
需要清缓存的文件清单见下面第三、四节。

---

## 二、文字改了哪里

### 1. 全站「Ncore 2.0」→「Ncore 3.0」
出现在这些地方，全部已改：

| 位置 | 具体是什么 |
|---|---|
| 顶部导航 → Products 下拉 | 「Ncore 2.0」这一项改成「Ncore 3.0」 |
| 页脚 PRODUCTS 栏 | 同上 |
| 首页第 3 屏 | 标题「Ncore 2.0 — Predictive MEV Trading for DEX Markets」→ 3.0 |
| Basic Understanding 页 | 正文里提到产品名的地方 |
| Trading Logic 页 | 整页（见下面第 2 点） |
| Features 页 | 整页（见下面第 3 点） |
| Market Trends 页 | 全文 + 每条下面的「NCORE 2.0 ADVANTAGE」小标题 |

**14 个语种全部同步改好了**（英文 + 中/日/韩/德/西/意/葡…共 13 份译文文件）。

> ⚠️ **Roadmap 页面的 2024、2025 历史条目故意保留「Ncore 2.0」**，不是漏改。
> 因为那是"当年做了什么"的历史记录，改成 3.0 会变成史实错误。
> 具体保留的是这三条：「完成 Ncore 2.0 核心架构…」「持续升级 Ncore 2.0…」「Ncore 2.0 实盘规模 ~$200K → ~$1M」。

### 2. Trading Logic 页 —— 整页文案换新
公司提供了新版文案，**整页英文重写了**（意思一样，措辞更正式、句子更完整）。
改动覆盖：页面副标题、Origins、MEV and Sandwich Strategy、Core Features、
Productized Value、Real-World Use Case、Development Path、Key Highlights、Staying Ahead —— **每一段都换了**。

页面结构、小标题的位置、按钮、图片位置**没动**。

### 3. Features 页 —— 整页文案换新 + 删了 1 条 + 删了结尾段
- 11 条特性的 HOW IT WORKS / WHY IT MATTERS **全部重写**（同样是措辞升级，不是改意思）
- **原来的第 12 条「Community Engagement and Support」整条删除** → 现在是 **11 条**
- **页面最底部那段总结文字删除**（"By incorporating these powerful features…"那一段）

### 4. Roadmap 页 —— 2026 那一段改了 2 条
| | 旧 | 新 |
|---|---|---|
| 第 1 条 | International expansion of Ncore 2.0 | **Ncore 3.0 successfully implemented** |
| 第 2 条 | Progressive live testing of Ncore X | **Ncore X - CEX Arbitrage launched** |
| 第 5 条 | Estimated Ncore 2.0 users: 100,000 | Estimated **Ncore 3.0** users: 100,000 |

这段 14 个语种也同步改了。

### 5. 首页那一屏的 HTML id 改了
首页第 3 屏的 `id="ncore-2"` 改成了 `id="ncore-3"`。

> ⚠️ **如果你们哪里有指向 `naslabtec.com/#ncore-2` 的链接**（宣传素材、邮件、社媒 bio 里的锚点链接），
> 要改成 `#ncore-3`，否则点了不会滚到那一屏（页面本身还是正常打开，只是不定位）。
> 站内所有链接我们已经改好了，这条只针对站外的。

---

## 三、图片换了哪 4 张

全部在 `website/public/img/`，尺寸都是 **1800×1004**，格式没变。

| 文件 | 用在哪一页 | 换了什么 |
|---|---|---|
| `ncore-trading.jpg` | Trading Logic 页顶部大图 | 重画。**画面上不再刻「2.0」字样，只刻 NCORE** |
| `ncore-features.jpg` | Features 页顶部大图 | 同上 |
| `ncore-execution-order.jpg` | Basic Understanding 页中段配图 | 同上 |
| `ncore3-hero.jpg` 🆕 | 首页第 3 屏 + Basic Understanding 页顶部 | **全新的图**，画面上刻「NCORE 3.0」 |

**为什么前三张不刻版本号了**：以后升到 4.0 时，这三张图不用重做，省一整轮返工。
只有主视觉 `ncore3-hero` 需要标明当前版本，所以它刻 3.0。

---

## 四、视频换了哪 4 条

全部在 `website/public/video/`，每条都是 **H.264 / yuv420p / 约 3.02 秒 / 无声**，
和站上其他 70 多条视频规格一致，播放方式没变（滚动进画面播一次，播完停在最后一帧）。

| 文件 | 用在哪一页 | 尺寸 | 大小 |
|---|---|---|---|
| `ncore-trading.mp4` | Trading Logic 页顶部 | 2016×1124 | 1.5 MB |
| `ncore-features.mp4` | Features 页顶部 | 2016×1124 | 1.6 MB |
| `ncore-execution-order.mp4` | Basic Understanding 页中段 | 1920×1070 | 1.6 MB |
| `ncore3-hero.mp4` 🆕 | 首页第 3 屏 + Basic Understanding 页顶部 | 1920×1072 | 3.5 MB |

每条视频都配了一张同名的 `-poster.jpg`（视频还没加载出来时先显示的那一帧），也一起换了：
`ncore-trading-poster.jpg`、`ncore-features-poster.jpg`、`ncore-execution-order-poster.jpg`、`ncore3-hero-poster.jpg`🆕

**总体积比旧版小了约 6 MB**（旧的 4 条约 13.7 MB，新的 4 条约 8.2 MB），加载会更快一点。

---

## 五、这些老文件已经没人用了（我们没删）

| 文件 | 状态 |
|---|---|
| `website/public/img/ncore-basic-hero.jpg` | 旧的首页/Basic 页大图，已被 `ncore3-hero.jpg` 取代，**代码里没有任何地方引用它了** |
| `website/public/video/ncore2-hero.mp4` | 同上，已被 `ncore3-hero.mp4` 取代 |

按规矩我们不擅自删文件，所以它们还留在仓库里（会被打进 `dist/`，多占约 4.2 MB）。
**如果你想清掉，可以直接删这两个文件，不会影响网站运行。** 删之前请先跟 Heng 确认一声。

---

## 六、这些都没有改（可以放心）

- 路由：`/`、`/naslab`、`/strategy`、`/ncore/basic`、`/ncore/trading`、`/ncore/features`、`/ncore/trends`、`/ncore/x`、`/ncore/token`、`/careers`、`/collaboration`、`/roadmap`、`/contact` —— **一条都没增没减没改名**
- 14 语种的 URL 前缀规则（`/zh/...`、`/ja/...` 等）
- `package.json` / 依赖 / 构建命令 / Node 版本要求
- 部署方式、SPA 回落配置、服务器要求（仍需支持 HTTP Range 请求）
- 首页地球、Ncore X 页、NCT Token 页、Careers、Collaboration、Contact 等其他页面
- 网站仍然是**纯静态**：无后端、无 API、无第三方脚本、无 cookie

---

## 七、上线后怎么快速验收（3 分钟）

1. 打开首页 → 往下滚到第 3 屏 → 标题应该是 **Ncore 3.0**，视频是新的（金色引擎，画面上有 NCORE 3.0 字样）
2. 顶部导航 Products 下拉 → 应该显示 **Ncore 3.0**
3. 进 `/ncore/features` → **数一下有几条特性，应该是 11 条**（不是 12 条），最底下没有总结段落
4. 进 `/ncore/trading` → 顶部大图的画面上**不应该出现任何「2.0」字样**
5. 进 `/roadmap` → 2024 / 2025 那几段**应该还是 Ncore 2.0**（这是对的），2026 那段是 Ncore 3.0
6. 切到中文 `/zh/` → 重复第 1、2、3 步，应该一样
7. F12 开控制台 → 刷新 → **不应该有红色报错**

如果第 1、4 步看到的还是旧画面 → 是缓存，清一下 CDN 和浏览器缓存。

---

## 八、有问题找谁

页面内容、设计、图片视频素材 → 找 **Heng**（源项目与 4K 母片在其本机保管）。
部署、服务器、缓存 → 你们这边按 `IT-website-deploy.md` 处理，配置没有任何变化。
