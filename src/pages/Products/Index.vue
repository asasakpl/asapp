<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="mx-auto px-auto round" tile>
          <v-card-title>{{ $t('products.dashboard.title') }}</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="1" class="mx-auto mt-1 pl-2" align="center">
        <v-btn to="/products/new" icon fab>
          <v-icon size="40">mdi-plus-circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex flex-column">
        <v-card class="px-auto round flex d-flex flex-column">
          <v-card-title>
            {{ $t('products.list.title') }}
            <v-spacer></v-spacer>
            <v-icon>mdi-folder-home</v-icon>
          </v-card-title>
          <v-card-text>{{ $t('products.list.description') }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn to="/products/list" color="primary">{{ $t('products.btn') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col class="d-flex flex-column">
        <v-card class="px-auto round flex d-flex flex-column">
          <v-card-title>
            {{ $t('products.group.title') }}
            <v-spacer></v-spacer>
            <v-icon>mdi-home-group</v-icon>
          </v-card-title>

          <v-card-text>{{ $t('products.list.description') }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" to="/groups">{{ $t('products.btn') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col class="d-flex flex-column">
        <v-card class="px-auto round flex d-flex flex-column" :disabled="admin === 1">
          <v-card-title>
            {{ $t('products.payments.title') }}
            <v-spacer></v-spacer>
            <v-icon>mdi-contactless-payment</v-icon>
          </v-card-title>
          <v-card-text>{{ $t('products.payments.description') }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" to="/payments">
              {{
              $t('products.btn')
              }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col class="d-flex flex-column">
        <v-card class="px-auto round flex d-flex flex-column" :disabled="admin === 1">
          <v-card-title>
            {{ $t('products.shipping.title') }}
            <v-spacer></v-spacer>
            <v-icon>mdi-dolly</v-icon>
          </v-card-title>
          <v-card-text>{{ $t('products.shipping.description') }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" to="/shipping">
              {{
              $t('products.btn')
              }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 8px;
}
</style>

<script lang="ts">
import Vue from "vue"
import axios from "axios"

// Components
import Success from "@/components/Success.vue"

export default Vue.extend({
  components: {
    Success
  },
  data() {
    return {
      error: true,
      page: 1,
      pageCount: 1,
      products: [],
      search: "",
      lang: null,
      singleSelect: true,
      load: false,
      admin: localStorage.getItem("m_type"),
      selected: [],
      headers: [
        {
          text: "id",
          align: "center",
          sortable: true,
          value: "id"
        },
        { text: "picture", value: "image", sortable: false },
        { text: "name", value: "title" },
        { text: "type", value: "type" },
        { text: "views", value: "views" },
        { text: "category", value: "category" }
      ]
    }
  }
})
</script>
