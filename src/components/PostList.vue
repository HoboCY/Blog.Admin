<template>
  <el-table :data="posts" stripe style="width: 100%">
    <el-table-column prop="id" label="日期" width="180"> </el-table-column>
    <el-table-column prop="title" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="creationTime" label="地址"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["posts"]
};
</script>
