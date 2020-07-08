import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import VueMask from 'v-mask'
import VueMeta from 'vue-meta'
import Vuelidate from 'vuelidate'
import VueFilterDateFormat from 'vue-filter-date-format';

Vue.use(VueFilterDateFormat);
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(VueMask)

import 'normalize.css'
import './assets/montserrat.css'
import './assets/global.scss'

Vue.config.productionTip = false
Vue.use(VueCookies)

// ADD METHOD TO LOG WITHOUT PROTO
window.console.hideProto = function (data, title) {
  console.group('-------------------GROUP---------------------')
  if (title) {
    console.log(title.toUpperCase())
  }
  console.log('')
  console.dir(JSON.parse(JSON.stringify(data)))
  console.log('')
  console.groupEnd();
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
