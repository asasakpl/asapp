<template>
  <v-container>
    <v-row>
      <v-col cols="1" align="center">
        <v-btn @click="$router.go(-1)" icon large class="mt-2">
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-content v-if="product" style="overflow: scroll" class="pt-0 pl-0">
          <v-card
            class="mx-auto  px-auto pb-2 round"
            style="overflow: scroll;"
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

            <v-row class="mx-auto">
              <v-col>
                <v-text-field
                  v-model="product.title.pl"
                  v-bind:label="$t('products.titles.title_pl')"
                  outlined
                  :disabled="disabled"
                ></v-text-field>
              </v-col>

              <v-col class="pb-0">
                <v-text-field
                  v-model="product.title.en"
                  v-bind:label="$t('products.titles.title_en')"
                  outlined
                  :disabled="disabled"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mx-auto">
              <v-col max-width="50%">
                <v-textarea
                  outlined
                  v-bind:label="$t('products.descriptions.description_pl')"
                  :value="product.description.pl"
                  :disabled="disabled"
                  auto-grow
                ></v-textarea>
              </v-col>

              <v-col>
                <v-textarea
                  :value="product.description.en"
                  v-bind:label="$t('products.descriptions.description_en')"
                  outlined
                  :disabled="disabled"
                  auto-grow
                ></v-textarea>
              </v-col>
            </v-row>

            <v-col align="center">
              <v-card flat max-width="1200">
                <v-card-title class="ml-0 pl-2 mt-0"
                  ><div class="headline mb-3">
                    {{ $t('products.pictures.title') }}
                  </div>
                </v-card-title>

                <v-card flat style="overflow: scroll">
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

            <v-col cols="4">
              <v-card v-if="product.owner" outlined>
                <v-card-title>{{ $t('products.owner.title') }}</v-card-title>
                <v-card-text>
                  {{ $t('products.owner.name') }}: {{ product.owner.name }}
                  <br />
                  Email: {{ product.owner.email }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-row class="mr-3">
              <v-spacer></v-spacer>
              <v-btn @click="cancelEdit()" class="mr-3" v-show="save"
                >Cancel</v-btn
              >

              <v-btn @click="saveProduct(product)" color="primary" v-show="save"
                >Save</v-btn
              >
            </v-row>
          </v-card>
        </v-content>
        <v-content v-else align="center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-content>
      </v-col>
      <NetworkError :error="error"></NetworkError>
    </v-row>
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
        console.log(err)
        this.error = true
      })
  }
})
</script>
