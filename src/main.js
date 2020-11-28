import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCookies from 'vue-cookies'
import VueMask from 'v-mask'
import VueMeta from 'vue-meta'
import VueFilterDateFormat from 'vue-filter-date-format';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);
Vue.use(VueFilterDateFormat);
Vue.use(VueMeta)
Vue.use(VueMask)

import 'normalize.css'
import './assets/scss/main.scss'
import '@/components/ui'
import '@/components/icons'

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
