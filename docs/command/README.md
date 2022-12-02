---
title: 常用命令
---

# 常用命令

## NPM

```bash
# 查看Node.js版本
node -v

# 查看npm版本
npm -v

# 初始化
npm init

# 帮助命令
npm --help

# 更新npm
npm install -g npm

# 安装指定包
npm install <package>

# 全局安装指定包
npm install <package> -g

# 更新指定包
npm update <package>

# 卸载指定包
npm uninstall <package>

# 查看当前目录下已安装依赖
npm list

# 查看全局已安装依赖
npm list -g

# 查看当前包安装路径
npm root

# 查看全局包安装路径
npm root -g

# 清除缓存
npm cache clean --force

# 查看配置信息
npm config list

# 获取全局安装目录
npm config get prefix

# 设置全局安装目录
npm config set prefix <path>

# 获取缓存目录路径
npm config get cache

# 设置缓存目录
npm config set cache <path>

# 获取镜像源
npm config get registry

# 设置淘宝镜像源
npm config set registry https://registry.npmmirror.com

# node-sass安装失败解决方法
npm config set sass_binary_site https://registry.npmmirror.com/-/binary/node-sass

# 全局安装淘宝NPM镜像
npm install -g cnpm --registry=https://registry.npmmirror.com
```

## NVM

```bash
# 查看nvm版本
nvm v

# 查看列表（已安装）
nvm list

# 显示当前版本（Node.js）
nvm current

# 切换指定版本（Node.js）
nvm use <version>

# 安装指定版本（Node.js）
nvm install <version>
```

## YARN

```bash
# 查看版本
yarn -v

# 初始化
yarn init

# 列出当前项目依赖
yarn list

# 列出全局安装模块
yarn global list

# 安装
yarn add <package...>

# 全局安装
yarn global add <package...>

# 移除
yarn remove <package...>

# 全局移除
yarn global remove <package...>

# 更新
yarn upgrade <package...>

# 查看全局安装目录
yarn global dir

# 查看bin目录
yarn global bin

# 查看缓存目录
yarn cache dir

# 清除全局缓存
yarn cache clean

# 设置全局淘宝镜像源
yarn config set registry https://registry.npmmirror.com --global

# node-sass安装失败解决方法
yarn config set sass_binary_site https://registry.npmmirror.com/-/binary/node-sass --global

# 设置bin位置
yarn config set prefix

# 设置全局安装位置
yarn config set global-folder <patch>

# 设置缓存位置
yarn config set cache-folder <path>
```

## React

```bash
# 创建项目
npx create-react-app <project-name>
```

## Vue

```bash
# 查看版本
vue --version

# 可视化界面
vue ui

# 全局安装（老版本）
npm install --global vue-cli

# 卸载（老版本）
npm uninstall --global vue-cli

# 全局安装（最新版）
npm install -g @vue/cli

# 全局更新（最新版）
npm update -g @vue/cli

# Vue-Cli脚手架初始化Vue项目（老版本）
vue init webpack <project-name>

# Vue-Cli脚手架初始化Vue项目（最新版）
vue create <project-name>

# Vite脚手架初始化Vue3项目
npm init vite-app <project-name>
```

## Uni-App

```bash
# 创建Vue3/Vite版
npx degit dcloudio/uni-preset-vue#vite my-vue3-project

# 更新到最新 alpha 版
npx @dcloudio/uvm alpha
```

## Maven

```bash
# 清除旧包后重新打包并跳过测试类
mvn clean package -Dmaven.test.skip=true

# 远程拷贝文件
scp [原路径] root@<ip>:[目标路径]
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
netstat -ano | findstr "8081"

taskkill /F /PID 27520
```

## BREW

- 搜索

```bash
brew search <package>
```

- 查询

```bash
# 显示安装包数量，文件数量，和总占用空间
brew info

# 查看具体信息及依赖关系当前版本注意事项等
brew info <package>
```

- 列出已安装的包

```bash
brew list
```

- 安装

```bash
brew install <package>
```

- 卸载

```bash
brew remove <package>
```

- 更新 Homebrew

```bash
brew update
```

- 查看是否需要更新安装包

```bash
brew outdated
```

- 更新安装包

```bash
# 更新所有安装包
brew upgrade

# 更新指定安装包
brew upgrade <package>
```

- 清理旧版本

```bash
# 清理所有包的旧版本及其安装缓存
brew cleanup

# 清理指定包的旧版本
brew cleanup <package>

# 查看可清理的旧版本包，不执行实际操作
brew cleanup -n
```

## Linux

### 防火墙

- 查看防火墙状态

```bash
systemctl status firewalld
```

- 打开防火墙

```bash
systemctl start firewalld
```

- 查看所有已开放临时端口（默认为空）

```bash
firewall-cmd --list-ports
```

- 查看所有永久开放端口（默认为空）

```bash
firewall-cmd --list-ports --permanent
```

- 添加临时开放端口

```bash
firewall-cmd --add-port=223/tcp
```

- 添加永久开放的端口

```bash
firewall-cmd --add-port=223/tcp --permanent
```

- 关闭临时端口

```bash
firewall-cmd --remove-port=80/tcp
```

- 关闭永久端口

```bash
firewall-cmd --remove-port=80/tcp --permanent
```

- 重载配置并重启防火墙

```bash
firewall-cmd --reload

systemctl restart firewalld
```

<RightMenu />