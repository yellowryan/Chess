<template>
  <div id="vlog">
    <nav-bar :num="2"></nav-bar>
    <vlog-view></vlog-view>
  </div>
</template>

<script>
import NavBar from '../../components/navBar/NavBar'
import VlogView from './childComps/VlogView'
export default {
  components:{
    NavBar,
    VlogView
  }
}
</script>

<style>

</style>