<template>
  <v-container>
    <v-card class="mx-auto px-auto" max-width="90%" tile>
      <v-card-title>Dashboard</v-card-title>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

export default Vue.extend({
  components: {
    DashboardLayout
  },
  data() {
    return {
      name: localStorage.getItem('m_name')
    }
  },
  methods: {
    async getUserdata() {}
  },
  beforeMount() {
    this.getUserdata()
  }
})
</script>
