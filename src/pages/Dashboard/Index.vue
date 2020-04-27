<template>
  <v-container>
    <v-card class="mx-auto px-auto pb-5 round" max-width="90%" tile>
      <v-card-title>{{ $t('dashboard.statistics.title') }}</v-card-title>
      <v-col cols="12">
        <v-row>
          <v-col>
            <v-card class="mx-auto pr-5" color="primary" dark min-width="250">
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-card-text>
                  <div>{{ $t('dashboard.statistics.users_card') }}</div>
                  <p class="display-1">{{ this.users }}</p>
                </v-card-text>

                <v-icon size="50">mdi-account-group</v-icon>
              </div>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mx-auto pr-5" color="primary" dark min-width="250">
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-card-text>
                  <div>{{ $t('dashboard.statistics.orders_card') }}</div>
                  <p class="display-1">{{ this.orders }}</p>
                </v-card-text>

                <v-icon size="50">mdi-truck</v-icon>
              </div>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mx-auto pr-5" color="primary" dark min-width="250">
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-card-text>
                  <div>{{ $t('dashboard.statistics.products_card') }}</div>
                  <p class="display-1">{{ this.products }}</p>
                </v-card-text>

                <v-icon size="50">mdi-folder-home</v-icon>
              </div>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="mx-auto pr-5" color="primary" dark min-width="250">
              <div class="d-flex flex-no-wrap justify-space-between">
                <v-card-text>
                  <div>{{ $t('dashboard.statistics.sellers_card') }}</div>
                  <p class="display-1">{{ this.sellers }}</p>
                </v-card-text>

                <v-icon size="50">mdi-account-group</v-icon>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
    <NetworkError :error="error"></NetworkError>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 14px;
}
</style>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import NetworkError from '@/components/NetworkError.vue'

export default Vue.extend({
  components: {
    NetworkError,
    DashboardLayout,
  },
  data() {
    return {
      error: true,
      products: 0,
      sellers: 0,
      orders: 0,
      users: 0,
      name: localStorage.getItem('m_name'),
    }
  },
  methods: {
    async getData() {
      let date = new Date()
      date.setDate(date.getDate() - 30)

      await axios
        .get('/users')
        .then((res) => {
          this.error = false
          let users = res.data.data.users
          users = users.map((user) => user.createdAt)

          for (let x in users) {
            let usersDate = new Date(users[x])
            let ddd = 0
            if (date < usersDate) {
              ddd++
            }
            this.users = this.users + ddd
          }
        })
        .catch((err) => {
          this.error = true
        })

      await axios.get('/products').then((res) => {
        this.products = res.data.data.products.length
      })

      await axios.get('/orders').then((res) => {
        let orders = res.data.data.orders
        orders = orders.map((order) => order.createdAt)

        for (let x in orders) {
          let orderDate = new Date(orders[x])
          let ddd = 0
          if (date < orderDate) {
            ddd++
          }
          this.orders = this.orders + ddd
        }
      })

      await axios.get('/owners').then((res) => {
        this.sellers = res.data.data.owners.length
      })
    },
  },
  beforeMount() {
    this.getData()
  },
})
</script>
