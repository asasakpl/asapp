<template>
  <v-container fluid>
    <v-row>
      <Navigation />
      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<style scoped></style>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import Navigation from '@/components/Navigation.vue'

export default Vue.extend({
  components: {
    Navigation
  },
  created() {
    this.$vuetify.theme.dark = true
  },
  data() {
    return {
      user: []
    }
  }
})
</script>
