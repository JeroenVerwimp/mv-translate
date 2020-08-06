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
  }
});

new Vue({
  render: h => h(App),
  store: store
}).$mount("#app");
