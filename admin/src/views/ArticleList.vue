<template>
  <div class="article-list">
    <el-button class="article-add" @click="handleAddClick" type="primary"
      >新增文章</el-button
    >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="100">
      </el-table-column>
      <el-table-column prop="author" label="作者" width="100">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="300"> </el-table-column>
      <el-table-column prop="description" label="内容"> </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button
            @click="handleEditClick(scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button @click="handleDelClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import https from "../http";
import { Table, TableColumn, Button } from "element-ui";
export default {
  name: "ArticleList",
  components: {
    elTable: Table,
    elTableColumn: TableColumn,
    elButton: Button
  },
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    handleAddClick() {
      this.$router.push({
        path: "/article/add"
      });
    },
    handleClick(row) {
      console.log(row);
    },
    handleEditClick(row) {
      console.log(row);
      this.$router.push({
        path: "/article/" + row.id
      });
    },
    handleDelClick(row) {
      console.log(row);
      https
        .fetchPost("/article/delete", {
          ids: `[${row.id}]`
        })
        .then(res => {
          console.log(res.data);
          //   this.productList = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
      console.log(row);
    },
    getProductList() {
      https
        .fetchGet("/article/list")
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.result;
          //   this.productList = res.data.result;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less">
.article-list {
  text-align: left;
  .article-add {
    margin-bottom: 20px;
  }
}
</style>
