<template>
  <v-container>
    <v-card class="mx-auto px-auto round" max-width="90%" height="78vh" tile>
      <v-card-title>
        Lista zamówień
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          color="white"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="orders"
        sort-by="id"
        item-key="id"
        :search="search"
        class="elevation-1"
        :page.sync="page"
        hide-default-footer
        :items-per-page="15"
        @page-count="pageCount = $event"
      >
        <template v-for="header in headers" v-slot:[`header.${header.value}`]>
          {{ $t(`orders_table.${header.text}`) }}
        </template>
      </v-data-table>
    </v-card>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
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
      page: 1,
      pageCount: 5,
      search: '',
      orders: [],
      singleSelect: true,
      selected: [],
      headers: [
        {
          text: 'id',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        { text: 'status', value: 'paymentStatus' },
        { text: `products`, value: 'products.length' },
        { text: 'name', value: 'user.firstName' },
        { text: 'surname', value: 'user.lastName' },
        { text: 'email', value: 'user.email' },
        { text: 'cancel', value: 'removed' }
      ]
    }
  },

  methods: {
    getOrders() {
      let id = localStorage.getItem('m_user')
      axios.get(`http://localhost:3000/v1/orders`).then(res => {
        localStorage.setItem('token', res.config.headers.auth)
        this.orders = res.data.data.orders
        for (let x in this.orders) {
          if (this.orders[x].paymentStatus == 0) {
            this.orders[x].paymentStatus = 'Oczekuje na płatność'
          } else if (this.orders[x].paymentStatus == 1) {
            this.orders[x].paymentStatus = 'Płatność zakończona'
          } else {
            this.orders[x].paymentStatus = 'Płatność przy odbiorze'
          }

          if (this.orders[x].removed === false) {
            this.orders[x].removed = 'Nie'
          } else {
            this.orders[x].removed = 'Zamówienie zostało anulowane'
          }
        }

        // @click:row=“methodName” for later to add dialog with order info

        return
      })
    }
  },
  created() {
    this.getOrders()
  },
  mounted() {
    window.setInterval(() => {
      this.getOrders()
    }, 900000)
  }
})
</script>
