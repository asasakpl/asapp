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
              maxLength="78"
              v-model="title"
            ></v-text-field>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-textarea
              counter
              outlined
              :rules="rules"
              label="Wiadomość"
              auto-grow
              maxLength="998"
              v-model="message"
            ></v-textarea>
          </v-card-text>

          <v-row class="mr-3">
            <v-spacer></v-spacer>
            <v-btn
              @click="dialog = true"
              :disabled="message.length <= 0 || title.length <= 0"
            >
              Wyślij
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title primary-title v-html="title"> </v-card-title>

        <v-card-text v-html="message"> </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" large text @click="sendMessage()">
            Wyślij
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Error v-if="error"></Error>
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
import Error from '@/components/Error.vue'

export default Vue.extend({
  data() {
    return {
      title: '',
      message: '',
      dialog: false,
      display: false,
      disabled: true,
      error: false,
      rules: [(v) => v.length <= 998 || 'Maksymalnie 998 znaków!'],
      titleRule: [(v) => v.length <= 78 || 'Maksymalnie 78 znaków!']
    }
  },
  components: {
    Error
  },
  methods: {
    async sendMessage() {
      await axios
        .post(
          '/asasak/send',
          {
            title: this.title,
            message: this.message
          },
          {
            headers: {
              auth: localStorage.getItem('token')
            }
          }
        )
        .then((res) => {
          this.dialog = false
          const text = 'mail.message.success'
          const icon = 'email-send'
          this.$store.dispatch('success', { text, icon })
          this.$router.push('/asasak')
        })
        .catch((err) => {
          const text = 'mail.message.error'
          const icon = 'email-alert'
          this.$store.dispatch('error', { text, icon })
          this.dialog = false
          this.error = true
        })
    }
  }
})
</script>
