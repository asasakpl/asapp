<template>
  <v-snackbar bottom v-model="display" color="success" :timeout="4000">
    {{ $t(text) }} <v-icon class="ml-2">mdi-{{ icon }}</v-icon>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      text: this.$store.getters.setSuccess.text,
      icon: this.$store.getters.setSuccess.icon,
      display: this.$store.getters.setSuccess.success
    }
  }
})
</script>
