<template>
  <el-container>
    <el-main>
      <el-input
        v-model="title"
        placeholder="请输入标题"
        @input="titleInput"
      ></el-input>
      <div id="vditor"></div>
      <el-button type="success" @click="addOrEditPost" :disabled="disabled">
        保存
      </el-button>
    </el-main>
    <el-aside>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>分类</span>
        </div>
        <el-checkbox-group :min="1" v-model="categoryIds" @change="change">
          <el-checkbox
            size="small"
            v-for="item in categories"
            :key="item.id"
            class="text item"
            :label="item.id"
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
      title: "",
      id: "",
      disabled: true
    };
  },
  mounted() {
    this.getCategories();
    let id = this.$route.params.id;
    if (id !== undefined) {
      this.id = id;
      this.getPost(id);
    }
    this.configureEditor();
  },
  methods: {
    getCategories() {
      this.$axios.get("categories").then((res) => {
        this.categories = res.data;
      });
    },
    configureEditor() {
      let that = this;
      this.contentVditor = new Vditor("vditor", {
        mode: "ir",
        input(value) {
          that.disabled = false;
        },
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
    addOrEditPost() {
      var content = this.contentVditor.getHTML();
      if (this.title <= 0) {
        this.$message.error("请输入标题");
        return;
      }
      if (content.length <= 0) {
        this.$message.error("请输入内容");
        return;
      }
      if (this.categoryIds.length < 1) {
        this.$message.error("请选择分类");
        return;
      }

      console.log(this.id);
      if (this.id !== undefined && this.id !== "") {
        this.editPost(content);
      } else {
        this.addPost(content);
      }
    },
    getPost(id) {
      this.$axios.get(`posts/${id}`).then((res) => {
        this.title = res.data.title;
        this.contentVditor.insertValue(res.data.content, false);
        this.categoryIds = res.data.categoryIds;
      });
    },
    addPost(content) {
      this.$axios
        .post("posts", {
          Title: this.title,
          CategoryIds: this.categoryIds,
          Content: content
        })
        .then((res) => {
          this.$message.success("保存成功");
        });
    },
    editPost(content) {
      this.$axios
        .put(`posts/${this.id}`, {
          Title: this.title,
          CategoryIds: this.categoryIds,
          Content: content
        })
        .then((res) => {
          this.$message.success("保存成功");
        });
    },
    change(val) {
      this.disabled = false;
    },
    titleInput(val) {
      this.disabled = false;
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
