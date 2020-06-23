<template>
  <v-container>
    <v-content v-if="user" class="pa-0">
      <v-row>
        <v-col cols="1">
          <v-btn @click="$router.push('/users')" fab icon>
            <v-icon large>arrow_back</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-card class="round" tile>
            <v-card-title>{{ $t('users.title') }} {{ user.id }}</v-card-title>

            <v-divider></v-divider>

            <v-row class="px-auto mx-auto">
              <v-col class="d-flex flex-column">
                <v-card class=" flex d-flex flex-column" color="primary">
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
              </v-col>
              <v-col class="d-flex flex-column" v-if="user.address">
                <v-card color="primary" class=" flex d-flex flex-column">
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
              </v-col>
              <v-col v-if="user.company" class="d-flex flex-column">
                <v-card color="primary" class="flex d-flex flex-column">
                  <v-card-title>
                    <div class="headline">
                      {{ $t('users.data.company.title') }}
                    </div>
                  </v-card-title>
                  <v-card-text class="subtitle-1 text--primary">
                    <div>
                      {{ $t('users.data.company.name') }}:
                      {{ user.company.name }}
                    </div>
                    <div>
                      {{ $t('users.data.company.nip') }}:
                      {{ user.company.vat_number }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="mx-auto px-auto" v-if="user.orders.length > 0"
              ><v-col cols="12">
                <div class="headline pb-2">Zamówienia</div>
                <v-expansion-panels
                  light
                  accordion
                  style="overflow: scroll; max-height: 50vh;"
                >
                  <v-expansion-panel v-for="(item, i) in user.orders" :key="i">
                    <v-expansion-panel-header
                      >Zamówienie użytkownika numer
                      {{ i + 1 }}</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <div>Status płatności: {{ item.paymentStatus }}</div>
                      <div>Utworzono: {{ new Date(item.createdAt) }}</div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels></v-col
              ></v-row
            >
          </v-card>
        </v-col>
      </v-row>
    </v-content>
    <v-content v-else class="pa-0">
      <v-row justify="space-between">
        <v-col cols="1" align="center">
          <v-btn @click="$router.push('/users')" fab icon>
            <v-icon large>arrow_back</v-icon>
          </v-btn>
        </v-col>
        <v-col class="mr-12 mt-3" cols="6">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>
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
      open: ['public'],
      tree: [],
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
      .get(`/users/${this.$route.params.id}`)
      .then((res) => {
        this.user = res.data
        for (let x in this.user.orders) {
          if (this.user.orders[x].paymentStatus == 0) {
            this.user.orders[x].paymentStatus = this.$t(
              'orders_table.payment_status_obj.waiting'
            )
          } else if (this.user.orders[x].paymentStatus == 1) {
            this.user.orders[x].paymentStatus = this.$t(
              'orders_table.payment_status_obj.finished'
            )
          } else {
            this.user.orders[x].paymentStatus = this.$t(
              'orders_table.payment_status_obj.on_place'
            )
          }
        }
      })
      .catch((error) => {})
  }
})
</script>
