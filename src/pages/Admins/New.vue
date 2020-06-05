<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="$router.push('/admins')" icon fab class="mt-2">
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="11">
        <v-content v-if="admin" class="pa-0">
          <v-card class="mx-auto pb-2 round" max-height="80vh" tile>
            <v-card-title class="pb-2">{{
              $t('admin.new.title')
            }}</v-card-title>
            <v-divider></v-divider>
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
                    ></v-text-field>
                  </v-col>
                  <v-col class="pb-0">
                    <div class="headline ml-1 mb-3">
                      {{ $t('admin.page.email') }}
                    </div>
                    <v-text-field
                      v-model="admin.email"
                      outlined
                      :rules="emailRules"
                    ></v-text-field>
                  </v-col>
                  <v-col class="pb-0">
                    <div class="headline">{{ $t('admin.page.type') }}</div>
                    <v-select
                      :items="types"
                      v-model="admin.type"
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

            <v-row class="mr-3">
              <v-spacer></v-spacer>
              <v-btn
                @click="createAdmin(admin)"
                color="primary"
                class="mr-4 mb-4"
                >Create</v-btn
              >
            </v-row>
          </v-card>
          <Error v-if="error"></Error>
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

// components
import Error from '@/components/Error.vue'

export default Vue.extend({
  components: {
    Error
  },
  data() {
    return {
      admin: {
        password: null,
        type: { name: 'Pracownik', value: 0 }
      },
      types: [
        { name: 'Pracownik', value: 0 },
        { name: 'Administrator', value: 1 }
      ],
      save: false,
      error: false,
      show: false,
      rePassword: null,
      emailRules: [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ],
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => (v && v.length >= 12) || 'Min 12 characters'
      }
    }
  },
  methods: {
    async createAdmin(admin) {
      this.error = false
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
          const text = 'admin.error'
          const icon = 'database-remove'
          this.$store.dispatch('error', { text, icon })
          this.error = true
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
