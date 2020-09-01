<template>
  <div id="app">
    <topMenu></topMenu>
    <router-view></router-view>
    <footer>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</footer>
  </div>
</template>

<script>
import topMenu from "./components/topMenu";
export default {
  name: "App",
  components: { topMenu },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  width: 100%;
  /* overflow-x: hidden; */
}
body {
  background-color: #e1e1e1;
  font-size: 14px;
}
footer{
  width:100%;
  height:80px;
  background-color: #fff;
  line-height: 80px;
  color:#ababab;
  font-size: 20px;
}
</style>
