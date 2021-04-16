---
title: Docker环境部署
---

# Docker虚拟机部署环境

## Java

### 安装镜像

```bash
docker pull docker.io/java
```

### 运行

```bash
docker run -it --name myjava --restart=always docker.io/java bash
```

## MySql

### 安装镜像

```bash
docker pull mysql:8.0.19
```

### 创建映射文件夹

```bash
mkdir -p /usr/local/src/mysql-8.0.19/log /usr/local/src/mysql-8.0.19/data /usr/local/src/mysql-8.0.19/conf /usr/local/src/mysql-8.0.19/mysql-files
```

### 文件夹赋权

```bash
chmod -R 777 /usr/local/src/mysql-8.0.19/
```

### 运行

```bash
docker run -p 3306:3306 --name mysql \
-v /usr/local/src/mysql-8.0.19/log:/var/log/mysql \
-v /usr/local/src/mysql-8.0.19/data:/var/lib/mysql \
-v /usr/local/src/mysql-8.0.19/conf:/etc/mysql \
-v /usr/local/src/mysql-8.0.19/mysql-files:/var/lib/mysql-files \
-e MYSQL_ROOT_PASSWORD=yfmVnvTX6gzUBWdZ \
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

## ElasticSearch

### 安装镜像

```bash
docker pull elasticsearch:7.8.0
```

### 创建映射文件夹

```bash
mkdir -p /usr/local/src/elasticsearch-7.8.0/config
mkdir -p /usr/local/src/elasticsearch-7.8.0/data
mkdir -p /usr/local/src/elasticsearch-7.8.0/logs/
mkdir -p /usr/local/src/elasticsearch-7.8.0/plugins

echo "http.host: 0.0.0.0">>/usr/local/src/elasticsearch-7.8.0/config/elasticsearch.yml
```

### 文件夹赋权

```bash
chmod -R 777 /usr/local/src/elasticsearch-7.8.0/
```

### 配置ik分词器插件

* **创建ik文件夹**

  ```bash
  cd /usr/local/src/elasticsearch-7.8.0/plugins
  
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
docker cp elasticsearch:/usr/share/elasticsearch/config /usr/local/src/elasticsearch-7.8.0/config

mv /usr/local/src/elasticsearch-7.8.0/config/config/* /usr/local/src/elasticsearch-7.8.0/config/

rm -rf usr/local/src/elasticsearch-7.8.0/config/config
```

### 停止删除并重新运行容器

```bash
docker stop 容器ID

docker rm 容器ID

docker run --name elasticsearch -p 9200:9200 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx128m" -v /usr/local/src/elasticsearch-7.8.0/config:/usr/share/elasticsearch/config -v /usr/local/src/elasticsearch-7.8.0/data:/usr/share/elasticsearch/data -v /usr/local/src/elasticsearch-7.8.0/plugins:/usr/share/elasticsearch/plugins -v /usr/local/src/elasticsearch-7.8.0/logs:/usr/share/elasticsearch/logs -d elasticsearch:7.8.0
```

### 启动容器自启

```bash
docker update elasticsearch --restart=always
```

### 配置TLS

#### 进入容器

```bash
docker exec -it 容器ID /bin/bash
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
chmod 644 /usr/local/src/elasticsearch-7.8.0/config/elastic-certificates.p12 
```

#### 设置集群密码

```bash
docker restart 容器ID

docker exec -it 容器ID /bin/bash

./bin/elasticsearch-setup-passwords interactive
```

#### 重启容器

```bash
docker restart 容器ID
```

## Logstash

### 安装镜像

```bash
docker pull logstash:7.8.0
```

### 创建映射文件夹

```bash
mkdir /usr/local/src/logstash-7.8.0
```

### 文件夹赋权

```bash
chmod -R 777 /usr/local/src/logstash-7.8.0/
```

### 运行容器

```bash
docker run --name logstash -d logstash:7.8.0
```

### 拷贝容器文件

```bash
docker cp logstash:/usr/share/logstash/config /usr/local/src/logstash-7.8.0/config
```

### 配置logstash配置文件 

```bash
echo "http.host: 0.0.0.0">>/usr/local/src/logstash-7.8.0/config/logstash.yml
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
    jdbc_connection_string => "jdbc:mysql://106.12.85.201/wallpaper?useUnicode=true&characterEncoding=UTF8&useSSL=false&serverTimezone=GMT%2B8&allowMulQueries=true"
    # 用户名
    jdbc_user => "root"
    # 密码
    jdbc_password => "yfmVnvTX6gzUBWdZ"
    # jdbc驱动包位置
    jdbc_driver_library => "/usr/share/logstash/config/mysql-connector-java-8.0.20.jar"
    # mysql的Driver
    jdbc_driver_class => "com.mysql.cj.jdbc.Driver"
    # 定时任务
    schedule => "* * * * *"
    # 清空上一次的sql_last_value记录
    clean_run => true
    # 你要执行的SQL语句
    statement => "SELECT * FROM w_wallpaper WHERE update_time > :sql_last_value AND update_time < NOW()"
    }
}
output {
    elasticsearch {
        hosts => "106.12.85.201:9200"
        user => elastic
        password => yfmVnvTX6gzUBWdZ
        # index名
        index => "wallpapers"
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

docker run --name logstash -v /usr/local/src/logstash-7.8.0/config/:/usr/share/logstash/config/ -d logstash:7.8.0 -f /usr/share/logstash/config/mysql.conf
```

## Canal

### 修改MySql配置

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

*注意：MySql8无需修改配置*

### 创建一个拥有从库权限的账号

```bash
CREATE USER 'canal'@'%' IDENTIFIED BY 'canal';
 
GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'canal'@'%';
 
//mysql8需要执行这句，将加密规则还原成mysql_native_password
ALTER USER 'canal'@'%' IDENTIFIED WITH mysql_native_password BY 'canal';
 
FLUSH PRIVILEGES;
 
show grants for 'canal'@'%'; 
```

### canal-admin

#### 安装镜像

```bash
docker pull canal/canal-admin
```

#### 下载脚本

```bash
mkdir /usr/local/src/canal && cd /usr/local/src/canal

wget https://raw.githubusercontent.com/alibaba/canal/master/docker/run_admin.sh
```

#### 运行canal-admin

```bash
cd /usr/local/src/canal/
# 以8089端口启动canal-admin
sh run_admin.sh -e server.port=8089 -e canal.adminUser=admin -e canal.adminPasswd=admin
```

### canal-server

#### 安装镜像

```bash
docker pull canal/canal-server
```

#### 下载脚本

```bash
cd /usr/local/src/canal/

wget https://raw.githubusercontent.com/alibaba/canal/master/docker/run.sh
```

#### 运行

```bash
sh run.sh -e canal.auto.scan=false \
-e canal.destinations=wallpaper \
-e canal.instance.master.address=127.0.0.1:3306  \
-e canal.instance.dbUsername=canal  \
-e canal.instance.dbPassword=canal  \
-e canal.instance.connectionCharset=UTF-8 \
-e canal.instance.tsdb.enable=false \
-e canal.instance.gtidon=false
```

## Nginx

### 安装镜像

```bash
docker pull nginx:latest
```

## Jenkins

### 安装镜像

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
docker run -di -u root --name jenkins -p 8080:8080 -p 50000:50000 -v /var/run/docker.sock:/var/run/docker.sock -v /usr/bin/docker:/usr/bin/docker -v /usr/local/src/jenkins/jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```

### 安装插件提速

```bash
docker exec -it jenkins /bin/bash

sed -i 's/www.google.com/www.baidu.com/g' /var/jenkins_home/updates/default.json

sed -i 's/updates.jenkins-ci.org\/download/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' /var/jenkins_home/updates/default.json

docker restart jenkins
```

### 解锁Jenkins

![解锁Jenkins](https://img.rruu.net/image/602deadda92d6)

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

### 全局配置

![安装Maven](https://img.rruu.net/image/602e1c40630d5)

### 配置SSH

#### Jenkins 服务器

```bash
ssh-keygen -t rsa
```

#### 目标服务器

### 创建持续集成任务

#### 创建构建任务

![创建构建任务](https://img.rruu.net/image/602f33209091e)

#### 配置Git仓库

![配置Git仓库](https://img.rruu.net/image/602f33208eee1)

![添加凭证](https://img.rruu.net/image/602f33209078e)

#### Maven构建配置

![Maven构建配置](https://img.rruu.net/image/602f33207d3ed)

#### 编写Shell命令

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

```bash
clean package -DskipTests docker:build
```

```
docker run -d -p 8081:8081 --name burning-sun-cms -v /usr/local/src/burning-sun/logs:/logs -d 106.12.85.201:5000/burning-sun:1.0.0-SNAPSHOT
```

#### 构建触发器

![构建触发器](https://img.rruu.net/image/602fa8e608625)

![开启HookUrl](https://img.rruu.net/image/602fa8e61382c)

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