<template>
  <el-row class="block-col-2">
    <el-col :span="3">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
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
    }
  }
};
</script>

<style scoped>
.el-dropdown {
  color: #000;
}
</style>
