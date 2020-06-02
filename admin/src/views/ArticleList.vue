<template>
  <div class="article-list">
    <el-button class="article-add" @click="handleAddClick" type="primary"
      >新增文章</el-button
    >
    <el-button class="article-add" @click="showDel = !showDel" type="primary"
      >显示删除按钮</el-button
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
          <el-button
            v-if="showDel"
            @click="handleDelClick(scope)"
            type="text"
            size="small"
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
      tableData: [],
      showDel: false
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
        window.location.href = `http://www.fanlogs.cn/article/` + row.id
    },
    handleEditClick(row) {
      this.$router.push({
        path: "/article/" + row.id
      });
    },
    handleDelClick(scope) {
      const { row, $index } = scope;
      https
        .fetchPost("/article/delete", {
          ids: `[${row.id}]`
        })
        .then(() => {
          this.tableData.splice($index, 1);
        })
    },
    getProductList() {
      https
        .fetchGet("/article/list")
        .then(res => {
          this.tableData = res.data.result;
        })
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
