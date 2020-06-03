<template>
  <v-container>
    <v-row v-if="admin">
      <v-col cols="1" align="end">
        <v-btn @click="$router.push('/admins')" icon fab class="mt-2">
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-content class="pa-0 pl-5" style="overflow: scroll">
          <v-card
            class="round"
            style="overflow: scroll;"
            max-width="90%"
            max-height="80vh"
            tile
          >
            <v-card-title class="pb-2">
              {{ $t('admin.page.id') }}: {{ admin.id }}
              <v-spacer></v-spacer>
              <v-btn @click="editAdmin" large icon class="mb-1 pb-1">
                <v-icon size="32" class>mdi-pencil</v-icon>
              </v-btn>
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
                    {{ $t('admin.page.type') }}
                  </div>
                  <v-select
                    :items="types"
                    :disabled="disabled"
                    v-model="admin.type"
                    item-text="title"
                    v-bind:label="
                      $t('order.delivery.products.dialog.set_status')
                    "
                  ></v-select>
                </v-col>
              </v-col>
            </v-row>
          </v-card>
        </v-content>
      </v-col>
    </v-row>
    <v-row v-else>
        <v-btn @click="$router.push('/admins')" icon fab class="mt-4 ml-4">
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
      
        <v-content align="center" class="pl-0 mr-12 pr-12">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-content>
    </v-row>

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
    NetworkError,
  },
  data() {
    return {
      admin: null,
      disabled: true,
      save: false,
      error: true,
      types: [0, 1],
      emailRules: [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
      ],
    }
  },
  methods: {
    editAdmin() {
      this.disabled = false
      this.save = true
    },
    saveAdmin(admin) {
      console.log(admin)
    },
    cancelEdit() {
      this.disabled = true
      this.save = false
    },
  },
  async mounted() {
    await axios
      .get(`/admins/${this.$route.params.id}`)
      .then((res) => {
        this.error = false
        this.admin = res.data
      })
      .catch((err) => {
        this.error = true
        console.log(err)
      })
  },
})
</script>
