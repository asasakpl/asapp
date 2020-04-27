<template>
  <v-container>
    <v-content v-if="release" class="pa-0">
      <v-card class="mx-auto mb-4 round" max-width="90%" tile>
        <v-card-title class="px-8 display-1" style="font-weight: 300;">
          <div class="mr-2" style="font-weight: 400;">Release</div>
          {{ release.tag_name }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text
          class="text--primary px-8"
          style="overflow: scroll; max-height: 90vh;"
          v-html="release.body"
        ></v-card-text>
        <v-card-actions class="px-4">
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3 mr-3" size="40">
              <v-img class="elevation-6" :src="release.author.avatar_url"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ release.author.login }}</v-list-item-title>
            </v-list-item-content>

            <v-row align="center" justify="end">
              <v-icon class="mr-1">mdi-calendar-month</v-icon>
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
import Vue from "vue";
import axios from "axios";
import marked from "marked";

export default Vue.extend({
  components: {},
  data() {
    return {
      release: null
    };
  },
  async mounted() {
    await fetch("https://api.github.com/repos/asasakpl/asapp/releases/latest")
      .then(response => response.json())
      .then(data => {
        this.release = data;
        this.release.body = marked(this.release.body, { breaks: true });
        let date = new Date(this.release.published_at);
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        this.release.published_at =
          " " +
          ("0" + date.getDate()).slice(-2) +
          " " +
          monthNames[date.getMonth()] +
          " " +
          date.getFullYear();
        console.log(this.release.tag_name);
      })
      .catch(err => {
        console.log(err);
      });
  }
});
</script>
