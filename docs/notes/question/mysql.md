---
title: MySQL
---

:::tip
本专栏介绍MySQL常遇到的一些错误问题，让你避免踩雷，节省开发时间！

[文档地址](https://mysqlconnector.net/connection-options/)
:::

## You must reset your password using ALTER USER statement before executing this statement.

解决方法：

```bash
alter user user() identified by '26SE>Z%UddNN';
```

## Unknown collation: 'utf8mb4_0900_ai_ci'

错误原因：高版本数据库（8.0）转存sql文件，并导入低版本数据库（5.7）

方案一：升级MySQL数据库至高版本

方案二：将需要导入的sql文件，把其中的`utf8mb4_0900_ai_ci`全部替换为`utf8_general_ci`，`utf8mb4`替换为`utf8`

## this is incompatible with sql_mode=only_full_group_by

::: danger
Error Code: 1055. Expression #3 of SELECT list is not in GROUP BY clause and contains nonaggregated column ‘×××’ which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
:::

错误原因：对于GROUP BY聚合操作，如果在SELECT中的列，没有在GROUP BY中出现，那么这个SQL是不合法的，因为列不在GROUP BY从句中。

解决方案：

1. 打开`my.cnf`配置文件

```bash
vi /etc/my.cnf
```

2. 修改模式

在`[mysqld]`下面添加：

```bash
sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'
```

3. 重启服务

```bash
systemctl restart mysqld
```

## com.mysql.cj.jdbc.exceptions.PacketTooBigException: Packet for query is too large (10,892 > 1,024).

错误原因：MySQL的`max_allowed_packet`设置过小，MySQL根据配置文件会限制server接受的数据包大小。

有时候大的插入和更新会被`max_allowed_packet`参数限制掉，导致失败。

解决方案：

1. 进入MySQL

```bash
mysql -uroot -p
```

2. 查看当前配置信息

```bash
show VARIABLES like '%max_allowed_packet%';
```

![max_allowed_packet](https://img-blog.csdnimg.cn/20190404084751240.png)

3. 设置`max_allowed_packet`

```bash
set global max_allowed_packet = 2*1024*1024*10;
```

![max_allowed_packet](https://img-blog.csdnimg.cn/20190404084912981.png)

4. 重启服务

```bash
systemctl restart mysqld
```

## Public Key Retrieval is not allowed

错误原因：如果用户使用了`sha256_password`认证，密码在传输过程中必须使用`TLS`协议保护，但是如果`RSA`公钥不可用，可以使用服务器提供的公钥；可以在连接中通过`ServerRSAPublicKeyFile`指定服务器的`RSA`公钥，或者`AllowPublicKeyRetrieval=True`参数以允许客户端从服务器获取公钥；但是需要注意的是`AllowPublicKeyRetrieval=True`可能会导致恶意的代理通过中间人攻击(MITM)获取到明文密码，所以默认是关闭的，必须显式开启

![](https://img-blog.csdnimg.cn/20190406221957566.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTMzNjA4NTA=,size_16,color_FFFFFF,t_70)

解决方案：

```
allowPublicKeyRetrieval=true
```

```
jdbc:mysql://localhost:3306/test?useSSL=false&serverTimezone=UTC&characterEncoding=UTF8&allowPublicKeyRetrieval=true
```

## 查询存储的时间和存储的时间相差13个小时

1. 明确指定MySQL数据库的时区，不使用引发误解的`CST`

```bash
mysql> set global time_zone = '+08:00';
Query OK, 0 rows affected (0.00 sec)
 
mysql> set time_zone = '+08:00';
Query OK, 0 rows affected (0.00 sec)
```

2. 修改数据库配置文件

```bash
vi /etc/my.cnf

# 添加一行
default-time-zone='+08:00'
```

## Parameter index out of range (1 > number of parameters, which is 0)

当分页查询中带有`SQL子查询`和`LEFT JOIN`时，参数"`#{}`"无法被解析

[Issue](https://github.com/baomidou/mybatis-plus/issues/3630)

错误原因：SQL语句可能无法优化

- 当将`#{}`换成`${}`不会报错，但会引发SQL注入问题，该方案不可取

- 不分页时，无此问题

- `RIGHT JOIN`和`INNER JOIN`不会触发此问题

解决方案：通过`Page`对象设置关闭优化可以解决此问题

## The GPG keys listed for the "MySQL 8.0 Community Server" repository are already installed but they are not correct for this package.

错误原因：Public key for *.rpm is not installed

系统中没有能验证该`RPM`数字签名的公钥

解决方案：通过参数指定不检查数字签名

```bash
sudo yum -y install * --nogpgcheck
```

## sum()函数精度丢失问题

解决方案：使用`cast`将其转化成`decimal`再求和即可。

```sql
# 674.3999999999999
select sum(amount) from table;

# 674.40
select sum(cast(amount as decimal(18, 2))) from table;
```

<RightMenu />