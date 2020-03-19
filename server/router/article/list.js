const express = require("express");
const Router = express.Router();
const connection = require("../../mysql");
Router.use((req, res, next) => {
  next();
});
Router.get("/", (req, res) => {
  // connection.connect();var sql = "SELECT * FROM articlelist " ;
  var sql = req.query.id
    ? "SELECT * FROM articlelist WHERE id = " + req.query.id
    : "SELECT * FROM articlelist ";

  connection
    .query(sql)
    .then(result => {
       result.map((item)=> {
           delete item["text"]
           return item;
       })
      res.send({
        code: 200,
        result: req.query.id ? result[0] : result
      });
    })
    .catch(err => {
      res.send({
        code: err.errno,
        message: err.message
      });
    });
});
module.exports = Router;
