---
title: VuePess
---

# 指南

## 快速上手

>  前提条件
>
> VuePress 需要  [Node.js](https://nodejs.org/en/) >= 8.6

1. 安装Node.js

   ```bash
   tar -xvf node-v14.15.4-linux-x64.tar.xz
   
   mv node-v14.15.4-linux-x64/* /usr/local/sbin/node-v14.15.4
   
   vi /etc/profile
   
   source /etc/profile
   
   ln -s /usr/local/sbin/node-v14.15.4/bin/node /usr/local/bin/
   
   ln -s /usr/local/sbin/node-v14.15.4/bin/npm /usr/local/bin/
   ```

2. 安装Yarn

   ```bash
   curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
   
   sudo yum install yarn -y
   ```

3. 创建并进入一个新目录

   ```bash
   mkdir vuepress-starter && cd vuepress-starter
   ```

4. 使用你喜欢的包管理器进行初始化

   ```bash
   yarn init # npm init
   ```

5. 将 VuePress 安装为本地依赖

   ```bash
   yarn add -D vuepress # npm install -D vuepress
   ```

6. 创建你的第一篇文档

   ```bash
   mkdir docs && echo '# Hello VuePress' > docs/README.md
   ```

7. 在 `package.json` 中添加一些 [scripts](https://classic.yarnpkg.com/zh-Hans/docs/package-json#toc-scripts)

   ```json
   {
     "scripts": {
       "docs:dev": "vuepress dev docs",
       "docs:build": "vuepress build docs"
     }
   }
   ```

8. 在本地启动服务器

   ```bash
   yarn docs:dev # npm run docs:dev
   ```

## 目录结构

<RightMenu />
