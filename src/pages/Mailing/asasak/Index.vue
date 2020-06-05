<template>
  <v-container fluid>
    <v-row>
      <v-col cols="1" class="pt-1 px-10" align="end">
        <v-btn to="/mail" icon fab>
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col class="pa-0" cols="11">
        <v-card
          class="mx-auto px-auto round"
          max-height="80vh"
          max-width="95%"
          tile
          v-if="asasak"
        >
          <v-img
            :aspect-ratio="16 / 9"
            src="@/assets/newsletter/asasak.jpg"
            max-height="400"
          >
            <v-row
              class="lightbox white--text pa-2 fill-height ml-1"
              align="end"
            >
              <v-col>
                <div class="display-1 font-weight-medium">asasak.pl</div>
              </v-col>
            </v-row>
          </v-img>
          <v-card-text class="pt-6" style="position: relative;">
            <v-btn
              absolute
              color="green"
              class="white--text"
              fab
              large
              right
              top
              to="/asasak/new"
            >
              <v-icon>mdi-email-edit-outline</v-icon>
            </v-btn>
            <div class="white--text title mb-2">
              <v-row>
                <v-col cols="6">
                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title class="headline font-weight-medium"
                          >Subskrybenci</v-list-item-title
                        >

                        <v-list-item-icon class="ma-0">
                          <v-btn icon large to="/asasak/subscribers">
                            <v-icon>mdi-account-group</v-icon>
                          </v-btn>
                          <v-list-item-title class="pl-1">
                            {{ asasak.list.members_count }}
                          </v-list-item-title>
                        </v-list-item-icon>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
        <div v-else align="center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    <v-snackbar bottom v-model="display" color="success" :timeout="4000">
      {{ $t('mail.new.success') }}
      <v-icon>mdi-{{ icon }}</v-icon>
    </v-snackbar>
    <Success v-if="this.$store.state.success"></Success>
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
      pageCount: 0,
      headers: [
        {
          text: 'email',
          value: 'address'
        },
        { text: 'name', value: 'name' }
      ],
      emailRules: [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ]
    }
  },
  methods: {
    async getInfo() {
      axios
        .get('/mail/asasak')
        .then((res) => {
          this.error = false
          this.asasak = res.data.asasak
        })
        .catch((err) => {
          this.error = true
        })
    }
  },
  async mounted() {
    this.getInfo()
  }
})
</script>
