<template>
  <v-container>
    <v-btn @click="$router.go(-1)" icon class="ml-8">
      <v-icon size="32">arrow_back</v-icon>
    </v-btn>
    <v-content v-if="product" style="overflow: scroll">
      <v-card
        class="mx-auto px-auto pb-2 round"
        style="overflow: scroll;"
        max-width="90%"
        max-height="80vh"
        tile
      >
        <v-card-title class="pb-2">
          {{ $t('products.title') }}: {{ product.id }}
          <v-spacer></v-spacer>
          <v-btn @click="editProduct" large icon class="mb-1 pb-1">
            <v-icon size="32" class="">mdi-pencil</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-row>
          <v-col cols="4" class="pr-2 ml-6">
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
                rows="10"
                outlined
                v-bind:label="$t('products.descriptions.description_pl')"
                :value="product.description.pl"
                :disabled="disabled"
                auto-grow
              ></v-textarea>

              <v-textarea
                rows="10"
                :value="product.description.en"
                v-bind:label="$t('products.descriptions.description_en')"
                outlined
                :disabled="disabled"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-col>
          <v-col class="ml-6">
            <v-card flat>
              <div class="headline ml-1 mb-3">
                {{ $t('products.attributes.title') }}
              </div>
              <v-card
                flat
                color="primary"
                style="overflow: scroll"
                max-height="40vh"
                max-width="80%"
              >
                <v-list-item
                  v-for="(attribute, i) in product.attributes"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ $t('products.attributes.attribute.name_pl') }}:
                      {{ attribute.name.pl }}
                    </v-list-item-title>
                    <v-list-item-title>
                      {{ $t('products.attributes.attribute.name_en') }}:
                      {{ attribute.name.en }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-card>

            <v-card flat max-width="800" class="mt-5">
              <v-card-title
                ><div class="headline ml-1 mb-3">
                  {{ $t('products.pictures.title') }}
                </div>
                <v-spacer></v-spacer>
                <v-btn @click="editProduct" large icon class="mb-1 pb-1">
                  <v-icon size="32" class="">mdi-pencil</v-icon>
                </v-btn>
              </v-card-title>

              <v-card flat color="primary" style="overflow: scroll">
                <v-carousel>
                  <v-carousel-item
                    class="mx-0 px-0"
                    v-for="(picture, i) in product.pictures"
                    :key="i"
                    :src="picture.url"
                  ></v-carousel-item>
                </v-carousel>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
        <v-card flat v-if="product.owner">
          <v-card-title>{{ $t('products.owner.title') }}</v-card-title>
          <v-card-text>
            {{ $t('products.owner.name') }}: {{ product.owner.firstName }}
            {{ product.owner.lastName }}
          </v-card-text>
        </v-card>
        <v-row class="mr-3">
          <v-spacer></v-spacer>
          <v-btn @click="cancelEdit()" class="mr-3" v-show="save">Cancel</v-btn>

          <v-btn @click="saveProduct(product)" color="primary" v-show="save"
            >Save</v-btn
          >
        </v-row>
      </v-card>
    </v-content>
    <v-content v-else align="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-content>
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
import Vuex from 'vuex'
import NetworkError from '@/components/NetworkError.vue'

export default Vue.extend({
  components: {
    NetworkError
  },
  data() {
    return {
      lang: null,
      product: null,
      disabled: true,
      save: false,
      error: true
    }
  },
  methods: {
    editProduct() {
      this.disabled = false
      this.save = true
    },
    saveProduct(product) {
      console.log(product)
    },
    cancelEdit() {
      this.disabled = true
      this.save = false
    }
  },
  async mounted() {
    await axios
      .get(`/products/admin/${this.$route.params.id}`)
      .then((res) => {
        this.error = false
        this.product = res.data
        this.lang = localStorage.getItem('i18n')
      })
      .catch((err) => {
        this.error = true
      })
  }
})
</script>
