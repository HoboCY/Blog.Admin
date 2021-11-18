<template>
  <el-container>
    <el-main>
      <el-input
        v-model="title"
        placeholder="请输入标题"
        @input="titleInput"
      ></el-input>
      <!-- <div id="vditor"></div> -->
      <editor ref="editor" :api-key="apiKey" :init="editorInit" />
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
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    editor: Editor
  },
  data() {
    return {
      apiKey: "sbphk7hae9rdwa7wcm2drl5yf5hr7ytu9el8ormscgso0b4b",
      editorInit: {
        height: 700,
        menubar: true,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount"
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help",
        images_upload_url: "https://localhost:8011/api/files",
        images_upload_handler: (blobInfo, success, failure, progress) => {
          let formData = new FormData();
          formData.append("file", blobInfo.blob(), blobInfo.filename());
          this.$axios
            .post("/files", formData)
            .then((res) => {
              success(res.data.location);
            })
            .catch((err) => {
              failure(err.response.data);
            });
        }
      },
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
  },
  methods: {
    getCategories() {
      this.$axios.get("categories").then((res) => {
        this.categories = res.data;
      });
    },
    addOrEditPost() {
      console.log(this.$refs.editor);
      console.log(this.$refs.editor.editor);
      var content = this.$refs.editor.editor.getContent();
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
        this.categoryIds = res.data.categoryIds;
        console.log(res.data.content);
        this.$refs.editor.editor.setContent(res.data.content);
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
