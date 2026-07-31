# NASLAB 官网 · IT 部署说明

交付物:`naslab-website.zip`(约 296MB,解压后约 298MB / 243 个文件)

## 这是什么

纯静态网站(React 单页应用,Vite 构建产物)。**不需要 Node、不需要数据库、不需要任何后端** —— 解压后扔到任何静态文件服务器 / CDN 即可运行。

## 部署步骤

1. 解压 zip,得到 `index.html` + `assets/` + `img/` + `video/` 等
2. 把全部内容放到 Web 服务器的站点根目录
3. 配置 **SPA 路由回落**(唯一必做的配置,见下)
4. 绑定域名 + HTTPS 证书(常规操作)

## ⚠️ 唯一必做配置:SPA 路由回落

本站是单页应用,`/ncore/token`、`/careers` 这类路径没有对应的物理文件。
必须把**所有未命中静态文件的请求回落到 `/index.html`**,否则用户刷新子页面或直接打开子页链接会 404。

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache(.htaccess):**
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Cloudflare Pages / Netlify / Vercel**:平台自带 SPA fallback 选项,勾选即可(Netlify 加 `_redirects` 文件:`/*  /index.html  200`)。

## 建议配置(非必须)

- **缓存**:`assets/`、`img/`、`video/` 下文件名不带 hash 的图片视频建议 `Cache-Control: max-age=86400`;`assets/` 下带 hash 的 js/css 可以 `max-age=31536000, immutable`;`index.html` 设 `no-cache`
- **压缩**:开启 gzip/brotli(js/css 收益大;jpg/mp4 已压缩,无需再压)
- **视频**:72 条 mp4 共约 262MB(首页 + 各内页的 hero/说明视频),已按 web 优化(H.264 + faststart)。服务器需支持 **HTTP Range 请求**(主流服务器默认支持),视频才能边下边播。首页地球 `earth-spin.mp4` 为 60fps 无缝循环高清版(1600×1600)

## 站点结构

- 路由:`/`(首页)、`/naslab`、`/strategy`、`/ncore/basic`、`/ncore/x`、`/ncore/token`、`/careers`、`/collaboration`、`/roadmap`、`/contact`
- 无任何外部 API 调用、无第三方脚本、无 cookie —— 纯展示站
- 兼容:现代浏览器(Chrome/Safari/Edge/Firefox 近两年版本),手机端已适配

## 联系

页面内容、设计、视频素材问题 → 找 Heng(源项目与 4K 母片均在其本机保管)。
