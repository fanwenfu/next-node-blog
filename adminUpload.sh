# /bin/bash

# cd 'src'
# yarn build

scp -r -P 22 ./admin/dist root@localhost:/usr/local/nginx/admin

echo "finished"