---
title: 常用命令
---

# 常用命令

## NPM

```bash
nvm v

node -v 

npm -v（查看npm版本）

nvm list

nvm use node版本

nvm install node版本

npm install -g npm（更新npm）

npm list -g（查看安装的全局模块）

npm cache clean --force（清除缓存）

npm config get prefix（全局node包）

npm config get cache（缓存目录）

npm config set cache（设置缓存目录）

npm root -g（查看包的安装路径）

npm run dev（2.x版本）

npm run serve（3.x版本）

npm config get registry

npm config set registry https://registry.npm.taobao.org/

npm install -g cnpm --registry=https://registry.npm.taobao.org（使用淘宝NPM镜像）

npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver

在项目内添加一个 .npmrc 文件：
phantomjs_cdnurl=http://cnpmjs.org/downloads
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
registry=https://registry.npm.taobao.org

arch: 64
proxy: none
node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

## YARN

```bash
yarn global dir（全局安装目录）

yarn global bin（bin目录）

yarn cache dir（缓存目录）

yarn add <package...>（安装）

yarn cache clean（清除全局缓存）

yarn list

yarn remove <package...>（移除）

yarn run start（启动项目）

yarn config set registry https://registry.npm.taobao.org --global

yarn config set disturl https://npm.taobao.org/dist --global

yarn config set prefix（改变 yarn bin位置）

yarn config  set global-folder "你的磁盘路径"（改变 yarn 全局安装位置）

yarn config set cache-folder "你的磁盘路径"（改变 yarn 缓存位置）
```

## React

```bash
npm install create-react-app -g（旧版create-react-app）

npm uninstall -g create-react-app（先卸载）

npx create-react-app 项目名称
```


## Vue

```bash
vue --version（查看vue的版本）

vue ui（可视化）

npm install --global vue-cli（2.x版本）

npm uninstall --global vue-cli

npm install -g @vue/cli（3.x版本）

vue init webpack 项目名称（2.x版本）

vue create 项目名称（3.x版本）

npm init vite-app 项目名称（Vue3）
```

## Maven

```bash
mvn clean package -Dmaven.test.skip=true

scp jar包路径 root@服务器ip地址:存放路径
```

## Jar包

```bash
nohup java -jar -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=128m -Xms1024m -Xmx1024m -Xmn256m -Xss256k -XX:SurvivorRatio=8 -XX:+UseConcMarkSweepGC jar包 >springboot.log 2>&1 &
```

```bash
vi /etc/systemd/system/服务名.service

Description=mall
After=syslog.target

[Service]
User=root
ExecStart=/usr/local/jdk1.8.0_231/bin/java -jar -Dspring.profiles.active=prod /root/mall.jar

[Install]
WantedBy=multi-user.target

systemctl start 服务名
```

## 远程调试

```bash
java -Xdebug -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -jar jar包
```

<RightMenu />