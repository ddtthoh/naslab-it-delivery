# NASLAB 官网原型 — 说明（earth-final：最终定妆版地球）

## 启动

```bash
cd website-redesign/site
npm install        # 首次
npm run dev        # http://localhost:5199（被占用时自动跳 5200）
npm run build      # tsc + vite 产物到 dist/
```

## 当前状态

最终定妆版地球是全站唯一皮肤（`src/three/final/`），视觉基准：

- 定妆升级图：`blueprint/earth-v2/concepts/upgrade-v3-samecolor.png`
- alpha 站现役地球原帧（层配方来源）

旧的三个设计变体（Hex Sovereign / Circuit Continents / Aurum Core）保留在
`src/three/variants/` 与 `src/three/variant.ts`，**已不再被引用**，仅存档。
变体切换钮已从 App.tsx 移除。

## 代码结构

```
src/three/
  final/
    config.ts            ★ 全部图层参数集中在 FINAL 对象（逐项中文注释）
    shaders.ts           定妆版 GLSL（surface/corona/arc/hexGlow/bokeh/plexus）
    FinalGlobe.tsx       八个图层的组装 + 各层组件
    Effects.tsx          辉光后期（EffectComposer + UnrealBloomPass）
  Globe.tsx              入口（直接渲染 FinalGlobe）
  GlobeScene.tsx         Canvas + 滚动 rig（关键帧未动；新增 ?zoom QA 参数）
  shared.tsx / shaders.ts  旧共享层（噪声库 NOISE_GLSL 仍被 final 复用）
src/scroll/keyframes.ts  三屏位移/旋转/缩放关键帧（未动）
src/components/Sections.tsx  文案（冻结，未动）
```

## 图层清单（参数全部在 `final/config.ts` 的 `FINAL` 对象）

| # | 图层 | config 键 | 说明 |
|---|------|-----------|------|
| 0 | 辉光后期 | `bloom` | UnrealBloomPass（`final/Effects.tsx`）：城市光柔和溢出光晕、日冕“燃”、弧线亮头/hexGlow 泛光。`threshold` 控多少亮度起辉，`strength/radius` 控量和宽。mip 链自 1/2 分辨率起步（半分辨率内建） |
| 1 | 大陆城市光 | `surface` | NASA Black Marble 真实夜景贴图，r-b 通道差提取暖色城市光（锐、可数）；`lonOffset` 转贴图选正对大陆；`lightGain/lightGamma/lightIntensity` 调光点密度/硬度/亮度 |
| 2 | 日冕 | `corona.inner/outer/halo` | 三层 BackSide fresnel：内层亮金燃烧圈、外层橙红渐隐、halo 超宽超淡延伸层（贴齐 g8 的远距橙光晕）；`flame/noiseScale/flameSpeed` 控火焰扰动（视空间采样，不随自转） |
| 3 | 弧线网络 | `arcs` | 36 条大圆弧分两档：`mainCount` 条主弧亮粗（`tubeRadius`/`alphaMin~Max`/`headDotPx`），其余细暗（`tubeRadiusMinor`/`alphaMinorMin~Max`/`headDotPxMinor`）；红橙渐变 + 流动亮头（comet 衰减）+ 圆形亮头光点 |
| 4 | HUD 节点环 | `hud` | 10 个，附着弧线端点：圆环缺口 + 细六角 + 内点 + 2~3 条微刻线（CanvasTexture 随机生成），出现-停留-消散循环、相位随机 |
| 5 | plexus 星网 | `plexus` | 球外 90 节点近邻连线，极淡金，整层慢速反向自转 |
| 6 | hexagon glow | `hexGlow` | InstancedBufferGeometry（全 GPU 动画）：尺寸 pow 偏度随机（4px~40px 级）、呼吸相位独立、simplex 漂移、出现-消失周期 5~16s 随机 → 无整齐循环感 |
| 7 | 蜂窝微肌理 | `hexSkin` | 写在 surface shader 里，暗部极淡蜂窝网（近看才见），`cellsAround` 保持整数=经线无缝 |
| 8 | bokeh 光斑 | `bokeh` | 按对焦距离算 CoC：近大糊、远小锐；`focusDist/focusRange` 调景深 |

另有两个非图层配置块：

- `background`：画布/页面底色（纯 onyx `#070503`，html/body/canvas 三处一致）。
- `ctaShield`：CTA 保护区 —— hexGlow/bokeh 粒子投影落进屏幕中央文字带
  （x 20%~80%，y 35%~75%）时透明度衰减到 `keep`（30%），边缘 `soft` 软过渡，
  避免粒子洗字（在两个 vertex shader 里按 NDC 计算，零 CPU 开销）。

色调铁律：金黄 `#f7c65a~#ffdf9a`（城市光）+ 橙 `#ff9a3c~#ff6a1f`（日冕）。
改颜色只改 config，不进 shader。

### 色彩管理（动 Effects.tsx 前必读）

全场景是手写 ShaderMaterial（颜色直出）。接入 EffectComposer 后为保持
逐像素同款观感，`Effects.tsx` 里把 renderer 设成
`NoToneMapping + LinearSRGBColorSpace`（最终 copy pass 不做二次
tone mapping / sRGB 编码）。副作用：HUD（MeshBasicMaterial）和 plexus
连线（LineBasicMaterial）不再吃 ACES+sRGB 提亮，略暗一点点——已目检可接受；
嫌暗调 `hud.maxOpacity` / `plexus.lineOpacity`。scene.background 用
`setRGB(..., LinearSRGBColorSpace)` 手动解析 hex 绕开色彩管理转换，
否则 `new Color(hex)` 会被转成 linear、屏幕上比 `#070503` 更黑（踩过）。

## 贴图来源

- `public/textures/earth-night.jpg`：NASA Black Marble 2016（公有领域），
  3600×1800，源：eoimages.gsfc.nasa.gov `BlackMarble_2016_01deg.jpg`。
- 加载失败时 shader 自动回退 fbm 程序化大陆（`uUseMap=0`，无需干预）。

## QA 参数

- `/?s=N`（0/1/2）：钉住某一屏检查关键帧（照旧）
- `/?zoom=1.7`：额外放大地球（拍特写用，GlobeScene.tsx）
- `/?bare=1`：隐藏全部文案层只留地球（拍特写用，App.tsx）
- 可组合：`/?s=1&zoom=1.7&bare=1`

## 审稿对比图

`website-redesign/blueprint/earth-final/earth-final-{s0,s1,s2,closeup}.png`
（780×844，headless Chrome CDP 实拍 dist 产物）。

截图方法（headless Chrome 的 `--virtual-time-budget` 会打乱 rAF 场景，
不要用）：起真实时间的 CDP 会话 → navigate → 等 9s（shader 编译 + 贴图
加载 + 阻尼归位）→ `Page.captureScreenshot`。脚本参考本次会话
scratchpad `cdp-shot.mjs`（node ≥22 原生 WebSocket 即可，无需 puppeteer）。
静态服务：`cd dist && python3 -m http.server 5310`。

注意：地球有 0.055 rad/s 自转，截图时刻决定正对的大陆；`surface.lonOffset`
按「加载后 ~9s 正对美洲（s=1）」标定，改等待时长要连带微调 lonOffset。

## 性能

- dpr 上限 2（GlobeScene `dpr={[1,2]}`），几何：球 128 段、日冕 64 段 ×3、
  弧线 TubeGeometry 48 段 ×36（主弧 10 粗管 + 26 细管）、hexGlow 110 实例
  （单 draw call）、粒子若干。
- 后期：EffectComposer（HalfFloat + MSAA×4 场景 RT）+ UnrealBloomPass
  （mip 链自 1/2 分辨率起步，即半分辨率 bloom）。headless dpr2 实测
  rAF 中位 16.7ms（60fps 锁帧，软件光栅下仍达标；真 GPU 余量更大）。
  手机预算紧的话先降 RT `samples` 4→2，再降 `bloom.radius`。

## 已知问题 / 备注

- `/favicon.ico` 404（无害；要消掉就在 public/ 放一个）。
- ~~hexGlow 粒子偶尔漂到 CTA 按钮正后方洗字~~ → 已用 `ctaShield`
  保护区解决（中央文字带内粒子透明度衰减到 30%）。
- 「页面最底部露出全宽热带海水照片」（用户真机截图）：站内查无此图 ——
  public/、dist/、CSS、Sections、打包产物里唯一位图是 earth-night.jpg
  （夜景，非海水），DOM 里也没有任何 `<img>`/背景图能到页脚。判定为
  macOS 橡皮筋过滚区暴露的合成器/显存残影（过滚区不归页面绘制，可能闪现
  其他标签页/应用的贴图）。已加固：`html{ overscroll-behavior:none }` +
  html/body/canvas 三处统一不透明纯 onyx `#070503`（--bg 从 #0a0805 收深），
  页面到底为纯黑，过滚被禁。若真机复现请再截图连滚动位置一起报。
- 贴图经度缝（equirect 接缝）落在太平洋暗区，肉眼不可见。
- 老变体文件仍参与 tsc 编译（保持能编译通过），如彻底退役可删除
  `src/three/variants/` + `variant.ts`。
- WebGL 上下文：同一浏览器标签反复热重载 >8 次可能触发 Context Lost
  （Chrome 每标签上下文上限），刷新/换标签即恢复，产线无此场景。
- 文案冻结：`src/components/Sections.tsx` 未动；滚动关键帧
  `src/scroll/keyframes.ts` 未动。
