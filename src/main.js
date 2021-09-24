import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/layout.css'
import '../node_modules/vditor/src/assets/scss/index.scss'
import Axios from 'axios'


let config = {
  baseURL: "https://localhost:8011/api/"
}

const axios = Axios.create(config)

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
