<template>
  <v-snackbar bottom v-model="display" color="error" :timeout="0" class="mb-1">
    <div class="pl-6">
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
        if (this.error === true) {
          this.display = true
        } else {
          this.display = false
        }
      }, 5000)
    }
  }
})
</script>
