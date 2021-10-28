---
title: 常见问题
---

## 环境配置

### Yarn

错误信息：无法加载文件 D:\NodeJS\node_global\yarn.ps1，因为在此系统上禁止运行脚本。

解决方案：

1. 搜索`powershell`，右键`以管理员身份运行`
2. 若要在本地计算机上运行您编写的未签名脚本和来自其他用户的签名脚本，请使用以下命令将计算机上的执行策略更改为`RemoteSigned`

```bash
set-ExecutionPolicy RemoteSigned
```

![powershell](https://z3.ax1x.com/2021/08/30/htLlUe.png)

![更改执行策略](https://z3.ax1x.com/2021/08/30/htLy2n.png)

### IDEA

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

解决方法：

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

## Spring

### spring注解之@Scope

`@Scope`注解是`Spring IOC`容器中的一个作用域，在`Spring IOC`容器中具有以下几种作用域：

基本作用域singleton（单例）、prototype（多例），Web作用域（reqeust、session、globalsession），自定义作用域

- singleton（单例模式）：全局有且仅有一个实例
- prototype（原型模式）：每次获取bean的时候会有一个新的实例
- request：针对每一次HTTP请求都会产生一个新的bean，同时该bean仅在当前HTTP request内有效
- session：针对每一次HTTP请求都会产生一个新的bean，同时该bean仅在当前HTTP session内有效
- globalsession：类似于标准的HTTP Session作用域，不过它仅仅在基于portlet的web应用中才有意义

## SpringBoot

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

或

- 配置策略

```java
ObjectMapper objectMapper = new ObjectMapper();

objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
```

### 雪花算法与精度丢失问题

问题描述：`JavaScript`无法处理`Java`的长整型`Long`导致精度丢失，具体表现为主键最后两位永远为`0`

解决思路：`Long`转为`String`返回

解决方案：

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

## Element UI

日期控件在表单验证中遇到了冲突如下：

Error in event handler for "el.form.change": "TypeError: value.getTime is not a function"

Element UI的日期选择器`el-date-picker`在加上格式`value-format="yyyy-MM-dd"`和`format="yyyy-MM-dd"`

在表单验证时：

```js
{ type: 'date', required: true, message: '请选择日期', trigger: 'change' } 
```

会出现冲突

解决方法：修改校验规则

`type: 'date'`->`type: 'string'`

错误可能原因：Element UI自带的格式转换后会将绑定值转为字符串，而校验规则中的`type: 'date'`已经不匹配，至于它的报错是因为转换为字符串，不是`date`对象所以没有`getTime`这个方法。

## 电商专题

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

## 微信小程序

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

### new Date()转换时间时间格式时IOS机型显示NaN异常问题

错误原因：

原因是ios不支持时间为2020-05-29这种格式的日期，必须转换为2020/05/29这种格式才能使用`new Date()`进行转换

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

<RightMenu />