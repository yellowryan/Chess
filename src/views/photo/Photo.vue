<template>
  <div id="photo">
    <nav-bar :num="1" @loginClick="loginClick"></nav-bar>
    <photo-type :typeList="typeList" @typeHandle="typeHandle"></photo-type>
    <photo-container :photos="photoList[nowType].list" :nowType="nowType"></photo-container>
    <edition type="google" right="10px" top="100px" v-if="user&&user.identity===1"></edition>
    <photo-upload></photo-upload>
    <div
      class="load-more"
      @click="loadMore"
      :class="{'no-more':photoList[nowType].page===3}"
    >{{photoList[nowType].page===3?"NO MORE" : "SEE MORE"}}</div>
    <register :isShow="loginShow" @closeLogin="closeLogin" :path="$route.path"></register>
  </div>
</template>

<script>
import NavBar from "../../components/navBar/NavBar";
import Register from "../../components/common/register/Register";
import PhotoType from "./childComps/PhotoType";
import PhotoContainer from "./childComps/PhotoContainer";
import Edition from "../../components/common/edit/Edition";
import PhotoUpload from "./childComps/PhotoUpload";

import { myMixin } from "../../mixins/mixins";

import { reqPhotoList, reqUserRegister } from "../../http/user";

import { mapState } from "vuex";

export default {
  mixins: [myMixin],
  components: {
    NavBar,
    Register,
    Edition,
    PhotoType,
    PhotoContainer,
    PhotoUpload
  },
  data() {
    return {
      photoList: {
        popular: {
          page: 0,
          list: []
        },
        latest: {
          page: 0,
          list: []
        },
        awarded: {
          page: 0,
          list: []
        }
      },
      typeList: ["popular", "latest", "awarded"],
      nowType: "popular",
      dialog: false
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    typeHandle(index) {
      this.nowType = this.typeList[index];
      if (this.photoList[this.nowType].page === 0) {
        this.getPhotoList(this.typeList[index]);
      }
    },
    //获取图片板块的首轮图片
    getPhotoList(type) {
      let page = this.photoList[type].page + 1;
      reqPhotoList(type, page).then(res => {
        this.photoList[type].list.push(...res.data.data);
        this.photoList[type].page += 1;
      });
    },
    loadMore() {
      if (this.photoList[this.nowType].page < 3) {
        this.getPhotoList(this.nowType);
      } else {
        this.$message("没有更多图片了");
      }
    }
  },
  created() {
    this.getPhotoList("popular");
  }
};
</script>

<style lang="less" scoped>
#photo {
  padding-top: 80px;
}

.load-more {
  margin-bottom: 30px;
  text-shadow: 1px 1px 4px #555;
  cursor: pointer;
  &.no-more {
    color: lightgray;
  }
}
</style>