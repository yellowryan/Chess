<template>
  <div id="home">
    <nav-bar :num="0" @loginClick="loginClick"></nav-bar>
    <home-swiper></home-swiper>
    <home-topic :topList="topList"></home-topic>
    <register :isShow="loginShow" @closeLogin="closeLogin" :path="$route.path"></register>
    <!-- <img-up-load></img-up-load> -->
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeTopic from "./childComps/HomeTopic";
import NavBar from "../../components/navBar/NavBar";
import HomeFooter from "./childComps/HomeFooter";
import Register from "../../components/common/register/Register";
import ImgUpLoad from "../../components/common/imgUpload/ImgUpLoad";

import { myMixin } from "../../mixins/mixins";
import { reqTopPosts } from "../../http/user";
export default {
  mixins: [myMixin],
  components: {
    HomeSwiper,
    HomeTopic,
    HomeFooter,
    NavBar,
    Register,
    ImgUpLoad
  },
  data() {
    return {
      topList: null
    };
  },
  methods: {},
  created() {
    reqTopPosts(5).then(res => {
      this.topList = res.data.data;
    });
    console.log("parentCreated");
  }
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