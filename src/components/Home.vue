<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        default-active="/post"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#003333"
        text-color="#fff"
        active-text-color="#ffcc00"
        :router="true"
      >
        <el-submenu index="/post">
          <template slot="title">博客管理</template>
          <el-menu-item index="/postlist">
            <i class="el-icon-tickets"></i>
            <span slot="title">我的博客</span>
          </el-menu-item>
          <el-menu-item index="/post">
            <i class="el-icon-tickets"></i>
            <span slot="title">新增博客</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item id="el-menu-item" index="category">
          <i class="el-icon-menu"></i>
          <span slot="title">分类管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header"></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  }
};
</script>

<style scoped>
.el-header {
  background-color: #f7f7f7;
  opacity: 0.5;
}

#el-menu-item:hover {
  background-color: #009999 !important;
}

.el-menu {
  border-right-width: 0;
}
</style>
