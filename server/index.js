var express = require("express"); //引入express模块
var app = express();

var http = require("http");
const cors = require("cors");
const connection = require("./mysql");
app.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    alloweHeaders: [
      "Conten-Type",
      "Content-Length",
      "Accept",
      "X-Requested-With",
      "Authorization",
    ],
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true, // 是否带cookie
  })
);
//引入  bodyParser 方法
const bodyParser = require("body-parser");
//post 参数解析
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());


//使用路由
app.use("/login", require("./router/login/login"));
app.use("/user", require("./router/user/user"));
app.use("/edituser", require("./router/user/edituser"));
app.use("/article/list", require("./router/article/list"));
app.use("/article/edit", require("./router/article/edit"));
app.use("/article/delete", require("./router/article/delete"));
app.use("/product", require("./router/product/product"));
app.use("/product/list", require("./router/product/productlist"));
app.use("/product/upload", require("./router/product/productupload"));


//定义方法
app.get("/list", function(req, res) {
  var sql = "SELECT * FROM websites WHERE id = " + req.query.id;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log("[SELECT ERROR] - ", err.message);
      res.send({
        code: 200,
        message: err.message
      });
      return;
    }
    res.send({
      code: 200,
      result
    });
  });
  // console.log(req.query);
  //   res.send("哈哈哈");
  //   var modSql = "UPDATE websites SET name = ?,url = ? WHERE Id = ?";
  //   var modSqlParams = ["菜鸟移动站", "https://m.runoob.com", 1];
  // connection.query(modSql, modSqlParams, function(err, result) {
  //   if (err) {
  //     console.log("[UPDATE ERROR] - ", err.message);
  //     return;
  //   }
  //   res.send({
  //       code:200,
  //       res
  //   });

  // });
});
app.post("/changelist", (req, res) => {
  //   console.log(req.body);
  var modSql = "UPDATE websites SET name = ?,url = ? WHERE Id = ?";
  connection.query(
    modSql,
    [req.query.name, req.query.url, req.query.id],
    (err, result) => {
      if (err) {
        res.send({
          code: err.code,
          message: err.message
        });
        return;
      }
      res.send({
        code: 200,
        result,
        message: "修改成功"
      });
    }
  );
  //   res.send("HellowWorld fan");
});
//定义端口，此处所用为3000端口，可自行更改
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://localhost", host, port);
});
