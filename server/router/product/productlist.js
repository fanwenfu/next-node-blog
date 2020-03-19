const express = require("express");
const Router = express.Router();
const connection = require("../../mysql");
Router.use((req, res, next) => {
  next();
});
Router.get("/", function(req, res) {

    var sql = "SELECT * FROM products";
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
});
module.exports = Router;
