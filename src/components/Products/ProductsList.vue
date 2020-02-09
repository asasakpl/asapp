<template>
  <v-container>
    <v-btn @click="loading(), getProducts()" v-if="!load" icon class="ml-8">
      <v-icon size="32">refresh</v-icon>
    </v-btn>
    <v-btn @click="getProducts()" v-else loading icon class="ml-8"> </v-btn>
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
        v-if="!error"
        v-model="selected"
        :headers="headers"
        :items="products"
        @click:row="rowClick"
        sort-by="id"
        item-key="id"
        :search="search"
        class="elevation-1"
        :page.sync="page"
        hide-default-footer
        :items-per-page="16"
        @page-count="pageCount = $event"
      >
        <template v-slot:item.image="{ item }">
          <div class="mx-2 mt-1 mb-1">
            <v-img
              :src="item.pictures[0].url"
              :alt="item.id.toString()"
              height="80px"
              width="80px"
            ></v-img>
          </div>
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data() {
    return {
      error: true,
      page: 1,
      pageCount: 5,
      products: [],
      search: '',
      singleSelect: true,
      load: false,
      selected: [],
      headers: [
        {
          text: 'id',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        { text: 'Picture', value: 'image', sortable: false },
        { text: 'Nazwa', value: 'title.pl' },
        { text: 'Typ', value: 'type' },
        { text: 'Tag', value: 'tag' },
        { text: 'Kategoria', value: 'category' }
      ]
    }
  },
  methods: {
    loading() {
      this.load = true
    },
    rowClick: function(item) {
      this.$router.push(`/products/${item.id}`)
    },
    getProducts() {
      let id = localStorage.getItem('m_user')
      axios
        .get(`http://localhost:3000/v1/products`)
        .then(res => {
          this.error = false
          localStorage.setItem('token', res.config.headers.auth)
          this.products = res.data.data.products
          return
        })
        .catch(err => {
          this.error = true
        })

      this.load = false
    }
  },
  created() {
    this.getProducts()
  }
})
</script>
