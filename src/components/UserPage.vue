<template>
  <el-container>
    <el-table :data="users" style="width: 100%;" border>
      <el-table-column type="index" min-width="5"></el-table-column>
      <el-table-column prop="username" label="用户名" min-width="15" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="email"
        show-overflow-tooltip
        label="邮箱"
        min-width="30"
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
      <el-table-column label="是否禁用" min-width="15">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.emailConfirmed"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="confirmChange(scope.row)"
          ></el-switch>
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
    >
    </el-pagination>
  </el-container>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      users: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getUsers();
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.getUsers();
    },
    confirmChange(row) {
      this.$axios
        .put(`users/${row.id}?confirmed=${row.emailConfirmed}`)
        .then(res => {
          this.$message.success("修改成功");
          this.getUsers();
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
    getUsers() {
      this.$axios
        .get("users", {
          params: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          this.total = res.data.total;
          this.users = res.data.items;
        })
        .catch(err => {
          this.$message.error(res.response.data);
        });
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
