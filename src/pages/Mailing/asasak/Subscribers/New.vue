<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="$router.go(-1)" icon fab>
          <v-icon large>arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="11">
        <v-form v-model="isValid">
          <v-card class="mx-auto ml-4 px-auto round" max-width="90%" tile>
            <v-card-title>Dodawanie nowego subskrybenta</v-card-title>
            <v-card-text>
              <v-row>
                <v-col class="mb-0 pb-0">
                  <v-text-field
                    outlined
                    label="Imie i nazwisko"
                    v-model="member.name"
                  ></v-text-field>
                </v-col>
                <v-col class="mb-0 pb-0">
                  <v-text-field
                    outlined
                    label="Email"
                    :rules="[rules.required, rules.email]"
                    v-model="member.email"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mr-3">
                <v-spacer></v-spacer>
                <v-btn
                  @click="addMember(member)"
                  color="#45d66b"
                  :disabled="!isValid"
                  >Dodaj</v-btn
                >
              </v-row>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <Error v-if="conflict"></Error>
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
import Error from '@/components/Error.vue'

export default Vue.extend({
  components: {
    Error
  },
  data() {
    return {
      member: {
        email: '',
        name: ''
      },
      conflict: false,
      isValid: false,
      rules: {
        required: (value) => !!value || 'Pole wymagane',
        email: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Adres email musi byc poprawny'
      }
    }
  },
  methods: {
    async addMember(member) {
      await axios
        .post('/asasak/add', { email: member.email, name: member.name })
        .then((res) => {
          const text = 'mail.subscriber.success'
          const icon = 'account-check'
          this.$store.dispatch('success', { text, icon })
          this.$router.push('/asasak/subscribers')
        })
        .catch((err) => {
          const text = 'mail.new.error'
          const icon = 'email-alert'
          this.$store.dispatch('error', { text, icon })
          this.conflict = true
        })
    }
  }
})
</script>
