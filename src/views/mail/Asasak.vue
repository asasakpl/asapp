<template>
  <v-container>
    <v-btn @click="$router.go(-1)" icon class="ml-8">
      <v-icon size="32">arrow_back</v-icon>
    </v-btn>

    <v-card
      class="mx-auto px-auto pb-2 round"
      max-width="90%"
      max-height="80vh"
      tile
      v-if="asasak"
    >
      <v-card-title>Newsletter asasak.pl</v-card-title>
      <v-divider></v-divider>
      <v-row class="justify-space-between">
        <v-col cols="4" class="pr-4 ml-1 mr-12">
          <v-col class="pb-0">
            <div class="headline ml-1 mb-3">
              {{ $t('mail.single.title') }}
            </div>

            <div class="title ml-1 mb-3">{{ asasak.list.name }}</div>
          </v-col>

          <v-col class="pb-0">
            <div class="headline ml-1 mb-3">
              {{ $t('mail.single.description') }}
            </div>

            <div class="title ml-1 mb-3">{{ asasak.list.description }}</div>
          </v-col>
        </v-col>
        <v-col cols="4" class="pr-2 mr-6" style="overflow: auto">
          <v-col>
            <v-row class="mb-2 justify-space-between">
              <div class="headline ml-1 mb-3">
                {{ $t('mail.single.members') }}
              </div>

              <v-btn icon class="ml-8" large>
                <v-icon size="32">mdi-account-plus</v-icon>
              </v-btn>
            </v-row>

            <v-data-table
              v-if="!error"
              :headers="headers"
              :items="asasak.members"
              style="overflow: scrollable;"
              class="elevation-4 round"
              :items-per-page="16"
              :search="search"
              :page.sync="page"
              hide-default-footer
              @page-count="pageCount = $event"
            >
              <template
                v-for="header in headers"
                v-slot:[`header.${header.value}`]
              >
                {{ $t(`mail.table.${header.text}`) }}
              </template>
            </v-data-table>
            <v-data-table
              v-else
              loading
              hide-default-footer
              loading-text="Loading... Please wait"
            ></v-data-table>
            <div class="text-center pt-2">
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </div>
          </v-col>
        </v-col>
      </v-row>
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
      asasak: null,
      search: '',
      page: 1,
      pageCount: 0,
      headers: [
        {
          text: 'email',
          value: 'address'
        },
        { text: 'name', value: 'name' }
      ]
    }
  },
  async mounted() {
    axios
      .get('/mail/asasak')
      .then(res => {
        this.error = false
        this.asasak = res.data.data.asasak
      })
      .catch(err => {
        this.error = true
      })
  }
})
</script>
