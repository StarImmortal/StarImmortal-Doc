---
title: 起步
---

:::tip
本专栏介绍GitHub、微信小程序、MySQL等常用框架的奇技淫巧，让你解放双手，提高开发效率！
:::

## 自定义VS Code插件安装位置

右键快捷方式，在原本的目标后加入`--extensions-dir "插件新的存储位置"`，例如：

```
"D:\Microsoft VS Code\Code.exe" --extensions-dir "D:\VS Code Extensions"
```

## 修改NPM全局模式的默认安装路径

1. 新建两个文件夹

   - node_global（全局）
   - npm-cache（缓存）

![](https://z3.ax1x.com/2021/08/01/fSEUhQ.png)

2. 执行命令

```bash
npm config set prefix "D:\Nodejs\node_global"
npm config set cache "D:\Nodejs\npm-cache"
```

3. 配置环境变量

在`Path`变量名中，新建变量值：`D:\NodeJS\node_global`

![](https://z3.ax1x.com/2021/08/01/fSVnbV.png)

<RightMenu />