<template>
  <v-container>
    <v-btn @click="$router.go(-1)" icon class="ml-8">
      <v-icon size="32">arrow_back</v-icon>
    </v-btn>
    <v-content v-if="user">
      <v-card
        class="mx-auto px-auto pb-2 round"
        max-width="90%"
        max-height="90vh"
        tile
      >
        <v-col>
          <v-row>
            <v-card-title>{{ $t('users.title') }} {{ user.id }}</v-card-title>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>
        <v-divider></v-divider>

        <v-row class="mt-6 pb-6 justify-space-around" width="100%">
          <div style="width: 30%">
            <v-card class="mb-5 " color="primary">
              <v-card-title class="subtitle-1">
                <v-col cols="12">
                  <div class="headline">
                    {{ $t('users.data.title') }}
                  </div>
                  <div>
                    {{ $t('users.data.name') }}: {{ user.firstName }}
                    {{ user.lastName }}
                  </div>
                  <div>{{ $t('users.data.email') }}: {{ user.email }}</div>
                  <div v-if="user.phone_number">
                    {{ $t('users.data.phone_number') }}:
                    {{ user.phone_number }}
                  </div>
                </v-col>
              </v-card-title>
            </v-card>

            <v-card color="primary" class="mb-5">
              <v-card-title class="subtitle-1">
                <v-col cols="12">
                  <div class="headline">
                    {{ $t('users.data.address.title') }}
                  </div>
                  <div v-if="user.address">
                    <div>
                      {{ $t('users.data.address.house_number') }}:
                      {{ user.address.house_number }}
                    </div>
                    <div>
                      {{ $t('users.data.address.street') }}:
                      {{ user.address.street }}
                    </div>
                    <div>
                      {{ $t('users.data.address.city') }}:
                      {{ user.address.city }}
                    </div>
                    <div>
                      {{ $t('users.data.address.state') }}:
                      {{ user.address.state }}
                    </div>
                    <div>
                      {{ $t('users.data.address.country') }}:
                      {{ user.address.country }}
                    </div>
                  </div>
                </v-col>
              </v-card-title>
            </v-card>

            <v-card color="primary">
              <v-card-title class="subtitle-1">
                <v-col cols="12">
                  <div class="headline">
                    {{ $t('users.data.company.title') }}
                  </div>
                  <div v-if="user.company">
                    <div>
                      {{ $t('users.data.company.name') }}:
                      {{ user.company.name }}
                    </div>
                    <div>
                      {{ $t('users.data.company.nip') }}:
                      {{ user.company.vat_number }}
                    </div>
                  </div>
                </v-col>
              </v-card-title>
            </v-card>
          </div>

          <v-card
            class="mx-6 ml-0"
            color="primary"
            width="60%"
            max-height="55vh"
          >
            <v-card-title class="subtitle-1">
              <v-col cols="12">
                <div class="headline">
                  {{ $t('users.orders.title') }}
                </div>
              </v-col>
            </v-card-title>
            <v-card-text>
              <v-card
                flat
                color="primary"
                style="overflow: scroll"
                max-height="42vh"
              >
                <v-list-item v-for="(order, i) in user.orders" :key="i">
                  <v-list-item-content>
                    <v-list-item-title>
                      <div>
                        {{ $t('users.orders.order_number') }}: {{ order.id }}
                      </div>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ $t('users.orders.products') }}:
                      {{ order.products.length }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-card-text>
          </v-card>
        </v-row>
      </v-card>
    </v-content>
    <v-content v-else align="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
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
import axios from 'axios'

export default Vue.extend({
  data() {
    return {
      user: null,
      order: null
    }
  },
  methods: {
    async getOrder(order) {
      this.order = order
    }
  },
  async mounted() {
    await axios
      .get(`http://localhost:3000/v1/users/${this.$route.params.id}`)
      .then(res => {
        this.user = res.data.data.user
      })
      .catch(error => console.log(error))
  }
})
</script>
