<template>
  <div class="article">
    <div class="title ">
      <span>标题：</span>
      <el-input
        v-model="title"
        placeholder="请输入标题"
        class="box-shadow"
      ></el-input>
    </div>
    <div class="title ">
      <span>描述：</span>
      <el-input
        type="textarea"
        v-model="description"
        placeholder="请输入标题"
        class="box-shadow"
        maxlength="300"
        show-word-limit
        rows="5"
      ></el-input>
    </div>
    <div class="title">
      <span>作者：</span>
      <el-input
        v-model="author"
        placeholder="请输入作者名称"
        class="box-shadow"
      ></el-input>
    </div>
    <mavon-editor
      v-model="content"
      ref="md"
      @change="change"
      @imgAdd="$imgAdd"
      style="min-height: 600px"
    />
    <el-button type="primary" @click="onConfirm" class="confirm"
      >提交</el-button
    >
  </div>
</template>

<script>
import https from "../http";
// 导入组件 及 组件样式
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { Input, Button } from "element-ui";
export default {
  components: {
    mavonEditor,
    elInput: Input,
    // elTable: Table,
    // elTableColumn: TableColumn,
    elButton: Button
  },
  data() {
    return {
      content: "", // 输入的markdown
      html: "", // 及时转的html
      title: "",
      description: "",
      author: ""
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    if (this.$route.params.id && this.$route.params.id != "add") {
      this.getProductList(this.$route.params.id);
    }
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交

    onConfirm() {
      const id = this.$route.params.id;
      let params = {
        html: this.html,
        title: this.title,
        content: this.content,
        description: this.description
      };
      if (id && id != "add") {
        Object.assign(params, {
          id
        });
      }
      if (this.author) {
        Object.assign(params, {
          author: this.author
        });
      }
      https
        .fetchPost("/article/edit", params)
        .then(res => {
          if (res.data.code == 200) {
            alert("新增成功");
            this.$router.push({
              path: "/articlelist"
            });
          } else {
            alert("新增失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getProductList(id) {
      https
        .fetchGet("/article/list", { id: id })
        .then(res => {
          const { html, title, content, description, author } = res.data.result;
          this.html = html;
          this.title = title;
          this.content = content;
          this.description = description;
          this.author = author;
          //   this.productList = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    },
    $imgAdd(pos, $file) {
      alert("暂不支持图片上传");
      console.log(pos, $file);
      // 第一步.将图片上传到服务器.
      //    var formdata = new FormData();
      //    formdata.append('image', $file);
      //    axios({
      //        url: 'server url',
      //        method: 'post',
      //        data: formdata,
      //        headers: { 'Content-Type': 'multipart/form-data' },
      //    }).then((url) => {
      //        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //        /**
      //        * $vm 指为mavonEditor实例，可以通过如下两种方式获取
      //        * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
      //        * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
      //        */
      //        $vm.$img2Url(pos, url);
      //    })
    }
  }
};
</script>
<style lang="less">
.article {
  .title {
    text-align: left;
    margin-bottom: 20px;
  }
  .confirm {
    margin: 20px 0;
  }
  .el-input,
  .el-textarea {
    width: 60%;
    max-width: 650px;
  }
}
</style>
