<template>
  <v-container>
    <v-col>
      <v-card class="mx-auto px-auto pb-5 round" max-width="95%" tile>
        <v-card-title>{{ $t('dashboard.statistics.title') }}</v-card-title>
        <v-col cols="12">
          <v-row>
            <v-col>
              <v-card class="mx-auto pr-4" color="primary" dark min-width="250">
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
              <v-card class="mx-auto pr-4" color="primary" dark min-width="250">
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
              <v-card class="mx-auto pr-4" color="primary" dark min-width="250">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-card-text>
                    {{ $t('dashboard.statistics.products_card') }}
                    <p class="display-1">{{ this.products }}</p>
                  </v-card-text>

                  <v-icon size="50">mdi-folder-home</v-icon>
                </div>
              </v-card>
            </v-col>
            <v-col>
              <v-card class="mx-auto pr-4" color="primary" dark min-width="250">
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
    </v-col>
    <v-col v-if="popularProducts">
      <v-row>
        <v-card
          class="mx-auto px-auto round"
          tile
          v-for="product in popularProducts"
          :key="product.id"
          width="26%"
          @click="$router.replace('/products/' + product.id)"
        >
          <v-img v-if="product.pictures" :aspect-ratio="16 / 9" :src="product.pictures[0].url">
            <v-expand-transition>
              <v-row class="lightbox white--text pa-2 fill-height" align="end">
                <v-col>
                  <div class="headline font-weight-medium">{{ product.title[app_lang] }}</div>
                  <div class="title font-weight-medium">Wyświetlenia: {{ product.views }}</div>
                </v-col>
              </v-row>
            </v-expand-transition>
          </v-img>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 14px;
}
</style>

<script lang="ts">
import Vue from "vue"
import axios from "axios"
import DashboardLayout from "@/layouts/DashboardLayout.vue"

export default Vue.extend({
  components: {
    DashboardLayout,
  },
  data() {
    return {
      products: 0,
      sellers: 0,
      orders: 0,
      users: 0,
      product: null,
      popularProducts: null,
      name: localStorage.getItem("m_name"),
      app_lang: localStorage.getItem("i18n"),
    }
  },
  methods: {
    async getPopular() {
      await axios.get(`/products/admin/${this.product.id}`).then((res) => {
        this.product = res.data
      })
    },
    async getData() {
      let date = new Date()
      date.setDate(date.getDate() - 30)

      await axios
        .get("/products/popular")
        .then((res) => {
          this.popularProducts = res.data
        })
        .catch((err) => {
          let text
          let icon
          if (!err.response) {
            // network error
            text = "Check your internet connection"
            icon = "network-strength-off"
          } else {
            text = err
            icon = "alert-circle-outline"
          }

          this.$store.dispatch("error", { text, icon })
        })

      await axios
        .get("/dashboard")
        .then((res) => {
          let orders = res.data.orders

          orders = orders.map((order) => order.createdAt)

          for (let x in orders) {
            let orderDate = new Date(orders[x])
            let ddd = 0
            if (date < orderDate) {
              ddd++
            }
            this.orders = this.orders + ddd
          }

          this.sellers = 0 + res.data.owners.length

          this.products = 0 + res.data.products.length

          const views = Math.max.apply(
            Math,
            res.data.products.map((p) => {
              return p.views
            })
          )

          const popularProducts = []
          for (let x in res.data.products) {
            if (res.data.products[x].views === views) {
              popularProducts.push(res.data.products[x])
            }
          }

          this.product = popularProducts[0]
          this.getPopular()

          let users = res.data.users
          users = users.map((user) => user.createdAt)

          for (let x in users) {
            let usersDate = new Date(users[x])
            let ddd = 0
            if (date < usersDate) {
              ddd++
            }
            this.users = this.users + ddd
          }

          return
        })
        .catch((err) => {
          let text
          let icon
          if (!err.response) {
            // network error
            text = "Check your internet connection"
            icon = "network-strength-off"
          } else {
            text = err
            icon = "alert-circle-outline"
          }

          this.$store.dispatch("error", { text, icon })
        })
    },
  },
  beforeMount() {
    this.getData()
  },
})
</script>
