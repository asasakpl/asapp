<template>
  <v-container>
    <ProductList></ProductList>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import ProductList from '@/components/Products/ProductsList.vue'

export default Vue.extend({
  components: {
    ProductList
  }
})
</script>
