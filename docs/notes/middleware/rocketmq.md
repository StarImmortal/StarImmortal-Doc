---
title: RocketMQ
---

# Windows

## 安装

[下载地址](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.9.0/rocketmq-all-4.9.0-source-release.zip)

![](https://z3.ax1x.com/2021/08/02/fSl1P0.png)

## 配置环境变量

:::tip
新建变量名：`ROCKETMQ_HOME`

变量值：`RocketMQ`路径
:::

![](https://z3.ax1x.com/2021/08/02/fSQWCV.png)

## 修改配置文件

![](https://z3.ax1x.com/2021/08/16/ffk9VP.png)

- 自定义文件路径：

```
# 存储路径
storePathRootDir=E:/local/rocketMQ/store
# commitLog 存储路径
storePathCommitLog=E:/local/rocketMQ/store/commitlog
# 消费队列存储路径
storePathConsumeQueue=E:/local/rocketMQ/store/consumequeue
# 消息索引存储路径
storePathIndex=E:/local/rocketMQ/store/index
# checkpoint 文件存储路径
storeCheckpoint=E:/local/rocketMQ/store/checkpoint
# abort 文件存储路径
abortFile=E:/local/rocketMQ/store/abort
```

## 启动

- 启动nameserver
  
```bash
mqnamesrv.cmd
```

- 启动broker

```bash
mqbroker.cmd -n 127.0.0.1:9876 -c ../conf/broker.conf autoCreateTopicEnable=true
```

# Mac

## 下载

[下载地址](https://www.apache.org/dyn/closer.cgi?path=rocketmq/4.9.2/rocketmq-all-4.9.2-source-release.zip)

## 解压与编译

```bash
unzip rocketmq-all-4.9.2-source-release.zip

cd rocketmq-all-4.9.2/

mvn -Prelease-all -DskipTests clean install -U

cd distribution/target/rocketmq-4.9.2/rocketmq-4.9.2
```

## 配置JDK

修改如下配置文件：

![配置文件](https://z3.ax1x.com/2021/10/28/5qwb4S.png)

新增一行:

```bash
[ ! -e "$JAVA_HOME/bin/java" ] && JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home
```

![新增](https://z3.ax1x.com/2021/10/28/5q08vd.png)

## 启动nameserver

```bash
# 1.启动NameServer
nohup sh bin/mqnamesrv &
# 2.查看启动日志
tail -f ~/logs/rocketmqlogs/namesrv.log
```

:::tip
输出：The Name Server boot success. 表示成功
:::

## 修改内存大小

RocketMq默认内存较大，启动Borker如果因为内存不足启动失败，需要修改如下配置文件，修改JVM内存大小

- runborker.sh

- runserver.sh

改为：JAVA_OPT="${JAVA_OPT} -server -Xms256m -Xmx256m -Xmn128m"

## 启动broker

```bash
# 1.启动Broker
nohup sh bin/mqbroker -n localhost:9876 -c conf/broker.conf autoCreateTopicEnable=true &
# 2.查看启动日志
tail -f ~/logs/rocketmqlogs/broker.log 
```

:::tip
输出：The broker[%s, 172.30.30.233:10911] boot success...
:::

## 查看是否启动

```bash
jps
```

## 关闭RocketMQ

```bash
# 关闭NameServer
sh bin/mqshutdown namesrv
# 关闭Borker
sh bin/mqshutdown broker
```