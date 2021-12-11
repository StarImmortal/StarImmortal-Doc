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

## MySQL重新设置自增id

设置主键id自增的数据库表删除数据后，自增id不会自动重新计算 

重新设置自增的id命令如下：

```bash
alter table table_name AUTO_INCREMENT=1;
```

*注意：table_name是表名，1表示自增开始的位置*

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

## 自定义VS Code插件安装位置

右键快捷方式，在原本的目标后加入`--extensions-dir "插件新的存储位置"`，例如：

```
"D:\Microsoft VS Code\Code.exe" --extensions-dir "D:\VS Code Extensions"
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
/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
```

8. 匹配身份证号码

```js
/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
```

<RightMenu />