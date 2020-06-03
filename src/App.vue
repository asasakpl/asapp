<template>
  <v-app>
    <v-system-bar lights-out height="28" class="drag pr-0" app>
      <span>
        <v-img src="@/assets/m35logo.png" class="mr-3" width="80" height="15" />
      </span>
      <v-spacer></v-spacer>
      <div style="font-weight: 100">{{ dev }}</div>
      <v-spacer></v-spacer>
      <v-btn tile icon class="no-drag" small v-on:click="minimize()">
        <v-icon size="24">mdi-minus</v-icon>
      </v-btn>
      <v-btn tile icon class="no-drag" small v-on:click="maximize()">
        <v-icon size="18">mdi-crop-square</v-icon>
      </v-btn>
      <v-btn tile icon class="no-drag" small v-on:click="close()">
        <v-icon size="20">close</v-icon>
      </v-btn>
    </v-system-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<style>
.app-name {
  font-weight: 600;
}

.drag {
  -webkit-app-region: drag;
  overflow: hidden;
}

.no-drag {
  -webkit-app-region: no-drag;
}
</style>

<script>
import Vue from 'vue'
import axios from 'axios'
import { remote } from 'electron'

export default Vue.extend({
  data() {
    return {
      dev: ''
    }
  },
  created: function() {
    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err
      })
    })

    if (process.env.NODE_ENV === 'development') {
      this.dev = 'Development version'
    }
  },
  methods: {
    minimize() {
      const window = remote.BrowserWindow.getFocusedWindow()
      window.minimize()
    },
    maximize() {
      const window = remote.BrowserWindow.getFocusedWindow()
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    },
    close() {
      const window = remote.getCurrentWindow()
      window.close()
    }
  }
})
</script>
