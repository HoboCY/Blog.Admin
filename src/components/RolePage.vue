<template>
  <el-container>
    <el-table :data="roles" style="width: 100%;" border>
      <el-table-column type="index" min-width="5"></el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名"
        min-width="15"
        show-overflow-tooltip
      ></el-table-column>
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
          >
            修改
          </el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-setting"
            @click="showDialog(scope.row)"
          >
            接口权限
          </el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-setting"
            @click="showMenusDialog(scope.row)"
          >
            菜单权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="分配接口权限"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
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
          v-model="checkedPermissions"
          @change="handleCheckedPermissionsChange"
        >
          <el-checkbox
            v-for="permission in permissions"
            :label="permission"
            :key="permission"
          >
            {{ permission }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePermissions">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="分配菜单权限"
      :visible.sync="dialogTreeVisible"
      width="30%"
    >
      <el-tree
        :data="menus"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-expanded-keys="defaultExpandedKeys"
        :default-checked-keys="defaultCheckedKeys"
        ref="menuTree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTreeVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRoleMenus">
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
      roles: [],
      dialogFormVisible: false,
      dialogTreeVisible: false,
      isIndeterminate: true,
      checkAll: false,
      checkedPermissions: [],
      permissions: null,
      roleId: null,
      menus: [],
      defaultProps: {
        children: "children",
        label: "text"
      },
      defaultExpandedKeys: [],
      defaultCheckedKeys: []
    };
  },
  mounted() {
    this.getRoles();
  },
  methods: {
    edit(row) {
      this.$prompt("请输入角色名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.updateRole(row.id, value);
        })
        .catch((err) => {
          this.$message.warning("取消修改");
        });
    },
    updateRole(id, role) {
      this.$axios
        .put(`roles/${id}`, { Role: role })
        .then((res) => {
          this.$message.success("修改成功");
          this.getRoles();
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
          this.roles = res.data;
        })
        .catch((err) => {
          this.$message.error(res.response.data);
        });
    },
    showDialog(row) {
      let id = row.id;
      this.roleId = id;
      this.getAllPermissions();
      this.getRolePermissions(id);
      this.dialogFormVisible = true;
    },
    getAllPermissions() {
      this.$axios
        .get("roles/permissions")
        .then((res) => {
          this.permissions = res.data;
        })
        .catch((err) => {
          this.$message.error(err.response.data);
        });
    },
    getRolePermissions(id) {
      this.$axios
        .get(`roles/${id}/permissions`)
        .then((res) => {
          this.checkedPermissions = res.data;
        })
        .catch((err) => {
          this.$message.error(err.response.data);
        });
    },
    updatePermissions() {
      this.dialogFormVisible = false;
      this.$axios
        .post(`roles/${this.roleId}/permissions`, {
          Permissions: this.checkedPermissions
        })
        .then((res) => {
          this.$message.success("权限更新成功");
        })
        .catch((err) => {
          this.$message.error(err.response.data);
        });
    },
    handleCheckedPermissionsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount == this.permissions.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.permissions.length;
    },
    handleCheckAllChange(val) {
      this.checkedPermissions = val ? this.permissions : [];
      this.isIndeterminate = false;
    },
    getAllMenus() {
      this.$axios
        .get("menus")
        .then((res) => {
          this.menus = res.data;
          this.defaultExpandedKeys = this.menus.map((r) => {
            return r.id;
          });
        })
        .catch((err) => {
          this.$message.error(err.response.data);
        });
    },
    getRoleMenus(id) {
      this.$axios
        .get(`roles/${id}/menus`)
        .then((res) => {
          let userMenus = res.data;
          this.defaultCheckedKeys = userMenus.map((r) => {
            return r.id;
          });
        })
        .catch((err) => {});
    },
    showMenusDialog(row) {
      this.roleId = row.id;
      this.getAllMenus();
      this.getRoleMenus(this.roleId);
      this.dialogTreeVisible = true;
    },
    updateRoleMenus() {
      let checkedKeys = this.$refs.menuTree.getCheckedKeys();
      let halfCheckedKeys = this.$refs.menuTree.getHalfCheckedKeys();
      let allCheckedKeys = halfCheckedKeys.concat(checkedKeys);

      if (allCheckedKeys.length < 1) {
        this.$message.warning("选项不可为空");
        return;
      }
      this.$axios
        .post(`roles/${this.roleId}/menus`, {
          MenuIds: allCheckedKeys
        })
        .then((res) => {
          this.$message.success("修改成功");
          this.dialogTreeVisible = false;
        })
        .catch((err) => {
          this.$message.error(err.response.data);
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

.el-checkbox {
  display: block;
  zoom: 150%;
}

.el-tree {
  zoom: 150%;
}
</style>
