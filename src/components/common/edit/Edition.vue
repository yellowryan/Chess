<template>
  <div class="social-btns" v-if="user&&user._id">
    <a
      class="btn fixed"
      @click="edition"
      :class="[type]"
      :style="{'left':left,'top':top,'right':right}"
    >
      <i class="fa" :class="['fa-'+type]"></i>
    </a>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    type: {
      type: String,
      default: "instagram"
    },
    address: {
      type: String,
      default: "edition"
    },
    left: {
      type: String,
      default: "auto"
    },
    top: {
      type: String,
      default: "auto"
    },
    right: {
      type: String,
      default: "auto"
    }
  },
  methods: {
    edition() {
      if (this.type === "google") {
        this.$bus.$emit("imageUpload");
        return;
      }
      this.$router.push("/" + this.address);
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style lang='less' scoped>
@import "../../../assets/css/comment";
@import url("https://www.jq22.com/jquery/font-awesome.4.7.0.css");

.btn {
  &.instagram,
  &.twitter,
  &.facebook,
  &.google {
    &.fixed {
      position: fixed;
      z-index: 1000;
    }
  }
}
</style>