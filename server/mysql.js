/*
 * @Author: your name
 * @Date: 2020-04-08 14:30:06
 * @LastEditTime: 2020-06-01 10:50:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /next-antd-node-blog/server/mysql.js
 */ 
var mysql = require("mysql");
//使用连接池
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "pwd",//数据库密码
  database: "mysql",
  multipleStatements:true
});
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      connection.query(sql, params, (err, result) => {
        //释放连接
        connection.release();
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  });
};
module.exports = {
  query
};
