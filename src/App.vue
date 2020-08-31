<template>
  <div id="app">
    <topMenu></topMenu>
    <router-view></router-view>
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
}
</style>
