<template>
  <v-container>
    <v-row>
      <v-col cols="1" align="center">
        <v-btn to="/products/list" icon large class="mt-2">
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="11" class="mr-0 pr-0">
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

            <v-row class="mx-auto">
              <v-col cols="6">
                <v-text-field
                  v-model="product.price"
                  v-bind:label="$t('products.price')"
                  outlined
                  :disabled="disabled"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="product.category[app_lang]"
                  v-bind:label="$t('products.category')"
                  outlined
                  :disabled="disabled"
                ></v-text-field>
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

            <v-col v-if="product.variants.length > 0">
              <span class="title">Warianty</span>
              <v-flex align="center">
                <v-expansion-panels light>
                  <v-expansion-panel
                    v-for="(item, i) in product.variants"
                    :key="i"
                  >
                    <v-expansion-panel-header
                      class="subtitle-1 font-weight-bold "
                    >
                      PL: {{ item.title.pl }} | EN: {{ item.title.en }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-col class="body-1 pt-0 pb-0">
                        <v-row>
                          <v-textarea
                            v-model="item.description.pl"
                            label="Opis pl"
                            outlined
                            class="mr-1"
                            auto-grow
                            disabled
                          >
                          </v-textarea>
                          <v-textarea
                            v-model="item.description.en"
                            label="Opis en"
                            auto-grow
                            outlined
                            class="ml-1"
                            disabled
                          >
                          </v-textarea>
                        </v-row>
                      </v-col>
                      <v-col class="body-1 pt-0 pb-0">
                        Cena: {{ item.price }} pln
                      </v-col>
                      <v-col class="body-1 pt-0 pb-0">
                        Cena "pay to go": {{ item.payToGo }} pln
                        <div class="overline pl-2">
                          *cena do zapłacenia przez użytkownika aby utworzyć
                          zamówienie
                        </div>
                      </v-col>
                      <v-col class="body-1 pt-0 pb-0"
                        >Liczba atrybutów: {{ item.attributes.length }}</v-col
                      >
                      <v-col class="body-1 pt-0 pb-0"
                        >Grupa: {{ item.group.name[app_lang] }}</v-col
                      >

                      <v-col v-if="item.attributes.length > 0">
                        <div class="title font-weight-bold">
                          Atrybuty
                        </div>
                        <v-expansion-panels dark>
                          <v-expansion-panel
                            v-for="(attribute, index) in item.attributes"
                            :key="index"
                          >
                            <v-expansion-panel-header
                              class="subtitle-1 font-weight-bold "
                            >
                              Nazwa: {{ attribute.name[app_lang] }}
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-list light>
                                <v-list-item v-bind:key="index">
                                  <v-col>
                                    <v-row>
                                      <v-col>
                                        <v-list-item-title
                                          >Nazwa atrybutu:
                                          {{ attribute.name[app_lang] }}
                                        </v-list-item-title>
                                      </v-col>
                                    </v-row>
                                    <v-row>
                                      <v-col>
                                        <div class="font-weight-bold">
                                          Wartości atrybutu
                                        </div>
                                        <v-list dark dense>
                                          <template
                                            v-for="(value,
                                            index) in attribute.attributeValues"
                                          >
                                            <v-list-item v-bind:key="index">
                                              <v-list-item-title>
                                                Nazwa:
                                                {{
                                                  value.name[app_lang]
                                                }}</v-list-item-title
                                              >
                                              <v-list-item-subtitle
                                                class="white--text"
                                                >Cena:
                                                {{
                                                  value.price
                                                }}</v-list-item-subtitle
                                              >
                                            </v-list-item>
                                          </template>
                                        </v-list>
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                </v-list-item>
                              </v-list>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-col>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-flex>
            </v-col>

            <v-row class="mx-auto px-auto">
              <v-col cols="6" class="d-flex flex-no-wrap flex-column">
                <v-card outlined class="flex d-flex flex-column">
                  <v-card-title>Stripe info</v-card-title>
                  <v-card-text>
                    <div class="title">Produkt</div>
                    <div>ID produktu pl: {{ product.productPlId }}</div>
                    <div>
                      ID produktu en:
                      {{ product.productEnId }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="6" class="d-flex flex-no-wrap flex-column">
                <v-card
                  v-if="product.owner"
                  outlined
                  class="flex d-flex flex-column"
                >
                  <v-card-title>{{ $t('products.owner.title') }}</v-card-title>
                  <v-card-text>
                    {{ $t('products.owner.name') }}: {{ product.owner.name }}
                    <br />
                    Email: {{ product.owner.email }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

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
      error: true,
      app_lang: localStorage.getItem('i18n')
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
