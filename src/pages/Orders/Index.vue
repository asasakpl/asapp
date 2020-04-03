<template>
  <v-container>
    <v-btn @click="loading(), getOrders()" v-if="!load" icon class="ml-8">
      <v-icon size="32">refresh</v-icon>
    </v-btn>
    <v-btn @click="getOrders()" v-else loading icon class="ml-8"> </v-btn>

    <v-card class="mx-auto px-auto round" max-width="90%" height="78vh" tile>
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
        sort-by="createdAt"
        :sort-desc="true"
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
        { text: 'status', value: 'paymentStatus' },
        { text: `products`, value: 'products.length' },
        { text: 'name', value: 'user.firstName' },
        { text: 'surname', value: 'user.lastName' },
        { text: 'email', value: 'user.email' },
        { text: 'created_at', value: 'createdAt' },
        { text: 'updated_at', value: 'updatedAt' },
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
        .then(res => {
          this.error = false
          this.orders = res.data.data.orders

          for (let x in this.orders) {
            if (this.orders[x].paymentStatus == 0) {
              this.orders[x].paymentStatus = this.$t(
                'orders_table.status_obj.waiting'
              )
            } else if (this.orders[x].paymentStatus == 1) {
              this.orders[x].paymentStatus = this.$t(
                'orders_table.status_obj.finished'
              )
            } else {
              this.orders[x].paymentStatus = this.$t(
                'orders_table.status_obj.on_place'
              )
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
        .catch(err => {
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
