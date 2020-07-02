<template>
  <div class="light-video">
    <h2 class="title-ch">灵感专区</h2>
    <h2 class="title-en">
      <span class="text">INSPIRATION</span>
      <span class="separation"></span>
    </h2>
    <el-carousel type="card" height="340px" :autoplay="false" indicator-position="none">
      <el-carousel-item v-for="video in videos" :key="video.id">
        <img :src="video.poster" alt />
        <video class="my-video" :data-src="video.src" autoplay controls muted loop></video>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [
        {
          id: 1,
          poster:
            "https://s1.tuchong.com/content-image/201910/22f07e215aed9434c093902d2d67d810.jpg",
          src:
            "https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD7.mp4"
        },
        {
          id: 2,
          poster:
            "https://s1.tuchong.com/content-image/201910/849ebab1de44f46fa95124a78344ea9d.jpg",
          src:
            "https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD8.mp4"
        },
        {
          id: 3,
          poster:
            "https://s1.tuchong.com/content-image/201910/62811c857cbf0a22f12740b9236cb507.jpg",
          src:
            "https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD6.mp4"
        }
      ]
    };
  },
  mounted() {
    $(function() {
      $(".el-carousel__container").on(
        "click",
        ".el-carousel__item.is-active",
        function(e) {
          if(e.target.className==='my-video'){
            return;
          }
          $(this)
            .children("img")
            .css({
              display: "none"
            });
          $(this)
            .children("video")
            .attr(
              "src",
              $(this)
                .children("video")
                .attr("data-src")
            );
          $(this)
            .siblings("div")
            .children("img")
            .css({
              display: "inline"
            });
          $(this)
            .siblings("div")
            .children("video")
            .attr(
              "src",
              ''
            );
        }
      );
    });
  }
};
</script>

<style lang="less" scoped>
.el-carousel__item {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.video-body {
  margin: 60px 40px 0;
}

img {
  width: 100%;
  height: 100%;
}

video {
  width: 100%;
}
</style>