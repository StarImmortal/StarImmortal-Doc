---
title: GitLab
---

# GitLab代码托管平台

## 拉取镜像

```bash
docker pull docker.io/gitlab/gitlab-ce（英文版）

docker pull beginor/gitlab-ce:11.3.0-ce.0（中文版）
```

## 创建映射文件夹

```bash
mkdir -p /home/software/gitlab/etc /home/software/gitlab/logs/home/software/gitlab/data
```

## 运行

```bash
docker run \
--detach \
--publish 8443:443 \
--publish 1080:80 \
--name gitlab \
--restart always \
-v /home/software/gitlab/etc:/etc/gitlab \
-v /home/software/gitlab/logs:/var/log/gitlab \
-v /home/software/gitlab/data:/var/opt/gitlab \
-v /etc/localtime:/etc/localtime:ro \
--privileged=true beginor/gitlab-ce:11.3.0-ce.0
```

## 常用命令

```bash
# 重新应用gitlab的配置
gitlab-ctl reconfigure

# 重启gitlab服务
gitlab-ctl restart

# 查看gitlab运行状态
gitlab-ctl status

#停止gitlab服务
gitlab-ctl stop

# 查看gitlab运行日志
gitlab-ctl tail
```

## 配置邮箱

### 开启QQ邮箱的POP3/SMTP服务并保存好授权码

![8OEaGt.png](https://s1.ax1x.com/2020/03/24/8OEaGt.png)

![8OEdRP.png](https://s1.ax1x.com/2020/03/24/8OEdRP.png)

![8OEwxf.jpg](https://s1.ax1x.com/2020/03/24/8OEwxf.jpg)

### 修改配置文件

```bash
vim /home/software/gitlab/etc/gitlab.rb

# 在文件的最后加上如下配置

gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.qq.com"
gitlab_rails['smtp_port'] = 465
gitlab_rails['smtp_user_name'] = "${邮箱}"
gitlab_rails['smtp_password'] = "${秘钥}"
gitlab_rails['smtp_domain'] = "smtp.qq.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = true
gitlab_rails['gitlab_email_from'] = '${邮箱}'
```

### 进入容器

```bash
docker exec -it gitlab /bin/bash
```

### 重启配置

```bash
gitlab-ctl reconfigure
```

### 测试配置是否成功

```
# 进入邮件控制台, 稍等一会才能进入
gitlab-rails console

# 发送测试邮件
Notify.test_email('991658923@qq.com', 'Message Subject', 'Message Body').deliver_now
```

## 修改克隆地址

```bash
docker exec -it gitlab /bin/bash

vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml

gitlab-ctl restart
```

## 配置域名

```bash
server {
    listen 80;
    access_log /etc/nginx/logs/access.log combined;
    server_name www.gitlab.com;
    rewrite ^(.*) https://$server_name$1 permanent;
}

server {
    listen 443 ssl;
    server_name www.gitlab.com;
    ssl_certificate  /home/software/gitlab/ssl/gitlab.crt;
    ssl_certificate_key /home/software/gitlab/ssl/gitlab.key;
    ssl_session_timeout 5m;
    server_tokens off;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    access_log /etc/nginx/logs/access.log combined;

    location / {
        proxy_pass  http://127.0.0.1:1080;
    }
}
```

<RightMenu />