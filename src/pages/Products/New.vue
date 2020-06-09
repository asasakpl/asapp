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
                  v-model="product.title.pl"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-bind:label="$t('new_product.title_en')"
                  v-model="product.title.en"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="2">
                <v-text-field
                  v-bind:label="$t('new_product.other.price')"
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
                  outlined
                ></v-textarea>
              </v-col>
              <v-col>
                <v-textarea
                  v-bind:label="$t('new_product.description_en')"
                  v-model="product.description.en"
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card-title class="pl-1">
                  Zdjęcia
                </v-card-title>
                <v-list>
                  <v-list-item-group>
                    <template v-for="(picture, index) in product.pictures">
                      <v-list-item v-bind:key="index">
                        <v-list-item-content class="round">
                          <v-list-item-title
                            >{{ picture }}

                            <v-btn icon @click="removePicture(picture)">
                              <v-icon>mdi-close</v-icon>
                            </v-btn></v-list-item-title
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
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
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="empty"
              @click="createProduct(product)"
              >Create</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
      product: {
        title: {
          pl: null,
          en: null
        },
        description: {
          pl: null,
          en: null
        },
        pictures: [],
        price: '',
        owner: null
      },
      owners: [],
      empty: false,
      error: false,
      create_dialog: false,
      rules: []
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

            this.product.pictures.push(url.split('?')[0])
          })
          .catch((err) => {
            console.log('failed:', err)
          })
      })
    },
    removePicture(picture) {
      s3.deleteObject({
        Bucket: 'm35m2',
        Key: 'products/' + picture.split('/')[4]
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
      // Reverse images
      product.pictures.reverse()

      axios
        .post('/products', product)
        .then((res) => {
          const text = 'new_product.success'
          const icon = 'check'
          this.$store.dispatch('success', { text, icon })
          this.$router.push('/products/list')
        })
        .catch((err) => {
          const text = err.response.data.error.message
          const icon = 'alert-circle-outline'
          this.$store.dispatch('error', { text, icon })
          this.error = true
        })
      setTimeout(() => {
        this.error = false
      }, 4000)
    },
    getAllOwners() {
      axios
        .get('/owners')
        .then((res) => {
          this.owners = res.data
        })
        .catch((err) => {})
    }
  },
  mounted() {
    this.getAllOwners()
  }
})
</script>
