import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from './store'
import axios from 'axios'
import i18n from './i18n'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['auth'] = token
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
