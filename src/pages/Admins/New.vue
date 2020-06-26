<template>
  <v-container>
    <v-row>
      <v-col align="center">
        <v-btn @click="$router.push('/admins')" icon fab class="mt-2">
          <v-icon large>arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="11">
        <v-content v-if="admin" class="pa-0">
          <v-card class="mx-auto pb-2 round" max-height="80vh" tile>
            <v-card-title class="pb-2">{{
              $t('admin.new.title')
            }}</v-card-title>
            <v-divider></v-divider>
            <v-form v-model="isValidAdmin">
              <v-card-actions>
                <v-row>
                  <v-col cols="5" class="pr-2 ml-6">
                    <v-col class="pb-0">
                      <div class="headline ml-1 mb-3">
                        {{ $t('admin.page.name') }}
                      </div>
                      <v-text-field
                        v-model="admin.firstName"
                        outlined
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col class="pb-0">
                      <div class="headline ml-1 mb-3">
                        {{ $t('admin.page.email') }}
                      </div>
                      <v-text-field
                        v-model="admin.email"
                        outlined
                        :rules="[rules.required, rules.email]"
                      ></v-text-field>
                    </v-col>
                    <v-col class="pb-0">
                      <div class="headline">{{ $t('admin.page.type') }}</div>
                      <v-select
                        :items="types"
                        v-model="admin.type"
                        label="Wybierz typ konta"
                        item-text="name"
                        item-value="value"
                      ></v-select>
                    </v-col>
                  </v-col>
                  <v-col cols="5" class="pr-2 ml-6">
                    <v-col class="pb-0">
                      <div class="headline ml-1 mb-3">
                        {{ $t('admin.page.surname') }}
                      </div>
                      <v-text-field
                        v-model="admin.lastName"
                        outlined
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>

                    <v-col class="pb-0">
                      <div class="headline ml-1 mb-3">
                        {{ $t('admin.new.password') }}
                      </div>
                      <v-text-field
                        v-model="admin.password"
                        outlined
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                      ></v-text-field>
                    </v-col>
                    <v-col class="pb-0">
                      <div class="headline ml-1 mb-3">
                        {{ $t('admin.new.repeat') }}
                      </div>
                      <v-text-field
                        v-model="rePassword"
                        outlined
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[
                          rules.required,
                          rules.min,
                          passwordConfirmationRule
                        ]"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                      ></v-text-field>
                    </v-col>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-form>

            <v-row class="mr-3">
              <v-spacer></v-spacer>
              <v-btn
                @click="createAdmin(admin)"
                color="primary"
                class="mr-4 mb-4"
                :disabled="!isValidAdmin"
                >Create</v-btn
              >
            </v-row>
          </v-card>
        </v-content>
      </v-col>
    </v-row>
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

export default Vue.extend({
  data() {
    return {
      admin: {
        password: null,
        type: null
      },
      types: [
        { name: 'Pracownik', value: 0 },
        { name: 'Administrator', value: 1 }
      ],
      save: false,
      show: false,
      rePassword: null,
      isValidAdmin: false,
      rules: {
        email: (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
        required: (value) => !!value || 'Required.',
        min: (v) => (v && v.length >= 12) || 'Min 12 characters'
      }
    }
  },
  methods: {
    async createAdmin(admin) {
      await axios
        .post('/admins/new', admin, {
          headers: {
            auth: localStorage.getItem('token')
          }
        })
        .then((res) => {
          const text = 'admin.success'
          const icon = 'database-check'
          this.$store.dispatch('success', { text, icon })
          this.$router.push('/admins')
        })
        .catch((err) => {
          let text
          let icon
          if (!err.response) {
            // network error
            text = 'Check your internet connection'
            icon = 'network-strength-off'
          } else {
            text = 'admin.error'
            icon = 'database-remove'
          }

          this.$store.dispatch('error', { text, icon })
        })
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.admin.password === this.rePassword || 'Password must match'
    }
  }
})
</script>
