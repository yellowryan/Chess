<template>
  <div class="topic container">
    <div class="page-header">
      <h4 style="text-align:left">Top Posts</h4>
    </div>
    <div class="media" v-for="(topic,index) in topList" :key="index">
      <div class="media-left">
        <a href="javascript:void(0)">
          <img class="media-object" :src="topic.pageSrc" alt="..." />
        </a>
      </div>
      <div class="media-body">
        <strong>News</strong>
        <h4 class="media-heading">{{topic.title}}</h4>
        <el-button type="primary" @click="topicHandle(topic._id)" style="marginTop:10px">READ MORE</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topList: {
      type: Array,
      default: []
    }
  },
  methods: {
    topicHandle(id) {
      this.$router.push("/arts/" + id);
    }
  }
};
</script>

<style lang='less' scoped>
.topic {
  border-radius: 20px;
  .page-header {
    margin-top: 25px;
    margin-bottom: 25px;
    padding-left: 20px;
  }
  .media {
    display: flex;
    flex-direction: row;
    text-align: left;
    margin-top: 20px;
    padding: 0 20px 0 20px;
    .media-body {
      padding: 10px 20px;
    }
    .media-left {
      padding: 0 20px;
      width: 60%;
      img {
        width: 100%;
      }
    }
    .media-body {
      flex: 1;
    }
  }
}
</style>