<template>
  <v-container>
    <v-card class="mx-auto px-auto round" tile round max-width="90%">
      <v-card-title>
        Ustawienia
      </v-card-title>
      <v-card-title>
        <v-switch
          color="primary"
          label="Motyw aplikacji"
          v-model="themeColor"
          @change="changeTheme()"
        ></v-switch>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 20px;
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      themeColor: this.$vuetify.theme.dark
    }
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
})
</script>
