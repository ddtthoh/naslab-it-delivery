# NASLAB — IT 交付 / IT Delivery（源码 + 成品）

本私有仓库交付 NASLAB **官网**与**会员门户**,同时提供**源码(可自行构建)**与**成品(可直接部署)**。

Private repo delivering the NASLAB **website** and **member portal**, as both **source code** (build it yourself) and **prebuilt artifacts** (deploy directly).

---

## 目录结构 / Layout

| 路径 | 内容 |
|---|---|
| `website/` | 官网源码(React 19 + TanStack Start + Vite)。`src/` 代码 + `public/` 素材(视频/图) |
| `portal/`  | 会员门户源码(4 个静态 HTML:登录/注册/忘记/重置)。本身即成品,无需构建 |
| `IT-website-deploy.md` | 官网部署说明 |
| **Releases** | 打包好的成品 zip(不想构建就直接下这个) |

## A. 想自己构建官网 / Build the website from source

```bash
cd website
npm install
npm run build      # 产物在 website/dist/
```
把 `website/dist/` 的全部内容部署到任意静态服务器 / CDN,并配一条 **SPA 路由回落到 `/index.html`**(详见 `IT-website-deploy.md`)。无需后端。

> 首页地球 `public/earth-spin.mp4` 为 **60fps 无缝循环**高清版。改社媒/文案等在 `website/src/` 内。

## B. 不想构建,直接部署 / Just deploy the prebuilt build

到 **Releases** 下载:
- `naslab-website.zip` —— 官网 `dist` 成品,解压即部署(同样配 SPA 回落)
- `naslab-portal-auth-20260723.zip` —— 会员门户四页

## 会员门户 / Member portal

`portal/`(或 Release 里的门户 zip)是登录区前端。四页静态 HTML,表单字段名已对齐现有 `member.naslabtec.com` 后端;上线时按 `portal/SPEC.md` **删掉演示用的 preventDefault、接到真实后端**。

## 备注 / Notes

- 官网视频较多(72 条),服务器需支持 **HTTP Range 请求**(主流默认支持)。
- 本仓库为**私有**,仅授权协作者可见/可下载。
