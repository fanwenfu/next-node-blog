const express = require("express");
const Router = express.Router();
const connection = require("../../mysql");
Router.use((req, res, next) => {
  next();
});
Router.get("/", (req, res) => {
  // connection.connect();
  if (req.query.id) {
    var sql = "SELECT * FROM user WHERE id = " + req.query.id;
    connection.query(sql)
      .then(result => {
        res.send({
          code: 200,
          result: result[0]
        });
      })
      .catch(err => {
        res.send({
          code: err.errno,
          message: err.message
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
