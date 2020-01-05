<template>
  <v-container>
    <v-row justify="space-around">
      <Navigation />
      <router-view></router-view>
      <v-footer app>
        <v-spacer />
        <span>asapp &copy; 2019</span>
      </v-footer>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import Navigation from '@/components/Navigation.vue'

export default Vue.extend({
  name: 'DashboardLayout',
  components: {
    Navigation
  },
  data() {
    return {
      user: []
    }
  }
})
</script>
