import Vue from "vue";
import VueRx from "vue-rx";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.config.productionTip = false;
Vue.use(VueRx);
Vue.use(VueAxios, axios);

import "@/assets/global.scss";
import App from "./App.vue";

new Vue({
  render: h => h(App)
}).$mount("#app");
