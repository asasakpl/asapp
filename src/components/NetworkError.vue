<template>
  <v-snackbar top v-model="display" color="error" :timeout="0">
    <div class="pl-5">
      Check your network connection
      <v-icon class="ml-12">mdi-network-strength-off</v-icon>
    </div>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['error'],
  data() {
    return {
      display: false
    }
  },
  async mounted() {
    if (this.error === true) {
      setTimeout(() => {
        this.display = true
      }, 3000)
    }
  }
})
</script>
