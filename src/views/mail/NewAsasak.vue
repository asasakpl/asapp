<template>
  <v-container>
    <v-row>
      <v-btn @click="$router.go(-1)" icon class="ml-12">
        <v-icon size="32">arrow_back</v-icon>
      </v-btn>

      <v-col>
        <v-card
          class="mx-auto px-auto pb-2 round"
          max-width="90%"
          max-height="80vh"
          tile
        >
          <v-card-title class="pb-0">
            <v-col cols="12" sm="8">
              <v-text-field outlined label="Tytuł" width="350"></v-text-field>
            </v-col>
          </v-card-title>
          <v-divider></v-divider>
          <v-row></v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 8px;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>
