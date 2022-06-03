---
title: Nginx
---

# Nginx

## 常用命令

```bash
nginx

nginx -t

nginx -s reload

nginx -s stop

nginx -c /etc/nginx/nginx.conf
```

## 配置

**配置日志**

```bash
cd /etc/nginx

mkdir logs

cd logs/

touch access.log
```

**配置信息**

```bash
user root;

http {
    gzip on; #开启gzip
    gzip_disable "msie6"; #IE6不使用gzip
    gzip_vary on; #设置为on会在Header里增加 "Vary: Accept-Encoding"
    gzip_proxied any; #代理结果数据的压缩
    gzip_comp_level 6; #gzip压缩比（1~9），越小压缩效果越差，但是越大处理越慢，所以一般取中间值
    gzip_buffers 16 8k; #获取多少内存用于缓存压缩结果
    gzip_http_version 1.1; #识别http协议的版本
    gzip_min_length 1k; #设置允许压缩的页面最小字节数，超过1k的文件会被压缩
    gzip_types application/javascript text/css; #对特定的MIME类型生效,js和css文件会被压缩

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include /etc/nginx/conf.d/*.conf;
}

server {
    listen 80;
    server_name 域名;
    rewrite ^(.*) https://$server_name$1 permanent;
    
    location / {
    }
}

server {
    listen 443 ssl;
    server_name 域名;
    ssl_certificate  https证书路径;
    ssl_certificate_key https证书路径;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    access_log /etc/nginx/logs/access.log combined;

    location / {
        proxy_pass http://127.0.0.1:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        client_max_body_size 20m;
        client_body_buffer_size 256k;
        proxy_connect_timeout 1200;
        proxy_read_timeout 1200;
        proxy_send_timeout 6000;
        proxy_buffer_size 32k;
        proxy_buffers 4 64k;
        proxy_busy_buffers_size 128k;
        proxy_temp_file_write_size 20m;
        send_timeout 1200s;
    }
}
```

<RightMenu />