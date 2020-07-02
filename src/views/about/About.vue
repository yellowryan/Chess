<template>
  <div id="about">
    <nav-bar :num="5" @loginClick="loginClick"></nav-bar>
    <div class="content">
      <p class="content_title">About Cheese</p>
      <hr />
      <p class="content_sub">Cheese是精选优质摄影作品内容为主体的一个网站,旨在分享生活,探索美好</p>
      <p class="content_sub">只收录精美有趣的内容,对于那些大尺度,违规的内容我们是拒绝的，请文明上网传播正能量；</p>
      <p class="content_sub">关于版权,如果您需要公开使用摄影师们的作品，必须自行获得相关内容版权所有人同意;</p>

      <p class="content_title">如果您有满足以下条件的摄影作品或视频推荐，可向我们投稿：</p>
      <p class="content_sub">1.有好的视觉表现，图片或视频注重美感、设计感。</p>
      <p class="content_sub">2.内容具有一定启发灵感的创意或利于传播的热点。</p>
    </div>
    <p class="copyright">Copyright © 2020 877520264@qq.com All Rights Reserved.</p>
    <img src="https://chess-img.oss-cn-hangzhou.aliyuncs.com/about.jpg" />
    <register :isShow="loginShow" @closeLogin="closeLogin" :path="$route.path"></register>
  </div>
</template>

<script>
import NavBar from "../../components/navBar/NavBar";
import Register from "../../components/common/register/Register";

import { myMixin } from "../../mixins/mixins";

export default {
  mixins: [myMixin],
  components: {
    NavBar,
    Register
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log(myMixin);
  }
};
</script>

<style lang="less" scoped>
#about {
  background-color: #101010;
  height: 100%;
  widows: 100%;
  position: relative;
  img {
    position: absolute;
    right: 30px;
    top: 210px;
    height: 50%;
  }
}
.content {
  color: aliceblue;
  padding-top: 100px;
  text-align: left;
  margin: 0 30px;
  p {
    margin-top: 10px;
  }
  .content_title {
    font-size: 32px;
    font-weight: 700;
    margin-top: 20px;
  }
  .content_sub {
    font-size: 20px;
  }
}
.copyright {
  font-size: 16px;
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
}

hr {
  border-top: 1px solid rgba(255, 255, 255, 1);
}
</style>