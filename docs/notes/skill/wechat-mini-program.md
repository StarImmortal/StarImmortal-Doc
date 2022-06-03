---
title: 微信小程序
---

:::tip
本专栏介绍微信小程序常用的奇技淫巧，让你解放双手，提高开发效率！
:::

## 消除图片组件默认间距

解决方案：在图片css样式上设置flex布局即可消除间距

```css
display: flex;
```

## 点击态

使用`view`组件包裹，绑定`hover-class`属性，默认值`none`

`view`其他属性：

| 属性                   | 类型    | 默认值 | 说明                                   |
| ---------------------- | ------- | ------ | -------------------------------------- |
| hover-stop-propagation | boolean | false  | 指定是否阻止本节点的祖先节点出现点击态 |
| hover-start-time       | number  | 50     | 按住后多久出现点击态，单位毫秒         |
| hover-stay-time        | number  | 400    | 手指松开后点击态保留时间，单位毫秒     |

```css
.rect-hover {
  position: relative;
  top: 3rpx;
  left: 3rpx;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1) inset;
}

.small-hover {
  opacity: 0.9;
  transform: scale(0.95, 0.95);
}

.medium-hover {
  opacity: 0.8;
  transform: scale(0.85, 0.85);
}
```

## 文本省略

### 单行文本省略

```css
.omit {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
```

### 多行文本省略

```css
.omit {
  word-break: break-all;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

## uni-app 改变页面背景色

全局背景颜色设置方式：

在`App.vue`的`style`样式表中设置

```css
<style lang="scss">	
page {
	background-color: #F0AD4E;
}
</style>
```

单页面背景色设置方式：

对应页面中的`style`样式表中设置，且不能有`scoped`属性，如果需要使用带`scoped`属性的样式表，则重新创建一个样式表单独写背景色样式

```css
<style lang="scss" scoped>
@import './home.scss';
</style>

<style>
page {
	background-color: #f7f7f7;
	font-family: PingFangSC-Regular;
}
</style>
```

## 集成ESLint + Preitter

当写React、Vue等大项目、或者使用框架搭建小程序时，为了便于多人协作开发，常常会引入ESlint和Preitter来规范代码书写，使得不同的开发者写出风格统一的代码。

对于原生小程序项目，或许不需要使用webpack等模块打包工具，但同样可以配置合适的ESlint规范和Preitter规范，来处理统一代码风格。

### 集成依赖

在**package.json**文件集成如下依赖：

```json
"devDependencies": {
  "@babel/core": "^7.16.7",
  "@babel/eslint-parser": "^7.16.5",
  "eslint": "^8.5.0",
  "eslint-plugin-prettier": "^4.0.0",
  "prettier": "^2.5.1"
}
```

### 安装依赖

```bash
npm install
```

### 新建.eslintrc.js文件

```js
module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      // lambda表达式
      arrowFunctions: true,
      // 解构赋值
      destructuring: true,
      // class
      classes: true,
    },
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
    requireMiniProgram: true,
  },
  rules: {},
}
```

### 新建.prettierrc.js文件

```js
module.exports = {

}
```

### 新建.babel.config.js文件

```js
module.exports = {
  presets: [],
  plugins: [],
}
```

### 配置规则

大家可以到官网配置属于自己团队的代码风格：

- [ESLint官网](https://eslint.bootcss.com/docs/rules/)

- [Prettier官网](https://prettier.io/docs/en/options.html)

或者可以参照我团队的代码风格：

#### ESLint

```js
rules: {
  'prefer-const': 1, // 要求使用 const 声明那些声明后不再被修改的变量
  'max-len': 0, // 强制一行的最大长度
  'guard-for-in': 0, // 要求 for-in 循环中有一个 if 语句
  'no-console': 'off', // 禁用 console
  'no-debugger': 'off', // 禁用 debugger
  'no-plusplus': 0, // 禁止使用++，--
  'no-extra-semi': 0, // 和prettier冲突
  'import/extensions': 0, // import不需要写文件扩展名
  'no-underscore-dangle': 0, // 禁止标识符中有悬空下划线
  'no-restricted-syntax': 0, // 禁用特定的语法
  'consistent-return': 'off', // 要求 return 语句要么总是指定返回的值，要么不指定
  semi: ['error', 'never'], // 要求或禁止使用分号代替 ASI
  'no-prototype-builtins': 'off', // 禁止直接调用 Object.prototypes 的内置属性
  'class-methods-use-this': 'off', // 强制类方法使用 this
  'template-curly-spacing': 'off', // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
  'linebreak-style': [0, 'error', 'windows'], // 强制使用一致的换行风格
  'arrow-parens': ['error', 'as-needed'], // 要求箭头函数的参数使用圆括号
  'no-param-reassign': ['error', { props: false }], // 禁止对 function 的参数进行重新赋值
  indent: [
    'warn',
    2,
    {
      ignoredNodes: ['TemplateLiteral'],
      SwitchCase: 1,
    },
  ],
},
```

#### Preitter

```js
  singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
  semi: false, // 行位是否使用分号，默认为true
  trailingComma: 'all', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  printWidth: 120,
  arrowParens: 'avoid'
```

### 常见问题

#### Parsing error: Unexpected token = ***

问题原因：开发环境与ESLint当前的解析功能不兼容

解决方案：

1）安装`@babel/eslint-parser`与`@babel/core`

```bash
npm i @babel/eslint-parser @babel/core --save-dev
```

2）创建`.babel.config.js`文件

```js
module.exports = {
  presets: [],
  plugins: [],
}
```

3）配置解析器

```js
module.exports = {
  parser: '@babel/eslint-parser'
}
```

#### Error: Must use import to load ES Module

问题原因：

使用已弃用的babel-eslint解析器不支持ES6模块，可以尝试更新。

解决方法：

1）在`package.json`文件中，将行`"babel-eslint"`更新为`"@babel/eslint-parser": "^7.16.5"`

2）从文件夹中的终端/命令提示符中运行`npm i`

3）在`.eslintrc`中，将解析器行`"parser": "babel-eslint"`更新为`"parser": "@babel/eslint-parser"`

4）如果没有创建`.babel.config.js`，可以在`.eslintrc`文件中，添加`"requireConfigFile": false`

```js
parserOptions: {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    // lambda表达式
    arrowFunctions: true,
    // 解构赋值
    destructuring: true,
    // class
    classes: true,
  },
  requireConfigFile: false
},
```

5）运行`npm run lint`命令来检测文件

<RightMenu />