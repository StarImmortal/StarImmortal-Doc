---
title: GitLab搭建
---

# GitLab代码托管平台

## 下载Docker镜像

```bash
docker pull docker.io/gitlab/gitlab-ce（英文版）

docker pull beginor/gitlab-ce:11.3.0-ce.0（中文版）
```

## 准备三个目录

```bash
mkdir -p /home/software/gitlab/etc
mkdir -p /home/software/gitlab/logs
mkdir -p /home/software/gitlab/data
```

## 启动GitLab

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

## GitLab常用命令

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

## 配置QQ个人邮箱

* 开启qq邮箱的POP3/SMTP服务并保存好授权码
    ![8OEaGt.png](https://s1.ax1x.com/2020/03/24/8OEaGt.png)
    ![8OEdRP.png](https://s1.ax1x.com/2020/03/24/8OEdRP.png)
    ![8OEwxf.jpg](https://s1.ax1x.com/2020/03/24/8OEwxf.jpg)
* 修改Gitlab的配置文件：
    ```bash
    vim /home/software/gitlab/etc/gitlab.rb
    ```
* 在文件的最后加上配置
    ```bash
    gitlab_rails['smtp_enable'] = true
    gitlab_rails['smtp_address'] = "smtp.qq.com"
    gitlab_rails['smtp_port'] = 465
    gitlab_rails['smtp_user_name'] = "991658923@qq.com"
    gitlab_rails['smtp_password'] = "axjmoglbxaukbgaa"
    gitlab_rails['smtp_domain'] = "smtp.qq.com"
    gitlab_rails['smtp_authentication'] = "login"
    gitlab_rails['smtp_enable_starttls_auto'] = true
    gitlab_rails['smtp_tls'] = true
    gitlab_rails['gitlab_email_from'] = '991658923@qq.com'
    ```
* 进入容器
    ```bash
    docker exec -it gitlab /bin/bash
    ```
* 重启配置
    ```bash
    gitlab-ctl reconfigure
    ```
* 测试配置是否成功
    ```
    gitlab-rails console   # 进入邮件控制台, 稍等一会才能进入
    Notify.test_email('991658923@qq.com', 'Message Subject', 'Message Body').deliver_now     # 发送测试邮件
    ```

## 修改GitLab克隆地址

```bash
docker exec -it gitlab /bin/bash

vi /opt/gitlab/embedded/service/gitlab-rails/config/gitlab.yml

gitlab-ctl restart
```

## 配置Https

```bash
server {
    listen 80;
    access_log /etc/nginx/logs/access.log combined;
    server_name www.52mee.com;
    rewrite ^(.*) https://$server_name$1 permanent;
    }
    server {
            listen 443 ssl;
            server_name www.52mee.com;
            ssl_certificate  /home/software/gitlab/ssl/gitlab.crt;
            ssl_certificate_key /home/software/gitlab/ssl/gitlab.key;
            ssl_session_timeout 5m;
            server_tokens off;
            ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
            ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
            ssl_prefer_server_ciphers on;
            access_log /etc/nginx/logs/access.log combined;

    location / {
                    proxy_pass  http://www.52mee.com:1080;
    }
}
```

<RightMenu />