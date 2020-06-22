<template>
  <v-container>
    <v-row>
      <v-col cols="1" align="center">
        <v-btn @click="loading(), getOrders()" v-if="!load" fab icon>
          <v-icon large>refresh</v-icon>
        </v-btn>
        <v-btn @click="getOrders()" v-else loading fab large icon> </v-btn>
      </v-col>
      <v-col>
        <v-card class="mx-auto px-auto round" tile>
          <v-card-title>
            {{ $t('orders_table.title') }}
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
            v-if="!error"
            @click:row="rowClick"
            single-select
            v-model="selected"
            :headers="headers"
            :items="orders"
            sort-by="id"
            :sort-desc="true"
            item-key="id"
            :search="search"
            class="elevation-1"
            :page.sync="page"
            hide-default-footer
            :items-per-page="9"
            @page-count="pageCount = $event"
          >
            <template
              v-for="header in headers"
              v-slot:[`header.${header.value}`]
            >
              {{ $t(`orders_table.${header.text}`) }}
            </template>
          </v-data-table>

          <v-data-table
            v-else
            loading
            hide-default-footer
            loading-text="Loading... Please wait"
          ></v-data-table>
        </v-card>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </v-col>
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
    NetworkError
  },
  data() {
    return {
      error: true,
      load: false,
      page: 1,
      pageCount: null,
      search: '',
      orders: [],
      order: null,
      singleSelect: true,
      dialog: false,
      selected: [],
      selectedId: -1,
      headers: [
        {
          text: 'id',
          sortable: true,
          value: 'id'
        },
        { text: 'payment_status', value: 'paymentStatus' },
        { text: `products`, value: 'products.length' },
        { text: 'status', value: 'status' },
        { text: 'name', value: 'user.firstName' },
        { text: 'surname', value: 'user.lastName' },
        { text: 'email', value: 'user.email' },
        { text: 'created_at', value: 'createdAt' },
        { text: 'cancel', value: 'removed' }
      ]
    }
  },

  methods: {
    rowClick: function(item) {
      this.$router.push(`/orders/${item.id}`)
    },
    loading() {
      this.load = true
    },
    getOrders() {
      let id = localStorage.getItem('m_user')
      axios
        .get(`/orders`)
        .then((res) => {
          this.error = false
          this.orders = res.data

          for (let x in this.orders) {
            switch (this.orders[x].paymentStatus) {
              case (this.orders[x].paymentStatus = 0):
                this.orders[x].paymentStatus = this.$t(
                  'orders_table.payment_status_obj.waiting'
                )
                break
              case (this.orders[x].paymentStatus = 1):
                this.orders[x].paymentStatus = this.$t(
                  'orders_table.payment_status_obj.finished'
                )
                break
            }

            switch (this.orders[x].status) {
              case (this.orders[x].status = 0):
                this.orders[x].status = this.$t(
                  'orders_table.status_obj.created'
                )
                break
              case (this.orders[x].status = 1):
                this.orders[x].status = this.$t(
                  'orders_table.status_obj.during'
                )
                break
              case (this.orders[x].status = 2):
                this.orders[x].status = this.$t(
                  'orders_table.status_obj.finished'
                )
                break
            }

            let createdDate = new Date(this.orders[x].createdAt)
            let updatedDate = new Date(this.orders[x].updatedAt)

            let date1 =
              ('0' + createdDate.getDate()).slice(-2) +
              '/' +
              ('0' + (createdDate.getMonth() + 1)).slice(-2) +
              '/' +
              createdDate.getFullYear() +
              ' ' +
              ('0' + createdDate.getHours()).slice(-2) +
              ':' +
              ('0' + createdDate.getMinutes()).slice(-2) +
              ':' +
              ('0' + createdDate.getSeconds()).slice(-2)

            let date2 =
              ('0' + createdDate.getDate()).slice(-2) +
              '/' +
              ('0' + (createdDate.getMonth() + 1)).slice(-2) +
              '/' +
              createdDate.getFullYear()

            this.orders[x].createdAt = date1
            this.orders[x].updatedAt = date2

            if (this.orders[x].removed === false) {
              this.orders[x].removed = this.$t('orders_table.removed_obj.no')
            } else {
              this.orders[x].removed = this.$t('orders_table.removed_obj.yes')
            }
          }
          this.load = false
          return
        })
        .catch((err) => {
          this.error = true
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
