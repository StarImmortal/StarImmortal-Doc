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
storePathRootDir=E:/local/rocketMQ/logs/store
# commitLog存储路径
storePathCommitLog=E:/local/rocketMQ/logs/store/commitlog
# 消费队列存储路径
storePathConsumeQueue=E:/local/rocketMQ/logs/store/consumequeue
# 消息索引存储路径
storePathIndex=E:/local/rocketMQ/logs/store/index
# checkpoint 文件存储路径
storeCheckpoint=E:/local/rocketMQ/logs/store/checkpoint
# abort 文件存储路径
abortFile=E:/local/rocketMQ/logs/store/abort
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