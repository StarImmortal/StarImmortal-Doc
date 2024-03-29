---
title: VuePress
---

# 指南

## 快速上手

::: warning 前提条件
VuePress 需要 [Node.js](https://nodejs.org/en/) >= 8.6
:::

1. 创建并进入一个新目录

```bash
mkdir vuepress-starter && cd vuepress-starter
```

2. 使用你喜欢的包管理器进行初始化

```bash
yarn init # npm init
```

3. 将 VuePress 安装为本地依赖

```bash
yarn add -D vuepress # npm install -D vuepress
```

4. 创建你的第一篇文档

```bash
mkdir docs && echo '# Hello VuePress' > docs/README.md
```

1. 在 `package.json` 中添加一些 `scripts`

```json
{
   "scripts": {
      "docs:dev": "vuepress dev docs",
      "docs:build": "vuepress build docs"
   }
}
```

6. 在本地启动服务器

```bash
yarn docs:dev # npm run docs:dev
```

## 目录结构

VuePress 遵循 **“约定优于配置”** 的原则，推荐的目录结构如下：

:::vue
.
├── docs
│   ├── .vuepress _(**可选的**)_
│   │   ├── `components` _(**可选的**)_
│   │   ├── `theme` _(**可选的**)_
│   │   │   └── Layout.vue
│   │   ├── `public` _(**可选的**)_
│   │   ├── `styles` _(**可选的**)_
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── `templates` _(**可选的, 谨慎配置**)_
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── `config.js` _(**可选的**)_
│   │   └── `enhanceApp.js` _(**可选的**)_
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
:::

::: warning 注意
请留意目录名的大写。
:::

- `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。
- `docs/.vuepress/components`: 该目录中的 Vue 组件将会被自动注册为全局组件。
- `docs/.vuepress/theme`: 用于存放本地主题。
- `docs/.vuepress/styles`: 用于存放样式相关的文件。
- `docs/.vuepress/styles/index.styl`: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
- `docs/.vuepress/styles/palette.styl`: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
- `docs/.vuepress/public`: 静态资源目录。
- `docs/.vuepress/templates`: 存储 HTML 模板文件。
- `docs/.vuepress/templates/dev.html`: 用于开发环境的 HTML 模板文件。
- `docs/.vuepress/templates/ssr.html`: 构建时基于 Vue SSR 的 HTML 模板文件。
- `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 `YML` 或 `toml`。
- `docs/.vuepress/enhanceApp.js`: 客户端应用的增强。

::: warning 注意
当你想要去自定义 `templates/ssr.html` 或 `templates/dev.html` 时，最好基于 [默认的模板文件](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/index.dev.html) 来修改，否则可能会导致构建出错。
:::

### 默认页面路由

此处我们把 `docs` 目录作为 `targetDir` ，下面所有的“文件的相对路径”都是相对于 `docs` 目录的。

在项目根目录下的 `package.json` 中添加 `scripts` ：

```json
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```

对于上述的目录结构，默认页面路由地址如下：

|   文件的相对路径    |  页面路由地址   |
|--------------------|----------------|
| `/README.md`       | `/`            |
| `/guide/README.md` | `/guide/`      |
| `/config.md`       | `/config.html` |

<RightMenu />
