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
 # @LastEditTime: 2020-06-01 19:49:53
 # @LastEditors: Please set LastEditors
 # @Description: 构建部署脚本
 # @FilePath: /next-antd-node-blog/transfer.sh
### 

# /bin/bash
# ssh fanblog 命令需要配置ssh免密登陆 配置教程 https://blog.csdn.net/u013239054/article/details/84027557
cd 'src'
yarn build
echo "构建成功"
cd '../'
rm -rf "./next-blog/" && mkdir "next-blog"
node copyFile.js
echo "文件夹创建成功，正在移除线上文件"
ssh fanblog "cd /usr/local/nginx/html && rm -rf ./next-blog"
echo "准备上传..."
scp -r -P 22 ./next-blog root@hostname:/usr/local/nginx/html/next-blog
ssh fanblog "cd /usr/local/nginx/html && cp -r ./node_modules ./next-blog && pm2 restart 8"

echo "部署成功 http://www.fanlogs.cn/"