---
title: Yarn
---

:::tip
本专栏介绍使用Yarn过程中常遇到的一些错误问题，让你避免踩雷，节省开发时间！
:::

## 无法加载文件

错误信息：无法加载文件 D:\NodeJS\node_global\yarn.ps1，因为在此系统上禁止运行脚本。

解决方案：

1. 搜索`powershell`，右键`以管理员身份运行`
2. 若要在本地计算机上运行您编写的未签名脚本和来自其他用户的签名脚本，请使用以下命令将计算机上的执行策略更改为`RemoteSigned`

```bash
set-ExecutionPolicy RemoteSigned
```

![powershell](https://z3.ax1x.com/2021/08/30/htLlUe.png)

![更改执行策略](https://z3.ax1x.com/2021/08/30/htLy2n.png)

<RightMenu />