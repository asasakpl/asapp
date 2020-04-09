<template>
  <v-container>
    <v-content v-if="release">
      <v-card class="mx-auto mb-4 round" max-width="90%" tile>
        <v-card-title class="px-8 display-1 font-weight-bold">
          <div>Release {{ release.tag_name }}</div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text--primary px-8" v-html="release.body">
        </v-card-text>
        <v-card-actions class="px-4">
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3" size="46">
              <v-img
                class="elevation-4"
                :src="release.author.avatar_url"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ release.author.login }}</v-list-item-title>
            </v-list-item-content>

            <v-row align="center" justify="end">
              <v-icon class="mr-1">mdi-clock-outline</v-icon>
              <span class="subheading">{{ release.published_at }}</span>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </v-content>
    <v-content v-else align="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-content>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 8px;
}

.scrollable {
  max-height: 93vh;
  overflow: scroll;
}
</style>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import marked from 'marked'

export default Vue.extend({
  components: {},
  data() {
    return {
      release: null,
    }
  },
  async mounted() {
    await fetch('https://api.github.com/repos/asasakpl/asapp/releases/latest')
      .then((response) => response.json())
      .then((data) => {
        this.release = data
        this.release.body = marked(this.release.body, { breaks: true })
        let date = new Date(this.release.published_at)
        this.release.published_at =
          ' ' +
          ('0' + date.getHours()).slice(-2) +
          ':' +
          ('0' + date.getMinutes()).slice(-2) +
          ':' +
          ('0' + date.getSeconds()).slice(-2) +
          ' ' +
          ('0' + date.getDate()).slice(-2) +
          '/' +
          ('0' + (date.getMonth() + 1)).slice(-2) +
          '/' +
          date.getFullYear()
        console.log(this.release.tag_name)
      })
      .catch((err) => {
        console.log(err)
      })
  },
})
</script>
