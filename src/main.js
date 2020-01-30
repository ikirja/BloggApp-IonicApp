import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Ionic from '@ionic/vue'
import "@ionic/core/css/core.css"
import "@ionic/core/css/ionic.bundle.css"

const moment = require('moment')
require('moment/locale/ru')

Vue.use(Ionic)
Vue.use(require('vue-moment'), { moment })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
