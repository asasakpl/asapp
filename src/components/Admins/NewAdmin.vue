<template>
  <v-container>
    <v-btn @click="$router.go(-1)" icon class="ml-8">
      <v-icon size="32">arrow_back</v-icon>
    </v-btn>
    <v-content v-if="admin">
      <v-card
        class="mx-auto px-auto pb-2 round"
        max-width="90%"
        max-height="80vh"
        tile
      >
        <v-card-title class="pb-2">
          {{ $t('admin.new.title') }}
        </v-card-title>
        <v-divider></v-divider>

        <v-row>
          <v-col cols="4" class="pr-2 ml-6">
            <v-col class="pb-0">
              <div class="headline ml-1 mb-3">
                {{ $t('admin.page.name') }}
              </div>
              <v-text-field
                v-model="admin.firstName"
                outlined
                :disabled="disabled"
              ></v-text-field>
            </v-col>
            <v-col class="pb-0">
              <div class="headline ml-1 mb-3">
                {{ $t('admin.page.email') }}
              </div>
              <v-text-field
                v-model="admin.email"
                outlined
                :disabled="disabled"
                :rules="emailRules"
              ></v-text-field>
            </v-col>
            <v-col class="pb-0">
              <div class="headline">
                {{ $t('admin.page.type') }}
              </div>
              <v-select
                :items="types"
                :disabled="disabled"
                v-model="admin.type"
                item-text="title"
                v-bind:label="$t('order.delivery.products.dialog.set_status')"
              >
              </v-select>
            </v-col>
          </v-col>
          <v-col cols="4" class="pr-2 ml-6">
            <v-col class="pb-0">
              <div class="headline ml-1 mb-3">
                {{ $t('admin.page.surname') }}
              </div>
              <v-text-field
                v-model="admin.lastName"
                outlined
                :disabled="disabled"
              ></v-text-field>
            </v-col>

            <v-col class="pb-0">
              <div class="headline ml-1 mb-3">
                {{ $t('admin.new.password') }}
              </div>
              <v-text-field
                v-model="admin.password"
                outlined
                :disabled="disabled"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
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
                :disabled="disabled"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min, passwordConfirmationRule]"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
              ></v-text-field>
            </v-col>
          </v-col>
        </v-row>

        <v-row class="mr-3">
          <v-spacer></v-spacer>
          <v-btn @click="createAdmin(admin)" color="primary" class="mr-4 mb-4"
            >Create</v-btn
          >
        </v-row>
      </v-card>
    </v-content>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 8px;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      admin: {
        password: null
      },
      types: [0, 1],
      save: false,
      show: false,
      rePassword: null,
      emailRules: [
        v =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 12 || 'Min 12 characters'
      }
    }
  },
  methods: {
    createAdmin(admin) {
      console.log(admin)
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
