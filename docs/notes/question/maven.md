---
title: Maven
---

:::tip
本专栏介绍Maven构建工具常遇到的一些错误问题，让你避免踩雷，节省开发时间！
:::

## Language Level

问题描述：Maven项目总是将Language Level重置到5的问题

解决方案：

方式一：修改`pom.xml`文件

```xml
<build>
	<plugins>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<version>3.8.1</version>
			<configuration>
			<source>1.8</source>
			<target>1.8</target>
			<encoding>UTF-8</encoding>
			</configuration>
		</plugin>
	</plugins>
</build>
```

方式二：修改`settings`配置文件，在`profiles`里加入以下代码

```xml
<profile>
    <id>jdk-1.8</id>
    <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
    </activation>
    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
    </properties>
</profile>
```

## 无法使用私服

问题描述：

IntelliJ IDEA 升级到`2021.3`版本后，自带的Maven插件版本升级到了`3.8.1`，当想使用自带的插件来下载私服中的依赖时，会提示如下错误：

:::danger
failed to transfer from http://0.0.0.0/ during a previous attempt.
:::

解决方案：

1. 找到IntelliJ IDEA安装路径下的Maven的配置文件路径

```
IntelliJ IDEA 2021.3\plugins\maven\lib\maven3\conf\setting.xml
```

2. 编辑`setting.xml`文件，注释如下标签

```xml
<mirror>
	<id>maven-default-http-blocker</id>
	<mirrorOf>external:http:*</mirrorOf>
	<name>Pseudo repository to mirror external repositories initially using HTTP.</name>
	<url>http://0.0.0.0/</url>
	<blocked>true</blocked>
</mirror>
```

<RightMenu />