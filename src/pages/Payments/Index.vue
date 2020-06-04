<template>
  <v-container>
    <v-row>
      <v-col cols="1" align="center" class="pr-0">
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
      </v-col>
      <v-col>
        <v-card class="mx-auto px-auto round" max-width="90%" tile>
          <v-card-title>
            {{ $t('payments.table.title') }}
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
            v-if="!error"
            v-model="selected"
            :headers="headers"
            :items="shipping"
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
            >
              {{ $t(`shipping.table.${header.text}`) }}
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
      <v-col cols="1">
        <v-btn @click="newPayment()" icon fab class="ml-0 mt-2">
          <v-icon size="36">mdi-credit-card-plus-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <NetworkError class="mb-3" :error="error"></NetworkError>
    <Success class="mb-3" v-if="this.$store.state.success"></Success>
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

// components
import NetworkError from '@/components/NetworkError.vue'
import Success from '@/components/Success.vue'

export default Vue.extend({
  components: {
    NetworkError,
    Success
  },
  data() {
    return {
      error: true,
      load: true,
      shipping: [],
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
          text: 'price',
          value: 'price'
        },
        {
          text: 'code',
          value: 'code'
        }
      ]
    }
  },
  methods: {
    newPayment() {
      this.$router.push(`/payments/new`)
    },
    rowClick: function(item) {
      this.$router.push(`/payments/${item.id}`)
    },
    getPayments() {
      axios
        .get(`/products/groups/payments`)
        .then((res) => {
          this.error = false
          this.shipping = res.data
          this.load = false
          return
        })
        .catch((err) => {
          this.error = true
        })
    }
  },
  async mounted() {
    await this.getPayments()
  }
})
</script>
