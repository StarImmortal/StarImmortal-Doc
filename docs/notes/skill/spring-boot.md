---
title: Spring Boot
---

:::tip
本专栏介绍Spring Boot常用的奇技淫巧，让你解放双手，提高开发效率！
:::

## Spring Boot Banner 设置

1. banner.txt

在SpringBoot项目的`resources`目录下新建一个`banner.txt`文本文件，然后将启动Banner粘贴到此文本文件中，启动项目即可。

![](https://z3.ax1x.com/2021/05/14/gszwGt.jpg)
![](https://z3.ax1x.com/2021/05/14/gszdPI.jpg)

2. 在线制作banner网站

- http://patorjk.com/software/taag
- https://www.bootschool.net/ascii
- http://www.network-science.de/ascii
- https://www.degraeve.com/img2txt.php

## Spring Boot 热部署

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

## Spring Boot 解决跨域问题

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

## Spring Boot 集成全局唯一ID生成器

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

## Spring Boot 配置多环境

1. 修改pom.xml文件

```xml
<!-- 环境 -->
<profiles>
  <!-- 开发环境 -->
  <profile>
      <id>dev</id>
      <properties>
          <profile-name>dev</profile-name>
      </properties>
      <activation>
          <activeByDefault>true</activeByDefault>
      </activation>
  </profile>
  <profile>
      <!-- 测试环境 -->
      <id>test</id>
      <properties>
          <profile-name>test</profile-name>
      </properties>
  </profile>
  <profile>
      <!-- 生产环境 -->
      <id>prod</id>
      <properties>
          <profile-name>prod</profile-name>
      </properties>
  </profile>
</profiles>
```

2. 添加多环境配置文件

![多环境配置文件](https://s1.ax1x.com/2022/06/01/XJuQ6f.png)

3. 修改`application.yml`文件

```yml
spring:
  profiles:
    active: @profile.name@
```

:::tip
`@profile-name@`指向的是`pom.xml`文件中的`<properties>`的下一级标签名
:::

4. 选择对应环境启动即可

![多环境](https://s1.ax1x.com/2022/06/01/XJuapq.png)

<RightMenu />