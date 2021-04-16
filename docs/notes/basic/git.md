---
title: Git常用命令
---

# Git常用命令

## 连接远程仓库

- 创建SSH KEY

  ```bash
  ssh-keygen -t rsa -C "991658923@qq.com"
  ```

- 测试是否连接成功

  ```bash
  ssh -T git@github.com
   
  ssh -T git@www.52mee.com
  ```

## 初始化用户名和邮箱

```bash
git config --global user.name "username"

git config --global user.email "email"
```

## 创建版本库

* 克隆远程版仓库
    ```bash
    git clone <url>
    ```
* 初始化本地版仓库
    ```bash
    git init
    ```

## 修改和提交

* 查看状态
    ```bash
    git status
    ```
* 查看变更内容
    ```bash
    git diff
    ```
* 跟踪所有改动过的文件
    ```bash
    git add .
    ```
* 跟踪指定的文件
    ```bash
    git add <file>
    ```
* 文件改名
    ```bash
    git mv -v <old> <new>
    ```
* 删除文件
    ```bash
    git rm <file>
    ```
* 停止跟踪文件但不删除
    ```bash
    git rm --cached <file>
    ```
* 提交所有更新过的文件
    ```bash
    git commit -m "commit message"
    ```
* 修改最后一次提交
    ```bash
    git commit --amend
    ```

## 查看提交历史

* 查看提交历史
    ```bash
    git log
    ```
    
* 精简模式显示

    ```bash
    git log --oneline || git log --pretty=oneline
    ```

* 查看指定文件的提交历史
    ```bash
    git log -p <file>
    ```
    
* 查看指定作者的提交历史

    ```bash
    git log --author="提交人"
    ```

* 查看版本路线

    ```bash
    git log --oneline --graph
    ```

* 以列表方式查看指定文件的提交历史
    ```bash
    git blame <file>
    ```

## 撤销

* 撤销工作目录中所有未提交文件的修改内容
    ```bash
    git reset --hard HEAD
    ```
    
* 清空add命令向暂存区提交的关于file文件的修改
    ```bash
    git reset HEAD <file>
    ```
    
* 回退指定的版本

    ```bash
    git reset --hard <commit版本号
    ```

* 回退上一个版本

    ```bash
    git reset --hard HEAD^ 
    ```

* 撤销对工作区修改
    ```bash
    git checkout -- <file>
    ```
    
* 文件回退到指定版本

    ```bash
    git checkout <commit版本号> -- <file>
    ```

* 撤销指定的提交
    ```bash
    git revert <commit>
    ```

## 分支与标签

* 显示所有本地分支
    ```bash
    git branch
    ```
    
* 切换到指定分支或标签
    ```bash
    git checkout <branch/tag>
    ```
    
* 创建新分支
    ```bash
    git branch <new-branch>
    ```
    
* 创建并直接切换分支

    ```bash
    git branch -b <new-branch>
    ```

* 删除本地分支
    ```bash
    git branch -d <branch>
    ```
    
* 强制删除分支

    ```bash
    git branch -D <branch>
    ```

* 列出所有本地标签
    ```bash
    git tag
    ```
    
* 基于最新提交创建标签
    ```bash
    git tag <tagname>
    ```
    
* 删除标签
    ```bash
    git tag -d <tagname>
    ```

## 合并与衍合

* 合并指定分支到当前分支
    ```bash
    git merge <branch>
    ```
* 衍合指定分支到当前分支
    ```bash
    git rebase <branch>
    ```

## 解决合并分支冲突问题

- 忽略其他分支内容，保留当前分支内容

  ```bash
  git merge --abort
  ```

- 手动删除特殊符号

## 远程操作

* 查看远程版本库信息
    ```bash
    git remote -v
    ```
    
* 查看指定远程版本库信息
    ```bash
    git remote show <remote>
    ```
    
* 添加远程版本库
    ```bash
    git remote add <remote> <url>
    ```
    
* 修改远程版本库
    ```bash
    git remote set-url origin <url>
    ```
    
* 删除远程版本库

    ```bash
    git remote rm <remote>
    ```

* 从远程库获取代码
    ```bash
    git fetch <remote>
    ```
    
* 下载代码及快速合并
    ```bash
    git pull <remote> <branch>
    ```
    
* 上传代码及快速合并
    ```bash
    git push <remote> <branch>
    ```
    
* 删除远程分支
    ```bash
    git push origin --delete <branch>
    ```
    
* 删除远程标签

    ```bash
    git push origin :refs/tags/<标签名>
    ```

* 上传指定标签

    ```bash
    git push origin <标签名>
    ```

* 上传所有标签
    ```bash
    git push --tags
    ```

<RightMenu />