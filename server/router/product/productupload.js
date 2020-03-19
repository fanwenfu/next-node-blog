const express = require("express");
const Router = express.Router();
const connection = require("../../mysql");
Router.use((req, res, next) => {
  next();
});
Router.post("/", (req, res) => {
  if (!req.query.name) {
    res.send({
      code: 0,
      message: "请输入商品名称"
    });
    return;
  } else if (!req.query.image_url) {
    res.send({
      code: 0,
      message: "请输入封面图"
    });
    return;
  } else if (!req.query.price) {
    res.send({
      code: 0,
      message: "请输入价格"
    });
    return;
  } else if (!req.query.stock) {
    res.send({
      code: 0,
      message: "请输入库存"
    });
    return;
  }
  console.log(req.query);
  const addSql =
    "INSERT INTO products(id,name,image_url,price,stock,sale_quantity) VALUES(0,?,?,?,?,0)";
  connection.query(
    addSql,
    [req.query.name, req.query.image_url, req.query.price, req.query.stock],
    function(err, result) {
      connection.end();
      if (err) {
        console.log("[INSERT ERROR] - ", err.message);
        res.send({
          code: err.errno,
          message: err.message
        });
        return;
      } else {
        res.send({
          code: 200,
          result: null,
          message: "添加成功"
        });
      }
    }
  );
});
module.exports = Router;
