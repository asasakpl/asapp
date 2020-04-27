<template>
  <v-container>
    <v-btn @click="$router.go(-1)" icon class="ml-8">
      <v-icon size="32">arrow_back</v-icon>
    </v-btn>
    <v-card
      class="mx-auto px-auto pb-2 round"
      style="overflow: scroll"
      max-width="90%"
      max-height="88vh"
      tile
    >
      <v-card-title class="pb-2">
        {{ $t('new_product.title') }}
      </v-card-title>

      <v-divider></v-divider>

      <v-row>
        <v-col cols="4" class="pr-2">
          <v-col class="pb-0">
            <div class="headline ml-1 mb-3">
              {{ $t('products.titles.title') }}
            </div>
            <v-text-field
              v-model="product.title.pl"
              v-bind:label="$t('new_product.title_pl')"
              outlined
            ></v-text-field>

            <v-text-field
              v-model="product.title.en"
              v-bind:label="$t('new_product.title_en')"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pt-0">
            <div class="headline ml-1 mb-3">
              {{ $t('products.descriptions.title') }}
            </div>
            <v-textarea
              v-model="product.description.pl"
              rows="10"
              outlined
              v-bind:label="$t('new_product.description_pl')"
            ></v-textarea>

            <v-textarea
              v-model="product.description.en"
              rows="10"
              v-bind:label="$t('new_product.description_en')"
              outlined
            ></v-textarea>
          </v-col>

          <v-col cols="12" class="pt-0">
            <div class="headline ml-1 mb-3">
              {{ $t('new_product.other.title') }}
            </div>
            <v-text-field
              lazy-validation
              counter="10"
              v-model="product.price"
              v-bind:label="$t('new_product.other.price')"
              outlined
            ></v-text-field>

            <v-select
              :items="type"
              item-text="name"
              item-value="id"
              v-model="product.type"
              v-bind:label="$t('new_product.other.type')"
              outlined
            >
            </v-select>
            <v-text-field
              v-model="product.category"
              v-bind:label="$t('new_product.other.category')"
              outlined
            ></v-text-field>

            <v-text-field
              v-model="product.tag"
              v-bind:label="$t('new_product.other.tag')"
              outlined
            ></v-text-field>
          </v-col>
        </v-col>
      </v-row>

      <v-row class="mr-3 mb-2">
        <v-spacer></v-spacer>

        <v-btn @click="create_dialog = true" color="primary">{{
          $t('new_product.button')
        }}</v-btn>
      </v-row>
    </v-card>

    <v-dialog v-model="create_dialog" persistent max-width="700">
      <v-card>
        <v-card-title class="headline">{{
          $t('new_product.dialog.warning')
        }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="create_dialog = false">{{
            $t('new_product.dialog.no')
          }}</v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="createProduct(product), (create_dialog = false)"
            >{{ $t('new_product.dialog.yes') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 6px;
}
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      product: {
        title: {},
        description: {},
        type: Number
      },
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
    createProduct(product) {
      console.log(product)
      // this.$router.push(`/products`)
    }
  }
})
</script>