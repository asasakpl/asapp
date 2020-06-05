<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto px-auto round" tile>
          <v-card-title>
            {{ $t('products.dashboard.title') }}
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="1" class="mx-auto mt-2" align="center">
        <v-btn to="/products/new" icon large rounded>
          <v-icon size="36">mdi-plus-circle</v-icon></v-btn
        >
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

// Components
import NetworkError from '@/components/NetworkError.vue'

export default Vue.extend({
  components: {
    NetworkError
  },
  data() {
    return {
      error: true,
      page: 1,
      pageCount: 1,
      products: [],
      search: '',
      lang: null,
      singleSelect: true,
      load: false,
      selected: [],
      headers: [
        {
          text: 'id',
          align: 'center',
          sortable: true,
          value: 'id'
        },
        { text: 'picture', value: 'image', sortable: false },
        { text: 'name', value: 'title' },
        { text: 'type', value: 'type' },
        { text: 'views', value: 'views' },
        { text: 'category', value: 'category' }
      ]
    }
  },
  methods: {
    loading() {
      this.load = true
    },
    newProduct() {
      this.$router.push(`/products/new`)
    },
    rowClick: function(item) {
      this.$router.push(`/products/${item.id}`)
    },
    async getProducts() {
      let id = localStorage.getItem('m_user')
      await axios
        .get(`/products`)
        .then((res) => {
          this.error = false

          this.lang = localStorage.getItem('i18n')
          this.products = res.data.products

          for (let x in this.products) {
            if (this.lang == 'pl') {
              this.products[x].title = this.products[x].title.pl
            } else {
              this.products[x].title = this.products[x].title.en
            }
          }

          return
        })
        .catch((err) => {
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
