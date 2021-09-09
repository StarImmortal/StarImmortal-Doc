---
title: Docker环境部署
---

# Docker虚拟机部署环境

## Java

### 拉取镜像

```bash
docker pull docker.io/java
```

### 运行

```bash
docker run -it --name myjava --restart=always docker.io/java bash
```

## MySql

### 拉取镜像

```bash
docker pull mysql:8.0.19
```

### 创建映射文件夹

```bash
mkdir -p /home/mysql-8.0.19/log /home/mysql-8.0.19/data /home/mysql-8.0.19/conf /home/mysql-8.0.19/mysql-files
```

### 文件夹赋权

```bash
chmod -R 777 /home/mysql-8.0.19/
```

### 运行

```bash
docker run -p 3306:3306 --name mysql \
-v /home/mysql-8.0.19/log:/var/log/mysql \
-v /home/mysql-8.0.19/data:/var/lib/mysql \
-v /home/mysql-8.0.19/conf:/etc/mysql \
-v /home/mysql-8.0.19/mysql-files:/var/lib/mysql-files \
-e MYSQL_ROOT_PASSWORD=password \
-d mysql:8.0.19
```

### 配置文件

```bash
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock

pid-file=/var/run/mysqld/mysqld.pid

sql_mode= 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'
```

### 设置自启动

```bash
docker update mysql --restart=always
```

### 配置远程连接

```bash
docker exec -it mysql bash

mysql -uroot -p

use mysql

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '新密码';

flush privileges;
```

## Redis

### 拉取最新镜像

```bash
docker pull redis:latest
```

### 创建映射文件夹

```bash
mkdir -p /home/redis/data /home/redis/conf
```

### 创建Redis配置文件

```bash
touch /home/redis/conf/redis.conf
```

### Redis配置文件

```bash
#注释掉下面这行代码表示开启外部访问
#bind 127.0.0.1

#保护模式，限制为本地访问，修改后解除保护模式
protected-mode no

#使用守护线程的方式启动
daemonize no

#设置Redis密码
requirepass 123456

#开启持久化
appendonly yes
```

:::tip
docker镜像`redis`默认无配置文件以及无配置文件启动
:::

### 运行容器

```
docker run --name redis -p 6379:6379 -v /home/redis/data:/data -v /home/redis/conf/redis.conf:/etc/redis/redis.conf -d --restart=always redis:latest redis-server /etc/redis/redis.conf
```

## ElasticSearch

### 拉取镜像

```bash
docker pull elasticsearch:7.8.0
```

### 创建映射文件夹

```bash
mkdir -p /home/elasticsearch-7.8.0/config
mkdir -p /home/elasticsearch-7.8.0/data
mkdir -p /home/elasticsearch-7.8.0/logs
mkdir -p /home/elasticsearch-7.8.0/plugins

echo "http.host: 0.0.0.0">>/home/elasticsearch-7.8.0/config/elasticsearch.yml
```

### 文件夹赋权

```bash
chmod -R 777 /home/elasticsearch-7.8.0/
```

### 配置ik分词器插件

* **创建ik文件夹**

  ```bash
  cd /home/elasticsearch-7.8.0/plugins
  
  mkdir ik
  ```
* **解压**

  ```bash
  cd ik
  
  unzip 下载的ik分词器版本
  ```

### 测试单节点运行

```bash
docker run -d --name elasticsearch -p 9200:9200 -e "discovery.type=single-node" elasticsearch:7.8.0
```

### 拷贝容器config文件夹到宿主机目录

```bash
docker cp elasticsearch:/usr/share/elasticsearch/config /home/elasticsearch-7.8.0/config

mv /home/elasticsearch-7.8.0/config/config/* /home/elasticsearch-7.8.0/config/

rm -rf /home/elasticsearch-7.8.0/config/config/
```

### 停止删除并重新运行容器

```bash
docker stop elasticsearch && docker rm elasticsearch

docker run --name elasticsearch -p 9200:9200 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx128m" -v /home/elasticsearch-7.8.0/config:/usr/share/elasticsearch/config -v /home/elasticsearch-7.8.0/data:/usr/share/elasticsearch/data -v /home/elasticsearch-7.8.0/plugins:/usr/share/elasticsearch/plugins -v /home/elasticsearch-7.8.0/logs:/usr/share/elasticsearch/logs -d elasticsearch:7.8.0
```

### 启动容器自启

```bash
docker update elasticsearch --restart=always
```

### 配置TLS

#### 进入容器

```bash
docker exec -it elasticsearch /bin/bash
```

#### 生成节点证书

```bash
./bin/elasticsearch-certutil ca -out config/elastic-certificates.p12 -pass ""
```

#### 配置加密通信

```bash
vi config/elasticsearch.yml

http.cors.allow-headers: Authorization
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true
xpack.security.transport.ssl.verification_mode: certificate
xpack.security.transport.ssl.keystore.path: elastic-certificates.p12
xpack.security.transport.ssl.truststore.path: elastic-certificates.p12

exit
```

#### 更改证书权限

```bash
chmod 644 /home/elasticsearch-7.8.0/config/elastic-certificates.p12
```

#### 设置集群密码

```bash
docker restart elasticsearch

docker exec -it elasticsearch /bin/bash

./bin/elasticsearch-setup-passwords interactive

exit
```

#### 重启容器

```bash
docker restart elasticsearch
```

## Logstash

### 拉取镜像

```bash
docker pull logstash:7.8.0
```

### 创建映射文件夹

```bash
mkdir /home/logstash-7.8.0
```

### 文件夹赋权

```bash
chmod -R 777 /home/logstash-7.8.0/
```

### 运行容器

```bash
docker run --name logstash -d logstash:7.8.0
```

### 拷贝容器文件

```bash
docker cp logstash:/usr/share/logstash/config /home/logstash-7.8.0/config
```

### 配置logstash配置文件 

```bash
echo "http.host: 0.0.0.0">>/home/logstash-7.8.0/config/logstash.yml
```

### 配置同步文件和添加mysql驱动jar包

```bash
cd /usr/local/src/logstash-7.8.0/config/

vi mysql.conf

input {
    stdin{
    }
    jdbc {
    # 数据库连接信息
    jdbc_connection_string => "jdbc:mysql://localhost:3306/数据库?useUnicode=true&characterEncoding=UTF8&useSSL=false&serverTimezone=GMT%2B8&allowMulQueries=true"
    # 用户名
    jdbc_user => "root"
    # 密码
    jdbc_password => ""
    # jdbc驱动包位置
    jdbc_driver_library => "/usr/share/logstash/config/mysql-connector-java-8.0.20.jar"
    # mysql的Driver
    jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
    # 定时任务
    schedule => "* * * * *"
    # 清空上一次的sql_last_value记录
    clean_run => true
    # 你要执行的SQL语句
    statement => "SELECT * FROM 表名 WHERE update_time > :sql_last_value AND update_time < NOW()"
    }
}
output {
    elasticsearch {
        hosts => ""
        user => elastic
        password => 
        # index名
        index => ""
        # 需要关联的数据库中有有一个id字段，对应索引的id号
        document_id => "%{id}"
    }
    stdout {
        codec => json_lines
    }
}
```

### 停止删除并重新运行容器

```bash
docker stop 容器ID

docker rm 容器ID

docker run --name logstash -v /home/logstash-7.8.0/config/:/usr/share/logstash/config/ -d logstash:7.8.0 -f /usr/share/logstash/config/mysql.conf
```

## Canal

#### 修改MySQL配置

:::tip
需要先开启MySQL的`binlog`写入功能，配置`binlog-format`为`ROW`模式

注意：`MySQL8`和阿里云`RDS for MySQL`无需修改配置
:::

```bash
vi /etc/my.cnf
```

```bash
[mysqld]
# 设置server_id，同一局域网中需要唯一
server_id=1
# 指定不需要同步的数据库名称
binlog-ignore-db=mysql
# 开启二进制日志功能
log-bin=mall-mysql-bin
# 设置二进制日志使用内存大小（事务）
binlog_cache_size=1M
# 设置使用的二进制日志格式（mixed,statement,row）
binlog_format=row
# 二进制日志过期清理时间。默认值为0，表示不自动清理。
expire_logs_days=7
# 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
# 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062
```

```bash
docker restart mysql
```

#### 检查binlog是否正确启动

```bash
mysql> show variables like 'log_bin%';
+---------------------------------+----------------------------------+
| Variable_name                   | Value                            |
+---------------------------------+----------------------------------+
| log_bin                         | ON                               |
| log_bin_basename                | /data/mysql/data/mysql-bin       |
| log_bin_index                   | /data/mysql/data/mysql-bin.index |
| log_bin_trust_function_creators | OFF                              |
| log_bin_use_v1_row_events       | OFF                              |
+---------------------------------+----------------------------------+
5 rows in set (0.00 sec)
mysql> show variables like 'binlog_format%';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| binlog_format | ROW   |
+---------------+-------+
1 row in set (0.00 sec)
```

#### 创建一个拥有从库权限的账号

```bash
docker exec -it mysql /bin/bash

mysql -uroot -p

CREATE USER canal IDENTIFIED BY 'canal';
 
GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'canal'@'%';
 
// mysql8需要执行这句，将加密规则还原成mysql_native_password
ALTER USER 'canal'@'%' IDENTIFIED WITH mysql_native_password BY 'canal';
 
FLUSH PRIVILEGES;
 
show grants for 'canal'@'%'; 
```

### canal-admin

#### 拉取镜像

```bash
docker pull canal/canal-admin
```

#### 下载脚本

```bash
mkdir /home/canal-admin && cd /home/canal-admin 

wget https://raw.githubusercontent.com/alibaba/canal/master/docker/run_admin.sh
```

#### 运行canal-admin

```sql
CREATE DATABASE /*!32312 IF NOT EXISTS*/ `canal_manager` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;

USE `canal_manager`;

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for canal_adapter_config
-- ----------------------------
DROP TABLE IF EXISTS `canal_adapter_config`;
CREATE TABLE `canal_adapter_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `content` text NOT NULL,
  `modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for canal_cluster
-- ----------------------------
DROP TABLE IF EXISTS `canal_cluster`;
CREATE TABLE `canal_cluster` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(63) NOT NULL,
  `zk_hosts` varchar(255) NOT NULL,
  `modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for canal_config
-- ----------------------------
DROP TABLE IF EXISTS `canal_config`;
CREATE TABLE `canal_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cluster_id` bigint(20) DEFAULT NULL,
  `server_id` bigint(20) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `content` text NOT NULL,
  `content_md5` varchar(128) NOT NULL,
  `modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sid_UNIQUE` (`server_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for canal_instance_config
-- ----------------------------
DROP TABLE IF EXISTS `canal_instance_config`;
CREATE TABLE `canal_instance_config` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cluster_id` bigint(20) DEFAULT NULL,
  `server_id` bigint(20) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `content` text NOT NULL,
  `content_md5` varchar(128) DEFAULT NULL,
  `modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for canal_node_server
-- ----------------------------
DROP TABLE IF EXISTS `canal_node_server`;
CREATE TABLE `canal_node_server` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cluster_id` bigint(20) DEFAULT NULL,
  `name` varchar(63) NOT NULL,
  `ip` varchar(63) NOT NULL,
  `admin_port` int(11) DEFAULT NULL,
  `tcp_port` int(11) DEFAULT NULL,
  `metric_port` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for canal_user
-- ----------------------------
DROP TABLE IF EXISTS `canal_user`;
CREATE TABLE `canal_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(31) NOT NULL,
  `password` varchar(128) NOT NULL,
  `name` varchar(31) NOT NULL,
  `roles` varchar(31) NOT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------
-- Records of canal_user
-- ----------------------------
BEGIN;
INSERT INTO `canal_user` VALUES (1, 'admin', '6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9', 'Canal Manager', 'admin', NULL, NULL, '2019-07-14 00:05:28');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
```

```bash
cd /home/canal-admin 

# 指定外部的mysql作为admin的库

sh run_admin.sh -e server.port=8089 -e canal.adminUser=admin -e canal.adminPasswd=admin -e spring.datasource.address=127.0.0.1 -e spring.datasource.database=canal_manager -e spring.datasource.username=root -e spring.datasource.password=123456
```

:::tip
默认账号密码: admin/123456
:::

### canal-server

#### 拉取镜像

```bash
docker pull canal/canal-server
```

#### 创建映射文件夹

```bash
mkdir -p /home/canal-server
```

#### 文件夹赋权

```bash
chmod -R 777 /home/canal-server
```

#### 下载脚本

```bash
cd /home/canal-server

wget https://raw.githubusercontent.com/alibaba/canal/master/docker/run.sh
```

#### 以单机模式启动

```
sh run.sh -e canal.admin.manager=127.0.0.1:8089 \
-e canal.admin.port=11110 \
-e canal.admin.user=admin \
-e canal.admin.passwd=4ACFE3202A5FF5CF467898FC58AAB1D615029441
```

### canal-adapter

#### 拉取镜像

```bash
docker pull slpcat/canal-adapter:v1.1.5
```

#### 创建映射文件夹

```bash
mkdir -p /home/canal-adapter
```

#### 文件夹赋权

```bash
chmod -R 777 /home/canal-adapter
```

#### 运行容器

```bash
docker run --name canal-adapter -p 8081:8081 -d slpcat/canal-adapter:v1.1.5
```

#### 拷贝配置文件

```
docker cp canal-adapter:/opt/canal-adapter/conf/ /home/canal-adapter/config/

docker cp canal-adapter:/opt/canal-adapter/lib/ /home/canal-adapter/lib/
```

#### 添加MySQL8.0.20驱动器

```bash
wget https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.20/mysql-connector-java-8.0.20.jar

mv mysql-connector-java-8.0.20.jar /home/canal-adapter/lib/

chmod 777 /home/canal-adapter/lib/mysql-connector-java-8.0.20.jar #权限修改与其它lib库一致

chmod +st /home/canal-adapter/lib/mysql-connector-java-8.0.20.jar
```

#### 修改配置文件

```yml
server:
  port: 8081
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
    default-property-inclusion: non_null

canal.conf:
  mode: tcp
  flatMessage: true
  zookeeperHosts:
  syncBatchSize: 1000
  retries: 0
  timeout:
  accessKey:
  secretKey:
  consumerProperties:
    # canal tcp consumer
    canal.tcp.server.host: 127.0.0.1:11111
    canal.tcp.batch.size: 500
    canal.tcp.username:
    canal.tcp.password:
  srcDataSources:
    defaultDS:
      url: jdbc:mysql://127.0.0.1:3306/数据库名?useUnicode=true&useSSL=false&serverTimezone=Asia/Shanghai&characterEncoding=utf-8&autoReconnect=true
      username: db_username
      password: db_password
  canalAdapters:
  - instance: example # canal instance Name or mq topic name
    groups:
    - groupId: g1
      outerAdapters:
      - name: logger
      - name: es7 # 该版本发现只能是es7/es6
        hosts: 127.0.0.1:9200 # 127.0.0.1:9200 for rest mode
        properties:
          mode: rest # transport # or rest
```

#### 创建修改适配器表映射文件

```bash
cd /home/canal-adapter/config/es7

touch 映射文件名.yml

vi 映射文件名.yml
```

```yml
dataSourceKey: defaultDS        # 源数据源的key, 对应上面配置的srcDataSources中的值
destination: example            # cannal的instance或者MQ的topic
groupId:                        # 对应MQ模式下的groupId, 只会同步对应groupId的数据
esMapping:
  _index: mytest_user           # es 的索引名称
  _type: _doc                   # es 的type名称, es7下无需配置此项
  _id: _id                      # es 的_id, 如果不配置该项必须配置下面的pk项_id则会由es自动分配
#  pk: id                       # 如果不需要_id, 则需要指定一个属性为主键属性
  # sql映射
  sql: ""
#  objFields:
#    _labels: array:;           # 数组或者对象属性, array:; 代表以;字段里面是以;分隔的
#    _obj: object               # json对象
  etlCondition: ""     # etl 的条件参数
  commitBatch: 3000                         # 提交批大小
```

#### 停止删除并重新运行容器

```bash
docker stop canal-adapter && docker rm canal-adapter

docker run --name canal-adapter -p 8081:8081 -v /home/canal-adapter/lib:/opt/canal-adapter/lib -v /home/canal-adapter/config:/opt/canal-adapter/conf -d slpcat/canal-adapter:v1.1.5
```

#### API操作

- 查看同步任务instance列表

```bash
curl http://127.0.0.1:8081/destinations
>>
[{"destination":"example","status":"on"}]
```

- 同步开关

```bash
curl http://127.0.0.1:8081/syncSwitch/canal-test/off -X PUT
>>
{"code":20000,"message":"实例: example 关闭同步成功"}
```

- 查看开关状态

```bash
curl http://127.0.0.1:8081/syncSwitch/example
>>
{"stauts":"off"}
```

- 手动同步数据

```bash
curl http://127.0.0.1:8081/etl/es7/canal_test.yml -X POST
>>
{"succeeded":true,"resultMessage":"导入ES 数据：20 条"}
```

- 查询同步库中总数

```bash
curl http://127.0.0.1:8081/count/es7/canal_test.yml
>>
{"esIndex":"test","count":1}
```

## Nginx

### 拉取镜像

```bash
docker pull nginx:latest
```

## Jenkins

### 拉取镜像

```bash
docker pull jenkins/jenkins:lts
```

### 目录映射

```bash
mkdir -p /usr/local/src/jenkins/jenkins_home

chown -R 1000 /usr/local/src/jenkins/jenkins_home

chmod 666 /var/run/docker.sock
```

### 启动

```bash
docker run -di -u root --name jenkins -p 8080:8080 -p 50000:50000 -e TZ=Asia/Shanghai -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker -v /usr/local/src/jenkins/jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```

### 安装插件提速

```bash
cd /usr/local/src/jenkins/jenkins_home/

vi hudson.model.UpdateCenter.xml

修改url为https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json

docker exec -it jenkins /bin/bash

sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json && sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json

exit

docker restart jenkins
```

### 解锁Jenkins

![解锁Jenkins](https://z3.ax1x.com/2021/05/16/ggl4HS.png)

*两种方法*

```bash
docker exec -it jenkins /bin/bash

cat /var/jenkins_home/secrets/initialAdminPassword
```

```bash
docker logs jenkins
```

### 安装插件

- 根据角色管理权限的插件：Role-based Authorization Strategy
- 远程使用ssh的插件：SSH plugin
- NodeJs

### 系统配置

![配置GitHub服务器](https://z3.ax1x.com/2021/05/17/g26i11.png)

:::tip
Secret text 在github上生成

github --> 头像 --> Settings --> Developer settings --> Personal access tokens --> Generate new token
:::

![生成 Personal Access Token](https://z3.ax1x.com/2021/05/17/g26Uhj.png)

![Personal Access Token](https://z3.ax1x.com/2021/05/17/g254v4.png)

### 全局配置

![安装Maven](https://z3.ax1x.com/2021/05/16/gguoSP.png)

![安装NodeJs](https://z3.ax1x.com/2021/06/05/2NKpZR.png)

### 创建持续集成任务

#### 创建构建后端任务

![创建构建任务](https://z3.ax1x.com/2021/05/16/ggKaX8.png)

- 配置Git仓库

![配置Git仓库](https://z3.ax1x.com/2021/05/16/ggKzAH.png)

![添加凭证](https://z3.ax1x.com/2021/05/17/g2IrRO.png)

- Maven构建配置

![Maven构建配置](https://z3.ax1x.com/2021/05/16/ggMigP.png)

- 编写Shell命令

```bash
#!/bin/bash
result=$(docker ps -a | grep "burning-sun-cms")
if [[ "$result" != "" ]]
then
echo "正在停止 burning-sun-cms 容器..."
docker stop burning-sun-cms
fi
result1=$(docker ps -a | grep "burning-sun-cms")
if [[ "$result1" != "" ]]
then
echo "正在删除 burning-sun-cms 容器..."
docker rm burning-sun-cms
fi
result2=$(docker images | grep "106.12.85.201:5000/burning-sun")
if [[ "$result2" != "" ]]
then
echo "正在删除 106.12.85.201:5000/burning-sun:1.0.0-SNAPSHOT 镜像..."
docker rmi 106.12.85.201:5000/burning-sun:1.0.0-SNAPSHOT
fi
```

```
docker run -d -p 8081:8081 --name burning-sun-cms -v /usr/local/src/burning-sun/logs:/logs -d 106.12.85.201:5000/burning-sun:1.0.0-SNAPSHOT
```

####  创建构建前端任务

- 构建一个自由风格的软件项目

![创建构建任务](https://z3.ax1x.com/2021/05/16/ggKaX8.png)

- 添加Git代码仓库相关配置

![添加Git代码仓库相关配置](https://z3.ax1x.com/2021/06/05/2NQyZ9.png)

- 构建环境

![构建环境](https://z3.ax1x.com/2021/06/05/2NQwxU.png)
  
- 编写Shell命令

```bash
# 查看版本信息
npm -v
# 解决存放在Github上的sass无法下载的问题
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass
# 将镜像源替换为淘宝的加速访问
npm config set registry https://registry.npm.taobao.org
# 安装项目依赖
npm install
rm -rf ./cool-wallpaper/*
# 项目打包
npm run build
rm -rf /home/cool-wallpaper/*
cp -rf ./cool-wallpaper/* /home/cool-wallpaper/
```

#### 构建触发器

![构建触发器](https://z3.ax1x.com/2021/05/16/ggKb1x.png)

![开启HookUrl](https://z3.ax1x.com/2021/05/16/ggQBJs.png)

## SpringBoot

### 编写Dockerfile文件

```bash
# 该镜像需要依赖的基础镜像
FROM java:8
# 将当前目录下的jar包复制到docker容器的/目录下
ADD burning-sun-1.0.0-SNAPSHOT.jar /burning-sun.jar
# 声明服务运行在8080端口
EXPOSE 8080
# 运行过程中创建一个burning-sun.jar文件
RUN bash -c 'touch /burning-sun.jar'
# 声明服务运行在8080端口EXPOSE 8080
# 指定docker容器启动时运行jar包
ENTRYPOINT ["java", "-jar","/burning-sun.jar"]
# 指定维护者的名字
MAINTAINER william
```

### 使用maven打包应用

在IDEA中双击package命令进行打包

将jar包及Dockerfile文件上传到服务器

### 在Linux上构建docker镜像

在Dockerfile所在目录执行以下命令：

```bash
# -t 表示指定镜像仓库名称/镜像名称:镜像标签 .表示使用当前目录下的Dockerfile

docker build -t burning-sun:1.0.0-SNAPSHOT .
```

### 创建映射文件夹

```bash
mkdir -p /usr/local/src/burning-sun/logs
```

### 文件夹赋权

```bash
chmod -R 777 /usr/local/src/burning-sun/
```

### 运行

```bash
docker run -d -p 8081:8081 --name burning-sun-cms -v /usr/local/src/burning-sun/logs:/logs -d 106.12.85.201:5000/burning-sun:1.0.0-SNAPSHOT
```

<RightMenu />