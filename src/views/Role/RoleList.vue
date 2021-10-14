<template>
  <div>
    <el-button
      type="success"
      size="medium"
      @click="addRole"
      icon="el-icon-plus"
    >
      新增
    </el-button>
    <RolePage ref="rolePage"></RolePage>
  </div>
</template>

<script>
import RolePage from "../../components/RolePage.vue";

export default {
  components: {
    RolePage
  },
  methods: {
    addRole() {
      this.$prompt("请输入角色名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.$axios
            .post("roles", { Role: value })
            .then((res) => {
              console.log(res);
              this.$message.success("添加成功");
              this.$refs.rolePage.getRoles();
            })
            .catch((err) => {
              this.$message.error(err.response.data);
            });
        })
        .catch((err) => {
          this.$message.warning("取消修改");
        });
    }
  }
};
</script>

<style scoped>
.el-button {
  margin-bottom: 10px;
}
</style>
