<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
    font-size: 25px;
  }
  @media screen and (max-width: 768px) {
    html {
      font-size: 20px;
    }
  }
  
html,
body,
#app {
  width: 100%;
  height: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body,
dd,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
html,
img,
legend,
li,
ol,
p,
ul {
  margin: 0;
  padding: 0;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
}

button,
fieldset,
img,
input {
  border: none;
  padding: 0;
  margin: 0;
  outline-style: none;
}
ol,
ul {
  list-style: none;
}

input {
  padding-top: 0;
  padding-bottom: 0;
  font-family: "Arial","SimSun", "宋体";
}

input,
select {
  vertical-align: middle;
}

input,
select,
textarea {
  font-size: 12px;
  margin: 0;
}
textarea {
  resize: none;
}

/*防止拖动*/
img {
  border: 0;
  vertical-align: middle;
}

/*  去掉图片底侧默认的3像素空白缝隙*/
table {
  border-collapse: collapse;
}
//去斜体
i {
  font-style: normal;
}
body {
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
  color: #666;
  background: #fff;
  margin: 0 auto;
  min-width: 320px;
}

a {
  color: #666;
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-decoration: none;
  font-weight: normal;
  font-size: 100%;
  font-family: PingFangSC-Light, helvetica, "Heiti SC";
}

.ac {
  text-align: center;
}

div {
  box-sizing: border-box;
  outline: none;
}

.clearfix {
  display: block;
  zoom: 1;

  &:after {
      content: " ";
      display: block;
      font-size: 0;
      height: 0;
      clear: both;
      visibility: hidden;
  }
}
</style>
