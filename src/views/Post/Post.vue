<template>
  <el-container>
    <div id="vditor"></div>
  </el-container>
</template>

<script>
import Vditor from "vditor";

export default {
  data() {
    return {
      contentVditor: ""
    };
  },
  mounted() {
    this.contentVditor = new Vditor("vditor", {
      height: 360,
      mode: "ir",
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      after: () => {
        this.contentVditor.setValue("hello world");
      }
    });
  }
};
</script>

<style scoped></style>
