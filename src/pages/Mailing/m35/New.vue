<template>
  <v-container>
    <v-row>
      <v-col cols="1">
        <v-btn @click="$router.go(-1)" icon fab>
          <v-icon large>arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-card class="mx-auto px-auto pb-2 round" max-height="84vh" tile>
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
            <tiptap-vuetify
              :extensions="extensions"
              v-model="message"
              :rules="rules"
              counter
              :toolbar-attributes="{ color: 'primary' }"
              outlined
              maxLength="998"
            />
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

// Components
import {
  // component
  TiptapVuetify,
  // extensions
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
  Image,
  TodoList,
  TodoItem,
  Table,
  TableCell,
  TableHeader,
  TableRow
} from 'tiptap-vuetify'

export default Vue.extend({
  components: {
    TiptapVuetify
  },
  data() {
    return {
      extensions: [
        History,
        Blockquote,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3]
            }
          }
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ],
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
  methods: {
    async sendMessage() {
      await axios
        .post(
          '/mail/updates',
          {
            title: this.title,
            html: this.message
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
          this.$router.push('/m35')
        })
        .catch((err) => {
          let text
          let icon
          if (!err.response) {
            // network error
            text = 'Check your internet connection'
            icon = 'network-strength-off'
          } else {
            text = 'mail.message.error'
            icon = 'email-alert'
          }

          this.$store.dispatch('error', { text, icon })
          this.dialog = false
        })
    }
  }
})
</script>
