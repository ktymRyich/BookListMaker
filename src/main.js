import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import mysql from "mysql";

Vue.config.productionTip = false;

new Vue({
    axios,
    VueAxios,
    vuetify,
    router,
    mysql,
    render: (h) => h(App),
}).$mount("#app");
