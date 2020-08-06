<template>
  <div class="translator">
    <div class="box">
      <LanguageSelector :value="sl" @changed="sourceLangChanged" />
      <textarea v-model="content" v-stream:input="text$"></textarea>
    </div>
    <div class="arrow"><span>&#8594;</span></div>
    <div class="box">
      <LanguageSelector :value="tl" @changed="targetLangChanged" />
      <textarea :disabled="true" v-model="result"></textarea>
    </div>
  </div>
</template>

<script>
import { debounceTime, pluck } from "rxjs/operators";
import { mapState } from "vuex";

import config from "../../config";
import LanguageSelector from "./LanguageSelector.vue";

export default {
  name: "Translator",
  components: {
    LanguageSelector
  },
  domStreams: ["text$"],
  computed: mapState({
    sl: "sourceLanguage",
    tl: "targetLanguage"
  }),
  data,
  subscriptions,
  methods: {
    inputTextChanged,
    sourceLangChanged,
    targetLangChanged,
    swapContent,
    translate
  }
};

function data() {
  return {
    content: "",
    result: ""
  };
}

function subscriptions() {
  this.text$
    .pipe(debounceTime(400), pluck("event", "target", "value"))
    .subscribe(() => {
      // this.content = text;
      this.translate();
    });
}

function inputTextChanged(text) {
  this.content = text;
  this.translate();
}

function sourceLangChanged(newLang) {
  // Swap languages
  if (this.tl === newLang) {
    this.swapContent();
    return;
  }

  this.$store.commit("changeSource", newLang);
  this.translate();
}

function targetLangChanged(newLang) {
  // Swap languages
  if (this.sl === newLang) {
    this.swapContent();
    return;
  }

  this.$store.commit("changeTarget", newLang);
  this.translate();
}

function swapContent() {
  this.$store.commit("swapLanguages");

  const tempContent = this.content;
  this.content = this.result;
  this.result = tempContent;
}

function translate() {
  if (this.sl === this.tl || this.content === "") {
    this.result = this.content;
    return;
  }

  this.$http
    .get(config.API_URL + "/translate", {
      params: {
        sl: this.sl,
        tl: this.tl,
        content: this.content
      }
    })
    .then(response => {
      this.result = response.data.result;
    })
    .catch(error => {
      console.error(error);
    });
}
</script>

<style scoped lang="scss">
.translator {
  display: flex;
  flex-direction: column;

  padding: 20px;
}

.box {
  flex: 1;

  textarea {
    width: 100%;
    border: none;
    background-color: #f7f3f8;
    outline: none;
    resize: none;
    padding: 20px;
    margin-top: 15px;
    height: 180px;
  }
}

.arrow {
  flex: none;
  height: 60px;

  span {
    display: block;
    width: 60px;
    height: 60px;

    margin: 0 auto;

    text-align: center;
    font-size: 3rem;

    transform: rotate(90deg);
  }
}

@media (min-width: 1025px) {
  .translator {
    flex-direction: row;
  }

  .arrow {
    span {
      transform: none;
    }
  }

  .box {
    textarea {
      margin-top: 30px;
    }
  }
}
</style>
