---
title: Redis
---

# Redis

## 安装

>[下载地址](https://redis.io/download)

```bash
wget http://download.redis.io/releases/redis-5.0.7.tar.gz
```

## 解压

```bash
tar -zxvf redis-5.0.7.tar.gz
```

![QPtrRA.md.png](https://s2.ax1x.com/2019/11/28/QPtrRA.md.png)

## 编译安装

```bash
cd /root/redis-5.0.7

make

make PREFIX=/home/redis install
```

## 配置

### 拷贝配置文件

```bash
cd /root/redis-6.2.6

cp redis.conf /home/redis/
```

![QPNq1A.md.png](https://s2.ax1x.com/2019/11/28/QPNq1A.md.png)

### 修改启动方式（后台启动）

```bash
vi /home/redis/redis.conf

daemonize no->daemonize yes
```

![QPDlge.md.png](https://s2.ax1x.com/2019/11/28/QPDlge.md.png)

## 设置开机启动

```bash
vi /etc/rc.local

/home/redis/bin/redis-server /home/redis/redis.conf
```

## 配置远程连接访问

```bash
vi /home/redis/redis.conf

protected-mode yes->protected-mode no（修改）

bind 127.0.0.1（注释）
```

## 系统常用命令

- 启动命令
  
```bash
cd /home/redis/

./bin/redis-server ./redis.conf
```
![QPDor9.md.png](https://s2.ax1x.com/2019/11/28/QPDor9.md.png)

- 停止命令
  
```bash
./bin/redis-cli shutdown
```

- 检查Redis是否启动
  
```bash
ps -ef | grep -i redi
```

![QPrwIx.md.png](https://s2.ax1x.com/2019/11/28/QPrwIx.md.png)

## 常用命令

- 进入Redis目录
  
```bash
./bin/redis-cli
```
    
- 插入值（键值对形式）
  
```bash
set name william
```

![](https://s2.ax1x.com/2019/11/28/QPr4FP.png)
    
- 查看value
  
```bash
get name
```

![](https://s2.ax1x.com/2019/11/28/QPrIW8.png)
    
- 查看所有的Key
  
```bash
keys *
```

![](https://s2.ax1x.com/2019/11/28/QPrszD.png)
    
- 计算Key的总数
  
```bash
dbsize
```
    
- 检查Key是否存在
  
```bash
exist key
```
    
- 删除
  
```bash
del name
```

![](https://s2.ax1x.com/2019/11/28/QPr7Qg.png)
    
- Key在seconds秒后过期
  
```bash
expire key seconds
```
    
- 查看Key剩余的过期时间
  
```bash
ttl key
```
    
- 去掉Key的过期时间
  
```bash
persist key
```
    
- 返回Key的类型
  
```bash
type key
```

## 键通知

:::tip
Redis从2.8.0版本后，推出`Keyspace Notifications`特性。

此特性允许客户端以`订阅/发布（Sub/Pub）`模式，通过设置键空间通知来接收那些对数据库中的键和值有影响的操作事件。
:::

### 事件类型

1. keyspace：键空间通知

2. keyevent：键事件通知

事件是用`__keyspace@<db>__:KeyPattern`或者`__keyevent@<db>__:OpsType`的格式来发布消息的。

:::tip
`<db>`表示数据库编号；

KeyPattern表示需要监控的键模式（可以用通配符）；

OpsType表示操作类型。
:::

例如，如果启用了`keyspace`事件通知，客户端对存储在`Database 0`中的键`foo`执行`DEL`操作，两条消息将通过`Pub/Sub`发布：

```bash
PUBLISH __keyspace@0__:foo del

PUBLISH __keyevent@0__:del foo
```

### notify-keyspace-events 配置选项

```conf
K     Keyspace events, published with __keyspace@<db>__ prefix.（键空间通知）
E     Keyevent events, published with __keyevent@<db>__ prefix.（键事件通知）
g     Generic commands (non-type specific) like DEL, EXPIRE, RENAME, ...(通用命令(非类型特定的)，如DEL、EXPIRE、RENAME)
$     String commands（字符串命令）
l     List commands（列表命令）
s     Set commands（集合命令）
h     Hash commands（哈希命令）
z     Sorted set commands（有序集合命令）
x     Expired events (events generated every time a key expires)（过期事件（每次密钥过期时生成的事件））
e     Evicted events (events generated when a key is evicted for maxmemory)（驱逐事件（当为maxmemory退出一个键时生成的事件））
t     Stream commands（Stream命令）
d     Module key type events（模块key类型事件）
m     Key-miss events (Note: It is not included in the 'A' class)（Key-miss事件（当访问不存在的键时通知，不包含在A中））
A     Alias for g$lshzxetd, so that the "AKE" string means all the events(Except key-miss events which are excluded from 'A' due to their unique nature)（用“AKE”可表示所有事件通知，除了特殊的Key-miss事件）
```

### 键空间通知设置（过期键事件通知为例）

1. 命令行方式（临时）

```bash
redis-cli

config set notify-keyspace-events Ex
```

:::tip
注意：该设置在`redis`终端关闭后失效
:::

2. 配置文件方式

```bash
vi redis.conf || redis.windows.conf

执行`/notify-keyspace-events`找到`notify-keyspace-events`

注释`notify-keyspace-events ""`或将`""`改为`Ex`

设置`notify-keyspace-events Ex`
```

:::tip
`notify-keyspace-events ""`为默认配置，双引号内参数为空，如无注释或修改，则键空间通知无法生效

`notify-keyspace-events Ex`需顶格（不能有空格），否则启动会报错："Invalid argument during startup: unknown conf file parameter"

`K`和`E`至少有一个存在，否则发布不了任何类型的消息
:::

![键空间通知设置](https://s1.ax1x.com/2022/07/20/jb7QKJ.png)

### 命令行实验

1. 指定配置文件启动Redis

```bash
redis-server redis.conf || redis.windows.conf
```

2. 订阅过期事件

```bash
psubscribe __keyevent@0__:expired
```

![订阅过期事件](https://s1.ax1x.com/2022/07/20/jbqgG6.png)

3. 添加过期键

```bash
redis-cli

#添加一个key为name，过期时间为10s，值为william的键

setex name 10 william 
```

![添加过期键](https://s1.ax1x.com/2022/07/20/jbq2RK.png)

:::tip
1) "psubscribe"                  # 返回值的类型：显示订阅成功
2) "`__keyevent@0__:expired`"    # 订阅的Channel名
3) (integer) 1                   # 目前已订阅的频道数量
:::

4. 键过期通知
   
![键过期通知](https://s1.ax1x.com/2022/07/20/jbqRxO.png)

:::tip
注意：对于`psubscribe`命令而言，消息会多一行

1) "pmessage"                     # 返回值的类型：信息
2) "`__keyevent@0__:expired`”     # 来源（从哪个ChannelPattern发送过来）
3) "`__keyevent@0__:expired`"     # 实际的Channel
4) "name"                         # 信息内容
:::

<RightMenu />