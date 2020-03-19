const express = require("express");
const Router = express.Router();
const connection = require("../../mysql");
//生成token的方法
const generateToken = data => {
  let created = Math.floor(Date.now() / 1000);
  let cert = fs.readFileSync(path.join(__dirname, "../config/pri.pem")); //私钥
  let token = jwt.sign(
    {
      data,
      exp: created + 3600 * 24
    },
    cert,
    { algorithm: "RS256" }
  );
  return token;
};
Router.use((req, res, next) => {
  next();
});
Router.post("/", (req, res) => {
  //   console.log(req.query, req.params, req.body);
  const body = req.body;

  if (!body.name) {
    res.send({
      code: 0,
      message: "请输入昵称"
    });
    return;
  } else if (!body.pass) {
    res.send({
      code: 0,
      message: "请输入密码"
    });
    return;
  }

  var modSql = "UPDATE user SET token = ? WHERE name = ?";
  connection
    .query(modSql, [
      body.name,
      body.description,
      body.subtitle,
      body.introduction,
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
