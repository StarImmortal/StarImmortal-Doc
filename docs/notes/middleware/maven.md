---
title: Maven
---

# Maven

## 简介

Maven 翻译为"专家"、"内行"，是 Apache 下的一个纯 Java 开发的开源项目。基于项目对象模型（缩写：POM）概念，Maven利用一个中央信息片断能管理一个项目的构建、报告和文档等步骤。

Maven 是一个项目管理工具，可以对 Java 项目进行构建、依赖管理。

Maven 也可被用于构建和管理各种项目，例如 C#，Ruby，Scala 和其他语言编写的项目。Maven 曾是 Jakarta 项目的子项目，现为由 Apache 软件基金会主持的独立 Apache 项目。

:::tip
[官方地址](https://maven.apache.org/)
:::

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

:::tip
右键"计算机"

选择"属性"

点击"高级系统设置"

点击"环境变量"

在系统变量`Path中`添加变量值：D:\Maven\apache-maven-3.6.0\bin
:::

![配置系统变量](https://s1.ax1x.com/2022/07/19/j7aidK.png)

## 验证配置结果

:::tip
Win + R 输入 cmd 打开命令提示符

输入 mvn -v

验证是否安装成功
:::

![安装成功](https://z3.ax1x.com/2021/08/01/fSn7fU.png)

## 常用命令

- mvn archetype:generate：创建Maven项目
- mvn compile：编译源代码
- mvn deploy：发布项目
- mvn test-compile：编译测试源代码
- mvn test：运行应用程序中的单元测试
- mvn site：生成项目相关信息的网站
- mvn clean：清除项目目录中的生成结果
- mvn package：根据项目生成的jar
- mvn install：在本地Repository中安装jar
- mvn eclipse:eclipse：生成eclipse项目文件
- mvnjetty:run：启动jetty服务
- mvntomcat:run：启动tomcat服务
- mvn clean package -Dmaven.test.skip=true：清除以前的包后重新打包，跳过测试类

<RightMenu />