<template>
  <div class="log-out">
    <el-button type="danger" round @click="centerDialogVisible = true">退出登录</el-button>

    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" :before-close="handleClose" :modal="false">
      <span>确认要退出登录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logOut">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
  export default {
    data() {
      return {
        centerDialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      logOut(){
        this.centerDialogVisible = false
        Cookies.remove('userId')
        this.$message({
          message:'退出成功',
          type:'success',
          duration:1000,
          onClose:()=>{
            this.$router.replace('/home')
            window.location.reload()
          }
        })
      }
    }
  };
</script>

<style lang="less" scoped>
.log-out{
  position: fixed;
  bottom: 10px;
  left:20px
}
</style>