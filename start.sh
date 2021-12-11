#!/bin/bash
# 进入目录
cd /home/deploy/StarImmortal-Doc
# 拉取最新代码
git pull
# 杀死目前已启动的进程
ID=`ps -ef|grep node | grep vuepress|awk '{print $2}'`
echo --- the process is $ID ---
kill -9 $ID
echo "killed $ID"
# 启动
nohup yarn docs:dev&
