# next-antd-node-blog
## 必备环境：node，包安装工具可选择使用yarn or npm
## 项目预览 http://47.107.44.19/
## 项目启动步骤

### 1.服务端(node + express + mysql)
#### 启动步骤
```
cd server
npm install
node index.js
```
#### 已有功能 （个人信息接口，文章增删改查接口）

### 2.启动web端(next.js + antd)
#### 启动步骤
```
cd src
npm install
npm run serve
```
#### 已有页面 （首页，可看个人信息，文章列表）

### 3.后台系统(vue + element)
#### 启动步骤
```
cd admin
npm install
npm run dev
```
#### 已有功能页面 （个人信息查看与修改，文章列表增删改查）
### 4.项目数据库使用的是mysql，自行安装并进入server目录修改mysql.js文件修改账号密码。
 [安装步骤](https://juejin.im/post/5e60b346518825490b648bad)

### 更新记录
```
    2020.04.23
        更响应式样式bug 
    2020.04.17 
        后台系统前端添加虚拟token验证
        完成博客前端文章详情
        完成部署
    2020.03.19 完成文章的增删改查
  
```
