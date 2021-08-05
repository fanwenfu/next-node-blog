<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input
          type="text"
          v-model="ruleForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Form, FormItem, Input, Button, Message } from "element-ui";
import Cookies from "js-cookie";
export default {
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Button.name]: Button,
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入用户名"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        name: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        name: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (
          valid &&
          this.ruleForm.name == "" &&
          this.ruleForm.pass == ""
        ) {
          const leftTamp = 30 * 24 * 60 * 60 * 1000;
          Cookies.set("token", "1586491815070625eaf7cec5cedb58c30c4ce83737", {
            expires: new Date(new Date().getTime() + leftTamp),
            path: "/",
          });
          Message({
            message: "恭喜你，登录成功",
            type: "success",
          });
          this.$router.push(this.$route.query.redirect || "/")
        } else {
          console.log("error submit!!");
          Message({
            message: "登录失败，账户或用户名错误",
            type: "error",
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 300px;
}
</style>
