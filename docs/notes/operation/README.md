---
title: 起步
---

# 配置yum源

## 替换

```bash
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
         -e 's|^#baseurl=http://mirror.centos.org|baseurl=https://mirrors.tuna.tsinghua.edu.cn|g' \
         -i.bak \
         /etc/yum.repos.d/CentOS-*.repo
```

## 更新软件包缓存

```bash
sudo yum makecache
```

<RightMenu />