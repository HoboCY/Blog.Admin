<template>
  <el-row>
    <el-col v-for="item in list" :key="item.id" :span="span">
      <el-card style="margin:5px;">
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <h2>{{ item.name }}</h2>
            <time class="time">{{ item.id }}</time>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
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
      ],
    };
  },
  computed: {
    span: function() {
      return 24 / this.list.length;
    },
  },
};
</script>
