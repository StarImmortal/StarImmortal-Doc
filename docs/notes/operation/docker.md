---
title: Docker
---

# 简介

> Docker 是一个开源的应用容器引擎，基于 [Go 语言](https://www.runoob.com/go/go-tutorial.html) 并遵从 Apache2.0 协议开源。
>
> Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。
>
> 容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

## 安装

```bash
# step 1: 更新yum
yum update -y
# step 2: 安装必要的一些系统工具
yum install -y yum-utils device-mapper-persistent-data lvm2
# Step 3: 添加软件源信息
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# Step 4: 更新并安装 Docker-CE
yum makecache fast

yum -y install docker-ce
```

## 配置加速器

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://0wg8f6sb.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 常用命令

### 基础命令

- 启动Docker

```bash
service docker start
```

- 关闭Docker

```bash
service docker stop
```

- 重启Docker

```bash
service docker restart
```

- 开机自启

```bash
systemctl enable docker
```

- 查看运行状态

```bash
systemctl status docker
```

- 查看版本信息

```bash
docker version
```

```bash
docker info
```

- 帮助命令

```bash
docker <command> --help
```

### 镜像命令

#### 搜索镜像

```bash
docker search <image>
```

#### 拉取镜像

```bash
# 拉取最新版本
docker pull <image>

# 指定版本号拉取
docker pull <image>:<tag>
```

#### 列出镜像

```bash
docker images
```

#### 删除镜像

- 指定名称删除镜像

```bash
docker rmi <image>:<tag>
```

- 指定名称删除镜像（强制）

```bash
docker rmi -f <image>:<tag>
```

- 删除所有没有引用的镜像

```bash
docker rmi `docker images | grep none | awk '{print $3}'`
```

- 强制删除所有镜像

```bash
docker rmi -f $(docker images)
```

#### 镜像标签

```bash
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
```

#### 导出镜像

```bash
docker save docker.io/java -o /home/java.tar.gz
```

#### 导入镜像

```bash
docker load -i /home/java.tar.gz
```

#### 打包镜像

```bash
# -t 表示指定镜像仓库名称/镜像名称:镜像标签 .表示使用当前目录下的Dockerfile文件
docker build -t 镜像仓库名称/镜像名称:镜像标签 .
```

#### 推送镜像

```bash
# 登录Docker Hub
docker login
# 给本地镜像打标签为远程仓库名称
docker tag 镜像仓库名称/镜像名称:镜像标签 远程仓库名称/镜像名称:镜像标签
# 推送到远程仓库
docker push 远程仓库名称/镜像名称:镜像标签
```

### 容器命令

#### 新建并启动容器

```bash
docker run -p 80:80 --name nginx \
-e TZ="Asia/Shanghai" \
-v /mydata/nginx/html:/usr/share/nginx/html \
-d nginx:1.17.0
```

- -p：将宿主机和容器端口进行映射，格式为：宿主机端口:容器端口；
- --name：指定容器名称，之后可以通过容器名称来操作容器；
- -e：设置容器的环境变量，这里设置的是时区；
- -v：将宿主机上的文件挂载到宿主机上，格式为：宿主机文件目录:容器文件目录；
- -d：表示容器以后台方式运行。

#### 列出容器

- 列出运行中的容器

```bash
docker ps
```

- 列出所有容器

```bash
docker ps -a
```

#### 停止容器

```bash
docker stop $ContainerName/$ContainerId
```

:::tip
注意：`$ContainerName`表示容器名称，`$ContainerId`表示容器ID
:::

#### 强制停止容器

```bash
docker kill $ContainerName
```

#### 启动容器

```bash
docker start $ContainerName
```

#### 进入容器

- 先查询容器`pid`

```bash
docker ps -a
```

- 根据`pid`进入容器

```bash
docker exec -it $pid" bash
```

#### 删除容器

- 删除指定容器

```bash
docker rm $ContainerName
```

- 按名称通配符删除容器，比如删除以名称`starimmortal-`开头的容器

```bash
docker rm `docker ps -a | grep starimmortal-* | awk '{print $1}'`
```

- 强制删除所有容器

```bash
docker rm -f $(docker ps -a -q)
```

#### 查看容器日志

- 查看全部日志

```bash
docker logs $ContainerName
```

- 动态查看日志

```bash
docker logs -f $ContainerName
```

- 指定时间查看日志

```bash
docker logs -t --since="2021-01-07T13:23:37" $ContainerName
```

#### 查看容器IP地址

```bash
docker inspect --format '{{ .NetworkSettings.IPAddress }}' $ContainerName
```

#### 修改容器启动方式

```bash
# 将容器启动方式改为always

docker container update --restart=always $ContainerName
```

#### 同步宿主机时间到容器

```bash
docker cp /etc/localtime $ContainerName:/etc/
```

#### 指定容器时区

```bash
docker run -p 80:80 --name nginx \
-e TZ="Asia/Shanghai" \
-d nginx:1.17.0
```

#### 查看容器资源占用状况

- 查看指定容器资源占用状况，比如cpu、内存、网络、io状态

```bash
docker stats $ContainerName
```

- 查看所有容器资源占用情况

```bash
docker stats -a
```

#### 查看容器磁盘使用情况

```bash
docker system df
```

#### 指定账号进入容器内部

```bash
# 使用root账号进入容器内部
docker exec -it --user root $ContainerName /bin/bash
```

#### 查看所有网络

```bash
docker network ls
```

#### 创建外部网络

```bash
docker network create -d bridge my-bridge-network
```

#### 指定容器网络

```bash
docker run -p 80:80 --name nginx \
--network my-bridge-network \
-d nginx:1.17.0Copy to clipboardErrorCopied
```

## 修改镜像存放位置

- 查看Docker镜像的存放位置

```bash
docker info | grep "Docker Root Dir"
```

- 关闭Docker服务

```bash
systemctl stop docker
```

- 先将原镜像目录移动到目标目录

```bash
mv /var/lib/docker /mydata/docker
```

- 建立软连接

```bash
ln -s /mydata/docker /var/lib/docker
```

## 容器清理

- 查看Docker占用的磁盘空间情况

```bash
docker system df
```

- 删除所有关闭的容器

```bash
docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs docker rm
```

- 删除所有`dangling`镜像(没有Tag的镜像)

```bash
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
```

- 删除所有`dangling`数据卷(即无用的volume)

```bash
docker volume rm $(docker volume ls -qf dangling=true)
```

## 基于TLS的安全访问

- 新建tls.sh文件

```bash
cd /home

touch auto-tls-certs.sh
```

- 添加以下内容

```bash
vi /home/auto-tls-certs.sh
```

```bash
#!/bin/bash
FILE_ADDRESS=/home/docker-ca
mkdir -p $FILE_ADDRESS
DOMAIN_HOST=
INTERNET_IP=
HOST=$DOMAIN_HOST
# 自定义信息
PASSWORD=""
COUNTRY="CN"
PROVINCE=""
CITY=""
ORGANIZATION=""
GROUP="星野团队"
SUBJ="/C=$COUNTRY/ST=$PROVINCE/L=$CITY/O=$ORGANIZATION/OU=$GROUP/CN=$HOST"
# 自定义信息
# 此形式是自己给自己签发证书，自己就是CA机构，也可以交给第三方机构去签发
# 1.生成根证书RSA私钥，password作为私钥密码（身份证）
openssl genrsa -passout pass:$PASSWORD -aes256 -out $FILE_ADDRESS/ca-key.pem 4096
# 2.用根证书RSA私钥生成自签名的根证书（营业执照）
openssl req -new -x509 -days 365 -passin pass:$PASSWORD -key $FILE_ADDRESS/ca-key.pem -sha256 -subj $SUBJ -out $FILE_ADDRESS/ca.pem
#============================================================================================
# 给服务器签发证书
# 1.服务端生成自己的私钥
openssl genrsa -out $FILE_ADDRESS/server-key.pem 4096
# 2.服务端生成证书（里面包含公钥与服务端信息）
openssl req -new -sha256 -key $FILE_ADDRESS/server-key.pem -out $FILE_ADDRESS/server.csr -subj "/CN=$DOMAIN_HOST"
# 3.通过什么形式与我进行连接,可设置多个IP地扯用逗号分隔
echo subjectAltName=IP:$INTERNET_IP,IP:0.0.0.0 > $FILE_ADDRESS/extfile.cnf
# 4.权威机构对证书进行进行盖章生效
openssl x509 -passin pass:$PASSWORD -req -days 365 -sha256 -in $FILE_ADDRESS/server.csr -CA $FILE_ADDRESS/ca.pem -CAkey $FILE_ADDRESS/ca-key.pem -CAcreateserial -out $FILE_ADDRESS/server-cert.pem -extfile $FILE_ADDRESS/extfile.cnf
#============================================================================================
# 给客户端签发证书
openssl genrsa -out $FILE_ADDRESS/key.pem 4096
openssl req -subj '/CN=client' -new -key $FILE_ADDRESS/key.pem -out $FILE_ADDRESS/client.csr
echo extendedKeyUsage = clientAuth > $FILE_ADDRESS/extfile.cnf
openssl x509 -passin pass:$PASSWORD -req -days 365 -sha256 -in $FILE_ADDRESS/client.csr -CA $FILE_ADDRESS/ca.pem -CAkey $FILE_ADDRESS/ca-key.pem -CAcreateserial -out $FILE_ADDRESS/cert.pem -extfile $FILE_ADDRESS/extfile.cnf
#============================================================================================
# 清理文件
rm -rf $FILE_ADDRESS/ca-key.pem
rm -rf $FILE_ADDRESS/{server,client}.csr
rm -rf $FILE_ADDRESS/ca.srl
rm -rf $FILE_ADDRESS/extfile.cnf
# 最终文件
# ca.pem  ==  CA机构证书
# cert.pem  ==  客户端证书
# key.pem  ==  客户私钥
# server-cert.pem  == 服务端证书
# server-key.pem  ==  服务端私钥
```

:::tip
注意：`DOMAIN_HOST`、`INTERNET_IP`、`PASSWORD`值必填，自定义信息随便填写即可
:::

- 赋予运行权限

```bash
chmod +x /home/auto-tls-certs.sh
```

- 执行脚本

```bash
bash /home/auto-tls-certs.sh
```

## 配置Docker支持TLS

- 用vim编辑器修改docker.service文件

```bash
vi /usr/lib/systemd/system/docker.service
```

- 修改以`ExecStart`开头的配置，开启TLS认证，并配置好CA证书、服务端证书和服务端私钥，修改内容如下：

```bash
ExecStart=/usr/bin/dockerd -H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock --tlsverify --tlscacert=/home/docker-ca/ca.pem --tlscert=/home/docker-ca/server-cert.pem --tlskey=/home/docker-ca/server-key.pem
```

- 重启Docker服务

```bash
systemctl daemon-reload && systemctl restart docker
```

## 搭建私有仓库

- 安装

```bash
docker pull registry:2
```

- 让Docker支持http上传镜像

```bash
vi /etc/docker/daemon.json

"insecure-registries":["服务器ip地址:5000"]
```

- 重启Docker服务

```bash
systemctl daemon-reload && systemctl restart docker
```

- 运行

```bash
docker run -d -p 5000:5000 --restart=always --name registry2 registry:2
```

- 修改配置文件（使之能删除镜像）

```bash
docker exec -it 容器ID vi /etc/docker/registry/config.yml
```

:::tip
增加`delete段`，将`enabled`设置为`true`
:::

![配置文件](https://z3.ax1x.com/2021/08/22/hp4m79.png)

- 重启容器
  
```bash
docker restart registry2
```

- 访问私有仓库

```bash
http://ip地址:5000/v2/_catalog
```

- 删除镜像

:::tip
通过命令行获取镜像对应sha256值：

curl --header "Accept: application/vnd.docker.distribution.manifest.v2+json" -I -X GET http://私有仓库地址/v2/镜像名称/manifests/镜像版本
:::

```bash
curl -I -X DELETE 私有仓库地址:5000/v2/镜像名称/manifests/sha256:镜像对应sha256值

docker exec -it registry2 sh

rm -rf /var/lib/registry/docker/registry/v2/repositories/镜像名称

exit
```

## 私有仓库可视化

:::tip
由于私有镜像仓库管理比较麻烦，而`docker-registry-ui`有专门的页面可以方便地管理镜像，所以安装它来管理私有镜像仓库。
:::

- 拉取镜像

```bash
docker pull joxit/docker-registry-ui
```

- 运行

```bash
docker run -p 8280:80 --name registry-ui \
--link registry2:registry2 \
-e REGISTRY_URL="http://registry2:5000" \
-e DELETE_IMAGES="true" \
-e REGISTRY_TITLE="Registry2" \
-d joxit/docker-registry-ui
```

## Dockerfile常用指令

### ADD

用于复制文件，格式：

```bash
ADD <src> <dest>
```

示例：

```bash
# 将当前目录下的burning-sun.jar包复制到docker容器的/目录下

ADD burning-sun.jar /burning-sun.jar
```

### ENTRYPOINT

指定docker容器启动时执行的命令，格式：

```bash
ENTRYPOINT ["executable", "param1","param2"...]
```

示例：

```bash
# 指定docker容器启动时运行jar包

ENTRYPOINT ["java", "-jar","/burning-sun.jar"]
```

### ENV

用于设置环境变量，格式：

```bash
ENV <key> <value>
```

示例：

```bash
# mysql运行时设置root密码

ENV MYSQL_ROOT_PASSWORD root
```

### EXPOSE

声明需要暴露的端口(只声明不会打开端口)，格式：

```bash
EXPOSE <port1> <port2> ...
```

示例：

```bash
# 声明服务运行在8080端口

EXPOSE 8080
```

### FROM

指定所需依赖的基础镜像，格式：

```bash
FROM <image>:<tag>
```

示例：

```bash
# 该镜像需要依赖的java8的镜像

FROM java:8
```

### MAINTAINER

指定维护者的名字，格式：

```bash
MAINTAINER <name>
```

示例：

```bash
MAINTAINER william
```

### RUN

在容器构建过程中执行的命令，我们可以用该命令自定义容器的行为，比如安装一些软件，创建一些文件等，格式：

```bash
RUN <command>

RUN ["executable", "param1","param2"...]
```

示例：

```bash
# 在容器构建过程中需要在/目录下创建一个burning-sun.jar文件

RUN bash -c 'touch /burning-sun.jar'
```

<RightMenu />