<template>
  <el-container>
    <el-table :data="roles" style="width: 100%;" border>
      <el-table-column type="index" min-width="5"></el-table-column>
      <el-table-column
        prop="RoleName"
        label="角色名"
        min-width="15"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="creationTime"
        label="创建时间"
        min-width="10"
        :formatter="formatterTime"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" min-width="15">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="edit(scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      roles: [],
    };
  },
  mounted() {
    this.getRoles();
  },
  methods: {
    edit(row) {
      console.log(row);
    },
    remove(row) {
      console.log(row);
    },
    confirmChange(row) {
      this.$axios
        .put(`users/${row.id}?confirmed=${row.emailConfirmed}`)
        .then((res) => {
          this.$message.success("修改成功");
          this.getUsers();
        })
        .catch((err) => {
          this.$message.error(err.response.data);
        });
    },
    formatterTime: function(row, column, cellValue) {
      if (cellValue != null) {
        return moment(cellValue).format("YYYY-MM-DD HH:mm");
      }
    },
    getRoles() {
      this.$axios
        .get("roles")
        .then((res) => {
          this.roles = res.data.items;
        })
        .catch((err) => {
          this.$message.error(res.response.data);
        });
    },
  },
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
