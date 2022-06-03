---
title: Npm
---

:::tip
本专栏介绍使用Npm过程中常遇到的一些错误问题，让你避免踩雷，节省开发时间！
:::

## Failed at the node-sass@5.0.0 postinstall script. npm ERR! This is probably not a problem with npm. 

解决方案：在当前目录下进行`node-sass`的数据源设置

```bash
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
```

再次执行：

```bash
npm i
```

## gyp ERR! stack Error: EACCES: permission denied, mkdir

解决方案：

```bash
npm i --unsafe-perm
```

## node_modules/.bin/vue-cli-service: Permission denied

Mac环境下执行`npm run serve`提示`node_modules/.bin/vue-cli-service: Permission denied`

解决方案：

打开终端，输入如下命令：

```bash
chmod 777 /Users/此处是项目根目录/node_modules/.bin/vue-cli-service
```

<RightMenu />