<template>
  <v-container>
    <OrdersList></OrdersList>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import OrdersList from '@/components/Orders/OrdersList.vue'

export default Vue.extend({
  components: {
    OrdersList
  }
})
</script>
