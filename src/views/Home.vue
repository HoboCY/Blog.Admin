<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#003333"
        text-color="#fff"
        active-text-color="#ffcc00"
        :router="true"
      >
        <el-submenu v-for="menu in menus" :index="menu.url" :key="menu.id">
          <template slot="title">{{ menu.text }}</template>
          <el-menu-item
            v-for="child in menu.children"
            :key="child.id"
            :index="child.url"
          >
            <span slot="title">{{ child.text }}</span>
          </el-menu-item>
        </el-submenu>
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
      isCollapse: true,
      menus: []
    };
  },
  mounted() {
    this.getUserMenus();
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    getUserMenus() {
      this.$axios
        .get("users/menus")
        .then((res) => {
          this.menus = res.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
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
