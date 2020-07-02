<template>
  <article class="htmleaf-container" v-if="user">
    <div id="container">
      <div class="feed" id="feed1">
        <div class="heart" id="like1" :rel="isLikedArt?'unlike':'like'" :class="{'heartAnimation':isLikedArt}" ></div>
        <slot name="like-count"></slot>
      </div>
    </div>
  </article>
</template>

<script>
import {mapState} from 'vuex'
export default {
  props:{
    artId:{
      type:String,
      default:''
    }
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapState(['user']),
    isLikedArt(){
      return this.user.likeArticles?this.user.likeArticles.some(articleId=>{
        return articleId == this.artId
      }):false
    }
  },
  mounted() {
    $(document).ready(function() {
      $("body").on("click", ".heart", function() {
        var A = $(this).attr("id");
        var B = A.split("like");
        var messageID = B[1];
        var C = parseInt($("#likeCount" + messageID).html());
        $(this).css("background-position", "");
        var D = $(this).attr("rel");

        if (D === "like") {
          $(this)
            .addClass("heartAnimation")
            .attr("rel", "unlike");
            $(this).css("background-position", "");
        } else {
          $(this)
            .removeClass("heartAnimation")
            .attr("rel", "like");
          $(this).css("background-position", "left");
        }
      });
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/heart.less";
</style>