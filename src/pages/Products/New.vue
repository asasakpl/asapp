<template>
  <v-container>
    <v-row>
      <v-col cols="1" align="center" class="mt-2">
        <v-btn
          @click="$router.go(-1), removeAllPictures()"
          icon
          fab
          class="mt-2"
          large
        >
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-form v-model="isValidProduct" ref="productForm">
          <v-card
            class="mx-auto px-auto round"
            style="overflow: scroll"
            max-height="88vh"
            tile
          >
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    v-bind:label="$t('new_product.title_pl')"
                    :rules="[rules.required]"
                    v-model="product.title.pl"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-bind:label="$t('new_product.title_en')"
                    :rules="[rules.required]"
                    v-model="product.title.en"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-bind:label="$t('new_product.other.price')"
                    :rules="[rules.required, rules.max, rules.number]"
                    v-model="product.price"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col class="pt-5" sm="5" justify="center"
                  >* Cena wyświetlana użytkownikowi w produkcie, jest to cena
                  największa jaką możę osiągnąć produkt ex. 125 000 pln.</v-col
                >
              </v-row>

              <v-row>
                <v-col>
                  <v-textarea
                    v-bind:label="$t('new_product.description_pl')"
                    v-model="product.description.pl"
                    :rules="[rules.required]"
                    outlined
                  ></v-textarea>
                </v-col>
                <v-col>
                  <v-textarea
                    v-bind:label="$t('new_product.description_en')"
                    v-model="product.description.en"
                    :rules="[rules.required]"
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-title class="pl-1">
                    Zdjęcia
                  </v-card-title>

                  <v-list :rules="[rules.picture]">
                    <template v-for="(picture, index) in product.pictures">
                      <v-list-item v-bind:key="index">
                        <v-list-item-content class="round">
                          <v-list-item-title
                            >{{ picture.url }}

                            <v-btn
                              icon
                              @click="removePicture(picture)"
                              color="error"
                            >
                              <v-icon>mdi-close</v-icon>
                            </v-btn></v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list>

                  <v-btn @click="uploadPictures()">Upload</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    :items="owners"
                    item-text="name"
                    item-value="email"
                    label="Twórcy produktów"
                    v-model="product.owner"
                    outlined
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-card light class="pl-1 title">
                    <v-card-title>
                      Warianty
                      <v-spacer></v-spacer>
                      <v-btn icon large @click="variant_dialog = true">
                        <v-icon size="32">mdi-plus-box</v-icon>
                      </v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-expansion-panels dark>
                        <v-expansion-panel
                          dark
                          v-for="(item, i) in product.variants"
                          :key="i"
                          tile
                        >
                          <v-expansion-panel-header
                            disable-icon-rotate
                            class="subtitle-1 font-weight-bold "
                          >
                            {{ item.title[app_lang] }}
                            <template v-slot:actions>
                              <v-btn icon large @click="removeVariant(i)"
                                ><v-icon color="error" size="32"
                                  >mdi-close</v-icon
                                >
                              </v-btn>
                            </template>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-col class="body-1 pt-0 pb-0">
                              Cena: {{ item.price }} pln
                            </v-col>
                            <v-col class="body-1 pt-0 pb-0">
                              Cena "pay to go": {{ item.payToGo }} pln
                              <div class="overline pl-2">
                                *cena do zapłacenia przez użytkownika aby
                                utworzyć zamówienie
                              </div>
                            </v-col>
                            <v-col class="body-1 pt-0 pb-0"
                              >Liczba atrybutów:
                              {{ item.attributes.length }}</v-col
                            >
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-spacer></v-spacer>
                <v-col> </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                :disabled="!isValidProduct"
                @click="createProduct(product)"
                >Create</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
    <v-dialog v-model="variant_dialog" width="60%" persistent>
      <v-form v-model="isValidVariant" ref="variantForm">
        <v-card flat tile>
          <v-window v-model="onboarding" :continuous="false">
            <v-window-item>
              <v-card>
                <v-card-title>Nowy wariant</v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                  <v-row>
                    <v-col class="pb-0">
                      <v-text-field
                        label="Nazwa wariantu pl"
                        v-model="variant.title.pl"
                        :rules="[rules.required]"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col class="pb-0">
                      <v-text-field
                        label="Nazwa wariantu en"
                        :rules="[rules.required]"
                        v-model="variant.title.en"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pb-0 pt-0">
                      <v-text-field
                        label="Cena"
                        v-model="variant.price"
                        :rules="[rules.required, rules.max, rules.number]"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col class="pb-0 pt-0">
                      <v-text-field
                        label='Cena "pay to go"'
                        v-model="variant.payToGo"
                        :rules="[rules.max, rules.number]"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="mx-auto">
                    <v-select
                      :items="groups"
                      :item-text="'name.' + app_lang"
                      item-value="id"
                      :rules="[rules.required]"
                      label="Groupa określająca metody dostawy/płatności"
                      v-model="variant.group"
                      outlined
                    ></v-select>
                  </v-row>
                  <v-row class="mx-auto" justify="center">
                    <v-col class="mx-1">
                      <v-row>
                        <span class="title font-weight-bold">Atrybuty</span>
                        <v-spacer></v-spacer>
                        <v-btn icon fab @click="next"
                          ><v-icon large>mdi-plus-box</v-icon>
                        </v-btn>
                      </v-row>
                      <v-col
                        v-for="(attribute, i) in variant.attributes"
                        :key="i"
                      >
                        <v-card light>
                          <v-card-text>
                            <v-row>
                              <v-col>
                                <div class="body-1">
                                  Nazwa pl: {{ attribute.name.pl }}
                                </div>
                                <div class="body-1">
                                  Nazwa en: {{ attribute.name.en }}
                                </div>
                                <div class="body-1">
                                  Ilość opcji:
                                  {{ attribute.values.length }}
                                </div>
                              </v-col>
                              <v-spacer></v-spacer>
                              <v-col align="end">
                                <v-btn
                                  icon
                                  large
                                  @click="variant.attributes.splice(i, 1)"
                                >
                                  <v-icon color="error" size="32"
                                    >mdi-close</v-icon
                                  >
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="cancelVariant()"
                    >Anuluj</v-btn
                  >
                  <v-btn
                    color="primary"
                    text
                    @click="pushVariant(variant)"
                    :disabled="!isValidVariant"
                    >Dodaj</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-window-item>
            <v-window-item>
              <v-form v-model="isValidAttribute" ref="attributeForm">
                <v-card>
                  <v-card-title>Nowy atrybut</v-card-title>
                  <v-divider></v-divider>

                  <v-card-text>
                    <v-row>
                      <v-col class="pb-0">
                        <v-text-field
                          label="Nazwa atrybutu pl"
                          v-model="attribute.name.pl"
                          :rules="[rules.required]"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col class="pb-0">
                        <v-text-field
                          label="Nazwa atrybutu en"
                          v-model="attribute.name.en"
                          :rules="[rules.required]"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row class="mx-auto" justify="center">
                      <v-col class="mx-1">
                        <v-row>
                          <span class="title font-weight-bold"
                            >Wartości atrybutów (ex. Czerwony, Czarny)</span
                          >
                          <v-spacer></v-spacer>
                          <v-btn icon fab @click="next"
                            ><v-icon large>mdi-plus-box</v-icon>
                          </v-btn>
                        </v-row>

                        <v-col v-for="(value, i) in attribute.values" :key="i">
                          <v-card light>
                            <v-card-text>
                              <v-row>
                                <v-col>
                                  <div class="body-1">
                                    Nazwa pl: {{ value.name.pl }}
                                  </div>
                                  <div class="body-1">
                                    Nazwa en: {{ value.name.en }}
                                  </div>
                                  <div class="body-1">
                                    Cena: {{ value.price }}
                                  </div>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col align="end">
                                  <v-btn
                                    icon
                                    large
                                    @click="attribute.values.splice(i, 1)"
                                  >
                                    <v-icon color="error" size="32"
                                      >mdi-close</v-icon
                                    ></v-btn
                                  >
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-col>
                    </v-row>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="cleanAttribute"
                      >Cofnij</v-btn
                    >
                    <v-btn
                      color="primary"
                      text
                      @click="pushAttribute(attribute)"
                      :disabled="!isValidAttribute"
                      >Dodaj</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-window-item>

            <v-window-item>
              <v-form v-model="isValidAttributeValue" ref="attributeValueForm">
                <v-card>
                  <v-card-title>Nowa wartość atrybutu</v-card-title>
                  <v-divider></v-divider>

                  <v-card-text>
                    <v-row>
                      <v-col class="pb-0">
                        <v-text-field
                          label="Nazwa atrybutu pl"
                          v-model="value.name.pl"
                          :rules="[rules.required]"
                          outlined
                        ></v-text-field>
                      </v-col>
                      <v-col class="pb-0">
                        <v-text-field
                          label="Nazwa atrybutu en"
                          v-model="value.name.en"
                          :rules="[rules.required]"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col class="pb-0">
                        <v-text-field
                          label="Cena"
                          v-model="value.price"
                          :rules="[rules.required, rules.max, rules.number]"
                          outlined
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    {{ value.price }}
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="prev">Cofnij</v-btn>
                    <v-btn
                      color="primary"
                      text
                      @click="pushValue(value)"
                      :disabled="!isValidAttributeValue"
                      >Dodaj</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-window-item>
          </v-window>
        </v-card>
      </v-form>
    </v-dialog>

    <Error v-if="error"></Error>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 6px;
}
</style>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

// Import dialog and fs to upload pictures
const { dialog } = require('electron').remote
const fs = require('fs')

// Import aws s3
import { s3 } from '@/plugins/aws.ts'

// Components
import Success from '@/components/Success.vue'
import Error from '@/components/Error.vue'

export default Vue.extend({
  components: {
    Success,
    Error
  },
  data() {
    return {
      pic: null,
      attribute_dialog: false,
      length: 3,
      rules: {
        required: (value) => !!value || 'Pole wymagane',
        max: (v) =>
          (v || '').length <= 8 ||
          (v.indexOf('.') !== -1
            ? v.split('.')[0].length <= 8
              ? v.split('.')[1].length <= 2 ||
                'Po przecinku mogą być tylko 2 cyfry'
              : 'Przed przecinkiem może być tylko 8 cyfr'
            : v.length > 8
            ? 'Max 8 cyfr'
            : ''),
        number: (v) => !isNaN(v) || 'Cena nie może zawierać liter'
      },
      isValidProduct: false,
      isValidVariant: false,
      isValidAttribute: false,
      isValidAttributeValue: false,
      onboarding: 0,
      product: {
        title: {
          pl: '',
          en: ''
        },
        description: {
          pl: '',
          en: ''
        },
        pictures: [],
        price: null,
        owner: null,
        variants: []
      },
      variant_dialog: false,
      variant: {
        title: {
          pl: '',
          en: ''
        },
        price: null,
        payToGo: '',
        attributes: []
      },
      attribute: {
        name: {
          pl: '',
          en: ''
        },
        values: []
      },
      value: {
        name: {
          pl: '',
          en: ''
        },
        price: null
      },
      groups: [],
      owners: [],
      empty: false,
      error: false,
      create_dialog: false,
      app_lang: localStorage.getItem('i18n')
    }
  },
  methods: {
    uploadPictures() {
      const imageName = `m35_${new Date().getTime()}.png`

      dialog.showOpenDialog((path) => {
        s3.putObject({
          Bucket: 'm35m2',
          Body: fs.readFileSync(path[0]),
          Key: 'products/' + imageName,
          ACL: 'public-read',
          ContentType: 'inline'
        })
          .promise()
          .then((response) => {
            const url = s3.getSignedUrl('getObject', {
              Bucket: 'm35m2',
              Key: 'products/' + imageName
            })

            this.product.pictures.push({ url: url.split('?')[0] })
          })
          .catch((err) => {
            console.log('failed:', err)
          })
      })
    },
    removePicture(picture) {
      s3.deleteObject({
        Bucket: 'm35m2',
        Key: 'products/' + picture.url.split('/')[4]
      })
        .promise()
        .then((res) => {
          const index = this.product.pictures.indexOf(picture)
          this.product.pictures.splice(index)
        })
        .catch((err) => {
          console.log('failed:', err)
        })
    },
    removeAllPictures() {
      // Remove all pictures from aws so we dont have a mess if someone randomly quit this page
      for (let x in this.product.pictures) {
        s3.deleteObject({
          Bucket: 'm35m2',
          Key: 'products/' + this.product.pictures[x].split('/')[4]
        })
          .promise()
          .then((res) => {
            this.product.pictures = []
          })
          .catch((err) => {
            console.log('failed:', err)
          })
      }
    },
    createProduct(product) {
      // Check if product have pictures
      if (product.pictures.length <= 0) {
        const text = 'Produkt musi posiadać przynajmniej jedno zdjęcie!'
        const icon = 'file-alert-outline'
        this.$store.dispatch('error', { text, icon })
        this.error = true
        return
      }

      // Save product
      axios
        .post('/products', product)
        .then((res) => {
          const text = 'new_product.success'
          const icon = 'check'
          this.$store.dispatch('success', { text, icon })
          this.$router.push(`/products/${res.data.id}`)
        })
        .catch((err) => {
          console.log(err)
          console.log('dupa')
          const text = err.response.data.error.message
          const icon = 'alert-circle-outline'
          this.$store.dispatch('error', { text, icon })
          this.error = true
        })
      setTimeout(() => {
        this.error = false
      }, 4000)
    },
    cancelVariant() {
      ;(this.variant = {
        title: {
          pl: '',
          en: ''
        },
        price: null,
        payToGo: '',
        attributes: []
      }),
        (this.variant_dialog = false)
      ;(this.$refs.variantForm as any).resetValidation()
    },
    pushVariant(variant) {
      this.product.variants.push(variant)
      this.variant_dialog = false
      ;(this.$refs.variantForm as any).resetValidation()
    },
    removeVariant(variant) {
      this.product.variants.splice(variant, 1)
    },
    cleanAttribute() {
      this.prev()
      ;(this.$refs.attributeForm as any).resetValidation()
    },
    pushAttribute(attribute) {
      this.variant.attributes.push(attribute)
      this.attribute = {
        name: {
          pl: '',
          en: ''
        },
        values: []
      }
      this.prev()
      ;(this.$refs.attributeForm as any).resetValidation()
    },
    pushValue(value) {
      this.attribute.values.push(value)
      this.value = {
        name: {
          pl: '',
          en: ''
        },
        price: null
      }
      this.prev()
      ;(this.$refs.attributeValueForm as any).resetValidation()
    },
    getAllOwners() {
      axios
        .get('/owners')
        .then((res) => {
          this.owners = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getAllGroups() {
      axios
        .get('/products/groups')
        .then((res) => {
          this.groups = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1
    }
  },
  mounted() {
    this.getAllOwners(), this.getAllGroups()
  }
})
</script>
