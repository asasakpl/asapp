<template>
  <v-container fluid>
    <Navigation />
    <router-view></router-view>
    <Success v-if="this.$store.state.success"></Success>
    <Error v-if="this.$store.state.error"></Error>
  </v-container>
</template>

<style scoped></style>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import Navigation from '@/components/Navigation.vue'
import Success from '@/components/Success.vue'
import Error from '@/components/Error.vue'

export default Vue.extend({
  components: {
    Navigation,
    Success,
    Error
  },
  data() {
    return {
      user: []
    }
  },
  beforeMount() {
    this.$i18n.locale = localStorage.getItem('i18n')

    if (localStorage.getItem('theme') == 'dark') {
      this.$vuetify.theme.dark = true
    } else {
      this.$vuetify.theme.dark = false
    }
  }
})
</script>
