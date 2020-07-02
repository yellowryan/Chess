<template>
  <div class="photo-upload">
    <el-drawer
      title="请上传一张图片"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-upload
          action="''"
          :with-credentials="true"
          :before-upload="beforeImageUpload"
          :http-request="imageUpload"
          list-type="picture-card"
          :limit="1"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="imageSubmit"
            :loading="loading"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {reqImgUpload, reqImage} from '../../../http/user'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      dialog:false,
      loading: false,
      formLabelWidth: "80px",
      timer: null,
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  computed:{
    ...mapState(['user'])
  },
  methods: {
    beforeImageUpload(file){
      const isLt5M = file.size / 1024 / 1024 < 5
      if (
        [
          "image/png",
          "image/jpg",
          "image/jpeg"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("只能上传PNG、JPG格式的图片");
        return false;
      }
      if (!isLt5M) {
        this.$message.error("上传图片大小不能超过5MB哦!");
        return false;
      }
    },
    imageUpload(file){
      var formdata = new FormData();
      formdata.append("file", file.file);
      reqImgUpload(formdata).then(res => {
        this.dialogImageUrl = res.data.data;
      });
    },
    imageSubmit(){
      const info = {
        author:this.user.username,
        photoSrc:this.dialogImageUrl
      }
      reqImage(info).then(res=>{
        const that = this
        if(res.status===0){
          this.$message({
            type:'success',
            message: '上传成功',
            onClose(){
              location.href = that.$route.path
            }
          })
        }
      })
    },
    handleClose(done) {
      // if (this.loading) {
      //   return;
      // }
      // if(!this.dialogImageUrl){
      //   this.$message.warning('请上传一张图片')
      //   return;
      // }
      this.$confirm("确定退出吗?")
        .then(_=> {
          // this.loading = true;
          // this.timer = setTimeout(() => {
            done();
          //   // 动画关闭需要一定的时间
          //   setTimeout(() => {
          //     this.loading = false;
          //   }, 400);
          // }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted(){
    var that = this
    this.$bus.$on('imageUpload',function(){
      that.dialog = true
    })
  }
};
</script>

<style lang="less" scoped>
.demo-drawer__footer{
  margin-top: 10px;
}
</style>