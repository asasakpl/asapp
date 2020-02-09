<template>
  <v-container>
    <v-btn @click="$router.go(-1)" icon class="ml-8">
      <v-icon size="32">arrow_back</v-icon>
    </v-btn>
    <v-content v-if="product">
      <v-card
        class="mx-auto px-auto pb-2 round"
        max-width="90%"
        max-height="90vh"
        tile
      >
        <v-card-title class="pb-0">
          {{ $t('products.title') }}: {{ product.id }}</v-card-title
        >
        <v-row>
          <v-col cols="4" class="pr-2">
            <v-col class="pb-0">
              <div class="headline ml-1 mb-3">
                {{ $t('products.titles.title') }}
              </div>
              <v-text-field
                v-model="product.title.pl"
                v-bind:label="$t('products.titles.title_pl')"
                outlined
                :disabled="disabled"
              ></v-text-field>

              <v-text-field
                v-model="product.title.en"
                v-bind:label="$t('products.titles.title_en')"
                outlined
                :disabled="disabled"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0">
              <div class="headline ml-1 mb-3">
                {{ $t('products.descriptions.title') }}
              </div>
              <v-textarea
                outlined
                v-bind:label="$t('products.descriptions.description_pl')"
                :value="product.description.pl"
                :disabled="disabled"
              ></v-textarea>

              <v-textarea
                :value="product.description.en"
                v-bind:label="$t('products.descriptions.description_en')"
                outlined
                :disabled="disabled"
              ></v-textarea>
            </v-col>
          </v-col>

          <v-col>
            <v-col cols="12" sm="6" md="3" class="pb-0">
              <div class="headline ml-1 mb-3">
                {{ $t('products.attributes.title') }}
              </div>
            </v-col>
          </v-col>
        </v-row>
      </v-card>
    </v-content></v-container
  >
</template>

<style scoped>
.round {
  border-radius: 8px;
}
</style>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

export default Vue.extend({
  data() {
    return {
      lang: null,
      product: null,
      disabled: true
    }
  },
  async mounted() {
    await axios
      .get(`http://localhost:3000/v1/products/${this.$route.params.id}`)
      .then(res => {
        this.product = res.data.data.product
        this.lang = localStorage.getItem('i18n')
      })
      .catch(error => console.log(error))
  }
})
</script>
