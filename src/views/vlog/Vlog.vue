<template>
  <div id="vlog">
    <nav-bar :num="2" @loginClick="loginClick"></nav-bar>
    <vlog-view></vlog-view>
    <div class="video-body">
      <vlog-inspire></vlog-inspire>
      <vlog-selecte></vlog-selecte>
      <vlog-features></vlog-features>
      <vlog-trend></vlog-trend>
    </div>
    <edition
      type="instagram"
      address="vlogupload"
      right="10px"
      top="100px"
      v-if="user&&user.identity===2"
    ></edition>
    <register :isShow="loginShow" @closeLogin="closeLogin" :path="$route.path"></register>
  </div>
</template>

<script>
import NavBar from "../../components/navBar/NavBar";
import VlogView from "./childComps/VlogView";
import VlogInspire from "./childComps/VlogInspire";
import VlogSelecte from "./childComps/VlogSelecte";
import VlogFeatures from "./childComps/VlogFeatures";
import VlogTrend from "./childComps/VlogTrend";
import Edition from "../../components/common/edit/Edition";
import Register from "../../components/common/register/Register";

import { myMixin } from "../../mixins/mixins";
import { mapState, mapActions } from "vuex";

export default {
  mixins: [myMixin],
  components: {
    NavBar,
    VlogView,
    VlogInspire,
    VlogSelecte,
    VlogFeatures,
    VlogTrend,
    Edition,
    Register
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style lang="less">
@import "../../assets/css/vlog.less";
.video-body {
  margin: 60px 40px 0;
}
</style>>

