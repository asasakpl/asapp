<template>
  <v-app>
    <v-content>
      <v-system-bar color="white" lights-out>
        <span>
          <v-img src="./assets/m35logo.png" class="mr-3" width="80" height="15" />
        </span>
        <v-spacer></v-spacer>
        <v-btn tile color="teal" icon @click="minimize()">
          <v-icon>minimize</v-icon>
        </v-btn>
        <v-btn tile color="teal" icon @click="maximize()">
          <v-icon>crop_square</v-icon>
        </v-btn>
        <v-btn tile color="teal" icon @click="minimize()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-system-bar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<style scoped>
.v-application .white {
  background-color: transparent !important;
  border-color: transparent !important;
}
</style>

<script lang="ts">
import Vue from "vue";
import { remote } from "electron";

export default Vue.extend({
  name: "App",
  methods: {
    minimize() {
      const window = remote.BrowserWindow.getFocusedWindow();
      window.minimize();
    },
    maximize() {
      const window = remote.BrowserWindow.getFocusedWindow();
      if (window.isMaximized()) {
        window.unmaximize();
      } else {
        window.maximize();
      }
    },
    close() {
      const window = remote.BrowserWindow.getFocusedWindow();
      window.close();
    }
  }
});
</script>
