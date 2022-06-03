---
title: 服务器环境部署
---

# Linux环境

## Java

### 安装JDK

>[下载地址](https://www.oracle.com/technetwork/java/javase/downloads/index.html)

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

### 安装Maven

>[下载地址](https://maven.apache.org/download.cgi)

```bash
wget https://dlcdn.apache.org/maven/maven-3/3.8.5/binaries/apache-maven-3.8.5-bin.tar.gz
```

### 解压Maven

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

### 安装Redis

>[下载地址](https://redis.io/download)

```bash
wget https://download.redis.io/releases/redis-6.2.6.tar.gz
```

### 解压Redis压缩包

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

### 安装Tomcat 

>[下载地址](http://tomcat.apache.org/download-80.cgi#8.0.46)

### 解压Tomcat压缩包

```bash
tar -zxvf apache-tomcat-8.0.46.tar.gz
```

### 启动Tomcat

```bash
./apache-tomcat-8.0.46/bin/startup.sh
```

## Node

### 安装Node

>[下载地址](https://nodejs.org/dist/v14.18.2/node-v14.18.2-linux-x64.tar.gz)

### 解压JDK

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

### 安装Yarn

>[下载地址](https://yarn.bootcss.com/docs/install/#centos-stable)

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

### 安装ElasticSearch

>[下载地址](https://www.elastic.co/cn/downloads/elasticsearch)

### 解压到/usr/local

```bash
tar -zxvf elasticsearch-7.8.0-linux-x86_64.tar.gz -C /usr/local
```

### 进入解压后的elasticsearch-7.8.0目录

- **创建data目录**
- **修改配置文件**

    ```bash
    vi config/elasticsearch.yml

    #集群名称
    cluster.name: xxx 
    #节点名称
    node.name: node-1 
    #数据和日志的存储目录
    path.data: /usr/local/elasticsearch/elasticsearch-7.8.0/data
    path.logs: /usr/local/elasticsearch/elasticsearch-7.8.0/logs
    #设置绑定的ip，设置为0.0.0.0以后就可以让任何计算机节点访问到了
    network.host: 0.0.0.0
    #默认端口
    http.port: 9200 
    #设置在集群中的所有节点名称
    cluster.initial_master_nodes: ["node-1"]
    ```

### 用户权限问题（root无法启动elasticsearch）

- **创建新用户**
  
    ```bash
    useradd shines
    passwd shines
    ```
- **授权**
  
    ```bash
    chown shines /usr/local/elasticsearch/elasticsearch-7.8.0/ -R
    ```

### 解决会出现的问题

```bash
vim /etc/sysctl.conf 

//在末尾添加以下配置
vm.max_map_count=655360

保存执行：sysctl -p

vim etc/security/limits.conf

#在末尾加上：
* soft nofile 65536
* hard nofile 131072
```

### 后台启动es

```bash
cd /usr/local/elasticsearch/elasticsearch-7.8.0/bin/

./elasticsearch -d
```

### 安装ik分词器

- [下载地址](https://github.com/medcl/elasticsearch-analysis-ik/releases)

- **创建ik文件夹**
  
    ```bash
    cd /usr/local/elasticsearch/elasticsearch-7.8.0/plugins
    
    mkdir ik
    ```
- **解压**
  
    ```bash
    unzip /root/elasticsearch-analysis-ik-7.8.0.zip
    ```
- **更改es默认使用的分词器**
  
    ```bash
    vi elasticsearch.yml
    
    index.analysis.analyzer.default.tokenizer : “ik_max_word” 
    index.analysis.analyzer.default.type : “ik”
    ```
## logstash

- [下载地址](https://www.elastic.co/cn/downloads/logstash)

- **解压**
  
    ```bash
    tar -zxvf /root/logstash-7.8.0.tar.gz -C /usr/local/elasticsearch/
    ```
- **配置jdbc文件**
- **配置mysql8驱动**
- **后台运行（ctrl + z 挂起）**
  
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

- **选择在根或者用户目录下创建ftp文件夹**

  ```bash
  mkdir /ftpfile
  ```

- **添加匿名用户**

  ```bash
  useradd ftpuser -d /ftpfile -s /sbin/nologin
  ```

- **修改ftpfile权限**

  ```bash
  chown -R ftpuser.ftpuser /ftpfile
  ```

- **重设ftpuser密码**

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