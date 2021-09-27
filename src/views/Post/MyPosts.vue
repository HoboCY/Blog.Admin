<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="false" name="first">已发布</el-tab-pane>
    <el-tab-pane label="true" name="second">回收站</el-tab-pane>
    <PostList :posts="posts"></PostList>
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
      activeName: "second",
      isDeleted: 0,
      posts: []
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab.label);
      this.isDeleted = tab.label;
      this.$axios.get(`posts?isDeleted=${this.isDeleted}`).then(res => {
        console.log(res.data);
        this.posts = res.data;
      });
    }
  }
};
</script>
