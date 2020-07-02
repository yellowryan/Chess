<template>
  <div class="vlog-upload vlog-container">
    <div class="video-bg">
      <video
        poster="https://ci.xiaohongshu.com/9e244c50-108b-41df-b649-537f318124a9"
        muted
        loop
        src="https://dc.xhscdn.com/9379abe0-7ad8-11e9-8794-9320f6c9d557/%E8%83%8C%E6%99%AF%E8%A7%86%E9%A2%91.mp4"
        preload="auto"
        class="my-video"
        autoplay
      ></video>
    </div>
    <div class="content">
      <div class="middle">
        <div class="middle-wrapper">
          <p style="color:#fff">请选择上传视频类型:{{vlogForm.type||''}}</p>
          <el-select v-model="vlogForm.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-upload
            class="avatar-uploader"
            drag
            action="http://localhost:5000/photos/upload"
            :show-file-list="false"
            :before-upload="beforeVlogUpload"
            :on-progress="uploadVlogProcess"
            :on-success="handleVlogSuccess"
            :with-credentials="true"
          >
            <video
            width="100%"
            height="100%"
              :src="vlogForm.src"
              v-if="vlogForm.src!=''&& vlogFlag ==false"
              controls
            >您的浏览器不支持视频播放</video>
            <i class="el-icon-upload" v-else-if="vlogForm.src==''&&vlogFlag==false"></i>
            <el-progress v-if="vlogFlag == true" type="circle" :percentage="vlogUploadPercent"></el-progress>
            <div class="el-upload__text" v-else-if="vlogForm.src==''&&vlogFlag==false">
              将视频拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip" style="color:#fff">只能上传视频文件，且不超过50M</div>
          </el-upload>
          <el-button type="primary" @click="vlogUpload">上传</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqVlogUpload, reqVlog } from "../../../http/user";
import {mapState} from 'vuex'
export default {
  data() {
    return {
      options: [
        {
          value:'生活',
          label:'生活'
        },
        {
          value: "风光",
          label: "风光"
        },
        {
          value: "城市",
          label: "城市"
        },
        {
          value: "星空",
          label: "星空"
        },
        {
          value: "海洋",
          label: "海洋"
        },
        {
          value: "烟花",
          label: "烟花"
        },
        {
          value: "美食",
          label: "美食"
        },
        {
          value: "汽车",
          label: "汽车"
        },
        {
          value: "科技",
          label: "科技"
        }
      ],
      vlogUploadPercent: 0,
      vlogFlag: false,
      vlogForm: {
        src: "",
        type: ""
      }
    };
  },
  methods: {
    beforeVlogUpload(file) {
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb"
        ].indexOf(file.type) == -1
      ) {
        this.$message.error("请上传正确的视频格式:mp4、ogg、flv、avi、wmv");
        return false;
      }
      if (!isLt50M) {
        this.$message.error("上传视频大小不能超过50MB哦!");
        return false;
      }
    },
    uploadVlogProcess(event, file, fileList) {
      this.vlogFlag = true;
      this.vlogUploadPercent = file.percentage.toFixed(0) * 1;
    },
    handleVlogSuccess(res) {
      this.vlogFlag = false,
      this.vlogUploadPercent = 0
      if(res.status===0){
        this.vlogForm.src = res.data
      }
    },
    vlogUpload(){
      if(this.user.identity!==2){
        this.$message.error('只有旅拍大神可以上传视频')
        return
      }
      if(!this.vlogForm.type){
        this.$message.warning('请选择视频类型')
        return;
      }
      if(!this.vlogForm.src) {
        this.$message.warning('请上传一个视频')
        return;
      }
      const info = {
        type:this.vlogForm.type,
        vlogSrc:this.vlogForm.src
      }
      reqVlog(info).then(res=>{
          let that = this
          this.$message({
            type:'success',
            message:'视频上传成功',
            onClose(){
              location.href = that.$route.path
            }
          })
      })
    }

  },
  computed:{
    ...mapState(['user'])
  },
};
</script>

<style lang="less" scoped>
.vlog-container {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
}

.video-bg {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
  }
  .my-video {
    min-width: 100%;
    min-width: 100%;
  }
}

.content {
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  .middle {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    .middle-wrapper {
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      & > div {
        margin-bottom: 30px;
      }
    }
  }
}
</style>