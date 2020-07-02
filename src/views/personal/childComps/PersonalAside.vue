<template>
  <div class="clearfix">
    <el-col :span="12">
      <el-menu
        :default-active="currentRoute"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#555"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1" @click="itemClick('information')">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>个人信息</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2" @click="itemClick('exhibits')">
          <i class="el-icon-folder"></i>
          <span slot="title">我的作品</span>
        </el-menu-item>
        <el-menu-item index="3" @click="itemClick('setting')">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <i class="el-icon-loading"></i>
          <span slot="title">开发中...</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    itemClick(type){
      this.$emit('routeChange',type)
    }
  },
  computed:{
    currentRoute(){
      switch(this.$route.path){
        case '/personal/exhibits':
          return "2"
        case '/personal/information':
          return "1"
        case '/personal/setting':
          return "3"
        default:
          return "1"
      }
    }
  }
};
</script>

<style>
</style>