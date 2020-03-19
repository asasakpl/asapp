<template>
  <v-snackbar bottom v-model="display" color="error" :timeout="4000">
    {{ $t(text) }} <v-icon class="ml-2">mdi-{{ icon }}</v-icon>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      text: this.$store.getters.setError.text,
      icon: this.$store.getters.setError.icon,
      display: this.$store.getters.setError.error
    }
  }
})
</script>
