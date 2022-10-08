---
title: Jackson
---

## 介绍

:::tip
Jackson 是当前用的比较广泛的，用来序列化和反序列化 json 的 Java 的开源框架。 Spring MVC 的默认 json 解析器便是 Jackson，与其他 Java 的 json 的框架 Gson 等相比， Jackson 解析大的 json 文件速度比较快；Jackson 运行时占用内存比较低，性能比较好；Jackson 有灵活的 API，可以很容易进行扩展和定制。
:::

## 序列化

```java
User user = new User();

user.setName("小民");	
user.setEmail("xiaomin@sina.com");
user.setAge(20);

ObjectMapper mapper = new ObjectMapper();

String json = mapper.writeValueAsString(user);
```

## 反序列化

### ObjectMapper

#### 从Reader读取对象

```java
ObjectMapper objectMapper = new ObjectMapper();

String str = "{\"id\":1,\"name\":\"william\"}";

Reader reader = new StringReader(str);

UserDO user = objectMapper.readValue(reader, UserDO.class);
```

#### 从File读取对象

```java
ObjectMapper objectMapper = new ObjectMapper();

File file = new File("user.json");

UserDO user = objectMapper.readValue(file, UserDO.class);
```

#### 从URL读取对象

```java
ObjectMapper objectMapper = new ObjectMapper();

URL url = new URL("file:user.json");

UserDO user = objectMapper.readValue(url, UserDO.class);
```

#### 从InputStream读取对象

```java
ObjectMapper objectMapper = new ObjectMapper();

InputStream inputStream = new FileInputStream("user.json");

UserDO user = objectMapper.readValue(inputStream, UserDO.class);
```

#### 从字节数组读取对象

```java
ObjectMapper objectMapper = new ObjectMapper();

String str = "{\"id\":1,\"name\":\"william\"}";

byte[] bytes = str.getBytes("UTF-8");

UserDO user = objectMapper.readValue(bytes, UserDO.class);
```

#### JSON字符串映射List

```java
String jsonArray = "[{\"id\":1,\"name\":\"william\"}, {\"id\":2,\"name\":\"immortal\"}]";

ObjectMapper objectMapper = new ObjectMapper();

List<UserDO> userList = objectMapper.readValue(jsonArray, new TypeReference<List<UserDO>>(){});
```

#### JSON字符串映射Map

```java
String jsonObject = "{\"id\":1,\"name\":\"william\"}";

ObjectMapper objectMapper = new ObjectMapper();

Map<String, Object> jsonMap = objectMapper.readValue(jsonObject, new TypeReference<Map<String, Object>>(){});
```

### JsonNode（树模型）

```java
String str = "{\"id\":1,\"name\":\"william\",\"children\":[{\"age\":1,\"name\":\"lucy\"},{\"age\":2,\"name\":\"jack\"}]}";

ObjectMapper objectMapper = new ObjectMapper();

JsonNode jsonNode = objectMapper.readTree(str);

String name = jsonNode.get("name").asText();
log.info("name：{}", name);

JsonNode children = jsonNode.get("children");
for (JsonNode child : children) {
    log.info("age：{}", child.get("age").asInt());
}
```

### Object转换JsonNode

```java
ObjectMapper objectMapper = new ObjectMapper();

UserDO user = new UserDO("william");

JsonNode jsonNode = objectMapper.valueToTree(user);
```

### JsonNode转换Object

```java
ObjectMapper objectMapper = new ObjectMapper();

String str = "{\"id\":1,\"name\":\"william\"}";

JsonNode jsonNode = objectMapper.readTree(str);

UserDO user = objectMapper.treeToValue(jsonNode);
```

## 常用设置

```java
ObjectMapper objectMapper = new ObjectMapper();
 
// 序列化的时候序列对象的所有属性  
objectMapper.setSerializationInclusion(Include.ALWAYS);  
 
// 反序列化的时候如果多了其他属性，不抛出异常  
objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);  
 
// 如果是空对象的时候，不抛异常  
objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);  
 
// 属性为null的转换
objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
 
// 取消时间的转化格式，默认是时间戳，可以取消，同时需要设置要表现的时间格式  
objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
```

## 常用注解

| 注解                                        | 用法                                                         |
| ------------------------------------------- | ------------------------------------------------------------ |
| @JsonProperty                               | 指定序列化后的字段名                                         |
| @JsonIgnoreProperties(ignoreUnknown = true) | 将这个注解加载类上，不存在的字段将被忽略                     |
| @JsonIgnoreProperties({ “password” })       | 指定忽略字段                                                 |
| @JsonIgnore                                 | 忽略字段                                                     |
| @JsonFormat                                 | 用于属性或者方法，将格式序列化时转换成指定的格式。<br/>示例：@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss") |
| @JsonInclude                                | JsonInclude.Include.NON_EMPTY：属性为空或者null都不参与序列化<br/>JsonInclude.Include.NON_NULL：属性为null不参与序列化 |
| @JsonPropertyOrder                          | 用于类， 指定属性在序列化时的顺序<br/>示例：@JsonPropertyOrder({ "age", "name" }) |

<RightMenu />