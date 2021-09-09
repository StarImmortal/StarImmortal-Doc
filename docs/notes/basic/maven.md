---
title: Maven
---

# Maven

## 下载并解压

> [下载地址](https://maven.apache.org/download.cgi)

![](https://z3.ax1x.com/2021/08/01/fSevv9.png)

## 修改配置文件

:::tip
在Maven的安装目录下找到conf目录下的settings.xml

打开此文件配置本地仓库和国内镜像源
:::

### 配置本地路径

```bash
<localRepository>本地仓库路径</localRepository>
```

### 配置国内镜像源

```bash
<mirrors>
	<mirror>
		<id>nexus-aliyun</id>
		<name>nexus-aliyun</name>
		<url>http://maven.aliyun.com/nexus/content/groups/public</url>
		<mirrorOf>central</mirrorOf>
	</mirror>
</mirrors>
```

## 配置环境变量

```bash
右键"计算机"
选择"属性"
点击"高级系统设置"
点击"环境变量"
来设置环境变量
在系统变量Path中添加变量值：
C:\Maven\apache-maven-3.6.0\bin
```

![配置环境变量](https://z3.ax1x.com/2021/08/01/fSnTYT.png)

## 验证是否安装成功

:::tip
Win + R 输入 cmd 打开命令提示符

输入 mvn -v

验证是否安装成功
:::

![安装成功](https://z3.ax1x.com/2021/08/01/fSn7fU.png)

<RightMenu />