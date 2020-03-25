<template>
  <v-container>
    <v-btn @click="$router.go(-1)" icon class="ml-8">
      <v-icon size="32">arrow_back</v-icon>
    </v-btn>
    <v-card
      class="mx-auto px-auto pb-2 round"
      max-width="90%"
      max-height="80vh"
      tile
      v-if="m35"
    >
      {{ m35 }}
    </v-card>

    <v-content v-else align="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-content>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data() {
    return {
      m35: null
    }
  },
  async mounted() {
    axios.get('/mail/m35').then(res => {
      this.m35 = res.data.data.m35.list
    })
  }
})
</script>
