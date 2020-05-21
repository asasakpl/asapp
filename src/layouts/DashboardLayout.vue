<template>
  <v-container fluid>
    <Navigation />
    <router-view></router-view>
  </v-container>
</template>

<style scoped></style>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import Navigation from "@/components/Navigation.vue"

export default Vue.extend({
  components: {
    Navigation
  },
  data() {
    return {
      user: []
    }
  },
  beforeMount() {
    this.$i18n.locale = localStorage.getItem("i18n")

    if (localStorage.getItem("theme") == "dark") {
      this.$vuetify.theme.dark = true
    } else {
      this.$vuetify.theme.dark = false
    }
  }
})
</script>
