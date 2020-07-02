<template>
  <div class="exhibits" v-if="exhibit">
    <p>我发表的图片</p>
    <div class="image wrapper">
      <div class="img-container" v-for="image in exhibit['images']" :key="image._id">
        <img :src="image.photoSrc" alt />
      </div>
    </div>
    <p>我发表的视频</p>
    <div class="video wrapper">
      <a
        href="javascript:void(0)"
        class="row-item"
        v-for="video in exhibit['videos']"
        :key="video._id"
        style="width:181px;height:100px;margin-right:6px"
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
        <img :src="video.poster" alt class="my_img" />
      </a>
    </div>
    <p>我发表的文章</p>
    <div class="article wrapper">
      <el-card
        :body-style="{ padding: '0px' }"
        shadow="always"
        v-for="article in exhibit['articles']"
        :key="article._id"
      >
        <div style="padding: 14px;">
          <span class="overflow" style="color:#303133">{{article.title}}</span>
          <div class="bottom clearfix">
            <i class="el-icon-medal" style="color:#e42411">{{article.likes}}</i>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqExhibits } from "../../../http/user";
export default {
  computed: {
    ...mapState(["user"])
  },
  data() {
    return {
      exhibit: null
    };
  },
  created() {
    reqExhibits(this.user && this.user._id).then(res => {
      this.exhibit = res.data.data;
    });
  },
  updated(){
    $(function() {
      $(".video")
        .on("mouseenter", ".row-item", function() {
          console.log(1)
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
          $is.attr("src", "");
        });
    });
  }
}
</script>

<style lang="less" scoped>
.el-card {
  max-width: 200px;
  max-height: 100px;
  background: #fff;
  margin-right: 10px;
}

.exhibits {
  color: #fff;
  width: 100%;
  min-width: 100%;
}

.wrapper {
  height: 100px;
  width: 100%;
}

.image,
.article,
.video {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .img-container {
    // overflow-x: scroll;
    margin: 0 10px;
    height: 100px;
    cursor: pointer;
    max-width: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  .my_img {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    margin: auto;
  }
}
</style>