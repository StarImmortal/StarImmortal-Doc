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

## 自定义VS Code插件安装位置

右键快捷方式，在原本的目标后加入`--extensions-dir "插件新的存储位置"`，例如：

```
"D:\Microsoft VS Code\Code.exe" --extensions-dir "D:\VS Code Extensions"
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

## SpringBoot Banner 设置

1. banner.txt

在SpringBoot项目的`resources`目录下新建一个`banner.txt`文本文件，然后将启动Banner粘贴到此文本文件中，启动项目即可。

![](https://z3.ax1x.com/2021/05/14/gszwGt.jpg)
![](https://z3.ax1x.com/2021/05/14/gszdPI.jpg)

2. 在线制作banner网站

- http://patorjk.com/software/taag
- https://www.bootschool.net/ascii
- http://www.network-science.de/ascii
- https://www.degraeve.com/img2txt.php

## SpringBoot 热部署

:::tip
平时使用SpringBoot开发应用时，修改代码后需要重新启动才能生效。如果你的应用足够大的话，启动可能需要好几分钟。有没有什么办法可以加速启动过程，让我们开发应用代码更高效呢？今天给大家推荐一款SpringBoot官方的热部署工具`spring-boot-devtools`，修改完代码后可快速自动重启应用！
:::

### 集成 spring-boot-devtools

首先需要在项目的`pom.xml`文件中，添加`spring-boot-devtools`的依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

由于在项目构建时，devtools才会自动重启项目，而IDEA默认并没有使用自动构建，此时可以修改应用启动配置，设置当IDEA失去焦点时自动构建项目

![](https://z3.ax1x.com/2021/09/13/4im0Ug.png)

由于devtools检测时间和IDEA的编译所需时间存在差异，当IDEA还没编译完成，devtools就已经重启应用了，修改`application.yml`配置文件，添加如下配置即可解决：

```yml
spring:
  devtools:
    restart:
    	 poll-interval: 2s
    	 quiet-period: 1s
```

## SpringBoot 解决跨域问题

### 什么是跨域？

定义：浏览器从一个域名的网页取请求另一个域名下的东西。通俗点说，浏览器直接从A域访问B域中的资源是不被允许的，如果想要访问，就需要进行一步操作，这操作就叫“跨域”。例如，你从百度的页面，点击一个按钮，请求了新浪的一个接口，这就进行了跨域。不单单只有域名不同就是跨域，域名、端口、协议其一不同就是不同的域，请求资源需要跨域。

### 为什么要跨域？
为什么需要跨域，而不直接访问其他域下的资源呢？这是浏览器的限制，专业点说叫浏览器同源策略限制。主要是为了安全考虑。现在的安全框架，一般请求的时候header中不是都存个token嘛，你要是用这个token去正常访问A域下的东西是没问题的，然后又去访问了B域，结果阴差阳错的还带着这个token，那么B域，或者说B网站是不是就可以拿着你的token去A域下做点什么呢，这就相当危险了。所以浏览器加上了所谓的浏览器同源策略限制。但是为了我们真的需要从A域下访问B的资源（正常访问），就需要用到跨域，跨越这个限制了。

### 解决方案

第一种方案：重写`WebMvcConfigure`，实现全局配置

```java
/**
 * Spring MVC 配置
 *
 * @author william@StarImmortal
 * @date 2021/02/08
 */
@Configuration(proxyBeanMethods = false)
@Slf4j
public class WebConfiguration implements WebMvcConfigurer {

    /**
     * 跨域
     * 注意： 跨域问题涉及安全性问题，这里提供的是最方便简单的配置，任何host和任何方法都可跨域
     * 但在实际场景中，这样做，无疑很危险，所以谨慎选择开启或者关闭
     * 如果切实需要，请咨询相关安全人员或者专家进行配置
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true)
                .maxAge(3600)
                .allowedHeaders("*");
    }
}
```

第二种方案：重写过滤器，实现全局配置

```java
import org.springframework.context.annotation.Configuration;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "CorsFilter ")
@Configuration
public class CorsFilter implements Filter {

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin","*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE, PUT");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        chain.doFilter(req, res);
    }
}
```

第三种方案：使用`@CrossOrigin`注解，实现局部跨域

@CrossOrigin中的两个重要参数：

- origins：允许可访问的域列表
- maxAge：准备响应前的缓存持续的最大时间（以秒为单位）

:::tip
SpringMVC的版本要在4.2或以上版本才支持@CrossOrigin

注解可以放在method、class等上面，类似RequestMapping
:::

## SpringBoot项目集成全局唯一ID生成器

### 介绍

[源码地址](https://github.com/baidu/uid-generator)

UidGenerator是Java实现的，基于Snowflake算法的唯一ID生成器。

UidGenerator以组件形式工作在应用项目中，支持自定义workerId位数和初始化策略，从而适用于docker等虚拟化环境下实例自动重启、漂移等场景。

在实现上，UidGenerator通过借用未来时间来解决sequence天然存在的并发限制；采用RingBuffer来缓存已生成的UID，并行化UID的生产和消费，同时对CacheLine补齐，避免了由RingBuffer带来的硬件级「伪共享」问题，最终单机QPS可达600万。

### 打包源码

![打包源码](https://s1.ax1x.com/2021/12/11/oof2Nj.png)

![打包成功](https://s1.ax1x.com/2021/12/11/oofgEQ.png)

:::tip
注意事项：请在需要集成UidGenerator的项目进行导包操作，输入如下命令进行如下操作进行导包，注意修改jar包位置
:::

```bash
mvn install:install-file -Dfile=/opt/uid-generator-1.0.0-SNAPSHOT.jar -DgroupId=com.generator -DartifactId=uid-generator -Dversion=1.0.0-SNAPSHOT -Dpackaging=jar
```

![执行导包操作](https://s1.ax1x.com/2021/12/11/oofsu8.png)

![输入命令](https://s1.ax1x.com/2021/12/11/oofa4A.png)

![导入成功](https://s1.ax1x.com/2021/12/11/oofYHe.png)

### 引入依赖

:::tip
注意事项：由于UidGenerator默认集成了MyBatis和MyBatis Spring相关依赖，本项目使用的是MyBatis Plus，因此要把MyBatis和MyBatis Spring的依赖排除。
:::

```xml
<dependency>
    <groupId>com.generator</groupId>
    <artifactId>uid-generator</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <exclusions>
        <exclusion>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>commons-lang</groupId>
    <artifactId>commons-lang</artifactId>
    <version>2.6</version>
</dependency>
```

### 创建数据表

```sql
DROP TABLE IF EXISTS `worker_node`;
CREATE TABLE `worker_node` (
  `work_node_id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `host_name` varchar(64) NOT NULL COMMENT '主机名称',
  `port` varchar(64) NOT NULL COMMENT '端口',
  `type` int NOT NULL COMMENT '类型(ACTUAL or CONTAINER)',
  `launch_date` date NOT NULL COMMENT '年月日',
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
  `update_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '修改时间',
  PRIMARY KEY (`work_node_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

### 创建实体类

```java
@Data
@TableName("worker_node")
public class WorkNode {

    @TableId(value = "work_node_id", type = IdType.AUTO)
    private Long workNodeId;

    /**
     * 主机名称
     */
    private String hostName;

    /**
     * 端口
     */
    private String port;

    /**
     * 类型(ACTUAL or CONTAINER)
     */
    private Integer type;

    /**
     * 年月日
     */
    private Date launchDate;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    @TableField(update = "now()")
    private Date updateTime;
}
```

### 创建持久层

```java
@Repository
public interface WorkerNodeMapper extends BaseMapper<WorkNode> {
}
```

### 创建接口及实现类

```java
public interface WorkNodeService extends IService<WorkNodeDO> {
    WorkNodeDO getWorkerNodeByHostPort(String host, String port);

    void insertWorkerNode(WorkNodeDO workNode);
}

@Service
public class WorkNodeServiceImpl extends ServiceImpl<WorkerNodeMapper, WorkNodeDO> implements WorkNodeService {

    @Override
    public WorkNodeDO getWorkerNodeByHostPort(String host, String port) {
        return null;
    }

    @Override
    public void insertWorkerNode(WorkNodeDO workNode) {

    }
}
```

### 创建UidGenerator配置类

```java
public class DisposableWorkerIdAssigner implements WorkerIdAssigner {

    @Autowired
    private WorkNodeService workNodeService;

    /**
     * Assign worker id base on database.<p>
     * If there is host name & port in the environment, we considered that the node runs in Docker container<br>
     * Otherwise, the node runs on an actual machine.
     *
     * @return assigned worker id
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public long assignWorkerId() {
        WorkNodeDO workNode = buildWorkerNode();
        workNodeService.insertWorkerNode(workNode);
        return workNode.getWorkNodeId();
    }

    /**
     * Build worker node entity by IP and PORT
     */
    private WorkNodeDO buildWorkerNode() {
        WorkNodeDO workNode = new WorkNodeDO();
        if (DockerUtils.isDocker()) {
            workNode.setType(WorkerNodeType.CONTAINER.value());
            workNode.setHostName(DockerUtils.getDockerHost());
            workNode.setPort(DockerUtils.getDockerPort());
            workNode.setLaunchDate(new Date());
        } else {
            workNode.setType(WorkerNodeType.ACTUAL.value());
            workNode.setHostName(NetUtils.getLocalAddress());
            workNode.setPort(System.currentTimeMillis() + "-" + new Random().nextInt(100000));
            workNode.setLaunchDate(new Date());
        }
        return workNode;
    }
}
```

```java
@Configuration
public class IdGeneratorConfiguration {
    
    @Bean
    public DisposableWorkerIdAssigner disposableWorkerIdAssigner() {
        return new DisposableWorkerIdAssigner();
    }

    @Bean
    public CachedUidGenerator cachedUidGenerator() {
        CachedUidGenerator cachedUidGenerator = new CachedUidGenerator();
        cachedUidGenerator.setWorkerIdAssigner(disposableWorkerIdAssigner());
        return cachedUidGenerator;
    }
}
```

### 测试

```java
@RestController
@RequestMapping("/v1/test")
public class TestController {
    @Autowired
    private UidGenerator uidGenerator;

    @GetMapping("/uid")
    public Long index() {
        return uidGenerator.getUID();
    }
}
```

![测试成功](https://s1.ax1x.com/2021/12/11/oofGnO.png)

## MySQL重新设置主键自增

设置主键id自增的数据库表删除数据后，自增id不会自动重新计算 

重新设置自增的id命令如下：

```mysql
alter table table_name AUTO_INCREMENT=1;
```

:::tip
注意：table_name是表名，1表示自增开始的位置
:::

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

## MySQL查询JSON类型字段中某个属性值

:::tip
只支持MySQL5.7以上的版本
:::

user表中有如下数据：

|  id  |            profile             |
| :--: | :-----------------------------:|
|  1   | {"age": 20, "name": "吴彦祖"} |
|  2   | {"age": 21, "name": "陈伟霆"} |

如果需要查询`id`为`1`的记录中`profile`字段中`age`属性的值：

```mysql
SELECT id, `profile` -> '$.age' AS age FROM user;
```

|  id  | age  |
| :--: | :--: |
|  1   |  20  |

如果需要查询`profile`字段中`age`属性值为`20`的记录：

```mysql
SELECT * FROM user WHERE JSON_EXTRACT(`profile`, "$.age") = 20;
```

:::tip
JSON_EXTRACT(列名,"$.json某个属性")
:::

![查询结果](https://z3.ax1x.com/2021/11/18/IoeHxO.png)

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

## 常用正则表达式

1. 验证除了0之外的任何整数

```js
/^(\+|-)?[1-9][0-9]*$/
```

2. 验证除了0之外的任何数字

```
/^(\+|-)?([1-9][0-9]*(\.\d+)?|(0\.(?!0+$)\d+))$/
```

3. 只能数字（允许两位小数）

```js
/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
```

4. 非负整数

```js
/^\d+$/
```

5. 大于0的正整数

```js
/^\+?[1-9]\d*$/
```

6. 匹配Email地址

```js
/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
```

7. 匹配手机号码

```js
/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
```

8. 匹配身份证号码

```js
/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
```

## JavaScript判断数组中某个元素是否存在

1. indexOf()：返回索引，大于0则存在，-1则不存在

```js
const array = ['apple', 'banance', 'orange']

array.indexOf('apple') --> 0：存在

array.indexOf('strawBerry') --> -1：不存在
```

2. find()：找出第一个符合条件的数组元素，存在则返回该元素，如果不存在，就返回undefined

```js
const array = ['apple', 'banance', 'orange']

array.find(arr => arr === 'banance') --> banance：存在

array.find(arr => arr === 'strawBally') --> undefined：不存在
```

```js
[1, 5, 15, 20, 25].find((value,index,arr) => { return value > 20 })
```

```js
const arrayList = [{name: '张三'}, {name: '李四'}]

arrayList.find(obj => obj.name === '李四') --> {name: '李四'}：存在

arrayList.find(obj => obj.name === '王五') --> undefined：不存在
```

3. findIndex()：返回第一个符合条件的数组元素的位置，如果所有的元素都不符合条件，就返回-1

```js
const array = ['apple', 'banance', 'orange']

array.findIndex(arr => arr === 'banance') --> 大于0：存在

array.findIndex(arr => arr === 'strawBally') --> -1：不存在
```

4. includes()：返回值为布尔类型（note：ie不太兼容，慎用）

```js
const array = ['apple', 'banance', 'orange']

array.includes('banance') --> true：存在

array.includes('strawBally') --> false：存在
```

5. filter()：返回一个数组

```js
const array = ['apple', 'banance', 'orange']

array.filter(obj => obj == 'orange') --> ['orange']：存在

array.filter(obj => obj == 'strawBally') --> []：不存在
```

```js
const array = [{ name: 'banance' }, { name: 'apple' }]

console.log(array.filter(obj => obj.name === 'apple')) --> [{name: 'apple'}]：存在

console.log(array.filter(obj => obj.name === 'strawBally')) --> []：不存在
```

## Vue + Element UI 中国省市区数据三级联动

### 安装数据

```js
npm install element-china-area-data
```

### 页面引入

```js
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
```

### 参数说明

- provinceAndCityData：省市二级联动数据（不带“全部”选项）
- regionData：省市区三级联动数据（不带“全部”选项）
- provinceAndCityDataPlus：省市区三级联动数据（带“全部”选项）
- regionDataPlus：省市区三级联动数据（带“全部”选项）
- "全部"选项绑定的value是空字符串""
- CodeToText：属性是区域码，属性值是汉字

:::tip
CodeToText['110000'] = 北京市
:::

- TextToCode：属性是汉字，属性值是区域码

:::tip
TextToCode['北京市'].code = 110000

TextToCode['北京市']['市辖区'].code = 110100

TextToCode['北京市']['市辖区']['朝阳区'].code = 110105
:::

### 示例代码

- 省市二级联动（不带“全部”选项）:

```Html
<template>
  <div id="app">
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
 
<script>
  import { provinceAndCityData } from 'element-china-area-data'
  export default {
    data () {
      return {
        options: provinceAndCityData,
        selectedOptions: []
      }
    },
 
    methods: {
      handleChange (value) {
        console.log(value)
      }
    }
  }
</script>
```

- 省市二级联动（带“全部”选项）:

```Html
<template>
  <div id="app">
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
 
<script>
  import { provinceAndCityDataPlus } from 'element-china-area-data'
  export default {
    data () {
      return {
        options: provinceAndCityDataPlus,
        selectedOptions: []
      }
    },
 
    methods: {
      handleChange (value) {
        console.log(value)
      }
    }
  }
</script>
```

- 省市区三级联动（不带“全部”选项）

```Html
<template>
  <div id="app">
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
 
<script>
  import { regionData } from 'element-china-area-data'
  export default {
    data () {
      return {
        options: regionData,
        selectedOptions: []
      }
    },
 
    methods: {
      handleChange (value) {
        console.log(value)
      }
    }
  }
</script>
```

- 省市区三级联动（带“全部”选项）

```Html
<template>
  <div id="app">
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</template>
 
<script>
  import { regionDataPlus } from 'element-china-area-data'
  export default {
    data () {
      return {
        options: regionDataPlus,
        selectedOptions: []
      }
    },
 
    methods: {
      handleChange (value) {
        console.log(value)
      }
    }
  }
</script>
```

### 在线演示地址](https://plortinus.github.io/element-china-area-data/index.html)

## 微信小程序集成ESLint + Preitter

当写React、Vue等大项目、或者使用框架搭建小程序时，为了便于多人协作开发，常常会引入ESlint和Preitter来规范代码书写，使得不同的开发者写出风格统一的代码。

对于原生小程序项目，或许不需要使用webpack等模块打包工具，但同样可以配置合适的ESlint规范和Preitter规范，来处理统一代码风格。

### 集成依赖

在**package.json**文件集成如下依赖：

```json
"devDependencies": {
  "@babel/core": "^7.16.7",
  "@babel/eslint-parser": "^7.16.5",
  "eslint": "^8.5.0",
  "eslint-plugin-prettier": "^4.0.0",
  "prettier": "^2.5.1"
}
```

### 安装依赖

```bash
npm install
```

### 新建.eslintrc.js文件

```js
module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      // lambda表达式
      arrowFunctions: true,
      // 解构赋值
      destructuring: true,
      // class
      classes: true,
    },
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
    requireMiniProgram: true,
  },
  rules: {},
}
```

### 新建.prettierrc.js文件

```js
module.exports = {

}
```

### 新建.babel.config.js文件

```js
module.exports = {
  presets: [],
  plugins: [],
}
```

### 配置规则

大家可以到官网配置属于自己团队的代码风格：

- [ESLint官网](https://eslint.bootcss.com/docs/rules/)

- [Prettier官网](https://prettier.io/docs/en/options.html)

或者可以参照我团队的代码风格：

#### ESLint

```js
rules: {
  'prefer-const': 1, // 要求使用 const 声明那些声明后不再被修改的变量
  'max-len': 0, // 强制一行的最大长度
  'guard-for-in': 0, // 要求 for-in 循环中有一个 if 语句
  'no-console': 'off', // 禁用 console
  'no-debugger': 'off', // 禁用 debugger
  'no-plusplus': 0, // 禁止使用++，--
  'no-extra-semi': 0, // 和prettier冲突
  'import/extensions': 0, // import不需要写文件扩展名
  'no-underscore-dangle': 0, // 禁止标识符中有悬空下划线
  'no-restricted-syntax': 0, // 禁用特定的语法
  'consistent-return': 'off', // 要求 return 语句要么总是指定返回的值，要么不指定
  semi: ['error', 'never'], // 要求或禁止使用分号代替 ASI
  'no-prototype-builtins': 'off', // 禁止直接调用 Object.prototypes 的内置属性
  'class-methods-use-this': 'off', // 强制类方法使用 this
  'template-curly-spacing': 'off', // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
  'linebreak-style': [0, 'error', 'windows'], // 强制使用一致的换行风格
  'arrow-parens': ['error', 'as-needed'], // 要求箭头函数的参数使用圆括号
  'no-param-reassign': ['error', { props: false }], // 禁止对 function 的参数进行重新赋值
  indent: [
    'warn',
    2,
    {
      ignoredNodes: ['TemplateLiteral'],
      SwitchCase: 1,
    },
  ],
},
```

#### Preitter

```js
  singleQuote: true, // 字符串是否使用单引号，默认为false，使用双引号
  semi: false, // 行位是否使用分号，默认为true
  trailingComma: 'all', // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  printWidth: 120,
  arrowParens: 'avoid'
```

### 常见问题

#### Parsing error: Unexpected token = ***

问题原因：开发环境与ESLint当前的解析功能不兼容

解决方案：

1）安装`@babel/eslint-parser`与`@babel/core`

```bash
npm i @babel/eslint-parser @babel/core --save-dev
```

2）创建`.babel.config.js`文件

```js
module.exports = {
  presets: [],
  plugins: [],
}
```

3）配置解析器

```js
module.exports = {
  parser: '@babel/eslint-parser'
}
```

#### Error: Must use import to load ES Module

问题原因：

使用已弃用的babel-eslint解析器不支持ES6模块，可以尝试更新。

解决方法：

1）在`package.json`文件中，将行`"babel-eslint"`更新为`"@babel/eslint-parser": "^7.16.5"`

2）从文件夹中的终端/命令提示符中运行`npm i`

3）在`.eslintrc`中，将解析器行`"parser": "babel-eslint"`更新为`"parser": "@babel/eslint-parser"`

4）如果没有创建`.babel.config.js`，可以在`.eslintrc`文件中，添加`"requireConfigFile": false`

```js
parserOptions: {
  ecmaVersion: 2018,
  sourceType: 'module',
  ecmaFeatures: {
    // lambda表达式
    arrowFunctions: true,
    // 解构赋值
    destructuring: true,
    // class
    classes: true,
  },
  requireConfigFile: false
},
```

5）运行`npm run lint`命令来检测文件

<RightMenu />