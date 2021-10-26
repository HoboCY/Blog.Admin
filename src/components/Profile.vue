<template>
  <el-row type="flex" class="block-col-2" justify="end">
    <el-col :span="3" :offset="21">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      username: null
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.$axios
        .get("users/profile")
        .then((res) => {
          this.username = res.data.username;
        })
        .catch((err) => {
          this.$message.error(err.response.data);
        });
    },
    quit() {
      this.$confirm("确定要退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          localStorage.clear();
          this.$router.push({ name: "Login" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style scoped>
.el-dropdown {
  color: #000;
  margin-top: 25px;
}
</style>
