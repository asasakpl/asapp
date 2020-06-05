<template>
  <v-container>
    <v-row>
      <v-col cols="1">
        <v-btn @click="$router.go(-1)" icon class="mt-2">
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="11">
        <v-card
          class="mx-auto px-auto pb-2 round"
          style="overflow: scroll"
          max-height="88vh"
          tile
        >
          <v-card-title class="pb-2">
            {{ $t('new_product.title') }}
          </v-card-title>

          <v-divider></v-divider>
          <v-card-text>
            <v-btn v-on:click="uploadPictures()">Upload</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 6px;
}
</style>

<script lang="ts">
import Vue from 'vue'

// Import dialog and fs to upload pictures
const { dialog } = require('electron').remote
const fs = require('fs')

// Import aws s3
import { s3 } from '@/plugins/aws.ts'

export default Vue.extend({
  data() {
    return {
      pic: null,
      product: {
        title: {},
        description: {},
        type: Number,
        pictures: []
      },
      file: '',
      create_dialog: false,
      type: [
        {
          id: 1,
          name: 'Dostawa kurierem'
        },
        {
          id: 2,
          name: 'Dostawa specjalna'
        }
      ]
    }
  },
  methods: {
    uploadPictures() {
      const pic = document.getElementById('files')
      const ddd = document.getElementById('file')
      let content = 'dupa'

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

        console.log(this.product.pictures)
      })
    },
    createProduct(product) {
      console.log(product)
      // this.$router.push(`/products`)
    }
  }
})
</script>
