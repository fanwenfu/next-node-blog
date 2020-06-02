###
 #                        .::::.
 #                      .::::::::.
 #                     :::::::::::
 #                  ..:::::::::::'
 #               '::::::::::::'
 #                 .::::::::::
 #            '::::::::::::::..
 #                 ..::::::::::::.
 #               ``::::::::::::::::
 #                ::::``:::::::::'        .:::.
 #               ::::'   ':::::'       .::::::::.
 #             .::::'      ::::     .:::::::'::::.
 #            .:::'       :::::  .:::::::::' ':::::.
 #           .::'        :::::.:::::::::'      ':::::.
 #          .::'         ::::::::::::::'         ``::::.
 #      ...:::           ::::::::::::'              ``::.
 #     ````':.          ':::::::::'                  ::::..
 #                        '.:::::'                    ':'````..
###

###
 # @Author: 范文富
 # @Date: 2020-03-12 17:34:15
 # @LastEditTime: 2020-06-02 10:34:24
 # @LastEditors: Please set LastEditors
 # @Description: 构建部署脚本
 # @FilePath: /next-antd-node-blog/transfer.sh
### 

# /bin/bash
# ssh fanblog 命令需要配置ssh免密登陆 配置教程 http://www.fanlogs.cn/article/5
# scp 命令需要配置免密上传，如不配置则需要输入密码 配置教程 https://blog.csdn.net/xyang81/article/details/51477925
cd 'src'
yarn build
echo "构建成功"
cd '../'
rm -rf "./next-blog/" && mkdir "next-blog"
node copyFile.js
echo "文件夹创建成功，正在移除线上文件"
ssh fanblog "cd /usr/local/nginx/html && rm -rf ./next-blog"
echo "移除成功"
echo "上传文件至服务器..."
scp -r -P 22 ./next-blog root@47.107.**.**:/usr/local/nginx/html/next-blog
echo "上传成功"
echo "正在部署..."
ssh fanblog "cd /usr/local/nginx/html && cp -r ./node_modules ./next-blog && pm2 restart 8 && pm2 save"

echo "部署成功 http://www.fanlogs.cn/"