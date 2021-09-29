<template>
  <div>
    <el-button type="success" size="medium" @click="addPost">新增</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已发布" name="false"></el-tab-pane>
      <el-tab-pane label="回收站" name="true"></el-tab-pane>
      <PostPage :isDeleted="activeName"></PostPage>
    </el-tabs>
  </div>
</template>
<script>
import PostPage from "../../components/PostPage.vue";

export default {
  components: {
    PostPage
  },
  data() {
    return {
      activeName: "false"
    };
  },
  methods: {
    handleClick(tab) {},
    addPost() {
      this.$router.push({ name: "EditPost" });
    }
  }
};
</script>
