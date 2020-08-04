<template>
  <div id="app">
    <Header/>
    <Home/>
  </div>
</template>

<script>
import Header from "./components/layout/Header.vue";
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Header,
    Home
  }
};
</script>

<style lang="scss">
#app {
  margin-top: 0px;
  color: #5D4B75;
}
</style>
