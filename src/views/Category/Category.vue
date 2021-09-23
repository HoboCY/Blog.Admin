<template>
  <div>
    <el-row>
      <el-button type="success" class="button" @click="addCategory">新增</el-button>
    </el-row>
    <el-row type="flex" align="top">
      <el-card v-for="category in categories" :key="category.id" class="box-card">
        <div class="text item">{{ category.categoryName }}</div>
        <div class="btn-group">
          <el-button type="text" class="button" @click="updateInput(category.id)">修改</el-button>
          <el-button type="text" class="button" @click="deleteConfirm(category.id)">删除</el-button>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: null
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.$axios.get("categories").then(res => {
        this.categories = res.data;
      });
    },
    deleteCategory(id) {
      this.$axios
        .delete(`categories/${id}`)
        .then(res => {
          this.$message.success("删除成功");
          this.getCategories();
        })
        .catch(err => {
          this.$message.error(err.response.data);
        });
    },
    updateCategory(id, name) {
      console.log(id + name);
      this.$axios
        .put(`categories/${id}`, { CategoryName: name })
        .then(res => {
          this.$message.success("修改成功");
          this.getCategories();
        })
        .catch(err => {
          this.$message.error(err.response.data);
        });
    },
    updateInput(id) {
      this.$prompt("请输入分类名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.updateCategory(id, value);
        })
        .catch(err => {
          this.$message.warning("取消修改");
        });
    },
    deleteConfirm(id) {
      this.$confirm("确定要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.deleteCategory(id);
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    addCategory() {
      this.$prompt("请输入分类名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$axios
            .post("categories", { CategoryName: value })
            .then(res => {
              this.$message.success("新增成功");
              this.getCategories();
            })
            .catch(err => {
              this.$message.error(err.response.data);
            });
        })
        .catch(err => {
          this.$message.warning("取消修改");
        });
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
  letter-spacing: 0.5px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 20px;
  min-width: 220px;
}

.el-row:nth-child(1) {
  text-align: left;
}

.el-row:nth-child(2) {
  flex-wrap: wrap;
}
</style>
