<template>
  <div class="home">
    <!-- <div @click="getProductList">获取列表</div>
    <ul>
      <li v-for="i in productList" :key="i.id">
        {{ i.id }}---{{ i.name }}---{{ i.image_url }}
      </li>
    </ul> -->
    <h3 class="breadcrumb-header">欢迎回来, 彭于晏</h3>
    <img src="@/assets/images/avatar.jpg" alt="" />
    <!-- <div v-if="!token"> -->
    <el-dialog title="请登录" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="loginForm"
        status-icon
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="name">
          <el-input
            type="text"
            v-model="loginForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="loginForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- </div> -->
  </div>
</template>

<script>
import { Form, FormItem, Input, Button, Dialog } from "element-ui";

// @ is an alias to /src
export default {
  name: "Home",
  components: {
    elForm: Form,
    elFormItem: FormItem,
    elInput: Input,
    elButton: Button,
    elDialog: Dialog
  },
  data() {
    return {
      list: [],
      dialogVisible: false,
      loginForm: {
        name: "",
        pass: ""
      }
    };
  },
  mounted() {
    //   console.log()
  },
  methods: {
    handleClose() {
      //   this.$confirm("确认关闭？")
      //     .then(()=> {
      //       done();
      //     })
      //     .catch(() => {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.home {
  .breadcrumb-header {
    font-size: 22px;
    font-weight: 300;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 24px;
  }
}
</style>
