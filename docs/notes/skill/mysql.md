---
title: MySQL
---

:::tip
本专栏介绍MySQL常用的奇技淫巧，让你解放双手，提高开发效率！
:::

## 重新设置主键自增

设置主键id自增的数据库表删除数据后，自增id不会自动重新计算 

重新设置自增的id命令如下：

```sql
alter table table_name AUTO_INCREMENT=1;
```

:::tip
注意：table_name是表名，1表示自增开始的位置
:::

## 判断一个时间段是否在另一个时间段内

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

## 查询JSON类型字段中某个属性值

:::tip
只支持MySQL5.7以上的版本
:::

user表中有如下数据：

|  id  |            profile             |
| :--: | :-----------------------------:|
|  1   | {"age": 20, "name": "吴彦祖"} |
|  2   | {"age": 21, "name": "陈伟霆"} |

如果需要查询`id`为`1`的记录中`profile`字段中`age`属性的值：

```sql
SELECT id, `profile` -> '$.age' AS age FROM user;
```

|  id  | age  |
| :--: | :--: |
|  1   |  20  |

如果需要查询`profile`字段中`age`属性值为`20`的记录：

```sql
SELECT * FROM user WHERE JSON_EXTRACT(`profile`, "$.age") = 20;
```

:::tip
JSON_EXTRACT(列名,"$.json某个属性")
:::

![查询结果](https://z3.ax1x.com/2021/11/18/IoeHxO.png)

## 常用时间范围查询语句

### 今天

```sql
SELECT * FROM table WHERE TO_DAYS(create_time) = TO_DAYS(NOW());
```

### 昨天

```sql
SELECT * FROM table WHERE TO_DAYS(NOW()) - TO_DAYS(create_time) <= 1;
```

### 本周

```sql
SELECT * FROM table WHERE YEARWEEK(DATE_FORMAT(table,'%Y-%m-%d')) = YEARWEEK(NOW());
```

### 上周

```sql
SELECT * FROM table WHERE YEARWEEK(DATE_FORMAT(create_time,'%Y-%m-%d')) = YEARWEEK(NOW()) - 1;
```

### 最近一周

```sql
SELECT * FROM table WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= DATE(table);
```

### 本月

```sql
SELECT * FROM table WHERE DATE_FORMAT(时间字段名,'%Y%m') = DATE_FORMAT(CURDATE(),'%Y%m');
```

### 上月

```sql
SELECT * FROM table WHERE PERIOD_DIFF(DATE_FORMAT(NOW(),'%Y%m'),DATE_FORMAT(create_time,'%Y%m')) = 1;
```

### 半年

```sql
SELECT * FROM table WHERE create_time BETWEEN DATE_SUB(NOW(),INTERVAL 6 MONTH) AND NOW();
```

### 本季度

```sql
SELECT * FROM table WHERE QUARTER(create_time) = QUARTER(NOW());
```

### 上季度

```sql
SELECT * FROM table WHERE QUARTER(create_time) = QUARTER(DATE_SUB(NOW(),INTERVAL 1 QUARTER));
```

### 本年

```sql
SELECT * FROM table WHERE YEAR(create_time)=YEAR(NOW());
```

### 去年

```sql
SELECT * FROM table WHERE YEAR(create_time) = YEAR(DATE_SUB(NOW(),INTERVAL 1 YEAR));
```

## 日期时间函数

### DATE_ADD()

DATE_ADD() 函数向日期添加指定的时间间隔。

```sql
DATE_ADD(date, INTERVAL expr type)
```

:::tip
date参数是合法的日期表达式；expr参数是您希望添加的时间间隔。
:::

type参数可以是下列值：

| Type 值            |
| :----------------- |
| MICROSECOND        |
| SECOND             |
| MINUTE             |
| HOUR               |
| DAY                |
| WEEK               |
| MONTH              |
| QUARTER            |
| YEAR               |
| SECOND_MICROSECOND |
| MINUTE_MICROSECOND |
| MINUTE_SECOND      |
| HOUR_MICROSECOND   |
| HOUR_SECOND        |
| HOUR_MINUTE        |
| DAY_MICROSECOND    |
| DAY_SECOND         |
| DAY_MINUTE         |
| DAY_HOUR           |
| YEAR_MONTH         |

#### 加一天

```sql
select DATE_ADD(NOW(), INTERVAL 1 DAY);
```

#### 加一小时

```sql
select DATE_ADD(NOW(), INTERVAL 1 MINUTE);
```

#### 加一分钟

```sql
select DATE_ADD(NOW(), INTERVAL 1 SECOND);
```
#### 加一毫秒

```sql
select DATE_ADD(NOW(), INTERVAL 1 MICROSECOND);
```

#### 加一周

```sql
select DATE_ADD(NOW(), INTERVAL 1 WEEK);
```

#### 加一月

```sql
select DATE_ADD(NOW(), INTERVAL 1 MONTH);
```
#### 加一季

```sql
select DATE_ADD(NOW(), INTERVAL 1 QUARTER);
```

#### 加一年

```sql
select DATE_ADD(NOW(), INTERVAL 1 YEAR);
```

### DATE_SUB()

DATE_SUB() 函数从日期减去指定的时间间隔。

```sql
DATE_SUB(date, INTERVAL expr type)
```

:::tip
date参数是合法的日期表达式；expr参数是您希望添加的时间间隔。
:::

type参数可以是下列值：

| Type 值            |
| :----------------- |
| MICROSECOND        |
| SECOND             |
| MINUTE             |
| HOUR               |
| DAY                |
| WEEK               |
| MONTH              |
| QUARTER            |
| YEAR               |
| SECOND_MICROSECOND |
| MINUTE_MICROSECOND |
| MINUTE_SECOND      |
| HOUR_MICROSECOND   |
| HOUR_SECOND        |
| HOUR_MINUTE        |
| DAY_MICROSECOND    |
| DAY_SECOND         |
| DAY_MINUTE         |
| DAY_HOUR           |
| YEAR_MONTH         |

示例代码：

```sql
SELECT DATE_SUB('1998-01-01 00:00:00', INTERVAL 2 DAY);
```

结果如下：

| date_sub('1998-01-01 00:00:00', interval 2 day) |
| :------- |
| 1997-12-30 00:00:00 |

### DATEDIFF()

DATEDIFF() 函数返回两个日期之间的天数。

```sql
DATEDIFF(date1, date2)
```

:::tip
date1 和 date2 参数是合法的日期或日期/时间表达式。

注释：只有值的日期部分参与计算。
:::

示例代码：

```sql
SELECT DATEDIFF('2008-12-30', '2008-12-29') AS DiffDate
```

结果如下：

| DiffDate |
| :------- |
| 1        |

### TIMEDIFF()

TIMEDIFF() 函数返回两个日期之间的差值。

```
TIMEDIFF(time1, time2)
```

:::tip
time1 和 time2 参数是合法的日期或日期/时间表达式。

两者必须是同一类型。
:::

示例代码：

```sql
SELECT TIMEDIFF('08:08:08', '00:00:00') AS DiffTime
```

结果如下：

| DiffDate |
| :------- |
| 08:08:08 |

### PERIOD_ADD()

增加了N个月至周期P。返回格式`YYYYMM`的值。

```sql
PERIOD_ADD(P, N)
```

:::tip
函数参数P的格式为`YYYYMM`或`YYYYMM`，第二个参数N表示增加N月。

注意：周期参数P不是日期值。
:::

示例代码：

```sql
SELECT PERIOD_ADD(200808, 2)
```

结果如下：

| PERIOD_ADD(200808, 2) |
| :------- |
| 200810 |

### PERIOD_DIFF()

PERIOD_DIFF() 函数返回两日期之间的差异。结果以月份计算。

```sql
PERIOD_DIFF(period1, period2)
```

:::tip
注意：period1 和 period2 应采用相同的格式。
:::

示例代码：

```sql
SELECT PERIOD_DIFF(201710, 201703);
```

结果如下：

| PERIOD_DIFF(201710, 201703) |
| :------- |
| 7 |

<RightMenu />