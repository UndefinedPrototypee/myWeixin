# MyWeixin
我的微信应用

路径：F:\Confidential Document\Workspaces\MyEclipse2015CI\myWeixin

步骤：
打开Git命令--->
进入到MyWeixin项目目录--->
命令：
cd F:/Confidential\ Document/Workspaces/MyEclipse2015CI/myWeixin

查看最新文件动态
git stash show

查看缓存列表
git stash list

存入缓存 
git stash push/save -a msg

拉取远程仓库
git pull https://github.com/liduanfeng/myWeixin master/topic

应用缓存 
git stash apply/pop

添加文件到版本控制中
git add ./rm file

提交
git commit -am 'msg'

保存修改退出
:wq!

看已经被提交的
git ls-files 

推送至远程仓库
git push origin topic:topic
git push origin master:topic
