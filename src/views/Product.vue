<template>
  <v-container>
    <v-card class="mx-auto px-auto" max-width="90%" tile>
      <v-card-title>
        Lista produktów
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
        :items="products"
        sort-by="id"
        item-key="id"
        :search="search"
        class="elevation-1"
        :page.sync="page"
        hide-default-footer
        :items-per-page="16"
        @page-count="pageCount = $event"
      >
      </v-data-table>
    </v-card>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data() {
    return {
      page: 1,
      pageCount: 5,
      products: [],
      search: '',
      singleSelect: true,
      selected: [],
      headers: [
        {
          text: 'id',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        { text: 'Nazwa', value: 'name' },
        { text: 'Typ', value: 'type' },
        { text: 'Tag', value: 'tag' },
        { text: 'Kategoria', value: 'category' }
      ]
    }
  },
  methods: {
    getProducts() {
      let id = localStorage.getItem('m_user')
      axios.get(`http://localhost:3000/v1/products`).then(res => {
        localStorage.setItem('token', res.config.headers.auth)
        this.products = res.data.data.products
        return
      })
    }
  },
  created() {
    this.getProducts()
  }
})
</script>
