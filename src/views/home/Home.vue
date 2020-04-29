<template>
  <div id="home">
    <nav-bar :num="0"></nav-bar>
    <home-swiper></home-swiper>
    <register></register>
    <!-- <img-up-load></img-up-load> -->
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import NavBar from "../../components/navBar/NavBar";
import Register from "../../components/common/register/Register";
import ImgUpLoad from "../../components/common/imgUpload/ImgUpLoad"
export default {
  components: {
    HomeSwiper,
    NavBar,
    Register,
    ImgUpLoad
  },
  mounted() {}
};
</script>

<style lang='less' scoped>
#home {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>