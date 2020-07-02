<template>
  <div class="type">
    <center>
      <span
        class="type_selection"
        :class="{'selected':currentIndex===index}"
        v-for="(type, index) in typeList"
        @click="typeClick(index)"
        :key="index"
      >{{type}}</span>
    </center>
  </div>
</template>

<script>
export default {
  props: {
    typeList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    typeClick(index) {
      this.currentIndex = index;
      this.$emit("typeHandle", index);
    }
  }
};
</script>

<style lang="less" scoped>
.type {
  padding: 40px 0 30px 0;
  .type_selection {
    padding: 7px 0 10px;
    border-bottom: 1px solid #444;
    text-transform: uppercase;
    margin: 0 20px;
    color: #666;
    font-size: 19px;
    font-family: proximanovat-thin;
    letter-spacing: 1px;
    cursor: pointer;
    &.selected {
      color: red;
      border-bottom: 1px solid #999;
    }
  }
}
</style>