import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import VueMask from 'v-mask'
Vue.use(VueMask);

import 'normalize.css'
import './assets/montserrat.css'
import './assets/global.scss'

Vue.config.productionTip = false
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
