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

1. 编辑配置文件

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

## Mac M1 卸载 Oracle JDK

```bash
sudo rm -rf /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin
sudo rm -rf /Library/PreferencesPanes/JavaControlPanel.prefPane
sudo rm -rf ~/Library/Application\ Support/Java
sudo rm -rf /Library/Java/JavaVirtualMachines/jdk1.8.0_211.jdk
```

## Mac M1 VMware Fusion 内网互通

### 虚拟机网络设置（NAT）

:::tip
VMware Fusion设置虚拟机网络适配器连接模式为“与我的Mac共享”
:::

![虚拟机网络设置（NAT）](https://i.postimg.cc/WjtMj02G/1669805677112.png?dl=1)

### 查看本机网络配置

查看本机网关地址以及子网掩码：

```bash
cat /Library/Preferences/VMware\ Fusion/vmnet8/nat.conf
```

+ 网关：192.168.2.2
+ 子网掩码：255.255.255.0

![查看本机网络配置](https://i.postimg.cc/hnCKTdV3/1669805739046.png?dl=1)

### 查看静态IP地址范围

```bash
cat /Library/Preferences/VMware\ Fusion/vmnet8/dhcpd.conf
```

![静态IP范围](https://i.postimg.cc/4Jxzd0C3/1669805859578.png?dl=1)

### 查看本机DNS

系统偏好设置 —> 网络 —> 高级

![查看本机DNS](https://i.postimg.cc/69jF2CFr/1669805752132.png?dl=1)

### 虚拟机配置

#### 查看虚拟机网卡信息

```bash
# 如未找到命令：yum install net-tools -y

ifconfig
```

![网卡信息](https://i.postimg.cc/hgYMYTJY/1669806558547.png?dl=1)

:::tip

注意：每个人的网卡名称不一样，有的是 ens33 或 ens0 ，另外红框里是网卡地址了，后续会用到

临时保存：00:0c:29:16:b3:7a
:::

#### 修改MAC地址

```bash
vi /etc/udev/rules.d/70-persistent-ipoib.rules
```

```
ACTION=="add", SUBSYSTEM=="net", DRIVERS=="?*", ATTR{type}=="32", ATTR{address}=="00:0c:29:16:b3:7a", NAME="mlx4_ib3"
```

> 具体步骤：打开注释 -> ATTR{address}=="00:0c:29:16:b3:7a"（临时保存的网卡地址）

![修改MAC地址](https://i.postimg.cc/GrXj6N2z/1669806939425.png?dl=1)

#### 修改网卡参数

:::tip
文件名以 `ifcfg-ens` 开头
:::

```bash
vi /etc/sysconfig/network-scripts/ifcfg-ens160
```

```bash
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
NAME=ens160
UUID=0a77e9d2-ac32-4ede-a27d-0806bb3a7ce7
DEVICE=ens160
ONBOOT=yes
HWADDR=00:0c:29:16:b3:7a
IPADDR=192.168.2.129
GATEWAY=192.168.2.2
NETMASK=255.255.255.0
DNS1=192.168.31.1
```

+ BOOTPROTO：static
+ HWADDR：MAC地址
+ IPADDR：静态IP地址（允许范围内并且网段一致）
+ GATEWAY：本机网关地址
+ NETMASK：本机子网掩码
+ DNS1：本机DNS

:::tip
注意：克隆虚拟机后，MAC地址会从新生成，而UUID不会，需使用该命令重新生成：`uuidgen`
:::

### 重启虚拟机

```bash
reboot
```

### hostname

#### 查询

```bash
hostname
```

#### 设置

```bash
hostnamectl set-hostname master
hostnamectl set-hostname slave1
hostnamectl set-hostname slave2
```

### 配置DNS

```bash
vi /etc/hosts

192.168.2.129 master
192.168.2.130 slave1
192.168.2.131 slave2
```

### SSH免密互通

#### 生成密钥对

```bash
ssh-keygen -t rsa
```

#### 上传公钥

```bash
ssh-copy-id master
```

#### 密钥分配

```bash
scp -r ~/.ssh/authorized_keys root@slave1:~/.ssh
scp -r ~/.ssh/authorized_keys root@slave2:~/.ssh
```

<RightMenu />