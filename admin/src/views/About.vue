<template>
  <div class="about">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="昵称" prop="name">
        <el-input
          type="text"
          v-model="ruleForm.name"
          autocomplete="on"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          v-model="ruleForm.description"
          autocomplete="on"
          maxlength="300"
          rows="3"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="格言" prop="subtitle">
        <el-input
          type="text"
          v-model="ruleForm.subtitle"
          autocomplete="on"
        ></el-input>
      </el-form-item>
      <el-form-item label="介绍" prop="introduction">
        <el-input
          type="text"
          v-model="ruleForm.introduction"
          autocomplete="on"
        ></el-input>
      </el-form-item>
      <el-form-item style="text-align: left;" label="出生日期" prop="datebirth">
        <el-date-picker
          v-model="ruleForm.datebirth"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import https from "../http";
import Cookies from "js-cookie";
import { Form, FormItem, Input, Button, DatePicker } from "element-ui";
export default {
  name: "Name",
  components: {
    elForm: Form,
    elFormItem: FormItem,
    elInput: Input,
    elButton: Button,
    elDatePicker: DatePicker
  },
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      }
      if (value.length > 18) {
        callback(new Error("字符不能多于10"));
      } else {
        callback();
      }
    };
    return {
      information: [],
      productList: [],
      token: "",
      dialogVisible: true,
      rules: {
        name: [{ validator: checkName, trigger: "blur" }]
        // description: [{ validator: validatePass2, trigger: "blur" }],
        // introduction: [{ validator: checkAge, trigger: "blur" }],
        // subtitle: [{ validator: checkAge, trigger: "blur" }],
        // datebirth: [{ validator: checkAge, trigger: "blur" }]
      },
      ruleForm: {
        name: "",
        description: "",
        introduction: "",
        subtitle: "",
        datebirth: "",
        id: 1
      },
      loginForm: {
        name: "",
        pass: ""
      }
    };
  },
  mounted() {
    this.token = Cookies.get("token");
    this.getList();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid, this.ruleForm);
        if (valid) {
          https
            .fetchPost("/edituser", this.ruleForm)
            .then(res => {
              console.log(res);
              //   this.list = res.data.result;
            })
            .catch(err => {
              console.log(err);
            });
          //   alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getList() {
      https
        .fetchGet("/user", { id: 1 })
        .then(res => {
          this.information = res.data.result;
          this.ruleForm.name = this.information.name;
          this.ruleForm.description = this.information.description;
          this.ruleForm.introduction = this.information.introduction;
          this.ruleForm.subtitle = this.information.subtitle;
          this.ruleForm.datebirth = this.information.datebirth;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less">
.about {
  width: 100%;
  .demo-ruleForm {
    max-width: 750px;
    margin: 0 auto;
  }
}
</style>
