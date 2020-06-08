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

    <v-row>
      <v-col>
        <v-card class="mx-auto px-auto round">
          <v-card-title>{{ $t('products.list.title') }}</v-card-title>
          <v-card-text>{{ $t('products.list.description') }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn to="/products/list" color="primary"
              >{{ $t('products.btn') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col>
        <v-card class="mx-auto px-auto round" disabled>
          <v-card-title>{{ $t('products.group.title') }}</v-card-title>
          <v-card-text>{{ $t('products.list.description') }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" disabled>{{ $t('products.btn') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <Success v-if="this.$store.state.success"></Success>
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
import Success from '@/components/Success.vue'

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
  }
})
</script>
