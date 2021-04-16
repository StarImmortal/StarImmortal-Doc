---
title: Maven入门
---

# Maven入门

## 下载并解压

> [下载地址](http://maven.apache.org/download.)

**选择apache-maven-3.6.0-bin.zip**

![选择版本](https://i.loli.net/2019/06/27/5d14a4191ac5281174.png)

**解压**

![解压](https://i.loli.net/2019/06/27/5d14a84222e8730638.png)

## 修改配置文件

> 在Maven的安装目录下找到conf目录下的settings.xml
>
> 打开此文件配置本地仓库和国内镜像源

**配置本地路径**

```bash
<localRepository>本地仓库路径</localRepository>
```

**配置国内镜像源**

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

![本地仓库](https://i.loli.net/2019/06/27/5d14a71a1470a70114.png)
![镜像](https://i.loli.net/2019/06/27/5d14a78f0580a23799.png)

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

![添加路径](https://i.loli.net/2019/06/27/5d14a53fea1d394436.png)

## 验证是否安装成功

> Win + R 输入 cmd 打开命令提示符
>
> 输入 mvn -v
>
> 验证是否安装成功

![安装成功](https://i.loli.net/2019/06/27/5d14a6450271471080.png)

<RightMenu />