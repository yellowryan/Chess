<template>
<div class="swiper-contain">
  <div class="slider-wrapper">
     <swiper :options="swiperOption" :auto-update="true">
        <swiper-slide class="swiper-slide" v-for="item in slide" :key="item.id">
        <img :src="item.src" ref="imgs">
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>   <!-- 分页 -->
      </swiper>
       <div class="swiper-button-prev swiper-button-white"></div>
        <div class="swiper-button-next swiper-button-white"></div>
  </div>
</div>

</template>

<style lang="less" scoped>
  .swiper-contain{
    height: 100%;
    .slider-wrapper{
      font-size: 0;
      width: 100%;
      overflow: hidden;
      position: relative;
          img{
          display: inline-block;
          width: 100%;
          position: relative;
          left: 50%;
          transform: translateX(-50%)
        }
    }
    .slider-wrapper /deep/.swiper-pagination-bullet{
      width: 10px;
      height: 10px;
      bottom:80px;
    }
    .slider-wrapper /deep/.swiper-pagination-bullet-active{
      background-color:#fff;
      width: 16px;
      transition: width 0.1s ease-in-out
    }
  }
    
</style>

<script>
export default {
  name: 'App',
  data() {
    return {
      // 图片地址数组
      slide: [
        {
          id:"001",
          src:"imgs/1.jpg"
        },
         {
          id:"002",
          src:"imgs/2.jpg"
        },
         {
           path:"ceshi",
          id:"003",
          src:"imgs/3.png"
        },
         {
          id:"004",
          src:"imgs/4.png"
        },
         {
          id:"005",
          src:"imgs/5.jpg"
        }
      ],
      //设置属性
      swiperOption: {
        slidesPerView:1,
        speed:500,
        //显示分页
        pagination: {
          el: '.swiper-pagination',
          type:"bullets"
        },
        //设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next', 
          prevEl: '.swiper-button-prev'
        },
        //自动轮播
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        //开启循环模式
        loop: true,
        // 阻止click冒泡。拖动Swiper时阻止click事件
        preventClicksPropagation: true,
        //鼠标模拟手机触摸。默认为true，Swiper接受鼠标点击、拖动。
         simulateTouch: false,
      }
    }
  },
  mounted(){
    this.$refs.imgs.forEach(img=>{
      img.draggable = false
    })
  },
  activated(){
      this.reRender = false;
        setTimeout(() => {
            this.reRender = true;
        }, 100);
  }
}
</script>
