---
title: 常见问题
---

## MySQL

### Unknown collation: 'utf8mb4_0900_ai_ci'

错误原因：高版本数据库（8.0）转存sql文件，并导入低版本数据库（5.7）

方案一：升级MySQL数据库至高版本

方案二：将需要导入的sql文件，把其中的`utf8mb4_0900_ai_ci`全部替换为`utf8_general_ci`，`utf8mb4`替换为`utf8`

### this is incompatible with sql_mode=only_full_group_by

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

### com.mysql.cj.jdbc.exceptions.PacketTooBigException: Packet for query is too large (10,892 > 1,024).

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

<RightMenu />