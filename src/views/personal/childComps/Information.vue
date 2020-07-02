<template>
  <div class="information" v-if="user">
    <el-avatar
      :src="user.avatar?user.avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
      :size="120"
    ></el-avatar>

    <div class="detail">
      <div>
        <el-card class="box-card" shadow="hover">
          <p class="followers">
            <i class="el-icon-s-promotion"></i>
            {{user.followers}}
            <span style="font-size:16px">Followers</span>
          </p>
          <h3 class="user-name" style="display:inline-block">
            {{user&&user.username}}
            <i
              class="el-icon-male"
              style="color:#0089ff"
              v-if="user&&user.sex&&user.sex==='男'"
            ></i>
            <i class="el-icon-female" style="color:pink" v-else-if="user&&user.sex&&user.sex==='女'"></i>
            <i class="el-icon-magic-stick" v-else></i>
          </h3>
          <p
            class="identity"
            :class="{'gold-name' : finalIdentity==='摄影师'||finalIdentity==='旅拍大神'}"
          >
            {{finalIdentity}}
            <i class="el-icon-camera" v-if="finalIdentity==='摄影师'"></i>
            <i class="el-icon-video-camera" v-else-if="finalIdentity==='旅拍大神'"></i>
            <i class="el-icon-user" v-else></i>
          </p>
          <p class="phone-number" v-if="user&&user.phoneNumber">电话:{{user.phoneNumber}}</p>
          <p class="email" v-if="user&&user.email">Email:{{user.email}}</p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "information",
  computed: {
    ...mapState(["user"]),
    finalIdentity() {
      switch (this.user.identity) {
        case 0:
          return "游客";
          break;
        case 1:
          return "摄影师";
          break;
        case 2:
          return "旅拍大神";
          break;
        default:
          return "游客";
      }
    }
  }
};
</script>

<style lang="less">
h3 {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
}

.el-card {
  border: none;
  background: transparent;
  // background-color: #555;
  .el-card__body {
    color: whitesmoke;
  }
}

.user-name {
  position: relative;
}

.identity {
  &.gold-name {
    color: #f7d623;
  }
}
</style>