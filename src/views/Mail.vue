<template>
  <v-container>
    <v-card
      class="mx-auto px-auto pb-2 round"
      max-width="90%"
      max-height="80vh"
      tile
      v-if="m35"
    >
      <v-card-title>
        {{ $t('mail.title') }}
      </v-card-title>
      <v-list-item to="/m35">
        <v-list-item-content>
          <v-list-item-title>Moje35metrow.pl newsletter</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          {{ $t('mail.subscribers') }}: {{ m35.members_count }}
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/asasak">
        <v-list-item-content>
          <v-list-item-title>asasak.pl newsltter</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          {{ $t('mail.subscribers') }}: {{ asasak.members_count }}
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-content v-else align="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-content>
    <NetworkError :error="error"></NetworkError>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 8px;
}
</style>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import NetworkError from '@/components/NetworkError.vue'

export default Vue.extend({
  components: {
    NetworkError
  },
  data() {
    return {
      error: true,
      m35: null,
      asasak: null
    }
  },
  async mounted() {
    axios
      .get('/mail')
      .then(res => {
        this.error = false
        this.m35 = res.data.data.m35.list
        this.asasak = res.data.data.asasak.list
      })
      .catch(err => {
        this.error = true
      })
  }
})
</script>
