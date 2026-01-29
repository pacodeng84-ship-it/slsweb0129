# Cloudflare Pages 部署操作指南

## 前言

本指南将详细介绍如何使用 Cloudflare Pages 部署和管理您的 SLS 3D 打印服务网站。Cloudflare Pages 是 Cloudflare 提供的静态网站托管服务，具有全球 CDN 加速、零配置 SSL、自定义域名等优势。

## 前提条件

在开始部署前，请确保您已具备以下条件：

1. 一个 [Cloudflare](https://www.cloudflare.com/) 账号
2. 一个 [GitHub](https://github.com/) 账号，并且已将项目代码推送到 GitHub 仓库
3. 基本的 Git 操作知识

## 一、准备工作

### 1. 确保项目配置正确

检查项目根目录是否包含以下文件：

- `_redirects` - 用于配置路由重定向规则，确保单页应用路由正常工作
- `wrangler.jsonc` - Cloudflare Pages 部署配置文件
- `package.json` - 包含正确的构建脚本

项目中已有的 `_redirects` 文件配置了基本的重定向规则，确保所有请求都指向 `index.html`，这是 React 单页应用在静态托管服务上正常工作的关键：

```
/* /index.html 200
```

`wrangler.jsonc` 文件已配置了基本的部署参数：

```json
{
  "name": "precision-sls-3d-printing",
  "compatibility_date": "2026-01-06",
  "assets": {
    "directory": "./dist/static"
  }
}
```

`package.json` 文件中的构建脚本也已正确配置：

```json
"scripts": {
  "dev:client": "vite --host --port 3000",
  "dev": "pnpm dev:client",
  "build:client": "vite build --outDir dist/static",
  "build": "rm -rf dist && pnpm build:client && cp _redirects dist/static/_redirects && touch dist/build.flag",
  "deploy": "npx wrangler deploy",
  "deploy:pages": "npm run build && npx wrangler pages deploy dist/static"
}
```

### 2. 本地构建测试

在部署前，建议先在本地进行构建测试，确保项目能正常构建：

```bash
# 使用 npm
npm install
npm run build

# 或使用 pnpm
pnpm install
pnpm run build
```

构建成功后，检查 `dist/static` 目录是否生成了正确的文件，包括 `index.html`、`_redirects` 和其他静态资源。

## 二、部署到 Cloudflare Pages

### 方法一：使用 Wrangler CLI 部署（推荐）

1. **安装 Wrangler CLI**

   ```bash
   npm install -g wrangler
   # 或
   pnpm add -g wrangler
   ```

2. **登录 Cloudflare**

   ```bash
   wrangler login
   ```

   此命令会打开浏览器，要求您登录 Cloudflare 账号并授权 Wrangler 访问您的 Cloudflare 资源。

3. **部署项目**

   项目中已配置了部署脚本，直接运行：

   ```bash
   # 使用 npm
   npm run deploy:pages
   
   # 或使用 pnpm
   pnpm run deploy:pages
   ```

   这个命令会先构建项目，然后使用 Wrangler 将构建产物部署到 Cloudflare Pages。

### 方法二：通过 Cloudflare 控制台部署

1. **登录 Cloudflare 控制台**

   访问 [Cloudflare 控制台](https://dash.cloudflare.com/) 并登录您的账号。

2. **创建 Pages 项目**

   - 点击左侧菜单中的 "Pages"
   - 点击 "Create a project" 按钮
   - 选择 "Connect to Git" 选项
   - 选择您的 GitHub 账号并授权 Cloudflare 访问您的仓库
   - 选择要部署的仓库
   - 配置构建设置：
     - **Framework preset**: 选择 "Vite"
     - **Build command**: `npm run build` 或 `pnpm run build`
     - **Build output directory**: `dist/static`
     - **Root directory**: 保持为空（使用根目录）
   - 点击 "Save and Deploy" 按钮开始部署

## 三、自定义域名设置

部署完成后，Cloudflare 会为您的网站分配一个临时域名（如 `your-project.pages.dev`）。您可以将自己的域名绑定到 Cloudflare Pages 项目：

1. **在 Cloudflare 中添加域名**

   - 确保您的域名已添加到 Cloudflare 并完成 DNS 解析配置
   - 在 Pages 项目设置中，点击 "Custom domains" 选项
   - 点击 "Add custom domain" 按钮
   - 输入您的域名（如 `www.your-domain.com`）
   - 按照提示完成 DNS 记录配置

2. **配置 HTTPS**

   Cloudflare Pages 会自动为您的自定义域名配置 SSL/TLS 证书，通常几分钟内即可完成。

## 四、管理和更新网站

### 更新内容

当您对网站内容进行修改后，需要重新部署：

1. 将更改推送到 GitHub 仓库
2. 如果使用 Wrangler CLI，运行 `npm run deploy:pages` 或 `pnpm run deploy:pages`
3. 如果通过控制台部署，Cloudflare 会自动检测 GitHub 仓库的更改并触发重新部署（如果已配置自动部署）

### 查看部署日志

您可以在 Cloudflare 控制台的 Pages 项目中查看每次部署的详细日志，帮助排查部署过程中可能出现的问题。

## 五、常见问题及解决方案

### 1. 路由 404 问题

如果访问除首页外的其他路由时出现 404 错误，这通常是因为缺少正确的路由重定向配置。确保 `_redirects` 文件已正确添加到项目根目录，并且内容为：

```
/* /index.html 200
```

这个规则会将所有请求重定向到 `index.html`，由 React Router 在客户端处理路由。

### 2. 部署失败

如果部署失败，请检查以下几点：

- 构建命令是否正确
- 构建输出目录是否正确
- 项目依赖是否已正确安装
- 查看部署日志，寻找具体的错误信息

### 3. 静态资源加载问题

确保在代码中使用相对路径引用静态资源，避免使用绝对路径（除非您已配置了正确的基础路径）。

## 六、其他有用功能

### 环境变量

Cloudflare Pages 支持配置环境变量，可以在项目设置的 "Environment variables" 部分添加。

### 预览部署

每次推送代码到分支时，Cloudflare 会自动创建预览部署，方便您在正式发布前查看更改效果。

### 自定义构建命令

如果您的项目需要特殊的构建步骤，可以在 Cloudflare Pages 项目设置中自定义构建命令。

## 总结

Cloudflare Pages 是一个强大且易于使用的静态网站托管服务，非常适合部署 React 单页应用。本指南提供了从准备工作到部署完成的完整流程，以及常见问题的解决方案。如果您在部署过程中遇到任何问题，可以参考 Cloudflare 的[官方文档](https://developers.cloudflare.com/pages/)或联系 Cloudflare 支持。
