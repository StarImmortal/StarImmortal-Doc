---
title: MongoDB
---

# MongoDB

## 安装

>[下载地址](https://www.mongodb.com/download-center/community)

![](https://z3.ax1x.com/2021/09/27/42hQKA.png)

![](https://z3.ax1x.com/2021/09/27/42hJ58.png)

![](https://z3.ax1x.com/2021/09/27/42hjsA.png)

![](https://z3.ax1x.com/2021/09/27/424SdP.png)

![](https://z3.ax1x.com/2021/09/27/424cwt.png)

![](https://z3.ax1x.com/2021/09/27/424WY8.png)

![](https://z3.ax1x.com/2021/09/27/425cjJ.png)

![](https://z3.ax1x.com/2021/09/27/4245lQ.png)

## 配置环境变量

:::tip
注意：将`bin`目录配置到环境变量中才能使用 MongoDB 的命令。
:::

右键我的电脑 -> 属性 -> 高级系统设置 -> 高级 -> 环境变量，然后将`bin`地址添加到用户变量或系统变量的`Path`中。

![](https://z3.ax1x.com/2021/09/27/42Ilr9.png)

打开命令行工具，执行命令`mong`，显示如下内容就表示安装和配置成功：

![](https://z3.ax1x.com/2021/09/27/42IBqA.png)

## 创建帐号

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

创建用户：

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

4. 验证是否成功

```bash
> db.auth('admin', '123456')
1
```

:::tip
如果显示1表示设置成功
:::

![创建成功](https://z3.ax1x.com/2021/10/19/5d5tk8.png)

## 常用命令

- 停止服务

```bash
net stop MongoDB
```

- 启动服务

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