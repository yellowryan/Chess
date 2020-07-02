<template>
  <div id="community">
    <nav-bar :num="3" @loginClick="loginClick"></nav-bar>
    <comments></comments>
    <div class="block" style="text-align:center">loading...</div>
    <edition type="twitter" address="edition" right="30px" top="100px"></edition>
    <register :isShow="loginShow" @closeLogin="closeLogin" :path="$route.path"></register>
  </div>
</template>

<script>
import Comments from "./childComps/Comments";
import NavBar from "../../components/navBar/NavBar";
import Edition from "../../components/common/edit/Edition";
import Register from "../../components/common/register/Register";
import { myMixin } from "../../mixins/mixins";
import { reqArticleList } from "../../http/user";
import { articleList } from "../../store/action";
export default {
  name: "community",
  mixins: [myMixin],
  components: {
    Comments,
    NavBar,
    Edition,
    Register
  },
  data() {
    return {};
  },
  created() {
    // if(!window.sessionStorage.getItem('articles')){
    //   this.$store.dispatch('articleList',0)
    // }
  }
};
</script>

<style lang="less" scoped>
#community {
  padding-top: 90px;
}
</style>