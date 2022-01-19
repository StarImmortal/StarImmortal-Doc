---
title: 常见问题
---

## Npm

### Failed at the node-sass@5.0.0 postinstall script. npm ERR! This is probably not a problem with npm. 

解决方案：在当前目录下进行`node-sass`的数据源设置

```bash
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
```

再次执行：

```bash
npm i
```

### gyp ERR! stack Error: EACCES: permission denied, mkdir

解决方案：

```bash
npm i --unsafe-perm
```

## Yarn

错误信息：无法加载文件 D:\NodeJS\node_global\yarn.ps1，因为在此系统上禁止运行脚本。

解决方案：

1. 搜索`powershell`，右键`以管理员身份运行`
2. 若要在本地计算机上运行您编写的未签名脚本和来自其他用户的签名脚本，请使用以下命令将计算机上的执行策略更改为`RemoteSigned`

```bash
set-ExecutionPolicy RemoteSigned
```

![powershell](https://z3.ax1x.com/2021/08/30/htLlUe.png)

![更改执行策略](https://z3.ax1x.com/2021/08/30/htLy2n.png)

## IDEA

问题描述：Maven项目总是将Language Level重置到5的问题

解决方案：

方式一：修改`pom.xml`文件

```xml
<build>
	<plugins>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-compiler-plugin</artifactId>
			<version>3.8.1</version>
			<configuration>
			<source>1.8</source>
			<target>1.8</target>
			<encoding>UTF-8</encoding>
			</configuration>
		</plugin>
	</plugins>
</build>
```

方式二：修改`settings`配置文件，在`profiles`里加入以下代码

```xml
<profile>
    <id>jdk-1.8</id>
    <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
    </activation>
    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
    </properties>
</profile>
```

## MySQL

:::tip
[文档地址](https://mysqlconnector.net/connection-options/)
:::

### You must reset your password using ALTER USER statement before executing this statement.

解决方法：

```bash
alter user user() identified by '26SE>Z%UddNN';
```

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

### Public Key Retrieval is not allowed

错误原因：如果用户使用了`sha256_password`认证，密码在传输过程中必须使用`TLS`协议保护，但是如果`RSA`公钥不可用，可以使用服务器提供的公钥；可以在连接中通过`ServerRSAPublicKeyFile`指定服务器的`RSA`公钥，或者`AllowPublicKeyRetrieval=True`参数以允许客户端从服务器获取公钥；但是需要注意的是`AllowPublicKeyRetrieval=True`可能会导致恶意的代理通过中间人攻击(MITM)获取到明文密码，所以默认是关闭的，必须显式开启

![](https://img-blog.csdnimg.cn/20190406221957566.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTMzNjA4NTA=,size_16,color_FFFFFF,t_70)

解决方案：

```
allowPublicKeyRetrieval=true
```

```
jdbc:mysql://localhost:3306/test?useSSL=false&serverTimezone=UTC&characterEncoding=UTF8&allowPublicKeyRetrieval=true
```

### 查询存储的时间和存储的时间相差13个小时

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

### Parameter index out of range (1 > number of parameters, which is 0)

当分页查询中带有`SQL子查询`和`LEFT JOIN`时，参数"`#{}`"无法被解析

[Issue](https://github.com/baomidou/mybatis-plus/issues/3630)

错误原因：SQL语句可能无法优化

- 当将`#{}`换成`${}`不会报错，但会引发SQL注入问题，该方案不可取

- 不分页时，无此问题

- `RIGHT JOIN`和`INNER JOIN`不会触发此问题

解决方案：通过`Page`对象设置关闭优化可以解决此问题

## Web

### spring注解之@Scope

`@Scope`注解是`Spring IOC`容器中的一个作用域，在`Spring IOC`容器中具有以下几种作用域：

基本作用域singleton（单例）、prototype（多例），Web作用域（reqeust、session、globalsession），自定义作用域

- singleton（单例模式）：全局有且仅有一个实例
- prototype（原型模式）：每次获取bean的时候会有一个新的实例
- request：针对每一次HTTP请求都会产生一个新的bean，同时该bean仅在当前HTTP request内有效
- session：针对每一次HTTP请求都会产生一个新的bean，同时该bean仅在当前HTTP session内有效
- globalsession：类似于标准的HTTP Session作用域，不过它仅仅在基于portlet的web应用中才有意义

### Cause: java.lang.IllegalArgumentException: argument type mismatch

错误信息：nested exception is org.apache.ibatis.reflection.ReflectionException: Error instantiating class * with invalid types (*) or values (*). Cause: java.lang.IllegalArgumentException: argument type mismatch

错误原因：

1. @Data 和 @Builder 导致无参构造丢失

- 单独使用@Data注解，是会生成无参数构造方法。
- 单独使用@Builder注解，发现生成了全属性的构造方法。

:::tip
@Data和@Builder同时使用：没有了默认的构造方法。如果手动添加无参数构造方法或者用@NoArgsConstructor注解都会报错！
:::

解决方法：使用`@Builder`注解，最简单的方法就是直接写上以下4个注解：

```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
```

2. @Builder 注解导致默认值无效

解决方法：在默认值上，加上`@Builder.Default`注解

### com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException: Unrecognized field

错误信息：Exception in thread "main" com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException: Unrecognized field "age" (class com.daling.bpmn.test.User), not marked as ignorable (3 known properties: "id", "name", "flag"])

错误原因：反序列化时，遇到未知属性

解决方案：

- 添加注解：@JsonIgnoreProperties(ignoreUnknown = true)

- 配置策略

```java
ObjectMapper objectMapper = new ObjectMapper();

objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
```

### 雪花算法与精度丢失问题

问题描述：`JavaScript`无法处理`Java`的长整型`Long`导致精度丢失，具体表现为主键最后两位永远为`0`

解决思路：`Long`转为`String`返回

- FastJson 处理方式

```java
@Override
public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
    FastJsonHttpMessageConverter fastJsonConverter = new FastJsonHttpMessageConverter();
    FastJsonConfig fjc = new FastJsonConfig();
    // 配置序列化策略
    fjc.setSerializerFeatures(SerializerFeature.BrowserCompatible);
    fastJsonConverter.setFastJsonConfig(fjc);
    converters.add(fastJsonConverter);
}
```

- JackJson 处理方式

  - 方式一

  ```java
  // 注解处理，这里可以配置公共 baseEntity 处理
  @JsonSerialize(using=ToStringSerializer.class)
    public long getId() {
        return id;
  }
  ```

  - 方式二

  ```java
  // 全局配置序列化返回 JSON 处理
  final ObjectMapper objectMapper = new ObjectMapper();
  SimpleModule simpleModule = new SimpleModule();
  simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
  objectMapper.registerModule(simpleModule);
  ```

### Cannot determine value type from string ''

错误原因：当使用了`@Builder`注解之后会默认把无参构造方法忽略掉，创建一个全参的构造方法

解决方法：使用`@Builder`注解，最简单的方法就是直接写上以下4个注解：

```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
```

### 无法反序列化LocalDateTime

解决方法：在实体类字段中添加注解

```java
// 需要哪个用哪个 
@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
@JsonSerialize(using = LocalDateTimeSerializer.class)
@JsonDeserialize(using = LocalDateTimeDeserializer.class)
```

### @Mapper和@Repository区别

@Repository需要在Spring中配置扫描地址，然后生成Dao层的Bean才能被注入到Service层中。

@Mapper不需要配置扫描地址，通过xml里面的namespace里面的接口地址，生成了Bean后注入到Service层中。

### @Validated和@Valid区别

1. 基本概念

Spring Validation 验证框架对参数的验证机制提供了@Validated（Spring's JSR-303规范，是标准JSR-303的一个变种）。

javax提供了@Valid（标准JSR-303规范），配合`BindingResult`可以直接提供参数验证结果。

2. 主要区别

|                | **@Validated**                                               | **@Valid**                                                   |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **分组**       | 提供分组功能，可在入参验证时，根据不同的分组采用不同的验证机制。 | 无分组功能                                                   |
| **可注解位置** | 可以用在类型、方法和方法参数上。但是不能用在成员属性上       | 可以用在方法、构造函数、方法参数和成员属性上（两者是否能用于成员属性上直接影响能否提供嵌套验证的功能） |
| **嵌套验证**   | 用在方法入参上无法单独提供嵌套验证功能。不能用在成员属性上。也无法提供框架进行嵌套验证。能配合嵌套验证注解@Valid进行嵌套验证。 | 用在方法入参上无法单独提供嵌套验证功能。能够用在成员属性上，提示验证框架进行嵌套验证。能配合嵌套验证注解@Valid进行嵌套验证。 |

### StringRedisTemplate和RedisTemplate区别

两者的关系是StringRedisTemplate继承RedisTemplate。

两者的数据是不共通的；也就是说StringRedisTemplate只能管理StringRedisTemplate里面的数据，RedisTemplate只能管理RedisTemplate中的数据。

两者之间的区别主要在于他们使用的序列化类：

StringRedisTemplate默认采用的是String序列化策略（`StringRedisSerializer`）。

RedisTemplate默认采用的是JDK序列化策略（`JdkSerializationRedisSerializer`），存入数据会将数据先序列化成字节数组然后在存入Redis数据库。

使用时注意事项：

当你的Redis数据库里面本来存的是字符串数据或者你要存取的数据就是字符串类型数据的时候，那么使用StringRedisTemplate即可。

但是如果你的数据是复杂的对象类型，而取出的时候又不想做任何的数据转换，直接从Redis里面取出一个对象，那么使用RedisTemplate是更好的选择。

RedisTemplate使用时常见问题：

RedisTemplate中存取数据都是字节数组。当Redis中存入的数据是可读形式而非字节数组时，使用RedisTemplate取值的时候会无法获取导出数据，获得的值为`null`。可以使用`StringRedisTemplate`试试。

### classpath和classpath*区别

- classpath：默认只会在你项目的class路径中查找文件
- classpath*：默认不仅包含class路径，还包括jar文件中（class路径）进行查找

:::tip
使用classpath*：Spring需要遍历所有的classpath，所以加载速度是很慢的；故在设计中，应该尽可能划分好资源文件所在的路径，尽量避免使用classpath*。
:::

### 401与403的区别

| 状态码 | 状态码英文名称 |                           中文描述                           |
| ------ | :------------: | :----------------------------------------------------------: |
| 401    |  Unauthorized  | 该HTTP状态码表示认证错误，它是为了认证设计的，而不是为了授权设计的。收到401响应，表示请求没有被认证—压根`没有认证`或者`认证不正确`—但是请重新认证和重试。（一般在响应头部包含一个WWW-Authenticate来描述如何认证）。通常由web服务器返回，而不是web应用。从性质上来说是`临时的东西`。（服务器要求客户端重试） |
| 403    |   Forbidden    | 该HTTP状态码是关于授权方面的。从性质上来说是`永久的东西`，和应用的业务逻辑相关联。它比401更具体，更实际。收到403响应表示服务器完成认证过程，但是`客户端请求没有权限去访问要求的资源`。 |

- 401：Unauthorized响应，应该用来表示缺失或错误的认证。
- 403：Forbidden响应，应该在这之后用，当用户被认证后，但用户没有被授权在特定资源上执行操作。

### EasyExcel读取的数据全为null

原因：项目使用了`Lombok`并且还加了`@Accessors(chain = true)`链式注解，与EasyExcel冲突

解决方案：删除`@Accessors(chain = true)`链式注解

### 解决 SpringBoot 在 JDK8 中 LocalDateTime (反)序列化问题

#### 问题复现

```java
Java 8 date/time type `java.time.LocalDateTime` not supported by default:
 add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling....
```

在默认情况下Java 8不支持`LocalDateTime`需要添加`com.fasterxml.jackson.datatype:jackson-datatype-jsr310`依赖

原因：没有添加序列化和反序列化器

#### 解决方案

##### 添加依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
    <version>2.13.0</version>
</dependency>
```

##### 指定LocalDateTime的序列化以及反序列化器

```java
@JsonDeserialize(using = LocalDateTimeDeserializer.class)
@JsonSerialize(using = LocalDateTimeSerializer.class)
```

例如：

![示例代码](https://img-blog.csdnimg.cn/52bc52bac63e47f98c08c311f78c074d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Lq65Lq66YO95Zyo5Y-R5aWL,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

### @JsonFormat与@DateTimeFormat的使用以及其区别

#### 简介

1. JsonFormat来源于jackson，Jackson是一个简单基于Java应用库，Jackson可以轻松的将Java对象转换成json对象和xml文档，同样也可以将json、xml转换成Java对象。Jackson所依赖的jar包较少，简单易用并且性能也要相对高些，并且Jackson社区相对比较活跃，更新速度也比较快。

2. DateTimeFormat是spring自带的处理框架，主要用于将时间格式化。

#### @DateTimeFormat

使用@DateTimeFormat注解可以将一个字符串转成一个Date对象，主要用于入参日期格式转换。

该注解可以用在实体类中Date类型的字段上也可以使用在方法中。

原因：前端传日期数据是以字符串的形式传入后台。后端用Date类型接受就会出错，加上此注解，后台可解析字符串的日期时间格式。

#### 示例代码

```java
@Data
@EqualsAndHashCode(callSuper = true)
public class QueryOrderDTO {
    /**
     * 开始日期
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date start;

    /**
     * 结束日期
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date end;
}
```

```java
@GetMapping("/test")
public R test(@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") Date start) {
    return new R();
}
```

#### @JsonFormat

当后台返回Date类型的日期格式数据给前端时，前台没办法解析。

需要做如下操作：在实体类字段打上如下注解

```java
@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
```

注意：`timezone`是为了解决时区问题，因为我们是东八区， 会相差8个小时。

#### 示例代码

```java
@Data
@EqualsAndHashCode(callSuper = true)
public class QueryOrderDTO {
    /**
     * 开始日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date start;

    /**
     * 结束日期
     */
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date end;
}
```

:::tip
注意：@JsonFormat与@DateTimeFormat两个注解可以同时使用
:::

## Lombok

### @SneakyThrows

`@SneakyThrows`注解的用途得从Java的异常设计体系说起

Java中常见的两类异常：

1. Exception类，也就是常说的受检异常或者Checked Exception，即编译时异常。
2. RuntimeException类，既运行时异常。

前者会强制要求抛出它的方法声明`throws`，调用者必须显示的去处理这个异常。常见的运行时异常`NullPointerException`。

设计的目的是为了提醒开发者处理一些场景中必然可能存在的异常情况。比如网络异常造成`IOException`。

但是现实，往往事与愿违。大部分情况下的异常，我们都是一路往外抛了事。所以渐渐的Java程序员处理Exception的常见手段就是外面包一层RuntimeException，接着往上丢。

```java
try {

} catch(Exception e) {
  throw new RuntimeException(e);
}
```

Lombok的@SneakyThrows就是为了消除这样的模板代码，使用注解后不需要担心`Exception`的处理

```java

import lombok.SneakyThrows;

public class SneakyThrowsExample implements Runnable {
  @SneakyThrows(UnsupportedEncodingException.class)
  public String utf8ToString(byte[] bytes) {
    return new String(bytes, "UTF-8");
  }
  
  @SneakyThrows
  public void run() {
    throw new Throwable();
  }
}
```

真正生成的代码：

```java
import lombok.Lombok;

public class SneakyThrowsExample implements Runnable {
  public String utf8ToString(byte[] bytes) {
    try {
      return new String(bytes, "UTF-8");
    } catch (UnsupportedEncodingException e) {
      throw Lombok.sneakyThrow(e);
    }
  }
  
  public void run() {
    try {
      throw new Throwable();
    } catch (Throwable t) {
      throw Lombok.sneakyThrow(t);
    }
  }
}
```

显然魔法藏在`Lombok.sneakyThrow(t);`中，可能大家都会以为这个方法就是`new RuntimeException()`之类的，然而事实并非如此。阅读代码可以看出整个方法其实最核心的逻辑是`throw (T)t;`，利用泛型将我们传入的`Throwable`强转为`RuntimeException`。虽然事实上我们不是`RuntimeException`。但是没关系，因为JVM并不关心这个。泛型最后存储为字节码时并没有泛型的信息。这样写只是为了骗过`javac`编译器。

```java
public static RuntimeException sneakyThrow(Throwable t) {
    if (t == null) throw new NullPointerException("t");
    return Lombok.<RuntimeException>sneakyThrow0(t);
}

private static <T extends Throwable> T sneakyThrow0(Throwable t) throws T {
    throw (T)t;
}
```

## CSS

### padding-right不生效

代码片段：

```css
.top-info {
	width: 100%;
	position: absolute;
	bottom: -30rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;
}
```

:::tip
此时的padding-right并不生效，加大padding-right的值也不会有效果
:::

![问题复现](https://z3.ax1x.com/2021/11/26/oEcTr4.png)

解决方法：

给元素添加`box-sizing: border-box;`属性，让元素变成一个盒模型。

| 值          | 描述                                                         |
| :---------- | :----------------------------------------------------------- |
| content-box | 这是由 CSS2.1 规定的宽度高度行为。宽度和高度分别应用到元素的内容框。在宽度和高度之外绘制元素的内边距和边框。 |
| border-box  | 为元素设定的宽度和高度决定了元素的边框盒。就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。 |
| inherit     | 规定应从父元素继承 box-sizing 属性的值。  |

```css
.top-info {
	width: 100%;
	position: absolute;
	bottom: -30rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 20rpx;
}
```
![成功解决](https://z3.ax1x.com/2021/11/26/oEcXPx.png)

### 弹性布局flex属性详解

:::tip
注意：如果元素不是弹性盒模型对象的子元素，则 flex 属性不起作用。
:::

flex 属性用于设置或检索弹性盒模型对象的子元素如何分配空间。

flex 属性是 **flex-grow**、**flex-shrink** 和 **flex-basis** 属性的简写属性。

```
flex: auto | initial | none | inherit |  [ flex-grow ] || [ flex-shrink ] || [ flex-basis ]
```

- auto: 计算值为 **1 1 auto**
- initial: 计算值为 **0 1 auto**
- none：计算值为 **0 0 auto**
- inherit：从父元素继承
- [ flex-grow ]：定义弹性盒子元素的扩展比率。
- [ flex-shrink ]：定义弹性盒子元素的收缩比率。
- [ flex-basis ]：定义弹性盒子元素的默认基准值。

### flex-grow：用于设置或检索弹性盒子的扩展比率

让第二个元素的宽度为其他元素的三倍：

```html
<div id="main">
  <div style="background-color:coral;"></div>
  <div style="background-color:lightblue;"></div>
  <div style="background-color:khaki;"></div>
  <div style="background-color:pink;"></div>
  <div style="background-color:lightgrey;"></div>
</div>
```

```css
#main {
  width: 350px;
  height: 100px;
  border: 1px solid #c3c3c3;
  display: flex;
}

#main div:nth-of-type(1) {flex-grow: 1;}
#main div:nth-of-type(2) {flex-grow: 3;}
#main div:nth-of-type(3) {flex-grow: 1;}
#main div:nth-of-type(4) {flex-grow: 1;}
#main div:nth-of-type(5) {flex-grow: 1;}
```

![flex-grow](https://z3.ax1x.com/2021/12/02/oNaUKJ.png)

### flex-shrink：指定了 flex 元素的收缩规则

flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据`flex-shrink`的值。

```html
<div id="content">
  <div class="box" style="background-color:red;">A</div>
  <div class="box" style="background-color:lightblue;">B</div>
  <div class="box" style="background-color:yellow;">C</div>
  <div class="box1" style="background-color:brown;">D</div>
  <div class="box1" style="background-color:lightgreen;">E</div>
</div>
```

```css
#content {
  display: flex;
  width: 500px;
}

#content div {
  flex-basis: 120px;
  border: 3px solid rgba(0, 0, 0, .2);
}

.box { 
  flex-shrink: 1;
}

.box1 { 
  flex-shrink: 2; 
}
```

A、B、C 显式定义了`flex-shrink`为`1`

D、E 定义了`flex-shrink`为`2`

所以计算出来总共将剩余空间分成了`7`份，其中A、B、C占`1`份，D、E占`2`份，即`1:1:1:2:2`

父容器定义为500px，子项被定义为 20px，子项相加之后即为600px，超出父容器100px

那么超出的100px需要被A、B、C、D、E 消化通过收缩因子

所以加权综合可得：`100*1+100*1+100*1+100*2+100*2=700px`

于是我们可以计算 A、B、C、D、E 将被移除的溢出量是多少：

```
A 被移除溢出量：(100*1/700)*100，即约等于14px
B 被移除溢出量：(100*1/700)*100，即约等于14px
C 被移除溢出量：(100*1/700)*100，即约等于14px
D 被移除溢出量：(100*2/700)*100，即约等于28px
E 被移除溢出量：(100*2/700)*100，即约等于28px
```

最后A、B、C、D、E的实际宽度分别为：

120-14=106px, 120-14=106px, 120-14=106px, 120-28=92px,120-28=92px

此外，这个宽度是包含边框的。

![flex-shrink](https://z3.ax1x.com/2021/12/02/oNacxe.png)

### flex-basis：用于设置或检索弹性盒伸缩基准值

设置第二个弹性盒元素的初始长度为 80 像素：

```html
<div id="main">
  <div style="background-color:coral;"></div>
  <div style="background-color:lightblue;"></div>
  <div style="background-color:khaki;"></div>
  <div style="background-color:pink;"></div>
  <div style="background-color:lightgrey;"></div>
</div>
```

```css
#main {
    width: 350px;
    height: 100px;
    border: 1px solid #c3c3c3;
    display: -webkit-flex; /* Safari */
    display: flex;
}

#main div {
    -webkit-flex-grow: 0; /* Safari 6.1+ */
    -webkit-flex-shrink: 0; /* Safari 6.1+ */
    -webkit-flex-basis: 40px; /* Safari 6.1+ */
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 40px;
}

#main div:nth-of-type(2) {
    -webkit-flex-basis: 80px; /* Safari 6.1+ */
    flex-basis: 80px;
}
```

![flex-basis](https://z3.ax1x.com/2021/12/02/oNaWqA.png)

## Vue

### 日期控件在表单验证中报错

遇到了冲突如下：

:::danger
Error in event handler for "el.form.change": "TypeError: value.getTime is not a function"
:::

Element UI的日期选择器`el-date-picker`在加上格式`value-format="yyyy-MM-dd"`和`format="yyyy-MM-dd"`

在表单验证时：

```js
{ type: 'date', required: true, message: '请选择日期', trigger: 'change' } 
```

会出现冲突

解决方法：修改校验规则

`type: 'date'`->`type: 'string'`

错误可能原因：Element UI自带的格式转换后会将绑定值转为字符串，而校验规则中的`type: 'date'`已经不匹配，至于它的报错是因为转换为字符串，不是`date`对象所以没有`getTime`这个方法。

## E-Commerce

### Spu和Sku的概念及区别

#### Spu概念

```
Standard Product Unit（标准化产品单元）

SPU是商品信息聚合的最小单位，是一组可复用、易检索的标准化信息的集合，该集合描述了一个产品的特性。通俗点讲，属性值、特性相同的商品就可以称为一个SPU
```

#### Sku概念

```
Stock Keeping Unit（库存量单位）

SKU即库存进出计量的单位， 可以是以件、盒、托盘等为单位。

SKU是物理上不可分割的最小存货单元。在使用时要根据不同业态，不同管理模式来处理。在服装、鞋类商品中使用最多最普遍。
```

#### 区别（举例说明）

```
你想要一台iPhone XS, 店员会继续问: 你想要什么iPhone XS? 16G 银色？64G 白色？

每一台iPhone XS的毛重都是420.00g，产地也都是中国大陆，这两个属性就属于spu属性。

而容量和颜色，这种会影响价格和库存的(比如16G与64G的价格不同，16G银色还有货，金色卖完了)属性就是sku属性。

spu属性：

1. 毛重420.00g

2. 产地中国大陆

sku属性：

1. 容量: 16G、64G、128G

2. 颜色: 银、白、玫瑰金

例如：iPhone X 可以确定一个产品即为一个SPU。

例如：iPhone X 64G 银色则是一个SKU。
```

### SKU核心算法

核心问题：规格的状态（可选、选中、禁用）

去字典（存放`已存在的SKU路径`）里查找`待确认的SKU路径`是否存在

每当用户选择规格后，所有规格都需要去重新确认状态

正选与反选规律：

1. 当前的Cell，不需要判断潜在路径
2. 对于某个Cell，它的潜在路径是它自己加上其他行的已选Cell
3. 对于某个Cell，不需要考虑当前行其他Cell是否已选

### 转置矩阵

将矩阵的行列互换得到的新矩阵称为转置矩阵，转置矩阵的行列式不变。

#### 定义

![转置前](https://z3.ax1x.com/2021/09/13/4PG2CT.png)

把m×n矩阵的行列互换之后得到的矩阵，称为A的转置矩阵，记作A^T，即

![转置后](https://z3.ax1x.com/2021/09/13/4PG4KJ.png)

由定义可知，A为m×n矩阵，则A^T为n×m矩阵。

例如：

![](https://z3.ax1x.com/2021/09/13/4POSIg.png)

如果n阶方阵和它的转置相等，即A^T = A，则称A矩阵为对称矩阵。

如果A^T = -A，则称矩阵A为反对称矩阵。

#### 运算性质

![](https://z3.ax1x.com/2021/09/13/4POui4.png)

## WeChat Miniprogram

### wx:if与hidden区别

`wx:if`之中的模板也可能包含数据绑定，所以当`wx:if`的条件值切换时，框架有一个局部渲染的过程，因为它会确保条件块在切换时销毁或重新渲染。

同时`wx:if`也是惰性的，如果在初始渲染条件为`false`，框架什么也不做，在条件第一次变成真的时候才开始局部渲染。

相比之下，`hidden`就简单的多，组件始终会被渲染，只是简单的控制显示与隐藏。

一般来说，`wx:if`有更高的切换消耗而`hidden`有更高的初始渲染消耗。因此，如果需要频繁切换的情景下，用`hidden`更好，如果在运行时条件不大可能改变则`wx:if`较好。

### 消除图片组件默认间距

解决方案：在图片css样式上设置flex布局即可消除间距

```css
display: flex;
```

### 点击态

使用`view`组件包裹，绑定`hover-class`属性，默认值`none`

`view`其他属性：

| 属性                   | 类型    | 默认值 | 说明                                   |
| ---------------------- | ------- | ------ | -------------------------------------- |
| hover-stop-propagation | boolean | false  | 指定是否阻止本节点的祖先节点出现点击态 |
| hover-start-time       | number  | 50     | 按住后多久出现点击态，单位毫秒         |
| hover-stay-time        | number  | 400    | 手指松开后点击态保留时间，单位毫秒     |

```css
.rect-hover {
  position: relative;
  top: 3rpx;
  left: 3rpx;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1) inset;
}

.small-hover {
  opacity: 0.9;
  transform: scale(0.95, 0.95);
}

.medium-hover {
  opacity: 0.8;
  transform: scale(0.85, 0.85);
}
```

### 自定义组件事件跨越组件边界

:::tip
如果自定义组件事件需跨越组件边界，进入其他任何组件内部时，需开启`bubbles`和`composed`属性
:::

事件分为冒泡事件和非冒泡事件：

冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。

非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。

bubbles：事件是否冒泡

composed：事件是否可以穿越组件边界，为`false`时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部

示例代码：

```js
methods: {
  onTap(event) {
    this.triggerEvent('tap', {}, {
      bubbles: true,
      composed: true
    })
  }
}
```

### new Date()转换时间时，IOS机型时间格式显示NaN异常问题

错误原因：ios不支持时间为2020-05-29这种格式的日期，必须转换为2020/05/29这种格式才能使用`new Date()`进行转换

解决方法：使用`replace`函数，将全部的“-”替换为”/“

```
const data= '2020-05-29 12:00:00'
const datatime= data.replace(/\-/g, "/")
const newdata = new Date(datatime).getTime()
```

### @tap与@click的区别

- @click是组件被点击时触发，会有约300ms的延迟（内置处理优化了）
- @tap是手指触摸离开时触发，没有300ms的延迟，但是会有事件穿透
- 编译到小程序端，@click会被转换成@tap

### uni-app改变页面背景色

全局背景颜色设置方式：

在`App.vue`的`style`样式表中设置

```css
<style lang="scss">	
page {
	background-color: #F0AD4E;
}
</style>
```

单页面背景色设置方式：

对应页面中的`style`样式表中设置，且不能有`scoped`属性，如果需要使用带`scoped`属性的样式表，则重新创建一个样式表单独写背景色样式

```css
<style lang="scss" scoped>
@import './home.scss';
</style>

<style>
page {
	background-color: #f7f7f7;
	font-family: PingFangSC-Regular;
}
</style>
```

### 数据绑定多次触发问题

对于某组件来说，如果绑定了某一个属性时，组件初始化时，不管属性是否有值或者默认值，都会进行一次数据绑定

当页面调用该组件，并且绑定组件某个属性时，当改变了该属性的值，会再次触发数据监听

当组件属性有默认值时，如果我们调用组件时，不设置某一个属性，就会去取这个属性的默认值，但是，一旦设置了某一个属性，就不会再取该属性的默认值

<RightMenu />