<template>
  <div class="hot-video">
    <h2 class="title-ch">视频推荐</h2>
    <h2 class="title-en">
      <span class="text">FEATURES</span>
      <span class="separation"></span>
    </h2>
    <div class="suggest-container">
      <div class="border-left"></div>
      <div class="border-right"></div>
      <div class="suggest-wrapper">
        <ul class="suggest-videos-list row-left">
          <div class="rectangle-gray"></div>
          <a
            href="javasript:return false"
            class="item-wrapper"
            v-for="item in videoLeft"
            :key="item.id"
            :style="{backgroundImage:'url('+item.url+')',width:'382px',height:'220px'}"
          >
            <a class="video-cover">
              <video src :data-src="item.src" width="382px" height="224px" muted loop autoplay></video>
            </a>
          </a>
        </ul>
        <ul class="suggest-videos-list row-center">
          <a
            href="javasript:return false"
            class="item-wrapper"
            v-for="item in videoCenter"
            :key="item.id"
            :style="{backgroundImage:'url('+item.url+')',width:'469px',height:'269px'}"
          >
            <a class="video-cover">
              <video src :data-src="item.src" width="469px" height="269px" muted loop autoplay></video>
            </a>
          </a>
        </ul>
        <ul class="suggest-videos-list row-right">
          <a
            href="javasript:return false"
            class="item-wrapper"
            v-for="item in videoRight"
            :key="item.id"
            :style="{backgroundImage:'url('+item.url+')',width:'382px',height:'220px'}"
          >
            <a class="video-cover">
              <video src :data-src="item.src" width="382px" height="220px" muted loop autoplay></video>
            </a>
          </a>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoLeft: Object.freeze([
        {
          id: "001",
          url:
            "https://ae01.alicdn.com/kf/Hb0be7809b29448c497d53e82c8c871b9U.png",
          src:
            "https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD10.mp4"
        },
        {
          id: "002",
          url:
            "https://chess-img.oss-cn-hangzhou.aliyuncs.com/164058329746899216.jpg",
          src:
            "https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD11.mp4"
        },
        {
          id: "003",
          url:
            "https://chess-img.oss-cn-hangzhou.aliyuncs.com/164252092901490919.jpg",
          src:
            "https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD12.mp4"
        }
      ]),
      videoCenter: Object.freeze([
        {
          id: "004",
          url:
            "https://chess-img.oss-cn-hangzhou.aliyuncs.com/163720599288545400.jpg",
          src:
            "https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD13.mp4"
        },
        {
          id: "005",
          url:
            "https://chess-img.oss-cn-hangzhou.aliyuncs.com/164297653914566656.jpg",
          src:
            "https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD14.mp4"
        },
        {
          id: "006",
          url:
            "https://chess-img.oss-cn-hangzhou.aliyuncs.com/163591655780384826.jpg",
          src:
            "https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD15.mp4"
        }
      ]),
      videoRight: Object.freeze([
        {
          id: "007",
          url:
            "https://chess-img.oss-cn-hangzhou.aliyuncs.com/163689331926630631.jpg",
          src:
            "https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD16.mp4"
        },
        {
          id: "008",
          url:
            "https://chess-img.oss-cn-hangzhou.aliyuncs.com/164058484365721612.jpg",
          src:
            "https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD17.mp4"
        },
        {
          id: "009",
          url:
            "https://chess-img.oss-cn-hangzhou.aliyuncs.com/163632689897930959.jpg",
          src:
            "https://chess-vlog.oss-cn-hangzhou.aliyuncs.com/%E4%B8%8B%E8%BD%BD18.mp4"
        }
      ])
    };
  },
  mounted() {
    $(function() {
      $(".suggest-wrapper")
        .on("mouseenter", ".item-wrapper", function() {
          $(this)
            .find("video")
            .attr(
              "src",
              $(this)
                .find("video")
                .attr("data-src")
            );
        })
        .on("mouseleave", ".item-wrapper", function() {
          $(this)
            .find("video")
            .attr("src", "");
        });
    });
  }
};
</script>

<style lang="less" scoped>
.suggest-container {
  .suggest-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .row-left,
    .row-right {
      flex-basis: 410px;
      position: relative;
      margin-top: 113px;
      .item-wrapper {
        display: inline-block;
      }
    }
    .row-center {
      margin: 0 18px;
      flex-basis: 503px;
      .item-wrapper {
        display: inline-block;
      }
    }
    .item-wrapper {
      position: relative;
      background-size: cover;
      margin-bottom: 16px;
      border-radius: 4px;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
        // padding-bottom: 56.25%;
      }
    }
  }
}
.rectangle-gray {
  position: absolute;
  z-index: -1;
  top: -60px;
  left: 70px;
  display: inline-block;
  width: 410px;
  height: 231px;
  background-color: #fff;
  border-top: 20px solid #f8f8f8;
  border-left: 20px solid #f8f8f8;
}
</style>