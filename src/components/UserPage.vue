<template>
  <el-container>
    <el-table :data="users" style="width: 100%;" border>
      <el-table-column type="index" min-width="5"></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        min-width="15"
        show-overflow-tooltip
      ></el-table-column>
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
      <el-table-column label="操作" min-width="15">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-setting"
            @click="showDialog(scope.row)"
          >
            分配角色
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
    <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
      <el-form>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group
          v-model="checkedRoleIds"
          @change="handleCheckedRolesChange"
        >
          <el-checkbox v-for="item in roles" :label="item.id" :key="item.id">
            {{ item.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserRoles">
          确 定
        </el-button>
      </div>
    </el-dialog>
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
      total: 0,
      dialogFormVisible: false,
      isIndeterminate: true,
      checkAll: false,
      checkedRoleIds: [],
      roles: [],
      userId: null
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
        .then((res) => {
          this.$message.success("修改成功");
          this.getUsers();
        })
        .catch((err) => {
          this.getUsers();
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
        .then((res) => {
          this.total = res.data.total;
          this.users = res.data.items;
        });
    },
    showDialog(row) {
      let id = row.id;
      this.userId = id;
      this.getAllRoles();
      this.getUserRoles(id);
      this.dialogFormVisible = true;
    },
    getAllRoles() {
      this.$axios.get("roles").then((res) => {
        this.roles = res.data;
      });
    },
    getUserRoles(id) {
      this.$axios.get(`users/${id}/roles`).then((res) => {
        this.checkedRoleIds = res.data;
      });
    },
    updateUserRoles() {
      this.dialogFormVisible = false;
      this.$axios
        .post(`users/${this.userId}/roles`, {
          RoleIds: this.checkedRoleIds
        })
        .then((res) => {
          this.$message.success("用户角色更新成功");
        });
    },
    handleCheckedRolesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount == this.roles.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.roles.length;
    },
    handleCheckAllChange(val) {
      this.checkedRoleIds = val
        ? this.roles.map((r) => {
            return r.id;
          })
        : [];
      this.isIndeterminate = false;
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

.el-checkbox {
  display: block;
  zoom: 150%;
}
</style>
