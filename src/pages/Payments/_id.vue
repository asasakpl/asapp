<template>
  <v-container>
    <v-row v-if="payment">
      <v-col cols="1" align="center">
        <v-btn @click="$router.push('/payments')" icon fab class="mt-2">
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
              {{ $t('payments.new.id') }}: {{ payment.id }}
              <v-spacer></v-spacer>
              <v-btn @click="editPayment" large icon class="mb-1 pb-1" disabled>
                <v-icon size="32" class>mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>

            <v-row>
              <v-col cols="4" class="pr-2 ml-6">
                <v-col class="pb-0">
                  <div class="headline ml-1 mb-3">
                    {{ $t('payments.new.name_pl') }}
                  </div>
                  <v-text-field
                    v-model="payment.name.pl"
                    outlined
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
                <v-col class="pb-0">
                  <div class="headline ml-1 mb-3">
                    {{ $t('payments.new.code') }}
                  </div>
                  <v-text-field
                    v-model="payment.code"
                    outlined
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="4" class="pr-2 ml-6">
                <v-col class="pb-0">
                  <div class="headline ml-1 mb-3">
                    {{ $t('payments.new.name_en') }}
                  </div>
                  <v-text-field
                    v-model="payment.name.en"
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
      <v-btn @click="$router.push('/payments')" icon fab class="mt-4 ml-4">
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
      payment: null,
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
    editPayment() {
      this.disabled = false
      this.save = true
    },
    savePayment(payment) {
      console.log(payment)
    },
    cancelEdit() {
      this.disabled = true
      this.save = false
    }
  },
  async mounted() {
    await axios
      .get(`/products/groups/payments/${this.$route.params.id}`)
      .then((res) => {
        this.error = false
        this.payment = res.data
      })
      .catch((err) => {
        this.error = true
      })
  }
})
</script>
