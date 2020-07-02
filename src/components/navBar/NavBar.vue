<template>
  <div id="nav_bar" class="clearfix">
    <div class="app_header header">
      <div class="logo">
        <div class="CHEESE">
          <img src="../../assets/imgs/animal.png" alt />
        </div>
      </div>
      <ul class="app_navigation">
        <router-link to="/home" class="active">
          <li class="navigation-item" :class="{'current-tab  slider-bottom':num===0}">首页</li>
        </router-link>
        <router-link to="/photo" class="active">
          <li
            class="navigation-item photo-display"
            :class="{'current-tab  slider-bottom':num===1}"
          >摄影作品</li>
        </router-link>
        <router-link to="/vlog" class="active">
          <li class="navigation-item VLOG" :class="{'current-tab  slider-bottom':num===2}">VLOG</li>
        </router-link>
        <router-link to="/community" class="active">
          <li
            class="navigation-item community-delicate"
            :class="{'current-tab  slider-bottom':num===3}"
          >社区精选</li>
        </router-link>
        <router-link to="/about" class="active">
          <li class="navigation-item aboutAs" :class="{'current-tab  slider-bottom':num===5}">关于本站</li>
        </router-link>
        <a href="javascript:void(0)" class="active login-link" @click="loginClick">
          <img src="../../assets/imgs/crown.png" alt class="login-img" />
          <li
            class="navigation-item login"
            :class="{'current-tab  slider-bottom':num===6}"
            style="display: inline-block;"
          >{{user&&user._id?user.username:"登录|注册"}}</li>
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    loginClick() {
      if (this.user && this.user._id) {
        this.$router.push("/personal");
      } else {
        console.log(1);
        this.$emit("loginClick");
      }
    }
  },
  computed: {
    ...mapState(["user"])
  },
  mounted() {
    let $oLi = $(".navigation-item");
    $oLi.on("mouseenter", function() {
      if ($(this).hasClass("slider-bottom")) {
        return;
      } else {
        $(this)
          .addClass("current-tab")
          .parent()
          .siblings()
          .children()
          .not(".slider-bottom")
          .removeClass("current-tab");
        $(this)
          .css("transform", "translateY(3px)")
          .parent()
          .siblings()
          .children()
          .css("transform", "");
      }
    });
    $oLi.on("mouseleave", function() {
      if ($(this).hasClass("slider-bottom")) {
        return;
      } else {
        $(this).removeClass("current-tab");
        $(this).css("transform", "");
      }
    });
  }
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.app_header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}
.header {
  display: flex;
  width: 100%;
  height: 102px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  font-size: 16px;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0) 90%
  );
  .logo {
    margin-left: 90px;
    align-items: center;
    display: flex;
    .CHEESE {
      cursor: pointer;
      margin-top: 1px;
      width: 72px;
      height: 72px;
      position: relative;
      &:hover {
        animation: fade 2s linear infinite;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .app_navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    min-width: 760px;
    margin-right: 122px;
    padding: 0;
    .active {
      /* color: #000; */
      color: #fff;
      margin-left: 56px;
    }
    .login-link {
      position: relative;
      .login-img {
        position: absolute;
        top: 2px;
        left: -26px;
      }
    }
    .navigation-item {
      position: relative;
      margin: 0;
      transition: transform 0.2s ease-in-out;
      &::before {
        content: "";
        position: absolute;
        display: inline-block;
        height: 2px;
        width: 20%;
        border-radius: 2px;
        visibility: hidden;
        /* background-color: hsla(0, 0%, 100%, 0.5); */
        background-color: white;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        transition: width 0.2s ease-in-out;
      }
    }
    .current-tab {
      &::before {
        visibility: visible;
        opacity: 1;
        width: 100%;
      }
    }
  }
}

@keyframes fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>