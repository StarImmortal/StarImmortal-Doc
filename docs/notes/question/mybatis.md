---
title: MyBatis
---

:::tip
本专栏介绍使用MyBatis框架常遇到的一些错误问题，让你避免踩雷，节省开发时间！
:::

## 解析符号出错

问题描述：

在MyBatis中，将SQL语句定义在`.xml`文件中时，xml解析`<`、`>`、`<=`、`>=`等符号时会报错。

解决方案：使用`<![CDATA[]]>`或转义字符

1. 方案一：转义字符

|  <   |  <=   | >    |  >=   |   &   |   '    |   "    |
| :--: | :---: | ---- | :---: | :---: | :----: | :----: |
| `&lt;` | `&lt;=` | `&gt;` | `&gt;=` | `&amp;` | `&apos;` | `&quot;` |

示例代码：age < 30

```sql
age &lt; 30
```

:::tip
(1) 转义序列字符之间不能有空格；

(2) 转义序列必须以”;”结束；

(3) 单独出现的”&”不会被认为是转义的开始；

(4) 区分大小写。
:::

1. 方案二：<![CDATA[ sql语句 ]]>

被`<![CDATA[]]>`这个标记所包含的内容将表示为纯文本，比如`<![CDATA[<]]>`表示文本内容`<`

示例代码：num >= #{num}

```sql
num <![CDATA[ >= ]]> #{num}
```

:::tip
(1) 此部分不能再包含”]]>”；

(2) 不允许嵌套使用；

(3)”]]>”这部分不能包含空格或者换行。
:::

`<![CDATA[]]>`与转义字符关系：

(1) <![CDATA[]]>不能适用所有情况，转义字符可以；

(2) 对于短字符串而言，<![CDATA[]]>写起来啰嗦，对于长字符串转义字符写起来可读性差；

(3) <![CDATA[]]>表示xml解析器忽略解析，所以更快。

## 默认不能更新null字段

问题描述：

在Mybatis-plus默认配置中，对于参数字段为`null`时，会自动忽略，从而导致进行update操作时，无法将字段更新为`null`值。

解决方案：

1. 方案一：单一配置

```java
@TableField(updateStrategy = FieldStrategy.IGNORED)
```

2. 方案二：全局配置

```yml
mybatis-plus:
  global-config:
    db-config:
      update-strategy: ignored
```

:::tip
注意：是`update-strategy`，而不是`field-strategy`或`select-strategy`
:::

<RightMenu />