<template>
  <el-container>
    <el-table :data="posts" style="width: 100%;" border>
      <el-table-column type="index" min-width="5"></el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        min-width="15"
        show-overflow-tooltip
      ></el-table-column>
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
            type="primary"
            icon="el-icon-edit"
            @click="edit(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-else
            size="mini"
            type="primary"
            icon="el-icon-refresh-left"
            @click="restore(scope.row)"
          >
            恢复
          </el-button>
          <el-button
            v-if="isDeleted === 'false'"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="recycle(scope.row)"
          >
            回收
          </el-button>
          <el-button
            v-else
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="remove(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="total"
      layout="sizes, prev, pager, next"
    ></el-pagination>
  </el-container>
</template>

<script>
import moment from "moment";
export default {
  props: ["isDeleted"],
  data() {
    return {
      posts: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0
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
    edit(row) {
      this.$router.push({ name: "EditPost", params: { id: row.id } });
    },
    recyclePost(id) {
      this.$axios.put(`posts/recycle/${id}`).then((res) => {
        this.$message.success("操作成功");
        this.getOwnPosts();
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
      this.$axios.put(`posts/restore/${id}`).then((res) => {
        this.$message.success("恢复成功");
        this.getOwnPosts();
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
      this.$axios.delete(`posts/${id}`).then((res) => {
        this.$message.success("删除成功");
        this.getOwnPosts();
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
        .get("posts", {
          params: {
            isDeleted: this.isDeleted,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
        })
        .then((res) => {
          this.total = res.data.total;
          this.posts = res.data.items;
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getOwnPosts();
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getOwnPosts();
    }
  }
};
</script>

<style scoped>
.el-container {
  flex-direction: column;
}

.el-pagination {
  margin-top: 20px;
}
</style>
