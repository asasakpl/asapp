<template>
  <v-container>
    <NetworkError :error="error"></NetworkError>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import NetworkError from '@/components/NetworkError.vue'

export default Vue.extend({
  data() {
    return {
      error: true
    }
  }
})
</script>
