<template>
  <div class="wrapper">
    <div class="content">
      <div class="info">
        <h1 class="title">Translate</h1>
        <div class="line"></div>
        <p>
          Translate is de gloednieuwe vertaalapplicatie van Mercier Vanderlinden. Nederlands naar Frans, en omgekeerd, vertalen is nog nooit zo gemakkelijk geweest.
        </p>
      </div>
      <div class="details">
        <Translator />
      </div>
    </div>
    <div class="content content-rev">
      <div class="details file-details">
        <FileTranslator />
      </div>
      <div class="info">
        <h1 class="title">Files</h1>
        <div class="line"></div>
        <p>
          Mercier Vanderlinden Translate kan niet enkel woorden en zinnen vertalen, maar ook bestanden. Om een bestand te vertalen selecteerd u gewoon het bestand en de rest gebeurt vanzelf.
        </p>
      </div>
    </div>
    <div class="content">
      <div class="info">
        <h1 class="title">Mobile</h1>
        <div class="line"></div>
        <p>
          Vertaal eender wat, wanneer u wilt! Onderweg naar het werk of in een drukke business meeting? Geen probleem! Gebruikt gewoon je GSM, Translate heeft een gemakkelijk te gebruiken mobiele website.
        </p>
      </div>
      <div class="details">
        <img class="mobile" src="../assets/mobile.png" alt="mobile website">
      </div>
    </div>
  </div>
</template>

<script>
import Translator from "./translator/Translator.vue";
import FileTranslator from "./translator/FileTranslator.vue";

export default {
  name: "Home",
  components: {
    Translator,
    FileTranslator
  }
};
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  max-width: 1400px;
  padding-bottom: 40px;

  &.content-rev {
    display: flex;
    flex-direction: column-reverse;
  }
}

.info {
  padding: 20px;
  padding-bottom: 0px;
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

.details {
  flex: 3;

  img.mobile {
    display: block;
    margin: 0 auto;
    border: 5px solid #5d4b75;
    max-height: 500px;
  }
}

@media (min-width: 1025px) {
  .content {
    display: flex;

    &.content-rev {
      flex-direction: row;
    }
  }

  .info {
    padding-right: 40px;
  }

  .details {
    margin-top: 20px;
  }
}
</style>
