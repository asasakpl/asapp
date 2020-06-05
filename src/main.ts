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

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://api.moje35metrow.pl/v1'
} else if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3000/v1'
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
