---
title: Linux DevOps
---

# Linux DevOps

## JDK

### [下载地址](https://www.oracle.com/technetwork/java/javase/downloads/index.html)

### 解压JDK

```bash
tar -zxvf  jdk-8u221-linux-x64.tar.gz
```

**将【jdk1.8.0_221】里的数据拷贝至新建java目录下**

```bash
mkdir /home/java/

mv jdk1.8.0_221 /home/java/
```

### 配置环境变量

```bash
vi /etc/profile

export JAVA_HOME=/home/java/jdk1.8.0_221
export PATH=$JAVA_HOME/bin:$PATH 
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

source /etc/profile
```

### 检查是否安装成功

```bash
cd

java -version
```

## Maven

### [下载地址](https://maven.apache.org/download.cgi)

```bash
wget https://dlcdn.apache.org/maven/maven-3/3.8.5/binaries/apache-maven-3.8.5-bin.tar.gz
```

### 解压

```bash
tar -zxvf apache-maven-3.8.5-bin.tar.gz

mkdir /home/maven/

mv apache-maven-3.8.5 /home/maven/
```

### 配置环境变量

```bash
vi /etc/profile
```

```bash
export MAVEN_HOME=/home/maven/apache-maven-3.8.5
export PATH=$MAVEN_HOME/bin:$PATH
```

```bash
source /etc/profile
```

### 检查版本

```bash
mvn -v
```

![安装成功](https://s4.ax1x.com/2022/01/19/7r42TK.png)

## MySQL8

### 配置YUM源

[在MySQL官网中下载YUM源rpm安装包](http://dev.mysql.com/downloads/repo/yum/)

### 安装MySQL源

```bash
yum -y install mysql80-community-release-el7-3.noarch.rpm
```

### 检查MySQL源是否安装成功

```bash
yum repolist enabled | grep "mysql.*-community.*"
```

### 安装MySQL

```bash
yum -y install mysql-community-server
```

### 启动MySQL服务

```bash
systemctl start mysqld
```

### 设置开机自启

```bash
systemctl enable mysqld
```

### 修改root本地登录密码

```bash
cat /var/log/mysqld.log | grep password

mysql -uroot -p

alter user user() identified by '26SE>Z%UddNN';

set global validate_password.policy=0;

set global validate_password.length=1;

ALTER USER 'root'@'localhost' IDENTIFIED BY '要修改的密码';
```

### 添加远程登录用户

```bash
use mysql;

update user set host= '%' where user = 'root';

update user set plugin='mysql_native_password' where user ='root';
```

### 生效配置

```bash
flush privileges;
```

### 重置密码

+ **开启免密码登陆**

```bash
vi /etc/my.cnf

在【mysqld】模块下面添加：

skip-grant-tables
```

+ **重启服务：使配置生效**

```bash
service mysqld restart
```

+ **登陆（不输入密码直接敲回车键）**

```bash
mysql -u root -p
```

+ **选择数据库并把密码置空**

```bash
use mysql;

update user set authentication_string = '' where user = 'root';
```

+ **删除免密**

```bash
vi /etc/my.cnf（删除免密）

service mysqld restart
```

+ **登陆（直接敲回车键）**

```bash
mysql -uroot -p

set global validate_password.policy=0;

set global validate_password.length=1;

ALTER USER "root"@"%" IDENTIFIED BY "要修改的密码"; 
```

## Redis

### [下载地址](https://redis.io/download)

```bash
wget https://download.redis.io/releases/redis-6.2.6.tar.gz
```

### 解压

```bash
tar -zxvf redis-6.2.6.tar.gz
```

### 编译安装

```bash
cd /root/redis-6.2.6

make

make PREFIX=/home/redis install
```

### 拷贝配置文件

```bash
cd /root/redis-6.2.6

cp redis.conf /home/redis/
```

### 修改配置文件

```bash
vi /home/redis/redis.conf
```

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

### 开机自启

```bash
vi /etc/rc.local

/home/redis/bin/redis-server /home/redis/redis.conf
```

## Tomcat

### [下载地址](http://tomcat.apache.org/download-80.cgi#8.0.46)

### 解压

```bash
tar -zxvf apache-tomcat-8.0.46.tar.gz
```

### 启动Tomcat

```bash
./apache-tomcat-8.0.46/bin/startup.sh
```

## Node

### [下载地址](https://nodejs.org/dist/v14.18.2/node-v14.18.2-linux-x64.tar.gz)

### 解压

```bash
tar -zxvf node-v14.18.2-linux-x64.tar.gz
```

**将【node-v14.18.2-linux-x64】里的数据拷贝至新建node目录下**

```bash
mv node-v14.18.2-linux-x64 /home/

cd /home/

mv node-v14.18.2-linux-x64 node-v14.18.2
```

### 配置全局node

```bash
ln -sf /home/node-v14.18.2/bin/node /usr/local/bin/

ln -sf /home/node-v14.18.2/bin/npm /usr/local/bin/
```

## Yarn

### [下载地址](https://yarn.bootcss.com/docs/install/#centos-stable)

```bash
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo

sudo yum install yarn -y
```

## Nginx

### 安装

```bash
yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel pcre pcre-devel

yum install nginx -y
```

### 开机自启动

```bash
vi /etc/rc.local

/usr/sbin/nginx

chmod 755 /etc/rc.local
```

## Git

### 安装

```bash
yum install git -y
```

*验证是否安装成功*

```bash
git version
```

### 初始化

```bash
git config --global user.name "ElanYoung"

git config --global user.email "991658923@qq.com"
```

### 生成授信证书

```bash
ssh-keygen -t rsa -C "991658923@qq.com"

cd ~/.ssh/

cat id_rsa.pub
```

*将证书配置到Github上，验证是否通信成功*

```bash
ssh git@github.com
```

## ElasticSearch

### [下载地址](https://www.elastic.co/cn/downloads/elasticsearch)

### 解压

```bash
tar -zxvf elasticsearch-7.17.6-linux-x86_64.tar.gz -C /home
```

### 创建数据目录

```bash
cd /home/elasticsearch-7.17.6

mkdir data
```

### 修改配置文件

#### elasticsearch.yml

```bash
cd /home/elasticsearch-7.17.6

vi config/elasticsearch.yml

# 集群名称
cluster.name: xxx 
# 节点名称
node.name: node-1 
# 数据和日志的存储目录
path.data: /home/elasticsearch-7.17.6/data
path.logs: /home/elasticsearch-7.17.6/logs
# 设置绑定的ip，设置为0.0.0.0以后就可以让任何计算机节点访问到了
network.host: 0.0.0.0
# 默认端口
http.port: 9200 
# 设置在集群中的所有节点名称
cluster.initial_master_nodes: ["node-1"]
```

#### jvm.options（解决内存不足问题）

```bash
cd /home/elasticsearch-7.17.6

vi config/jvm.options

# 设置堆内存大小
-Xms256m
-Xmx256m
```

### 用户权限问题（root无法启动elasticsearch）

+ **创建专属用户**
  
```bash
useradd elastic
```

+ **授权**
  
```bash
chown -R elastic /home/elasticsearch-7.17.6/
```

### 解决会出现的问题

```bash
vi /etc/sysctl.conf 

# 在末尾添加以下配置
vm.max_map_count=655360

保存执行：sysctl -p

vi /etc/security/limits.conf

# 在末尾添加以下配置
* soft nofile 65536
* hard nofile 131072
* soft nproc 2048
* soft nproc 4096
```

### 开放端口

```bash
firewall-cmd --zone=public --add-port=9300/tcp --permanent

firewall-cmd --zone=public --add-port=9200/tcp --permanent

firewall-cmd --reload
```

### 后台启动

```bash
su elastic

cd /home/elasticsearch-7.17.6/bin/

./elasticsearch -d
```

### 设置登录密码

```bash
cd /home/elasticsearch-7.17.6

# 修改配置文件

vi conf/config/elasticsearch.yml

# 添加以下配置
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true

# 切换用户

su elastic

# 启动服务
./bin/elasticsearch -d

# 设置密码
./bin/elasticsearch-setup-passwords interactive
```

### 安装ik分词器

+ [下载地址](https://github.com/medcl/elasticsearch-analysis-ik/releases)

+ **解压**
  
```bash
unzip /root/elasticsearch-analysis-ik-7.17.6.zip -d /home/elasticsearch-7.17.6/plugins/ik
```

+ **更改默认分词器**
  
```bash
vi elasticsearch.yml

index.analysis.analyzer.default.tokenizer : “ik_max_word” 
index.analysis.analyzer.default.type : “ik”
```

+ **重新启动**

## logstash

+ [下载地址](https://www.elastic.co/cn/downloads/logstash)

+ **解压**

```bash
tar -zxvf /root/logstash-7.17.6.tar.gz -C /home/
```

+ **配置jdbc文件**
+ **配置mysql8驱动**
+ **后台运行（ctrl + z 挂起）**

```bash
./logstash -f ../config/mysql.conf
```

## vsftpd

### 安装

````bash
yum -y install vsftpd
````

### 检查是否已经安装

```bash
rpm -qa|grep vsftpd
```

### 创建虚拟用户

+ **选择在根或者用户目录下创建ftp文件夹**

```bash
mkdir /ftpfile
```

+ **添加匿名用户**

```bash
useradd ftpuser -d /ftpfile -s /sbin/nologin
```

+ **修改ftpfile权限**

```bash
chown -R ftpuser.ftpuser /ftpfile
```

+ **重设ftpuser密码**

```bash
passwd ftpuser
```

### 配置

```bash
vi /etc/vsftp/vsftpd.conf

vi /etc/vsftp/chroot_list：添加配置的ftp用户

vi /etc/selinux/config（修改为SELINUX=disable）
```

### 常用命令

````bash
systemctl start vsftpd
systemctl restart vsftpd
systemctl status vsftpd
````

### 设置开机启动

```bash
systemctl enable vsftpd
```

<RightMenu />
