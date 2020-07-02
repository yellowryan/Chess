<template>
  <div id="personal">
    <nav-bar :num="6"></nav-bar>
    <el-container>
      <el-aside style="width:auto;min-width:150px;position: relative;">
        <personal-aside @routeChange='routeChange'></personal-aside>
        <log-out></log-out>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template> 

<script>
import NavBar from "../../components/navBar/NavBar";
import PersonalAside from "./childComps/PersonalAside";
import LogOut from './childComps/LogOut'

export default {
  name:'personal',
  components: {
    NavBar,
    PersonalAside,
    LogOut,
  },
  methods:{
    routeChange(type){
      this.$router.replace(type,err=>{err})
    }
  },
  destroyed(){
    console.log("des")
  },
  deactivated(){
    console.log('sad')
  },
  activated(){
    console.log('asdafa')
  }
};
</script>

<style lang="less">
#personal {
  // background-color: #555;
  background-image: url('https://ae01.alicdn.com/kf/H085abd164f6448068f66f543487dab154.png');
  background-size:cover;
  padding-top: 90px;
  width: 100%;
  height: 100%;
}

.el-col-12 {
  width: 20%;
  min-width: 150px;
}

.el-main{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 20px 20px;
  min-width: 768px;
}

.el-menu{
  background-color: transparent !important;
  .el-menu-item{
    background-color: transparent !important;
  }
}
</style>