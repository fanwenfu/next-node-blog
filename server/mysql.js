var mysql = require("mysql");
//使用连接池
var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "***",//数据库密码
  database: "mysql",
  multipleStatements:true
});
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "dd168899",
//   database: "Mysql"
// });
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
