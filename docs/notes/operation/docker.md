---
title: Docker容器
---

# Docker简介

> Docker 是一个开源的应用容器引擎，基于 [Go 语言](https://www.runoob.com/go/go-tutorial.html) 并遵从 Apache2.0 协议开源。
>
> Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。
>
> 容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

## Docker环境安装

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

## 配置Docker加速器

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

## Docker常用命令

- 启动Docker：

  ```bash
  service docker start
  ```

- 关闭Docker：

  ```bash
  service docker stop
  ```

- 重启Docker：

  ```bash
  service docker restart
  ```

## Docker镜像常用命令

### 搜索镜像

```bash
docker search java
```

### 下载镜像

```bash
docker pull java:8
```

### 列出镜像

```bash
docker images
```

### 删除镜像

- 指定名称删除镜像：

```bash
docker rmi java:8
```

- 指定名称删除镜像（强制）：

```bash
docker rmi -f java:8
```

- 删除所有没有引用的镜像：

```bash
docker rmi `docker images | grep none | awk '{print $3}'`
```

- 强制删除所有镜像：

```bash
docker rmi -f $(docker images)
```

### 重命名镜像

```bash
docker tag
```

### 导入导出镜像

```bash
docker save docker.io/java > /home/java.tar.gz

docker load < /home/java.tar.gz
```

### 打包镜像

```bash
# -t 表示指定镜像仓库名称/镜像名称:镜像标签 .表示使用当前目录下的Dockerfile文件
docker build -t burning-sun:1.0.0-SNAPSHOT .
```

### 推送镜像

```bash
# 登录Docker Hub
docker login
# 给本地镜像打标签为远程仓库名称
docker tag burning-sun:1.0.0-SNAPSHOT immortal/burning-sun:1.0.0-SNAPSHOT
# 推送到远程仓库
docker push immortal/burning-sun:1.0.0-SNAPSHOT
```

## Docker容器常用命令

### 新建并启动容器

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

### 列出容器

- 列出运行中的容器：

  ```bash
  docker ps
  ```

- 列出所有容器：

  ```bash
  docker ps -a
  ```

### 停止容器

注意：`$ContainerName`表示容器名称，`$ContainerId`表示容器ID，可以使用容器名称的命令，基本也支持使用容器ID，比如下面的停止容器命令。

```bash
docker stop $ContainerName(or $ContainerId)
```

例如：

```bash
docker stop nginx
#或者
docker stop c5f5d5125587
```

### 强制停止容器

```bash
docker kill $ContainerName
```

### 启动容器

```bash
docker start $ContainerName
```

### 进入容器

- 先查询出容器的`pid`：

  ```bash
  docker ps -a
  ```

- 根据容器的pid进入容器：

  ```bash
  docker exec -it $pid" bash
  ```

### 删除容器

- 删除指定容器：

    ```bash
    docker rm $ContainerName
    ```

- 按名称通配符删除容器，比如删除以名称`mall-`开头的容器：

    ```bash
    docker rm `docker ps -a | grep mall-* | awk '{print $1}'`
    ```

- 强制删除所有容器；

    ```bash
    docker rm -f $(docker ps -a -q)
    ```

### 查看容器的日志

- 查看容器产生的全部日志：

    ```bash
    docker logs $ContainerName
    ```

- 动态查看容器产生的日志：

  ```bash
  docker logs -f $ContainerName
  ```

- 指定时间：

  ```bash
  docker logs -t --since="2021-01-07T13:23:37" $ContainerName
  ```

### 查看容器的IP地址

```bash
docker inspect --format '{{ .NetworkSettings.IPAddress }}' $ContainerName
```

### 修改容器的启动方式

```bash
# 将容器启动方式改为always
docker container update --restart=always $ContainerName
```

### 同步宿主机时间到容器

```bash
docker cp /etc/localtime $ContainerName:/etc/
```

### 指定容器时区

```bash
docker run -p 80:80 --name nginx \
-e TZ="Asia/Shanghai" \
-d nginx:1.17.0
```

### 查看容器资源占用状况

- 查看指定容器资源占用状况，比如cpu、内存、网络、io状态：

  ```bash
  docker stats $ContainerName
  ```

- 查看所有容器资源占用情况：

  ```bash
  docker stats -a
  ```

### 查看容器磁盘使用情况

```bash
docker system df
```

### 指定账号进入容器内部

```bash
# 使用root账号进入容器内部
docker exec -it --user root $ContainerName /bin/bash
```

### 查看所有网络

```bash
docker network ls
```

### 创建外部网络

```bash
docker network create -d bridge my-bridge-network
```

### 指定容器网络

```bash
docker run -p 80:80 --name nginx \
--network my-bridge-network \
-d nginx:1.17.0Copy to clipboardErrorCopied
```

## 修改镜像的存放位置

- 查看Docker镜像的存放位置：

  ```bash
  docker info | grep "Docker Root Dir"
  ```

- 关闭Docker服务：

  ```bash
  systemctl stop docker
  ```

- 先将原镜像目录移动到目标目录：

  ```bash
  mv /var/lib/docker /mydata/docker
  ```

- 建立软连接：

  ```bash
  ln -s /mydata/docker /var/lib/docker
  ```

## Docker容器清理

- 查看Docker占用的磁盘空间情况：

  ```bash
  docker system df
  ```

- 删除所有关闭的容器：

  ```bash
  docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs docker rm
  ```

- 删除所有`dangling`镜像(没有Tag的镜像)：

  ```bash
  docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
  ```

- 删除所有`dangling`数据卷(即无用的 volume)：

  ```bash
  docker volume rm $(docker volume ls -qf dangling=true)
  ```

## 基于TLS的安全访问

- 创建一个目录用于存储生成的证书和秘钥

  ```bash
  mkdir /usr/local/src/docker-ca && cd /usr/local/src/docker-ca
  ```

- 创建CA证书私钥

  ```bash
  openssl genrsa -aes256 -out ca-key.pem 4096
  ```

- 根据私钥创建CA证书

  ```bash
  openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -subj "/CN=*" -out ca.pem
  ```

- 创建服务端私钥

  ```bash
  openssl genrsa -out server-key.pem 4096
  ```

- 创建服务端证书签名请求文件（用于CA证书给服务端证书签名）

  ```bash
  openssl req -subj "/CN=*" -sha256 -new -key server-key.pem -out server.csr
  ```

- 创建CA证书签名好的服务端证书

  ```bash
  openssl x509 -req -days 365 -sha256 -in server.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem
  ```

- 创建客户端私钥

  ```bash
  openssl genrsa -out key.pem 4096
  ```

- 创建客户端证书签名请求文件（用于CA证书给客户证书签名）

  ```bash
  openssl req -subj "/CN=client" -new -key key.pem -out client.csr
  ```

- 为了让秘钥适合客户端认证，创建一个扩展配置文件`extfile-client.cnf`

  ```bash
  echo extendedKeyUsage = clientAuth > extfile-client.cnf
  ```

- 创建CA证书签名好的客户端证书

  ```bash
  openssl x509 -req -days 365 -sha256 -in client.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out cert.pem -extfile extfile-client.cnf
  ```

- 删除创建过程中多余的文件

  ```bash
  rm -rf ca.srl server.csr client.csr extfile-client.cnf
  ```

- 最终生成文件如下

  ```
  ca.pem CA	证书
  ca-key.pem CA	证书私钥
  server-cert.pem	服务端证书
  server-key.pem	服务端证书私钥
  cert.pem	客户端证书
  key.pem	客户端证书私钥
  ```

## 配置Docker支持TLS

- 用vim编辑器修改docker.service文件

  ```bash
  vi /usr/lib/systemd/system/docker.service
  ```

- 修改以`ExecStart`开头的配置，开启TLS认证，并配置好CA证书、服务端证书和服务端私钥，修改内容如下：

  ```bash
  ExecStart=/usr/bin/dockerd-current -H tcp://0.0.0.0:2375 -H unix://var/run/docker.sock --tlsverify --tlscacert=/usr/local/src/docker-ca/ca.pem --tlscert=/usr/local/src/docker-ca/server-cert.pem --tlskey=/usr/local/src/docker-ca/server-key.pem
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
  
- 访问私有仓库

  ```bash
  http://ip地址:5000/v2/_catalog
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