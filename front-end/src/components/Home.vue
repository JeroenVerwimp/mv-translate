<template>
  <div class="content">
    <div class="info">
      <h1 class="title">Translate</h1>
      <div class="line"></div>
      <p>
        Translate is de gloednieuwe vertaalapplicatie van Mercier Vanderlinden. Nederlands naar Frans, en omgekeerd, vertalen is nog nooit zo gemakkelijk geweest.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam enim, porta non nisl eget, venenatis fringilla ligula.
        Aenean sodales dapibus leo et tincidunt. Duis malesuada neque eget est congue scelerisque. Curabitur tristique risus a quam laoreet finibus.
        Vivamus faucibus nibh id eros viverra, quis rutrum odio condimentum.
      </p>
    </div>
    <div class="translate">
      <Translator />
    </div>
  </div>
</template>

<script>
import Translator from "./translator/Translator.vue";

export default {
  name: "Home",
  components: {
    Translator
  }
};
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  max-width: 1400px;
}

.info {
  padding: 20px;
  flex: 2;

  h1 {
    margin-top: 0px;
  }

  .line {
    width: 100px;
    height: 3px;
    background-color: #5d4b75;
  }

  p {
    text-align: justify;
  }
}

.translate {
  flex: 3;
}

@media (min-width:1025px) {
  .content {
    display: flex;
  }

  .info {
    padding-right: 40px;
  }

  .translate {
    margin-top: 20px;
  }
}
</style>
