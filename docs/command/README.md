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

npm config set prefix "路径"

npm config get cache（缓存目录）

npm config set cache（设置缓存目录）

npm root -g（查看包的安装路径）

npm config get registry

npm config set registry https://registry.npmmirror.com/

npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/

npm install -g cnpm --registry=https://registry.npmmirror.com/（使用淘宝NPM镜像）
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

## Java

1. 查看当前Java版本

```bash
java -version
```

2. 查看全部Java版本

```bash
/usr/libexec/java_home -V
```

3. 后台运行Jar包

```bash
nohup java -jar -Dspring.profiles.active=prod -XX:MetaspaceSize=128m -XX:MaxMetaspaceSize=128m -Xms1024m -Xmx1024m -Xmn256m -Xss256k -XX:SurvivorRatio=8 -XX:+UseConcMarkSweepGC jar包 >springboot.log 2>&1 &
```

4. 远程调试

```bash
java -Xdebug -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -jar jar包
```

## Git

### 查看所有配置

```bash
git config --list
```

### 删除全局配置项

- 终端执行命令

```bash
git config --global --unset user.name
```

- 编辑配置文件

```bash
git config --global --edit
```

### 创建版本库

- 克隆远程版仓库

```bash
git clone <url>
```

- 初始化本地版仓库

```bash
git init
```

### 修改和提交

- 查看状态

```bash
git status
```

- 查看变更内容

```bash
git diff
```

- 跟踪所有改动过的文件

```bash
git add .
```

- 跟踪指定的文件

```bash
git add <file>
```

- 文件改名

```bash
git mv -v <old> <new>
```

- 删除文件

```bash
git rm <file>
```

- 停止跟踪文件但不删除

```bash
git rm --cached <file>
```

- 提交所有更新过的文件

```bash
git commit -m "commit message"
```

- 修改最后一次提交

```bash
git commit --amend
```

### 查看提交历史

- 查看提交历史

```bash
git log
```
    
- 精简模式显示

```bash
git log --oneline || git log --pretty=oneline
```

- 查看指定文件的提交历史

```bash
git log -p <file>
```
    
- 查看指定作者的提交历史

```bash
git log --author="提交人"
```

- 查看版本路线

```bash
git log --oneline --graph
```

- 以列表方式查看指定文件的提交历史

```bash
git blame <file>
```

- 显示所有操作记录

```bash
git reflog
```

### 撤销

- 撤销工作目录中所有未提交文件的修改内容

```bash
git reset --hard HEAD
```
    
- 清空add命令向暂存区提交的关于file文件的修改

```bash
git reset HEAD <file>
```
    
- 回退指定的版本

```bash
git reset --hard <commit版本号>
```

- 回退上一个版本

```bash
git reset --hard HEAD^ 
```

- 撤销对工作区修改

```bash
git checkout -- <file>
```
    
- 文件回退到指定版本

```bash
git checkout <commit版本号> -- <file>
```

- 撤销指定的提交

```bash
git revert <commit>
```

### 分支与标签

- 显示所有本地分支

```bash
git branch
```
    
- 切换到指定分支或标签

```bash
git checkout <branch/tag>
```

- 创建新分支

```bash
git branch <new-branch>
```
    
- 创建并直接切换分支

```bash
git checkout -b <new-branch>
```

- 删除本地分支

```bash
git branch -d <branch>
```
    
- 强制删除分支

```bash
git branch -D <branch>
```

- 列出所有本地标签

```bash
git tag
```
    
- 基于最新提交创建标签

```bash
git tag <tagname>
```
    
- 删除标签

```bash
git tag -d <tagname>
```

### 合并与衍合

- 合并指定分支到当前分支

```bash
git merge <branch>
```

- 衍合指定分支到当前分支

```bash
git rebase <branch>
```

### 解决合并分支冲突问题

- 忽略其他分支内容，保留当前分支内容

```bash
git merge --abort
```

- 手动删除特殊符号

### 配置远程仓库

- 创建SSH KEY

```bash
ssh-keygen -t rsa -C "email"
```

- 测试是否连接成功

```bash
ssh -T git@github.com
  
ssh -T git@gitee.com
```

- 初始化用户名和邮箱

```bash
git config --global user.name "username"

git config --global user.email "email"
```

### 远程仓库操作

- 查看远程版本库信息

```bash
git remote -v
```
    
- 查看指定远程版本库信息

```bash
git remote show <remote>
```

- 添加远程版本库

```bash
git remote add <remote> <url>
```
    
- 修改远程版本库

```bash
git remote set-url origin <url>
```
    
- 删除远程版本库

```bash
git remote rm <remote>
```

- 从远程库获取代码

```bash
git fetch <remote>
```
    
- 下载代码及快速合并

```bash
git pull <remote> <branch>
```
    
- 上传代码及快速合并

```bash
git push <remote> <branch>
```
    
- 删除远程分支

```bash
git push origin --delete <branch>
```
    
- 删除远程标签

```bash
git push origin :refs/tags/<标签名>
```

- 上传指定标签

```bash
git push origin <标签名>
```

- 上传所有标签

```bash
git push --tags
```

## DOS

- 解决端口占用

```bash
netstat -ano | findstr 8081

taskkill /F /PID 27520
```

<RightMenu />