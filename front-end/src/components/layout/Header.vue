<template>
  <header>
    <div id="header">
      <div class="content logo">
        <img alt="Mercier Vanderlinden logo" src="../../assets/logo.png" />
      </div>
    </div>
    <section id="sub-header"></section>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped lang="scss">
#header {
  height: 112px;

  .logo {
    padding: 20px 0px;

    img {
      display: block;
      margin: 0 auto;
    }
  }
}

#sub-header {
  height: 20px;
  background-color: #5d4b75;
  margin-bottom: 50px;
}

@media (min-width:1025px) {
  #header .logo img {
    margin: initial;
  }
}
</style>
