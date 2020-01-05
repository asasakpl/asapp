<template>
  <v-app>
    <v-system-bar app lights-out height="28" class="drag">
      <span>
        <v-img src="./assets/m35logo.png" class="mr-3" width="80" height="15" />
      </span>
      <v-spacer></v-spacer>
      <v-btn tile icon class="no-drag" v-on:click="minimize()">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn tile icon class="no-drag " v-on:click="maximize()">
        <v-icon>mdi-crop-square</v-icon>
      </v-btn>
      <v-btn tile icon class="no-drag" v-on:click="minimize()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-system-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<style>
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
  created: function() {
    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err
      })
    })
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
      const window = remote.BrowserWindow.getFocusedWindow()
      window.close()
    }
  }
})
</script>
