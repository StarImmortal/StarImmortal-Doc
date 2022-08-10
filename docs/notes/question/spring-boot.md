---
title: Spring Boot
---

:::tip
本专栏介绍Spring Boot框架常遇到的一些错误问题，让你避免踩雷，节省开发时间！
:::

## Cause: java.lang.IllegalArgumentException: argument type mismatch

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

## com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException: Unrecognized field

错误信息：Exception in thread "main" com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException: Unrecognized field "age" (class com.daling.bpmn.test.User), not marked as ignorable (3 known properties: "id", "name", "flag"])

错误原因：反序列化时，遇到未知属性

解决方案：

- 添加注解：@JsonIgnoreProperties(ignoreUnknown = true)

- 配置策略

```java
ObjectMapper objectMapper = new ObjectMapper();

objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
```

## 雪花算法与精度丢失问题

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

## 无法反序列化LocalDateTime

解决方法：在实体类字段中添加注解

```java
// 需要哪个用哪个 
@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
@JsonSerialize(using = LocalDateTimeSerializer.class)
@JsonDeserialize(using = LocalDateTimeDeserializer.class)
```

## EasyExcel读取的数据全为null

原因：项目使用了`Lombok`并且还加了`@Accessors(chain = true)`链式注解，与EasyExcel冲突

解决方案：删除`@Accessors(chain = true)`链式注解

## 默认注入单例模式所带来的的问题

在Spring中，组件默认是以单例模式注入的，所以意味着：如果一个类被IOC容器所管理，默认情况下，在整个Application中，一个类只能实例化一个对象，所以在单例模式下，一个类的成员属性中，内部数据是共享的。这时，如果在高并发的情况下，任何一个请求，会反复修改同一份数据，就会出现很大的问题，导致先前数据丢失。

![单例模式](https://s1.ax1x.com/2022/06/01/XJUuVI.png)

利用`@Scope("prototype")`注解来实现多例注入

```java
@Service
@Scope("prototype")
public class TestService {
    
    private Integer id;
    
    private String name;
}
```

如何查看多例模式是否生效呢？主要有如下两种方式：

1. 对象工厂

在需要使用当前对象的地方，通过对象工厂的形式注入。

在使用时，需要调用`getObject()`方法来获取对象，每当发起一个接口请求时，就可以获取到一个新的实例对象。

```java
@RestController
@RequestMapping("/test")
public class TestController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private ObjectFactory<TestService> testService;

    @GetMapping("/prototype")
    public String test() {
        LOGGER.info(testService.getObject().toString());
        return testService.getObject().toString();
    }
}
```

2. 动态代理

在开启`@Scope("prototype")`注解的类或接口额外加入`proxyMode`属性，并指定相应的枚举值：

如果是类，枚举值就选择`TARGET_CLASS`；如果是接口，枚举值选择`INTERFACES`

```java
@Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)
```

![多例模式](https://s1.ax1x.com/2022/06/01/XJUlPf.png)

## 解决 Spring Boot 在 JDK8 中 LocalDateTime (反)序列化问题

### 问题复现

```java
Java 8 date/time type `java.time.LocalDateTime` not supported by default:
 add Module "com.fasterxml.jackson.datatype:jackson-datatype-jsr310" to enable handling....
```

在默认情况下Java 8不支持`LocalDateTime`需要添加`com.fasterxml.jackson.datatype:jackson-datatype-jsr310`依赖

原因：没有添加序列化和反序列化器

### 解决方案

#### 添加依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
    <version>2.13.0</version>
</dependency>
```

#### 指定LocalDateTime的序列化以及反序列化器

```java
@JsonDeserialize(using = LocalDateTimeDeserializer.class)
@JsonSerialize(using = LocalDateTimeSerializer.class)
```

例如：

![示例代码](https://img-blog.csdnimg.cn/52bc52bac63e47f98c08c311f78c074d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA5Lq65Lq66YO95Zyo5Y-R5aWL,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

## 解决 Spring Boot 使用 Actuator 404问题

问题原因：Spring Boot 2.0 中的端点和之前的版本有较大不同，默认只开放了info、health两个端点。

剩余的需要通过配置`management.endpoints.web.exposure.include`属性来开启：

```yml
# 开启所有端点
management:
  endpoints:
    web:
      # 自定义端点
      exposure:
        include: "*"
```

<RightMenu />