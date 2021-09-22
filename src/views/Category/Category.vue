<template>
  <el-row type="flex" align="top">
    <el-card v-for="item in list" :key="item.id" class="box-card">
      <div class="text item">{{ item.name }}</div>
      <div class="btn-group">
        <el-button type="text" class="button">修改</el-button>
        <el-button type="text" class="button">删除</el-button>
      </div>
    </el-card>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: "ccc",
        },
        {
          id: 2,
          name: "bbb",
        },
        {
          id: 3,
          name: "aaa",
        },
        {
          id: 4,
          name: "ddd",
        },
        {
          id: 5,
          name: "eee",
        },
        {
          id: 6,
          name: "fff",
        },
        {
          id: 7,
          name: "ggg",
        },
        {
          id: 8,
          name: "ggg",
        },
        {
          id: 9,
          name: "ggg",
        },
        {
          id: 10,
          name: "ggg",
        },
        {
          id: 11,
          name: "ggg",
        },
        {
          id: 12,
          name: "ggg",
        },
        {
          id: 13,
          name: "ggg",
        },
        {
          id: 14,
          name: "ggg",
        },
        {
          id: 15,
          name: "ggg",
        },
        {
          id: 16,
          name: "ggg",
        },
        {
          id: 17,
          name: "ggg",
        },
        {
          id: 18,
          name: "ggg",
        },
        {
          id: 19,
          name: "ggg",
        },
        {
          id: 20,
          name: "ggg",
        },
        {
          id: 21,
          name: "ggg",
        },
        {
          id: 22,
          name: "ggg",
        },
        {
          id: 23,
          name: "ggg",
        },
      ],
    };
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin: 20px;
  min-width: 220px;
}

.el-row {
  flex-wrap: wrap;
}
</style>
