<template>
  <div class="hot-words">
    <h2 class="title-ch">热搜词</h2>
    <h2 class="title-en">TREND</h2>
    <div class="words-list">
      <span class="keyword" v-for="keyword in keywords" :key="keyword.id" @click="searchClick(keyword.word)">{{keyword.word}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: [
        {
          id: 1,
          word: "风光"
        },
        {
          id: 2,
          word: "生活"
        },
        {
          id: 3,
          word: "星空"
        },
        {
          id: 4,
          word: "海洋"
        },
        {
          id: 5,
          word: "烟花"
        },
        {
          id: 6,
          word: "美食"
        },
        {
          id: 7,
          word: "汽车"
        },
        {
          id: 8,
          word: "科技"
        }
      ]
    };
  },
  methods:{
    searchClick(word){
      this.$router.push({
        path:'/search',
        query:{
          'word':word
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.words-list{
  display: inline-block;
  font-size: 0;
  width: 342px;
  margin-left: 10px;
  margin-bottom: 50px;
  .keyword{
    display: inline-block;
    width: 54px;
    height: 24px;
    margin-right: 10px;
    margin-bottom: 12px;
    background-color: #f4f4f4;
    font-family: PingFangSC;
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.45px;
    text-align: center;
    color: #222;
    line-height: 24px;
    border-radius: 4px;
    cursor: pointer;
    &:hover{
      color: #fff;
    background-color: #000;
    }
  }
}
</style>