<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="已发布" name="false"></el-tab-pane>
    <el-tab-pane label="回收站" name="true"></el-tab-pane>
    <PostList :isDeleted="activeName"></PostList>
  </el-tabs>
</template>
<script>
import PostList from "../../components/PostList.vue";

export default {
  components: {
    PostList
  },
  data() {
    return {
      activeName: "false"
    };
  },
  methods: {
    handleClick(tab) {}
  }
};
</script>
