<template>
  <el-container>
    <el-main>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      <div id="vditor"></div>
      <el-button type="success" @click="addPost">保存</el-button>
    </el-main>
    <el-aside>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>分类</span>
        </div>
        <el-checkbox-group :min="1" v-model="categoryIds">
          <el-checkbox
            size="small"
            v-for="item in categories"
            :key="item.id"
            class="text item"
            :label="item.id"
            :checked="item.checked"
          >
            {{ item.categoryName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-card>
    </el-aside>
  </el-container>
</template>

<script>
import Vditor from "vditor";

export default {
  data() {
    return {
      contentVditor: "",
      categories: null,
      categoryIds: [],
      title: ""
    };
  },
  mounted() {
    this.getCategories();
    this.configureEditor();
  },
  methods: {
    getCategories() {
      this.$axios
        .get("categories")
        .then(res => {
          this.categories = res.data;
        })
        .catch(err => {
          this.$message.error(err.response.data);
        });
    },
    configureEditor() {
      this.contentVditor = new Vditor("vditor", {
        mode: "ir",
        toolbarConfig: {
          pin: true
        },
        cache: {
          enable: false
        },
        after: () => {},
        counter: {
          enable: true,
          max: 12000,
          type: "markdown"
        },
        preview: {
          hljs: {
            lineNumber: true,
            style: "vs"
          }
        }
      });
      return;
    },
    addPost() {
      var content = this.contentVditor.getHTML();
      if (this.title <= 0) {
        this.$message.error("请输入标题");
        return;
      }
      if (content.length <= 0) {
        this.$message.error("请输入内容");
        return;
      }
      this.$axios
        .post("posts", {
          UserId: "11ec11e4-f8d3-6838-ada7-f4390946988c",
          Title: this.title,
          CategoryIds: this.categoryIds,
          Content: content
        })
        .then(res => {
          console.log(res);
          this.$message.success("保存成功");
        })
        .catch(err => {
          console.log(err.response.data);
          this.$message.error("保存失败");
        });
    }
  }
};
</script>

<style scoped>
#vditor {
  height: 90%;
}

.el-main,
.el-aside {
  padding-top: 30px;
}

.el-main::-webkit-scrollbar {
  display: none;
}

.el-checkbox {
  display: block;
  zoom: 150%;
}

.el-button {
  margin-top: 10px;
  width: 120px;
}

.el-input {
  margin-bottom: 10px;
}
</style>
