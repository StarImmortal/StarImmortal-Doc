---
title: Redis入门
---

# Redis入门

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

## 建立软连接

```bash
ln -s redis-5.0.7 redis
```

## 编译安装

```bash
cd redis-5.0.7

make MALLOC=libc

make && make install 
```

## 配置

### 移动配置文件到安装目录下 

```bash
cd redis-5.0.7/

cp redis.conf /usr/local/redis/
```
![QPNq1A.md.png](https://s2.ax1x.com/2019/11/28/QPNq1A.md.png)

### 修改启动方式（后台启动）

```bash
vi /usr/local/redis/redis.conf

daemonize no->daemonize yes
```
![QPDlge.md.png](https://s2.ax1x.com/2019/11/28/QPDlge.md.png)

## 设置开机启动

```bash
vi /etc/rc.local

/usr/local/redis/bin/redis-server /usr/local/redis/redis.conf（添加）
```

## 配置远程连接访问

```bash
vi /usr/local/redis/redis.conf

protected-mode yes->protected-mode no（修改）

bind 127.0.0.1（注释）
```

## 系统常用命令

- 启动命令
  
```bash
cd /usr/local/redis/

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

<RightMenu />