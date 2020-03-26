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

              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn icon class="ml-8" large v-on="on">
                    <v-icon size="32">mdi-account-plus</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title
                    class="headline green accent-3 lighten-2 mb-4"
                    primary-title
                  >
                    {{ $t('mail.new.title') }}
                  </v-card-title>

                  <v-card-text>
                    <v-col class="pb-0">
                      <div class="headline ml-1 mb-3">
                        Email
                      </div>
                      <v-text-field
                        outlined
                        v-model="member.email"
                        :rules="emailRules"
                      ></v-text-field>
                    </v-col>
                    <v-col class="pb-0">
                      <div class="headline ml-1 mb-3">
                        {{ $t('mail.new.name') }}
                      </div>
                      <v-text-field
                        outlined
                        v-model="member.name"
                      ></v-text-field>
                    </v-col>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="dialog = false">
                      {{ $t('mail.new.cancel') }}</v-btn
                    >
                    <v-btn color="primary" text @click="addMember(member)">
                      {{ $t('mail.new.add') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>

            <v-data-table
              v-if="!error"
              :headers="headers"
              :items="asasak.members"
              style="overflow: scrollable;"
              class="elevation-4 round"
              :items-per-page="4"
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

    <v-snackbar bottom v-model="display" color="success" :timeout="4000">
      {{ $t('mail.new.success') }} <v-icon>mdi-{{ icon }}</v-icon>
    </v-snackbar>
    <Error v-if="conflict"></Error>
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
import Success from '@/components/Success.vue'
import Error from '@/components/Error.vue'

export default Vue.extend({
  components: {
    NetworkError,
    Success,
    Error
  },
  data() {
    return {
      error: true,
      asasak: null,
      search: '',
      page: 1,
      display: false,
      icon: 'email-check',
      dialog: false,
      conflict: false,
      member: {},
      pageCount: 0,
      headers: [
        {
          text: 'email',
          value: 'address'
        },
        { text: 'name', value: 'name' }
      ],
      emailRules: [
        v =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ]
    }
  },
  methods: {
    addMember(member) {
      axios
        .post('/asasak/add', { email: member.email, name: member.name })
        .then(res => {
          this.dialog = false
          this.display = true
          this.getMembers()
          this.member = {}
        })
        .catch(err => {
          this.dialog = false
          const text = 'mail.new.error'
          const icon = 'email-alert'
          this.$store.dispatch('error', { text, icon })
          this.conflict = true
        })
    },
    async getMembers() {
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
  },
  async mounted() {
    this.getMembers()
  }
})
</script>
