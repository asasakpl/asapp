<template>
  <v-container>
    <v-btn @click="loading(), getProducts()" v-if="!load" icon class="ml-8">
      <v-icon size="32">refresh</v-icon>
    </v-btn>
    <v-btn @click="getProducts()" v-else loading icon class="ml-8"> </v-btn>
    <v-card class="mx-auto px-auto round" max-width="90%" tile>
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
        :items-per-page="8"
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
        <template v-for="header in headers" v-slot:[`header.${header.value}`]>
          {{ $t(`products_table.${header.text}`) }}
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
      error: true,
      page: 1,
      pageCount: 5,
      products: [],
      search: '',
      lang: null,
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
        { text: 'picture', value: 'image', sortable: false },
        { text: 'name', value: 'title' },
        { text: 'type', value: 'type' },
        { text: 'tag', value: 'tag' },
        { text: 'category', value: 'category' }
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
          this.lang = localStorage.getItem('i18n')
          this.products = res.data.data.products

          for (let x in this.products) {
            if (this.lang == 'pl') {
              this.products[x].title = this.products[x].title.pl
            } else {
              this.products[x].title = this.products[x].title.en
            }
          }

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
