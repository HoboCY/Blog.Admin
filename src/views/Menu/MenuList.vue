<template>
  <div class="tree-container">
    <el-button
      @click="showAppendDialog(null)"
      type="success"
      size="medium"
      icon="el-icon-plus"
    >
      新增
    </el-button>
    <el-tree
      :data="menus"
      :props="defaultProps"
      check-on-click-node
      node-key="id"
      accordion
      ref="tree"
      highlight-current
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-plus"
            @click="() => showAppendDialog(data)"
          ></el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-minus"
            @click="() => remove(node, data)"
          ></el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog title="新增菜单" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="appendMenuForm" ref="appendMenuForm">
        <el-form-item label="菜单名称" prop="text">
          <el-input v-model="appendMenuForm.text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="菜单链接" prop="url">
          <el-input v-model="appendMenuForm.url" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="appendMenu">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
      defaultProps: {
        children: "children",
        label: "text"
      },
      dialogFormVisible: false,
      appendMenuForm: {
        text: "",
        url: "",
        parentId: null,
        level: null
      },
      currentNode: null
    };
  },
  methods: {
    getMenus() {
      this.$axios
        .get("menus")
        .then((res) => {
          this.menus = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showAppendDialog(data) {
      this.currentNode = data;
      this.dialogFormVisible = true;
    },
    appendMenu() {
      console.log(this.currentNode);
      if (this.currentNode === null) {
        this.appendMenuForm.parentId = null;
        this.appendMenuForm.level = 1;
      } else {
        this.appendMenuForm.parentId = this.currentNode.id;
        this.appendMenuForm.level = this.currentNode.level + 1;
      }

      this.$axios
        .post("menus", this.appendMenuForm)
        .then((res) => {
          this.$message.success("添加成功");
          this.dialogFormVisible = false;
          this.$refs.tree.append(res.data, this.currentNode);
          this.$refs.appendMenuForm.resetFields();
          this.currentNode = null;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getMenus();
  }
};
</script>

<style scoped>
.tree-container {
  width: 20%;
}

.el-tree {
  margin-top: 15px;
  zoom: 150%;
  text-align: center;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  text-align: center;
}

.custom-tree-node .el-button {
  color: #333;
}

.custom-tree-node .el-button:hover {
  opacity: 0.5;
}
</style>
