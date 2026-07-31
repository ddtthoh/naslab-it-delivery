# NASLAB — IT 交付包 / IT Delivery

本仓库只用于向 IT 交付 NASLAB 官网与会员门户的**可部署成品**。
两个成品都放在 **Releases** 页面(见右侧 / 顶部 Releases,或本仓库 Release 链接)。

This repo hands the deployable builds of the NASLAB website and member portal to IT.
Both artifacts are attached to the **latest Release**.

---

## 下载什么 / What to download (see Releases)

| 附件 Asset | 大小 | 内容 | 部署说明 |
|---|---|---|---|
| `naslab-website.zip` | ~311MB | 官网(React 静态站,含全部视频) | 见本仓库 `IT-website-deploy.md` |
| `naslab-portal-auth-20260723.zip` | ~7MB | 会员门户:登录/注册/忘记/重置四页 | 解压后见包内 `portal-auth/SPEC.md` |

## 快速部署要点 / TL;DR

- **官网**:纯静态站,解压丢到任意静态服务器/CDN,配一条 **SPA 路由回落到 `/index.html`** 即可(详见 `IT-website-deploy.md`)。无需后端。
- **门户**:4 个静态 HTML 页,是登录区前端。表单字段名已对齐现有 `member.naslabtec.com` 后端;上线时按包内 `SPEC.md` **删掉演示用的 preventDefault、接到真实后端**。

## 注意 / Notes

- 官网首页地球为 **60fps 无缝循环**高清版。
- 视频较多(官网 72 条),服务器需支持 **HTTP Range 请求**(主流服务器默认支持)。
- 本仓库为**私有**,仅授权人员可见。
