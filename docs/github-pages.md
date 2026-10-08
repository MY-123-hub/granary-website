# 智慧粮仓检测系统 · 产品官网

官网：https://my-123-hub.github.io/granary-website/

独立仓库：https://github.com/MY-123-hub/granary-website

Astro 7 + TypeScript + 原生 CSS，静态网站，无业务服务、数据库或账号系统。保留明亮极简的页面、字体、动画与截图交互。

## 本地开发

需要 Node.js >= 22.12。

```sh
npm ci
npm run dev
```

本地默认根路径 `/`，预览地址 `http://127.0.0.1:4321/`。

## 自动部署

`main` 每次推送触发 `.github/workflows/deploy.yml`：安装锁定依赖 → 校验发布信息和类型 → 静态构建 → 检查页面、资源及更新 JSON → 部署 GitHub Pages。也可在 Actions 页面手动执行。

Pages 来源设为 **GitHub Actions**。构建从 `configure-pages` 读取域名与 base path，不需要 Secrets、Token、服务器或付费域名。独立仓库中直接修改和推送 `main` 即可更新公网网站。

复现项目子路径构建：

```sh
PUBLIC_SITE_URL=https://my-123-hub.github.io PUBLIC_BASE_PATH=/granary-website npm run build
```

页面各自生成静态 `index.html`，直达和刷新 `/product/`、`/download/`、`/changelog/`、`/docs/` 及文档详情不依赖 SPA 路由回退。公共链接与图片使用 `src/lib/paths.ts`；CSS 资源由 Vite 自动加 base。预览项目路径时在相同环境变量下运行 `npm run preview`。

## 内容维护

- 文字与组件：`src/pages/`、`src/components/`。
- 排版与配色：`src/styles/global.css`；设计规范见 `docs/design-system.md`。
- 真实截图：`public/images/`；元信息在 `src/data/product.ts`。
- 首屏界面：`MonitoringPreview.astro`；明确标注的样本在 `monitoring-preview.ts`。
- 字体：`public/fonts/`，自托管 Noto Sans SC 子集，保留 SIL OFL 授权；维护说明见字体目录 README。

## Windows 安装包

目前版本配置为草稿，下载页明确显示即将发布；没有上传 exe，也没有虚构下载链接。公开发布客户安装包时，单独在本仓库 **Releases** 上传经过正式验证的客户 Setup.exe，勿上传签发工具、授权文件或整个安装介质文件夹。

唯一版本来源是 `src/data/releases.json`。正式公开时填写 `status: "published"`、`publishedAt`、`version`、Release 附件的 HTTPS `downloadUrl`、真实 `sizeBytes`、`sha256` 与 `releaseNotes`，再提交并推送。大小和校验可用 `npm run release:inspect -- /path/to/Setup.exe` 获取。

客户端下载查询地址：https://my-123-hub.github.io/granary-website/update/latest.json 。只有公开版本进入响应；当前为 `available: false`。GitHub Pages 使用平台缓存规则，客户端查询时应禁用本地缓存；本阶段不含自动安装逻辑。

## 从业务工作区更新

原工作区的 `website/` 修改后，运行 `npm run export:pages`，按文件白名单同步到相邻的独立 `官网发布/` 仓库。审查其 `git diff` 后提交并推送 `main`。不推送原业务仓库，不包含原 Git 历史；导出只复制官网源文件和公共素材。
