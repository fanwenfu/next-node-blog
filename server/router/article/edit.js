const express = require("express");
const Router = express.Router();
const connection = require("../../mysql");
Router.use((req, res, next) => {
  next();
});
Router.post("/", (req, res) => {
  //   console.log(req.query, req.params, req.body);
  const body = req.body;
  if (!body.title) {
    res.send({
      code: 0,
      message: "请输入标题"
    });
    return;
  } else if (!body.html && body.content) {
    res.send({
      code: 0,
      message: "请输入文章内容"
    });
    return;
  }
  const date = new Date(); //获取一个时间对象
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D = date.getDate() + " ";
  let modSqldata = [
    body.title,
    body.html,
    body.content,
    body.description,
    Y + M + D,
    Date.now(),
    body.author
  ];
  var modSql =
    "INSERT INTO articlelist(Id,title,html,content,description,date,timestamp,author) VALUES (0,?,?,?,?,?,?,?)";
  if (body.id) {
    modSql =
      "UPDATE articlelist SET title = ?,html = ?,content = ?,description = ?,date = ?,timestamp = ? author=? WHERE Id = ?";
    modSqldata.push(body.id);
  }

  connection
    .query(modSql, modSqldata)
    .then(result => {
      // id = result.insertId;
      console.log(result);
      res.send({
        code: 200,
        result:null
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
