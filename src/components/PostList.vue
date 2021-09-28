<template>
  <el-table :data="posts" style="width: 100%" border>
    <el-table-column type="index" min-width="5"></el-table-column>
    <el-table-column prop="title" label="标题" min-width="15" show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="contentAbstract"
      show-overflow-tooltip
      label="摘要"
      min-width="30"
    ></el-table-column>
    <el-table-column
      prop="categoryNames"
      label="分类"
      min-width="15"
      :formatter="formatterCategory"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      prop="creationTime"
      label="创建时间"
      min-width="10"
      :formatter="formatterTime"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column
      prop="lastModifyTime"
      label="最后修改时间"
      min-width="10"
      :formatter="formatterTime"
      show-overflow-tooltip
    ></el-table-column>
    <el-table-column label="操作" min-width="15">
      <template slot-scope="scope">
        <el-button
          v-if="isDeleted === 'false'"
          size="mini"
          type="warning"
          @click="edit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button v-else size="mini" type="warning" @click="restore(scope.row)">恢复</el-button>
        <el-button
          v-if="isDeleted === 'false'"
          size="mini"
          type="danger"
          @click="recycle(scope.row)"
          >回收</el-button
        >
        <el-button v-else size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from "moment";
export default {
  props: ["isDeleted"],
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.getOwnPosts();
  },
  watch: {
    isDeleted(newValue) {
      this.getOwnPosts();
    }
  },
  methods: {
    edit(index, row) {
      console.log(index);
      console.log(row);
    },
    recyclePost(id) {
      this.$axios
        .put(`posts/recycle/${id}`)
        .then(res => {
          this.$message.success("操作成功");
          this.getOwnPosts();
        })
        .catch(err => {
          this.$message.error(err.response.data);
        });
    },
    recycle(row) {
      this.confirm(
        "确定要回收吗？",
        () => {
          this.recyclePost(row.id);
        },
        () => {
          this.$message.warning("取消操作");
        }
      );
    },
    restore(row) {
      this.confirm(
        "确定要恢复吗？",
        () => {
          this.restorePost(row.id);
        },
        () => {
          this.$message.warning("取消操作");
        }
      );
    },
    restorePost(id) {
      this.$axios
        .put(`posts/restore/${id}`)
        .then(res => {
          this.$message.success("恢复成功");
          this.getOwnPosts();
        })
        .catch(err => {
          this.$message.error(err.response.data);
        });
    },
    remove(row) {
      this.confirm(
        "删除后无法恢复，确定要彻底删除吗？",
        () => {
          this.deletePost(row.id);
        },
        () => {
          this.$message.warning("取消操作");
        }
      );
    },
    deletePost(id) {
      this.$axios
        .delete(`posts/${id}`)
        .then(res => {
          this.$message.success("删除成功");
          this.getOwnPosts();
        })
        .catch(err => {
          this.$message.error(err.response.data);
        });
    },
    formatterTime: function(row, column, cellValue) {
      if (cellValue != null) {
        return moment(cellValue).format("YYYY-MM-DD HH:mm");
      }
    },
    formatterCategory: function(row, column, cellValue) {
      if (cellValue != null) {
        return JSON.stringify(cellValue).replace(/[\[\]"]+/g, "");
      }
    },
    confirm(info, success, error) {
      this.$confirm(info, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          success();
        })
        .catch(() => {
          error();
        });
    },
    getOwnPosts() {
      this.$axios
        .get(`posts?isdeleted=${this.isDeleted}`)
        .then(res => {
          this.posts = res.data;
        })
        .catch(err => {
          this.$message.error(err.response.data);
        });
    }
  }
};
</script>

<style scoped></style>
