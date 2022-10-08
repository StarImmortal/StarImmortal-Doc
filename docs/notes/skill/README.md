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

## 修改NPM全局模式默认安装路径

1. 新建两个文件夹

+ node_global（全局）
+ npm-cache（缓存）

![](https://z3.ax1x.com/2021/08/01/fSEUhQ.png)

2. 执行命令

```bash
npm config set prefix "D:\Nodejs\node_global"
npm config set cache "D:\Nodejs\npm-cache"
```

3. 配置环境变量

在`Path`变量名中，新建变量值：`D:\NodeJS\node_global`

![配置环境变量](https://z3.ax1x.com/2021/08/01/fSVnbV.png)

## MAC M1 配置多环境JDK

### [下载安装](https://www.azul.com/downloads/?package=jdk)

### 配置环境

1. 编辑`.bash_profile`配置文件

```bash
vi ~/.bash_profile
```

```bash
export JAVA_8_HOME=$(/usr/libexec/java_home -v1.8)
export JAVA_17_HOME=$(/usr/libexec/java_home -v17)

# 动态切换JDK版本
alias jdk8="export JAVA_HOME=$JAVA_8_HOME"
alias jdk17="export JAVA_HOME=$JAVA_17_HOME"

# 设置默认JDK版本
export JAVA_HOME=$JAVA_8_HOME
```

2. 重新载入配置文件

```bash
source ~/.bash_profile
```

### 相关命令

+ 查看多个JDK版本

```bash
/usr/libexec/java_home -V
```

## MAC M1 配置多环境Node.js

### 安装

```bash
sudo npm install -g n
```

### 常用命令

#### 查看帮助

```bash
n help
```

#### 列出所有版本

```bash
n ls
```

#### 安装某个版本

```bash
# 版本号
n 14.3.0
```

#### 安装最新版本

```bash
n lastest
```

#### 安装稳定版本

```bash
n stable
```

#### 切换已安装版本

```bash
n
```

#### 删除某个版本

```bash
# 版本号
n rm 14.3.0
```

## IntelliJ IDEA 配置 javap 命令

`File -> Settings -> Tools -> External Tools -> +`

![+](https://c2.im5i.com/2022/09/29/HkUSG.png)
![Create Tool](https://c2.im5i.com/2022/09/29/Hks0W.png)

### Tool Settings

#### Windows 10

```bash
Program：$JDKPath$\bin\javap.exe

Arguments：-c $OutputPath$\$FileDirRelativeToSourcepath$\$FileNameWithoutAllExtensions$.class

Working directory：$ProjectFileDir$
```

#### MAC

:::tip
可通过 `echo $JAVA_HOME` 命令得知 `Program` 参数路径
:::

```bash
Program：/Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home

Arguments：-c $FileClass$

Working directory：$OutputPath$
```

<RightMenu />