---
title: MongoDB
---

# MongoDB

## [下载地址](https://www.mongodb.com/download-center/community)

## 安装（Windows）

![](https://z3.ax1x.com/2021/09/27/42hQKA.png)

![](https://z3.ax1x.com/2021/09/27/42hJ58.png)

![](https://z3.ax1x.com/2021/09/27/42hjsA.png)

![](https://z3.ax1x.com/2021/09/27/424SdP.png)

![](https://z3.ax1x.com/2021/09/27/424cwt.png)

![](https://z3.ax1x.com/2021/09/27/424WY8.png)

![](https://z3.ax1x.com/2021/09/27/425cjJ.png)

![](https://z3.ax1x.com/2021/09/27/4245lQ.png)

### 配置环境变量

:::tip
注意：将`bin`目录配置到环境变量中才能使用 MongoDB 的命令。
:::

右键我的电脑 -> 属性 -> 高级系统设置 -> 高级 -> 环境变量，然后将`bin`地址添加到用户变量或系统变量的`Path`中。

![](https://z3.ax1x.com/2021/09/27/42Ilr9.png)

打开命令行工具，执行命令`mongo`，显示如下内容就表示安装和配置成功：

![](https://z3.ax1x.com/2021/09/27/42IBqA.png)

### 创建账号

1. 开启验证

进入MongoDB安装目录的`bin`目录，在目录下找到`mongod.cfg`文件，将其修改为：

```yml
security:
  authorization: enabled
```

![开启验证](https://z3.ax1x.com/2021/10/19/5dY0ET.png)

2. 重启MongoDB服务

打开任务管理器，找到MongoDB服务，点击右键选择重新启动：

![重启MongoDB服务](https://z3.ax1x.com/2021/10/19/5dYOqP.png)

3. 设置admin

管理员身份运行`cmd.exe`

切换到MongoDB安装目录的`bin`目录

输入`mongo.exe`命令，进入命令行界面：

![命令行界面](https://z3.ax1x.com/2021/10/19/5dt0sI.png)

切换`admin`数据库：

```bash
> use admin
switched to db admin
```

MongoDB内置的数据库角色有：

:::tip
1. 数据库用户角色：read、readWrite;
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；
3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
4. 备份恢复角色：backup、restore；
5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
6. 超级用户角色：root
7. 内部角色：__system
:::

权限含义：

:::tip
1. read：允许用户读取指定数据库
2. readWrite：允许用户读写指定数据库
3. dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
4. userAdmin：允许用户向system.users集合写入，可以在指定数据库里创建、删除和管理用户
5. clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限
6. readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
7. readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
8. userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
9. dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限
10. root：只在admin数据库中可用，超级账号，超级权限
:::

4. 创建用户

```bash
db.createUser({
  user: 'admin',  // 用户名
  pwd: '123456',  // 密码
  roles:[{
    role: 'root', // 角色
    db: 'admin'   // 数据库
  }]
})
```

5. 验证是否成功

```bash
> db.auth('admin', '123456')
1
```

:::tip
如果显示1表示设置成功
:::

![创建成功](https://z3.ax1x.com/2021/10/19/5d5tk8.png)

## 安装（Mac）

1. 解压文件（双击或者命令行方式）

```bash
tar -zxvf mongodb-macos-x86_64-5.0.3.tgz
```

2. 复制至目标目录

```bash
cd /opt/

sudo mkdir -p mongodb

cp -R -n mongodb-macos-x86_64-5.0.3/ mongodb
```

3. 配置环境变量

```bash
vi ~/.bash_profile

export MONGODB_HOME=/opt/mongodb

export PATH=$PATH:$MONGODB_HOME/bin

source ~/.bash_profile

mongod -version
```

![配置成功](https://z3.ax1x.com/2021/11/03/IVBD9x.png)

4. 创建日志及数据存放的目录

- 数据存放路径：

```bash
sudo mkdir -p /opt/mongodb/data
```

- 日志文件路径：

```bash
sudo mkdir -p /opt/mongodb/log
```

5. 确保当前用户对以上两个目录有读写的权限

```bash
sudo chown william /opt/mongodb/data
sudo chown william /opt/mongodb/log
```

:::tip
以上`william`是我电脑上的用户，需要根据你当前用户名来修改。
:::

6. 启动mongodb

```bash
mongod --dbpath /opt/mongodb/data --logpath /opt/mongodb/log/mongo.log --fork
```

- --dbpath 设置数据存放目录
- --logpath 设置日志存放目录
- --fork 在后台运行

7. 查看是否启动

```bash
ps aux | grep -v grep | grep mongod
```

![启动成功](https://z3.ax1x.com/2021/11/04/IVyJi9.png)

8. 停止mongodb

```bash
mongo

> use admin
switched to db admin
> db.shutdownServer()
server should be down...
> exit
```

![停止成功](https://z3.ax1x.com/2021/11/04/IVyTij.png)

### 创建帐号

1. 创建用户命令

```bash
use admin

db.createUser({
  user: 'admin',  // 用户名
  pwd: '123456',  // 密码
  roles:[{
    role: 'root', // 角色
    db: 'admin'   // 数据库
  }]
})
```

2. 验证是否成功

```bash
> db.auth('admin', '123456')
1
```

:::tip
如果显示1表示设置成功
:::

3. 修改配置文件

新建`etc`文件夹，在etc文件夹中创建`mongo.conf`文件

```bash
cd /opt/mongodb

sudo mkdir etc

sudo touch mongo.conf

sudo vi mongo.conf
```

配置文件信息：

```yml
#数据库路径
dbpath=/opt/mongodb/data
 
#日志输出文件路径
logpath=/opt/mongodb/log/mongo.log
 
#错误日志采用追加模式，配置这个选项后mongodb的日志会追加到现有的日志文件，而不是从新创建一个新文件
logappend=true
 
#启用日志文件，默认启用
journal=true
 
#这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false
quiet=false
 
#是否后台启动，有这个参数，就可以实现后台运行
fork=true
 
#端口号 默认为27017
port=27017
 
#指定存储引擎（默认不需要指定）
#storageEngine=mmapv1
 
#开启认证
auth = true
```

4. 停止并重新启动

```bash
mongo

> use admin
switched to db admin
> db.shutdownServer()
server should be down...
> exit

mongod -f /opt/mongodb/etc/mongo.conf
```

## 常用命令

- 停止服务（Windows)

```bash
net stop MongoDB
```

- 启动服务（Windows)

```bash
net start MongoDB
```

**注意：`MongoDB` 是安装时候定义的服务名称**

- 查看当前库下的用户

```bash
show users
```

- 删除用户

```bash
db.dropUser('admin')
```

- 修改用户密码

```bash
db.updateUser('admin', {pwd: '123456'})
```

- 密码认证

```bash
db.auth('admin', '123456')
```

<RightMenu />