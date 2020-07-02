<template>
  <div class="photo-contain" v-if="photos">
    <table border="0" width="100%" class="table-container">
      <tbody>
        <tr v-for="(photos, index) in photoTeam" :key="index">
          <td v-for="photo in photos" :key="photo.id" class="first-td">
            <center>
              <table border="0">
                <tbody class="table-body">
                  <tr>
                    <td>
                      <a href="javascript:void(0)" class="img-link">
                        <div class="img-container">
                          <el-image
                            :src="photo.photoSrc"
                            :preview-src-list="photo.srcList"
                            border="0"
                          ></el-image>
                        </div>
                        <div class="info">
                          <div class="left">{{photo.rate||60}}</div>
                          <div class="right" @click="likeClick(photo._id)">
                            <div class="like-button">
                              <svg
                                class="icon"
                                version="1.1"
                                viewBox="-6.9 -13.1 40 40"
                                x="0px"
                                y="0px"
                              >
                                <path
                                  class="shape"
                                  d="M20.7-7.2c-5.8,0-7.6,4.3-7.6,4.3l0,0c0,0-1.8-4.3-7.6-4.3s-8.4,3.7-8.4,8.1c0,2.2,1.8,5.2,3.6,7.3
                                      C2.5,10.3,13.1,20.6,13.1,21l0,0c0-0.4,10.6-10.7,12.4-12.7c1.8-2,3.6-5,3.6-7.3C29.1-3.4,26.4-7.2,20.7-7.2z"
                                  :fill="isLikedImg(photo._id)?'#ce1111':'#fff'"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div style="padding:10px 0 80px 0;font-size:13px">@{{photo.author}}</div>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </center>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { reqLikeImg } from "../../../http/user";
import { mapState } from "vuex";
export default {
  props: {
    photos: {
      type: Array,
      default() {
        return [];
      }
    },
    nowType:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      colorChange:"#fff"
    };
  },
  computed: {
    ...mapState(["user"]),
    photoTeam() {
      const arr = [];
      const len = this.photos.length;
      const lineNum = len % 3 === 0 ? len / 3 : Math.floor(len / 3 + 1);
      for (let i = 0; i < lineNum; i++) {
        let temp = this.photos.slice(i * 3, i * 3 + 3);
        arr.push(temp);
      }
      return arr;
    },
    isLikedImg() {
      return (imageId)=>{
        return this.user.likeImages?this.user.likeImages.includes(imageId):false
      }
    },
    
  },
  methods: {
    likeClick(id) {
      if(!this.user._id){
        this.$message.warning('请登陆之后点赞')
        return;
      }
      if (this.isLikedImg(id)) {
        const info = {
          from: this.user._id,
          to: id,
          type:'unactive',
          kind:'image'
        }
        reqLikeImg(info).then(res=>{
          this.$store.dispatch("unlikeImageOrArticle",{
            id:res.data.data,
            kind:'image'
          })
          this.$notify.success({
            message:'取消点赞成功',
            position:'top-left',
            duration:3000,
          })
        })
      } else {
        const info = {
          from: this.user._id,
          to: id,
          type:'active',
          kind:'image'
        };
        reqLikeImg(info).then(res => {
          this.$store.dispatch("likeImageOrArticle",{
            id:res.data.data,
            kind:'image'
          });
        });
      }
    }
  },
  mounted() {
    $(".table-container").on("mouseenter", ".img-container", function() {
      $(this)
        .next()
        .css("opacity", 1);
    });
    $(".table-body").on("mouseleave", function() {
      $(this)
        .find(".info")
        .css("opacity", 0);
    });
  },
  updated() {
    $(".table-container").on("mouseenter", ".img-container", function() {
      $(this)
        .next()
        .css("opacity", 1);
    });
    $(".table-body").on("mouseleave", function() {
      $(this)
        .find(".info")
        .css("opacity", 0);
    });
  }
};
</script>

<style lang="less">
.el-image {
  display: inline-block;
  position: static;
  overflow: visible;
  .el-image__inner {
    width: auto;
    height: auto;
    max-width: 330px;
    max-height: 240px;
  }
}
</style>

<style lang="less" scoped>
.photo-contain {
  width: 1200px;
  margin: auto;
  border-bottom: 0px solid #222;
  padding: 0px 0px 0px 0px;
}

.photo-contain::before {
  display: table;
  content: " ";
}

table {
  border-collapse: separate;
}

.img-link {
  color: #555;
  text-decoration: none;
  position: relative;
  display: inline-block;
  .info {
    position: absolute;
    z-index: 1;
    bottom: 108px;
    left: 0;
    right: 0;
    opacity: 0;
    min-height: 45px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    transition: opacity 0.2s;
    .left {
      color: #fff;
      font-size: 18px;
      position: relative;
      left: 10px;
      top: 10px;
      float: left;
    }
    .right {
      position: absolute;
      right: 30px;
      bottom: 5px;
      transition: all 0.2s;
      .like-button {
        display: inline-block;
        width: 24px;
        height: 24px;
      }
    }
  }
  .hover {
    opacity: 1;
    bottom: 110px;
  }
}

.icon {
  position: absolute;
  top: 0px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: inline-block;
}
</style>