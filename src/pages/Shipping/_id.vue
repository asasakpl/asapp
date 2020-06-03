<template>
  <v-container>
    <v-row v-if="shipping">
      <v-col cols="1" align="end">
        <v-btn @click="$router.push('/shipping')" icon fab class="mt-2">
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-content class="pa-0 pl-5" style="overflow: scroll">
          <v-card
            class="round"
            style="overflow: scroll;"
            max-width="90%"
            max-height="80vh"
            tile
          >
            <v-card-title class="pb-2">
              {{ $t('shipping.new.id') }}: {{ shipping.id }}
              <v-spacer></v-spacer>
              <v-btn
                @click="editShipping"
                large
                icon
                class="mb-1 pb-1"
                disabled
              >
                <v-icon size="32" class>mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>

            <v-row>
              <v-col cols="4" class="pr-2 ml-6">
                <v-col class="pb-0">
                  <div class="headline ml-1 mb-3">
                    {{ $t('shipping.new.name_pl') }}
                  </div>
                  <v-text-field
                    v-model="shipping.name.pl"
                    outlined
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0">
                  <div class="headline ml-1 mb-3">
                    {{ $t('shipping.new.code') }}
                  </div>
                  <v-text-field
                    v-model="shipping.code"
                    outlined
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="4" class="pr-2 ml-6">
                <v-col class="pb-0">
                  <div class="headline ml-1 mb-3">
                    {{ $t('shipping.new.name_en') }}
                  </div>
                  <v-text-field
                    v-model="shipping.name.en"
                    outlined
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0">
                  <div class="headline ml-1 mb-3">
                    {{ $t('shipping.new.price') }}
                  </div>
                  <v-text-field
                    v-model="shipping.price"
                    outlined
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
              </v-col>
            </v-row>
          </v-card>
        </v-content>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-btn @click="$router.push('/admins')" icon fab class="mt-4 ml-4">
        <v-icon size="38">arrow_back</v-icon>
      </v-btn>

      <v-content align="center" class="pl-0 mr-12 pr-12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-content>
    </v-row>

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
import NetworkError from '@/components/NetworkError.vue'

export default Vue.extend({
  components: {
    NetworkError
  },
  data() {
    return {
      shipping: null,
      disabled: true,
      save: false,
      error: true,
      types: [0, 1],
      emailRules: [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ]
    }
  },
  methods: {
    editShipping() {
      this.disabled = false
      this.save = true
    },
    saveShipping(shipping) {
      console.log(shipping)
    },
    cancelEdit() {
      this.disabled = true
      this.save = false
    }
  },
  async mounted() {
    await axios
      .get(`/products/groups/shipping/${this.$route.params.id}`)
      .then((res) => {
        this.error = false
        this.shipping = res.data
        console.log(res.data)
      })
      .catch((err) => {
        this.error = true
        console.log(err)
      })
  }
})
</script>
