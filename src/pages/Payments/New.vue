<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="$router.push('/payments')" icon fab class="mt-2">
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="11">
        <v-content v-if="payment" class="pa-0">
          <v-card class="mx-auto pb-2 round" max-height="80vh" tile>
            <v-card-title class="pb-2">{{
              $t('payments.new.title')
            }}</v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
              <v-row>
                <v-col cols="5" class="pr-2 ml-6">
                  <v-col class="pb-0">
                    <div class="headline ml-1 mb-3">
                      {{ $t('payments.new.name_pl') }}
                    </div>
                    <v-text-field
                      v-model="payment.name.pl"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col class="pb-0">
                    <div class="headline ml-1 mb-3">
                      {{ $t('payments.new.code') }}
                    </div>
                    <v-text-field
                      v-model="payment.code"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-col>
                <v-col cols="5" class="pr-2 ml-6">
                  <v-col class="pb-0">
                    <div class="headline ml-1 mb-3">
                      {{ $t('payments.new.name_en') }}
                    </div>
                    <v-text-field
                      v-model="payment.name.en"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-col>
              </v-row>
            </v-card-actions>

            <v-row class="mr-3">
              <v-spacer></v-spacer>
              <v-btn
                @click="createShippingMethod(payment)"
                color="primary"
                class="mr-4 mb-4"
                >{{ $t('payments.new.btn') }}</v-btn
              >
            </v-row>
          </v-card>
          <Error v-if="error"></Error>
        </v-content>
      </v-col>
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

// components
import Error from '@/components/Error.vue'

export default Vue.extend({
  components: {
    Error
  },
  data() {
    return {
      error: false,
      payment: {
        name: {
          pl: '',
          en: ''
        },
        code: ''
      }
    }
  },
  methods: {
    createShippingMethod(payment) {
      axios
        .post('/products/groups/payments', payment, {
          headers: {
            auth: localStorage.getItem('token')
          }
        })
        .then((res) => {
          const text = 'shipping.success'
          const icon = 'briefcase-check'
          this.$store.dispatch('success', { text, icon })
          this.$router.push('/payments')
        })
        .catch((err) => {
          const text = 'shipping.error'
          const icon = 'briefcase-remove'
          this.$store.dispatch('error', { text, icon })
          this.error = true
        })
      setTimeout(() => {
        this.error = false
      }, 4000)
      return
    }
  }
})
</script>
