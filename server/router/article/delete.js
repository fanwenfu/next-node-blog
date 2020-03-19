const express = require("express");
const Router = express.Router();
const mysql = require("mysql");
const connection = require("../../mysql");
Router.use((req, res, next) => {
  next();
});
Router.post("/", (req, res) => {
  //   console.log(req.query, req.params, req.body);
  const body = req.body;
  console.log(body);
  const ids = JSON.parse(body.ids);
  if (!ids) {
    res.send({
      code: 0,
      message: "未选中"
    });
    return;
  }
  console.log(ids.toString(),"自渎");
  let delSql = `DELETE FROM articlelist WHERE id in (${ids.toString()});`;
  connection
    .query(delSql)
    .then(result => {
      console.log(result);
      res.send({
        code: 200,
        result: null
      });
    })
    .catch(err => {
      res.send({
        code: 0,
        message: err.message
      });
    });
});
module.exports = Router;
