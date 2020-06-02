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
 # @Author:范文富
 # @Date: 2020-04-14 16:21:51
 # @LastEditTime: 2020-06-02 11:21:16
 # @LastEditors: Please set LastEditors
 # @Description: In User Settings Edit
 # @FilePath: /next-antd-node-blog/adminUpload.sh
### 
# /bin/bash

cd 'admin'
yarn build
cd '../'
ssh fanblog "cd /usr/local/nginx/admin && rm -rf ./dist"
scp -r -P 22 ./admin/dist root@47.1**.**.**:/usr/local/nginx/admin

echo "finished"