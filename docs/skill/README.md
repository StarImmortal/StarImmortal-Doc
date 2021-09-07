---
title: 奇技淫巧
---

:::tip
本专栏会介绍常用的奇技淫巧，让你解放双手，提高开发效率！
:::

## GitHub加速

中国大陆的用户访问 GitHub 的速度很慢，如果不「科学上网」，下载一个项目可能需要等很多时间。

StarImmortal帮你彻底解决「GitHub速度慢」的问题，让你的 GitHub 起飞！

### 解决污染

:::tip
推荐 SwitchHosts 工具管理 hosts

[下载地址](https://github.com/oldj/SwitchHosts/releases)
:::

配置参考如下：

Title: 随意

Type: Remote

URL: https://raw.fastgit.org/521xueweihan/GitHub520/main/hosts

Auto Refresh: 最好选 `1 hour`

![配置](https://z3.ax1x.com/2021/05/14/gsyoDJ.png)

**这样每次 hosts 有更新都能及时进行更新，免去手动更新。**

### Chrome 插件

**链接: https://pan.baidu.com/s/1kn9mqutqZfk4OGMBXtnUpg  密码: 06ei**

### GitHub 克隆网站

下面这两个网站是 GitHub 的克隆版，也就是该网站的镜像：

- [https://github.com.cnpmjs.org](https://github.com.cnpmjs.org)
- [https://hub.fastgit.org](https://hub.fastgit.org) - 推荐
  
### 项目加速下载网站
   
下面这个网站是一个 GitHub 加速下载网站，打开你要下载的 GitHub 仓库页面，点击右侧额绿色按钮点击 Download ZIP，等浏览器弹出下载框后复制下载框中的链接地址粘贴到这个网站即可。

[http://toolwa.com/github/](http://toolwa.com/github/)

## SpringBoot Banner 设置

1. banner.txt

在SpringBoot项目的`resources`目录下新建一个`banner.txt`文本文件，然后将启动Banner粘贴到此文本文件中，启动项目即可。

![](https://z3.ax1x.com/2021/05/14/gszwGt.jpg)
![](https://z3.ax1x.com/2021/05/14/gszdPI.jpg)

1. 在线制作banner网站

- http://patorjk.com/software/taag
- https://www.bootschool.net/ascii
- http://www.network-science.de/ascii
- https://www.degraeve.com/img2txt.php

## MySQL重新设置自增id

设置主键id自增的数据库表删除数据后，自增id不会自动重新计算 

重新设置自增的id命令如下：

```bash
alter table table_name AUTO_INCREMENT=1;
```

*注意：table_name是表名，1表示自增开始的位置*

## MySQL判断一个时间段是否在另一个时间段内

**建表与插入数据**

```sql
CREATE TABLE `test` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`start_time` DATETIME NULL DEFAULT NULL COMMENT '开始时间',
	`end_time` DATETIME NULL DEFAULT NULL COMMENT '结束时间',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8_unicode_ci'
ENGINE=INNODB
;

INSERT INTO `test` (`start_time`, `end_time`) VALUES ('2020-08-04 10:00:00', '2020-08-04 12:00:00');
```

方案一：

```sql
SET @BeignTime = '2020-08-04 05:00:00';
SET @EndTime   = '2020-08-04 10:00:00';
SELECT *
FROM test
WHERE (
@BeignTime BETWEEN start_time AND end_time OR
@EndTime   BETWEEN start_time AND end_time OR
start_time BETWEEN @BeignTime AND @EndTime OR
end_time   BETWEEN @BeignTime AND @EndTime
);
+----+---------------------+---------------------+
| id | start_time          | end_time            |
+----+---------------------+---------------------+
|  1 | 2020-08-04 10:00:00 | 2020-08-04 12:00:00 |
+----+---------------------+---------------------+
1 row in set (0.00 sec)

SET @BeignTime = '2020-08-04 05:00:00';
SET @EndTime   = '2020-08-04 09:00:00';
SELECT *
FROM test
WHERE (
@BeignTime BETWEEN start_time AND end_time OR
@EndTime   BETWEEN start_time AND end_time OR
start_time BETWEEN @BeignTime AND @EndTime OR
end_time   BETWEEN @BeignTime AND @EndTime
);
Empty set (0.00 sec)
```

方案二：

```sql
SET @BeignTime = '2020-08-04 05:00:00';
SET @EndTime   = '2020-08-04 09:00:00';
SELECT *
FROM test
WHERE (
	(@BeignTime >= start_time AND @BeignTime <= end_time) OR 
	(@EndTime   >= start_time AND @EndTime   <= end_time) OR 
	(start_time >= @BeignTime AND start_time <= @EndTime) OR 
	(end_time   >= @BeignTime AND end_time   <= @EndTime)
);
Empty set (0.00 sec)

SET @BeignTime = '2020-08-04 05:00:00';
SET @EndTime   = '2020-08-04 10:00:00';
SELECT *
FROM test
WHERE (
	(@BeignTime >= start_time AND @BeignTime <= end_time) OR 
	(@EndTime   >= start_time AND @EndTime   <= end_time) OR 
	(start_time >= @BeignTime AND start_time <= @EndTime) OR 
	(end_time   >= @BeignTime AND end_time   <= @EndTime)
);
+----+---------------------+---------------------+
| id | start_time          | end_time            |
+----+---------------------+---------------------+
|  1 | 2020-08-04 10:00:00 | 2020-08-04 12:00:00 |
+----+---------------------+---------------------+
1 row in set (0.00 sec)
```

## Jackson序列化与反序列化

### 序列化

```java
User user = new User();

user.setName("小民");	
user.setEmail("xiaomin@sina.com");
user.setAge(20);

ObjectMapper mapper = new ObjectMapper();

String json = mapper.writeValueAsString(user);
```

### 反序列化

```java


String json = "{\"name\":\"小民\",\"age\":20,\"email\":\"xiaomin@sina.com\"}";

ObjectMapper mapper = new ObjectMapper();

User user = mapper.readValue(json, User.class);
```

## 修改NPM全局模式的默认安装路径

1. 新建两个文件夹

   - node_global（全局）
   - npm-cache（缓存）

![](https://z3.ax1x.com/2021/08/01/fSEUhQ.png)

2. 执行命令

```bash
npm config set prefix "D:\Nodejs\node_global"
npm config set cache "D:\Nodejs\npm-cache"
```

3. 配置环境变量

在`Path`变量名中，新建变量值：`D:\NodeJS\node_global`

![](https://z3.ax1x.com/2021/08/01/fSVnbV.png)

## 自定义VS Code插件安装位置

右键快捷方式，在原本的目标后加入`--extensions-dir "插件新的存储位置"`，例如：

```
"D:\Microsoft VS Code\Code.exe" --extensions-dir "D:\VS Code Extensions"
```

<RightMenu />