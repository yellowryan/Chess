<template>
  <div class="box">
    <div class="link link_miss">
      <a href='javascript:void(0)' class="a">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.box {
  position: fixed;
  z-index: 10001;
  left: 10px;
  top: 10px;
}
.a {
  display: block;
  width: 180px;
  height: 50px;
  text-decoration: none;
  line-height: 50px;
  color: aquamarine;
  font-family: "微软雅黑";
  font-weight: bolder;
  border: 2px solid rgba(200, 155, 155, 0.3);
  padding-left: 20px;
  margin: 0 auto;
  box-sizing: border-box;
  background: url("../../../assets/imgs/allow.png") no-repeat 120px center;
  /*添加过度效果*/
  transition: all 0.3s linear;
  position: relative;
  transform: rotate(180deg);
}

.button:hover .line {
  background: yellow;
}
.a {
  overflow: hidden;
}
.a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
  background-position: 20px center;
}

.a span {
  position: absolute;
  display: block;
}

.a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

.a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

.a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

.a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>