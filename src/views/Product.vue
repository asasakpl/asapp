<template>
  <v-item-group>
    <v-container>
      <v-card class="mx-auto px-auto" max-width="90%" tile>
        <v-card-title
          >Produkty <v-spacer /><v-btn disabled
            >Nowy Produkt</v-btn
          ></v-card-title
        >
        <v-row
          class="mx-auto px-auto"
          :items="products"
          item-key="id"
          :page.sync="page"
          :items-per-page="2"
        >
          <v-col v-for="product in products" :key="product.id" cols="12" sm="3">
            <v-item>
              <v-card>
                <v-img :src="product.pictures[0].url"></v-img>
                <v-card-title>{{ product.name }}</v-card-title>
                <v-card-subtitle>{{ product.name }}</v-card-subtitle>
                <v-card-actions class="px-4">
                  Cena: {{ product.price }} zł
                  <v-spacer></v-spacer>
                  <v-btn class="mb-1" disabled>Edit</v-btn>
                </v-card-actions>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-item-group>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data() {
    return {
      page: 0,
      pageCount: 5,
      products: []
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
