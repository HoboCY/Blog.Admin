<template>
  <el-container>
    <el-header class="header">Header</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#19692c"
          text-color="#fff"
          active-text-color="#111111"
          :router="true"
        >
          <el-menu-item index="/post">
            <i class="el-icon-tickets"></i>
            <span slot="title">博客管理</span>
          </el-menu-item>
          <el-menu-item index="category">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
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
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
  },
};
</script>

<style scoped></style>
