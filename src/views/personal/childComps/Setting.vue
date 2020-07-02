<template>
  <div>
    <div style="color:#fff">选择头像</div>
    <el-upload
      action="''''"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="upload"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleAvatarSuccess"
      :with-credentials="true"
      name="file"
      accept="image/*"
    >
      <el-avatar v-if="ruleForm.avatar" :src="ruleForm.avatar"></el-avatar>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
     >
      <el-form-item label="昵称" prop="username">
        <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex" size="medium">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
          <el-radio label="保密"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNumber">
        <el-input type="tel" v-model.number.trim="ruleForm.phoneNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reqImgUpload } from "../../../http/user";
import { mapState } from "vuex";
import { reqUserModify } from "../../../http/user";
import { userUpdate } from "../../../store/action";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 0) {
            callback(new Error("年龄不能为负数"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validateUsername = (rule, value, callback) => {
      const reg2 = /\s+/;
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else {
        if (value.length < 6 || value.length > 16) {
          callback(new Error("昵称必须为6到16位"));
        } else {
          if (reg2.test(value)) {
            callback(new Error("昵称不能含有空格"));
          }
        }
      }
      callback();
    };
    var validatePhone = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/;
      if (value === "") {
        callback(new Error("电话号码不能为空"));
      } else if (!reg.test(value)) {
        callback(new Error("电话号码格式不正确"));
      } else {
        callback();
      }
    };

    var validateEmail = (rule, value, callback) => {
      const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (value === "") {
        callback(new Error("邮箱地址不能为空"));
      } else {
        if (!pattern.test(value)) {
          callback(new Error("邮箱格式不正确"));
        }
      }
      callback();
    };
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      labelPosition: "center",
      ruleForm: {
        username: "",
        sex: "",
        phoneNumber: "",
        age: "",
        email: "",
        avatar: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        phoneNumber: [{ validator: validatePhone, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    handleRemove(file, fileList) {
      this.ruleForm.avatar = "";
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      const isJPGOrPNG =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPGOrPNG) {
        this.$message.error("上传图片只能是 JPG 或者 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPGOrPNG && isLt2M;
    },
    upload(file) {
      var formdata = new FormData();
      formdata.append("file", file.file);
      reqImgUpload(formdata).then(res => {
        console.log(res)
        this.ruleForm.avatar = res.data.data;
      });
    },
    handleAvatarSuccess() {
      this.$message.success("上传成功");
    },

    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          reqUserModify(this.ruleForm).then(res => {
            this.$store.dispatch("userUpdate", res.data.data);
          });
          this.$message({
            type: "success",
            message: "提交成功",
            center: true,
            onClose: () => {
              that.resetForm("ruleForm");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.el-input {
  width: auto;
}

.el-input__inner {
  width: 300px;
}

.el-form {
  margin-top: 10px;
}

.el-form-item {
  position: relative;
  margin-bottom: 16px;
}

.el-form-item__label {
  color: #fff;
}

.el-radio__label {
  color: #fff;
}
</style>