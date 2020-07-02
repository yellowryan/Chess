<template>
  <div class="hot-video">
    <h2 class="title-ch">专题精选</h2>
    <h2 class="title-en">
      <span class="text">SELECTED</span>
      <span class="separation-left"></span>
    </h2>
    <div class="topic-wrapper">
      <div class>
        <div class="row">
          <div
            class="row-item"
            v-for="topic in topics"
            :key="topic.id"
            @click="topicClick(topic.word)"
          >
            <a href="javascript:void(0)" class="item-wrap">
              <div class="video-cover" :style="{backgroundImage:'url('+topic.imgSrc+')'}"></div>
              <div class="video-layer">
                <div class="title">#{{topic.title}}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topics: [
        {
          id: 1,
          imgSrc:
            "https://ae01.alicdn.com/kf/H29c56b2e762b4b1d83610e9649d845f3D.png",
          title: "城市生活",
          word: "生活"
        },
        {
          id: 2,
          imgSrc:
            "https://ae01.alicdn.com/kf/H3293bbde75f04b0c9c67ff46d94d3a9dP.png",
          title: "美食精选",
          word: "美食"
        },
        {
          id: 3,
          imgSrc:
            "https://ae01.alicdn.com/kf/H108bdf7ffcba4b36b23b8ba75933b171n.png",
          title: "自然风光",
          word: "风光"
        }
      ]
    };
  },
  mounted() {
    $(".item-wrap")
      .on("mouseenter", function() {
        var index = $(this)
          .parent()
          .index();
        $(".video-cover")
          .eq(index)
          .animate(
            {
              backgroundSize: "120%"
            },
            "slow"
          );
      })
      .on("mouseleave", function() {
        $(".video-cover")
          .stop(true, false)
          .animate({
            backgroundSize: "100%"
          });
      });
  },
  methods: {
    topicClick(word) {
      this.$router.push({
        path: "/search",
        query: {
          word
        }
      });
    }
  },
  destroyed() {
    $(".item-wrap")
      .off("mouseenter")
      .off("mouseleave");
  }
};
</script>

<style lang="less" scoped>
.topic-wrapper {
  .row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .row-item {
      flex: 1;
      .item-wrap {
        display: flex;
        flex: 1;
        text-align: center;
        overflow: hidden;
        position: relative;
        cursor: pointer;
        .video-cover {
          display: inline-block;
          width: 100%;
          position: relative;
          padding-top: 56.25%;
          background-size: 100%;
          background-position: center;
          background-color: #eaeaea;
        }
        .video-layer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 1;
          text-align: center;
          .title {
            font-family: PingFangSC;
            font-size: 20px;
            font-weight: 600;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>