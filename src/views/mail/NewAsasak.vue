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
          max-height="84vh"
          tile
        >
          <v-card-title class="pb-0">
            <v-text-field
              outlined
              counter
              :rules="titleRule"
              label="Tytuł"
            ></v-text-field>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-textarea
              counter
              outlined
              :rules="rules"
              label="Wiadomość"
            ></v-textarea>
          </v-card-text>

          <v-row class="mr-3">
            <v-spacer></v-spacer>
            <v-btn large>
              Wyślij
            </v-btn>
          </v-row>
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
export default Vue.extend({
  data() {
    return {
      rules: [v => v.length <= 998 || 'Maksymalnie 998 znaków!'],
      titleRule: [v => v.length <= 78 || 'Maksymalnie 78 znaków!']
    }
  },
  methods: {
    select() {
      console.log(window.getSelection())
    }
  }
})
</script>
