<template>
  <v-container>
    <v-row>
      <v-col cols="1" align="center" justify="center">
        <div class="flex-column">
          <v-btn @click="$router.push('/products')" icon fab class="mt-2">
            <v-icon size="38">arrow_back</v-icon>
          </v-btn>
          <v-btn @click="getPayments()" v-if="!load" icon fab class="mt-2">
            <v-icon size="38">refresh</v-icon>
          </v-btn>
          <v-btn
            @click="getPayments()"
            v-else
            loading
            icon
            fab
            class="mt-4"
          ></v-btn>
        </div>
      </v-col>

      <v-col>
        <v-card class="mx-auto px-auto round" tile>
          <v-card-title>
            {{ $t('groups.table.title') }}
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-if="!load"
            v-model="selected"
            :headers="headers"
            :items="groups"
            @click:row="rowClick"
            sort-by="id"
            item-key="id"
            :search="search"
            class="elevation-1"
            :page.sync="page"
            hide-default-footer
            :items-per-page="10"
            @page-count="pageCount = $event"
          >
            <template
              v-for="header in headers"
              v-slot:[`header.${header.value}`]
              >{{ $t(`groups.table.${header.text}`) }}</template
            >
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
      <v-col cols="1">
        <v-btn to="/groups/new" icon fab class="ml-0 mt-2">
          <v-icon size="36">mdi-credit-card-plus-outline</v-icon>
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

export default Vue.extend({
  data() {
    return {
      load: true,
      groups: [],
      search: '',
      lang: null,
      singleSelect: true,
      page: 1,
      pageCount: 1,
      selected: [],
      headers: [
        {
          text: 'id',
          align: 'center',
          sortable: true,
          value: 'id'
        },
        {
          text: 'name_pl',
          value: 'name.pl'
        },
        {
          text: 'name_en',
          value: 'name.en'
        },
        {
          text: 'payment',
          value: 'paymentMethods.length'
        },
        {
          text: 'shipping',
          value: 'shippingMethods.length'
        }
      ]
    }
  },
  methods: {
    rowClick: function(item) {
      this.$router.push(`/groups/${item.id}`)
    },
    async getPayments() {
      await axios
        .get(`/products/groups`)
        .then((res) => {
          this.groups = res.data
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
            text = err
            icon = 'alert-circle-outline'
          }

          this.$store.dispatch('error', { text, icon })
        })
    }
  },
  async mounted() {
    await this.getPayments()
  }
})
</script>
