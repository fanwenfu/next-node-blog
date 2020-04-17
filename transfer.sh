# /bin/bash

# cd 'src'
# yarn build

rm -rf "./next-blog/" && mkdir "next-blog"
node copyFile.js

scp -r -P 22 ./next-blog root@localhost:/usr/local/nginx

echo "finished"