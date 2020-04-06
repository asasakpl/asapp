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
          v-if="asasak"
        >
          <v-img
            :aspect-ratio="16 / 9"
            src="@/assets/newsletter/asasak.jpg"
            max-height="400"
          >
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
            >
              <v-icon>mdi-email-edit-outline</v-icon>
            </v-btn>
            <div class="font-weight-light white--text title mb-2">
              Newsletter asasak.pl
            </div>
          </v-card-text>
        </v-card>

        <v-content v-else align="center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-content>
      </v-col>
    </v-row>
    <v-snackbar bottom v-model="display" color="success" :timeout="4000">
      {{ $t('mail.new.success') }} <v-icon>mdi-{{ icon }}</v-icon>
    </v-snackbar>
    <Success></Success>
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
    Error,
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
          value: 'address',
        },
        { text: 'name', value: 'name' },
      ],
      emailRules: [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
      ],
    }
  },
  methods: {
    addMember(member) {
      axios
        .post('/asasak/add', { email: member.email, name: member.name })
        .then((res) => {
          this.dialog = false
          this.display = true
          this.getMembers()
          this.member = {}
        })
        .catch((err) => {
          this.dialog = false
          const text = 'mail.new.error'
          const icon = 'email-alert'
          this.$store.dispatch('error', { text, icon })
          this.conflict = true
        })
    },
    newEmail() {
      this.$router.push(`/asasak/new`)
    },
    async getMembers() {
      axios
        .get('/mail/asasak')
        .then((res) => {
          this.error = false
          this.asasak = res.data.data.asasak
        })
        .catch((err) => {
          this.error = true
        })
    },
  },
  async mounted() {
    this.getMembers()
  },
})
</script>
