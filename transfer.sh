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
 # @LastEditTime: 2020-06-01 10:44:21
 # @LastEditors: Please set LastEditors
 # @Description: 构建部署脚本
 # @FilePath: /next-antd-node-blog/transfer.sh
### 

# /bin/bash

cd 'src'
yarn build
echo "构建成功"
cd '../'
rm -rf "./next-blog/" && mkdir "next-blog"
node copyFile.js
echo "文件夹创建成功，准备上传..."
scp -r -P 22 ./next-blog root@localhost:/usr/local/nginx/html/next-blog

echo "finished"