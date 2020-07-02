<template>
  <div class="edition">
    <back @click.native="backClick"></back>
    <div class="con"></div>
    <div class="left-body">
      <p>请输入标题:</p>
      <el-input
        type="textarea"
        placeholder="请输入标题内容"
        v-model="textarea"
        maxlength="30"
        show-word-limit
        resize="none"
      ></el-input>
      <p>请选择类型:</p>
      <el-select v-model="value" placeholder="请选择文章类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <p>请添加封面图片:</p>
      <el-upload
        action="#"
        list-type="picture-card"
        :limit="1"
        :with-credentials="true"
        :http-request="pageUpload"
        accept="image/*"
      >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
    <div class="right-body">
      <vue-editor
        id="editor"
        :style="{opacity:value1}"
        v-model="contentStr"
        useCustomImageHandler
        @image-added="handleImageAdded"
      ></vue-editor>
    </div>
    <div class="change-opacity">
      <span class="demonstration" :style="{opacity:value1}">透明度</span>
      <el-slider v-model="value1" :step="0.1" height="200px" vertical :min="0.4" :max="1"></el-slider>
    </div>
    <el-button type="primary" class="submit" size="medium " @click="articleClick">提交</el-button>
  </div>
</template>

<script>
import "../../assets/js/snow";
import { VueEditor } from "vue2-editor";
import Back from "../../components/common/back/Back";
import { reqImgUpload, reqArticle } from "../../http/user";
import { mapState } from "vuex";
export default {
  components: {
    Back,
    VueEditor
  },
  data() {
    return {
      options: [
        {
          value: "图文故事",
          label: "图文故事"
        },
        {
          value: "技术分享",
          label: "技术分享"
        },
        {
          value: "摄影攻略",
          label: "摄影攻略"
        },
        {
          value: "点评赏析",
          label: "点评赏析"
        },
        {
          value: "游记攻略",
          label: "游记攻略"
        },
        {
          value: "人物访谈",
          label: "人物访谈"
        }
      ],
      textarea: "",
      value: "",
      pageSrc: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      value1: 0.6,
      contentStr: ""
    };
  },
  computed: {
    ...mapState(["user"])
  },
  mounted() {},
  methods: {
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);

      reqImgUpload(formData).then(res => {
        console.log(res);
        let url = res.data.data; // Get url from response
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    },
    backClick() {
      this.$router.back();
    },
    articleClick() {
      this.contentStr = this.contentStr.replace(
        /style\s*?=\s*?(['"])[\s\S]*?\1/g,
        ""
      );
      if (!this.textarea) {
        this.$message({
          type: "warning",
          message: "标题不能为空"
        });
        return;
      }
      if (!this.value) {
        this.$message({
          type: "warning",
          message: "请选择文章类型"
        });
        return;
      }
      if (!this.pageSrc) {
        this.$message({
          type: "warning",
          message: "请上传封面图片"
        });
        return;
      }

      var article = {
        author: this.user.username,
        title: this.textarea,
        type: this.value,
        pageSrc: this.pageSrc,
        content: this.contentStr,
        avatar: this.user.avatar
      };
      reqArticle(article).then(res => {
        var that = this;
        this.$message.success({
          message: "上传成功",
          onClose() {
            location.href = that.$route.path;
          }
        });
      });
    },
    pageUpload(file) {
      var formdata = new FormData();
      formdata.append("file", file.file);
      reqImgUpload(formdata).then(res => {
        this.pageSrc = res.data.data;
      });
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less">
.edition {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1190px;
  height: 100%;
  z-index: 100;
  background-image: url("https://ae01.alicdn.com/kf/H2cdaf0c81efa44f7af1bf868e08ef579A.png");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  .change-opacity {
    position: absolute;
    left: 10px;
    bottom: 10px;
    .demonstration {
      writing-mode: vertical-lr;
      font-size: 1rem;
      color: whitesmoke;
    }
  }
}

.note-editor {
  opacity: 0.8;
  position: fixed;
  right: 50px;
}

.con {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
}

.submit {
  position: fixed;
  bottom: 10px;
  left: 50%;
  z-index: -1;
}

.el-textarea {
  opacity: 0.8;
  width: 320px;
}

.el-select,
.el-select-dropdown__list {
  opacity: 0.8;
}

.left-body {
  position: fixed;
  left: 20%;
  top: 5%;
  color: #fff;
  p {
    margin-top: 20px;
  }
}

.quillWrapper {
  max-width: 650px;
  position: absolute;
  right: 50px;
  top: 10%;
  background-color: #fff;
}

#editor {
  height: 400px;
}

.upload-demo {
  opacity: 0.8;
}

.modal-dialog {
  left: 20%;
}
</style>