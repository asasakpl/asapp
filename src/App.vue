<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  created: function() {
    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject, next) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch(logout)
          next() // check if this is working
        }
        throw err
      })
    })
  }
})
</script>
