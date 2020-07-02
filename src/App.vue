<template>
  <div id="app">
    <keep-alive exclude="search,arts">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { userAutoLogin } from "./store/action";

export default {
  created() {
    this.$store.dispatch("userAutoLogin");
    if (!window.sessionStorage.getItem("articles")) {
      this.$store.dispatch("articleList", 0);
    }
  }
};
</script>

<style lang="less">
@import "./assets/css/reset.less";
.container {
  width: 100%;
  padding-right: 25px;
  padding-left: 25px;
  margin-right: auto;
  margin-left: auto;
}

p {
  margin-bottom: 1rem;
}
</style>
