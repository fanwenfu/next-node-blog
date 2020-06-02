/*
 * @Author: 范文富
 * @Date: 2020-04-08 14:30:06
 * @LastEditTime: 2020-06-02 10:44:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /next-antd-node-blog/server/router/user/edituser.js
 */ 
const express = require("express");
const Router = express.Router();
const connection = require("../../mysql");
Router.use((req, res, next) => {
  next();
});
Router.post("/", (req, res) => {
  //   console.log(req.query, req.params, req.body);
  const body = req.body;
  if (!body.id) {
    res.send({
      code: 0,
      message: "请输入用户id"
    });
    return;
  }
  if (!body.name) {
    res.send({
      code: 0,
      message: "请输入昵称"
    });
    return;
  } else if (!body.description) {
    res.send({
      code: 0,
      message: "请输入描述"
    });
    return;
  } else if (!body.introduction) {
    res.send({
      code: 0,
      message: "请输入介绍"
    });
    return;
  } else if (!body.subtitle) {
    res.send({
      code: 0,
      message: "请输入格言"
    });
    return;
  } else if (!body.datebirth) {
    res.send({
      code: 0,
      message: "请输入生日"
    });
    return;
  }

  var modSql =
    "UPDATE user SET name = ?,description = ?,introduction = ?,subtitle = ?,datebirth = ? WHERE Id = ?";
  connection
    .query(modSql, [
      body.name,
      body.description,
      body.introduction,
      body.subtitle,
      body.datebirth,
      body.id
    ])
    .then(result => {
      console.log(result);
      res.send({
        code: 200
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
