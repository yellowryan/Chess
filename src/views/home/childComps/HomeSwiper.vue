<template>
  <div class="swiper-contain">
    <div class="slider-wrapper">
      <swiper :options="swiperOption" :auto-update="true">
        <swiper-slide class="swiper-slide" v-for="item in slide" :key="item.id">
          <img :src="item.src" ref="imgs" />
          <div class="author-info">
            <span>by</span>
            <a href="javascript:void(0)">CoderWhy</a>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- 分页 -->
      </swiper>
      <div class="swiper-button-prev swiper-button-white"></div>
      <div class="swiper-button-next swiper-button-white"></div>
    </div>
  </div>
</template>


<script>
export default {
  name: "App",
  data() {
    return {
      // 图片地址数组
      slide: [
        {
          id: "001",
          src:
            "https://ae01.alicdn.com/kf/H6a8e36ef24b44a1db2608af086e03e0cL.jpg"
        },
        {
          id: "002",
          src:
            "https://ae01.alicdn.com/kf/Hebdfad1b6f4f4906ba724a0af4bff6593.jpg"
        },
        {
          path: "ceshi",
          id: "003",
          src: "https://ae01.alicdn.com/kf/H74c069f4d2c94d12acd5cc003860f444J.png"
        },
        {
          id: "004",
          src: "https://ae01.alicdn.com/kf/Hf3733aa1ff6843189352ee5f657ee651O.png"
        },
        {
          id: "005",
          src:
            "https://ae01.alicdn.com/kf/H86d8d07f932a49d991110346a5af898fk.jpg"
        }
      ],
      //设置属性
      swiperOption: {
        slidesPerView: 1,
        speed: 500,
        //显示分页
        pagination: {
          el: ".swiper-pagination",
          type: "bullets"
        },
        //设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        //自动轮播
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        //开启循环模式
        loop: true,
        // 阻止click冒泡。拖动Swiper时阻止click事件
        preventClicksPropagation: true,
        //鼠标模拟手机触摸。默认为true，Swiper接受鼠标点击、拖动。
        simulateTouch: true
      }
    };
  },
  mounted() {
    this.$refs.imgs.forEach(img => {
      img.draggable = false;
    });
  },
  activated() {
    this.reRender = false;
    setTimeout(() => {
      this.reRender = true;
    }, 100);
  }
};
</script>


<style lang="less" scoped>
.swiper-contain {
  position: relative;
  height: 100%;
  .slider-wrapper {
    font-size: 0;
    width: 100%;
    overflow: hidden;
    position: relative;
    img {
      display: inline-block;
      width: 100%;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .author-info {
    position: absolute;
    right: 20px;
    bottom: 10px;
    z-index: 100;
    color: #fff;
    font-size: 14px;
    span {
      font-size: 10px;
      margin-right: 2px;
    }
    a {
      position: relative;
      pointer-events: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2em;
      font-weight: 700;
      color: #fff;
      text-decoration: none;
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
      &::before {
        box-sizing: content-box;
        content: " ";
        width: 100%;
        padding: 1px 3px;
        border-radius: 3px;
        height: 100%;
        position: absolute;
        top: -1px;
        left: -3px;
        display: block;
        background-color: rgba(255, 255, 255, 0);
        z-index: 1;
        transition: 0.1s;
      }
    }
  }
  .slider-wrapper /deep/.swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    bottom: 80px;
  }
  .slider-wrapper /deep/.swiper-pagination-bullet-active {
    background-color: #fff;
    transition: width 0.1s ease-in-out;
  }
}
</style>

