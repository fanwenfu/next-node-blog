const express = require("express");
const Router = express.Router();
const connection = require("../../mysql");
Router.use((req, res, next) => {
  next();
});
Router.get("/", function(req, res) {
  if (req.query.id) {
    var sql = "SELECT * FROM products WHERE id = " + req.query.id;
    connection.query(sql, function(err, result) {
      if (err) {
        console.log("mysql错误 - ", err);
        res.send({
          code: err.errno,
          message: err.message
        });
        return;
      }
      res.send({
        code: 200,
        result
      });
    });
  } else {
    res.send({
      code: 0,
      message: "参数错误"
    });
  }
});
module.exports = Router;
