<template>
  <v-container>
    <v-row>
      <v-col cols="1" class="flex-column align-center">
        <v-btn @click="$router.push('/products')" class="mb-1" icon fab>
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
        <v-btn @click="loading(), getProducts()" v-if="!load" icon fab>
          <v-icon size="38">refresh</v-icon>
        </v-btn>
        <v-btn @click="getProducts()" v-else loading icon> </v-btn>
      </v-col>

      <v-col>
        <v-card class="mx-auto px-auto round" tile>
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
            v-if="!load"
            v-model="selected"
            :headers="headers"
            :items="products"
            @click:row="rowClick"
            sort-by="id"
            :sort-desc="true"
            item-key="id"
            :search="search"
            class="elevation-1"
            :page.sync="page"
            hide-default-footer
            :items-per-page="5"
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
            <template
              v-for="header in headers"
              v-slot:[`header.${header.value}`]
            >
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
      </v-col>
      <v-col cols="1" align="end" class="flex-column align-center">
        <v-btn to="/products/new" class="mb-1" icon fab>
          <v-icon large>mdi-pencil-plus</v-icon>
        </v-btn>

        <v-btn to="/categories" icon fab>
          <v-icon large>mdi-home-group</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 8px;
}

.flex-column {
  display: flex;
  flex-direction: column;
}
</style>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import NetworkError from '@/components/NetworkError.vue'
import Success from '@/components/Success.vue'

export default Vue.extend({
  components: {
    NetworkError,
    Success
  },
  data() {
    return {
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
        { text: 'views', value: 'views' },
        { text: 'owner', value: 'owner.name' }
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
      this.load = true
      let id = localStorage.getItem('m_user')
      axios
        .get(`/products`)
        .then((res) => {
          this.lang = localStorage.getItem('i18n')
          this.products = res.data

          for (let x in this.products) {
            if (this.lang == 'pl') {
              this.products[x].title = this.products[x].title.pl
            } else {
              this.products[x].title = this.products[x].title.en
            }
          }

          for (let i in this.products) {
            if (this.products[i].owner == null) {
              this.products[i].owner = {
                name: 'asasak'
              }
            }
          }
          this.load = false
          return
        })
        .catch((err) => {
          let text
          let icon
          if (!err.response) {
            // network error
            text = 'Check your internet connection'
            icon = 'network-strength-off'
          } else {
            text = err.response.data.error.message
            icon = 'alert-circle-outline'
          }

          this.$store.dispatch('error', { text, icon })
        })
    }
  },
  created() {
    this.getProducts()
  }
})
</script>
