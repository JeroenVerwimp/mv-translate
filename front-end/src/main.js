import Vue from "vue";
import Vuex from "vuex";
import VueRx from "vue-rx";
import VueAxios from "vue-axios";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRx);
Vue.use(VueAxios, axios);

import "@/assets/global.scss";
import App from "./App.vue";

const store = new Vuex.Store({
  state: {
    languages: [
      {
        code: "nl",
        name: "Nederlands"
      },
      {
        code: "fr",
        name: "Français"
      },
      {
        code: "en",
        name: "English"
      }
    ],
    sourceLanguage: "nl",
    targetLanguage: "fr"
  },
  mutations: {
    changeSource(state, newLanguage) {
      state.sourceLanguage = newLanguage;
    },
    changeTarget(state, newLanguage) {
      state.targetLanguage = newLanguage;
    },
    swapLanguages(state) {
      const tempSl = state.sourceLanguage;
      state.sourceLanguage = state.targetLanguage;
      state.targetLanguage = tempSl;
    }
  },
  getters: {
    getLanguagesSorted: state => {
      return state.languages.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
});

new Vue({
  render: h => h(App),
  store: store
}).$mount("#app");
