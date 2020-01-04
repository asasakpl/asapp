import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from './store'
import axios from 'axios'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
