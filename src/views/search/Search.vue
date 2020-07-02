<template>
  <div id="search">
    <div class="main-view">
      <div class="topic-banner">
        <img
          :src="bannerImg"
          alt
        />
        <div class="content">
          <div class="title">#{{word}}</div>
          <div class="num">共{{vlogList&&vlogList.length}}个视频</div>
        </div>
      </div>
      <div class="search-result">
        <div class="videos-gallery">
          <div v-for="(videos,index) in computedVlogList" :key="index">
            <div class="gallery-row">
              <a
                href="javascript:void(0)"
                class="row-item"
                v-for="video in videos"
                :key="video._id"
                style="width:308px;height:175px;margin-right:6px"
              >
                <video
                  src
                  :data-src="video.vlogSrc"
                  preload="auto"
                  :poster="video.poster"
                  autoplay
                  muted
                  height="100%"
                ></video>
                <!-- <div class="bg-blur" :style="{backgroundImage:`url(${video.poster})`}"></div> -->
                <img :src="video.poster" alt />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="back icon-toolbar-round icon-top" @click="back"></div>
  </div>
</template>

<script>
import { reqVlogList } from "../../http/user";
export default {
  name: "search",
  data() {
    return {
      word: "",
      vlogList: null,
      isHover: false
    };
  },
  created() {
    this.word = this.$route.query.word;
    this.getVlogList(this.word);
  },
  methods: {
    getVlogList(word) {
      reqVlogList(word).then(res => {
        this.vlogList = res.data.data;
      });
    },
    back(){
      this.$router.back()
    }
  },
  computed: {
    computedVlogList() {
      var arr = [];
      var len = this.vlogList && this.vlogList.length;
      var step = 4;
      var count = len % 4 === 0 ? len / 4 : Math.floor(len / 4) + 1;
      for (let i = 0; i < count; i++) {
        arr[i] = this.vlogList.slice(i * step, step * (i + 1));
      }
      return arr;
    },
    bannerImg(){
      switch(this.word){
        case '生活':
          return "https://ae01.alicdn.com/kf/Ha5af9628b8b84f65a67469940180e1ceP.png"
        case '美食':
          return "https://ae01.alicdn.com/kf/Hb31a14fef0394f86998f5ecd96e588864.png"
        case '风光':
          return "https://ae01.alicdn.com/kf/H8f50dc61256b4ed59d4a2f55f0418259L.png"
        case '科技':
          return "https://ae01.alicdn.com/kf/H230c74ccd49e4cf7bb831824e6f6cf80D.png"
        default:
          return "https://ae01.alicdn.com/kf/H8f50dc61256b4ed59d4a2f55f0418259L.png"
      }
    }
  },
  mounted() {
    const that = this;
    $(function() {
      $(".videos-gallery")
        .on("mouseenter", ".row-item", function() {
          var $is = $(this).children("video");
          $(this)
            .children("img")
            .css({
              display: "none"
            });
          $is.attr("src", $is.attr("data-src"));
        })
        .on("mouseleave", ".row-item", function() {
          var $is = $(this).children("video");
          $(this)
            .children("img")
            .css({
              display: "inline"
            });
          $is.attr("src",'');
        });
    });
  }
};
</script>

<style lang="less" scoped>
#search {
  min-height: 288px;
}

.main-view {
  min-width: 1300px;
  width: 100%;
  height: auto;
  .topic-banner {
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    margin-bottom: 17px;
    max-height: 270px;
    overflow: hidden;
    img {
      display: inline-block;
      width: 100%;
    }
    .content {
      position: absolute;
      bottom: 0;
      left: 0;
      padding-left: 74px;
      width: 100%;
      height: 80px;
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.49) 0,
        rgba(255, 255, 255, 0) 100%
      );
      text-align: start;
      .title {
        height: 30px;
        font-family: PingFangSC;
        font-size: 22px;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 5px;
      }
      .num {
        height: 38px;
        font-family: PingFangSC;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 10px;
      }
    }
  }
  .search-result {
    margin: 0 auto;
  }
}

.videos-gallery {
  .gallery-row {
    padding: 0 20px 0 20px;
    font-size: 0;
    margin-top: 6px;
    &:first-child {
      margin-top: 0;
    }
    .row-item {
      position: relative;
      margin-bottom: 6px;
      display: inline-block;
      vertical-align: top;
      background-color: #eceded;
      cursor: pointer;
      border-radius: 4px;
      overflow: hidden;
      .bg-blur {
        background-repeat: no-repeat;
        background-position: center;
        filter: blur(45px);
        background-size: 200% 200%;
        width: 100%;
        height: 100%;
      }
      img {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        margin: auto;
      }
    }
  }
}

.back {
  position: fixed;
  top: 10px;
  left: 20px;
}

.icon-toolbar-round {
  width: 60px;
  height: 60px;
  padding: 0 !important;
  cursor: pointer;
  display: block;
  margin-top: 22px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
}

.icon-top {
  background-image: url("../../assets/imgs/back.png");
  background-size: 80px 80px;
  background-repeat: no-repeat;
  background-position: -10px -8px;
  transform: rotate(-90deg);
  &:hover {
    background-image: url("../../assets/imgs/back-hover.png");
  }
}
</style>