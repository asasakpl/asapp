<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="$router.push('/groups')" icon fab class="mt-2">
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="11">
        <v-content v-if="group" class="pa-0">
          <v-card class="mx-auto pb-2 round" max-height="80vh" tile>
            <v-card-title class="pb-2">{{
              $t('groups.new.title')
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
                      v-model="group.name.pl"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-card-title class="pl-0">Metody wysyłki</v-card-title>
                    <v-list-item
                      v-for="(item, i) in group.shippingMethods"
                      v-bind:key="i"
                    >
                      <v-list-item-title>{{ item.name.pl }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        item.code
                      }}</v-list-item-subtitle>
                      <v-list-item-icon>
                        <v-btn
                          icon
                          color="error"
                          @click="group.shippingMethods.splice(i, 1)"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-btn @click="shipping_dialog = true">
                      Dodaj
                    </v-btn>
                    <v-dialog v-model="shipping_dialog" max-width="40%">
                      <v-card>
                        <v-card-title>Dodaj metode wysyłki</v-card-title>
                        <v-card-text>
                          <v-select
                            :items="shippingMethods"
                            item-text="name.pl"
                            item-value="id"
                            return-object
                            v-model="shippingMethod"
                            label="Opcje wysyłki"
                            outlined
                            clearable
                          ></v-select>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn
                            color="error darken-1"
                            text
                            @click="shipping_dialog = false"
                          >
                            Anuluj
                          </v-btn>

                          <v-btn
                            color="green darken-1"
                            text
                            @click="
                              pushShipping(shippingMethod),
                                (shipping_dialog = false)
                            "
                          >
                            Dodaj
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-col>

                <v-col cols="5" class="pr-2 ml-6">
                  <v-col class="pb-0">
                    <div class="headline ml-1 mb-3">
                      {{ $t('payments.new.name_en') }}
                    </div>
                    <v-text-field
                      v-model="group.name.en"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-card-title class="pl-0">Metody płatności</v-card-title>
                    <v-list-item
                      v-for="(item, i) in group.paymentMethods"
                      v-bind:key="i"
                    >
                      <v-list-item-title>{{ item.name.pl }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        item.code
                      }}</v-list-item-subtitle>
                      <v-list-item-icon>
                        <v-btn
                          icon
                          color="error"
                          @click="group.paymentMethods.splice(i, 1)"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-btn @click="payment_dialog = true">
                      Dodaj
                    </v-btn>
                    <v-dialog v-model="payment_dialog" max-width="40%">
                      <v-card>
                        <v-card-title>Dodaj metode płatności</v-card-title>
                        <v-card-text>
                          <v-select
                            :items="paymentMethods"
                            item-text="name.pl"
                            item-value="id"
                            v-model="paymentMethod"
                            label="Opcje płatności"
                            return-object
                            outlined
                          ></v-select>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn
                            color="error darken-1"
                            text
                            @click="payment_dialog = false"
                          >
                            Anuluj
                          </v-btn>

                          <v-btn
                            color="green darken-1"
                            text
                            @click="
                              pushPayment(paymentMethod),
                                (payment_dialog = false)
                            "
                          >
                            Dodaj
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-col>
              </v-row>
            </v-card-actions>

            <v-row class="mr-3">
              <v-spacer></v-spacer>
              <v-btn
                @click="createShippingMethod(group)"
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
      group: {
        name: {
          pl: '',
          en: ''
        },
        paymentMethods: [],
        shippingMethods: []
      },
      paymentMethods: null,
      paymentMethod: null,
      shippingMethods: null,
      shippingMethod: null,
      shipping_dialog: false,
      payment_dialog: false
    }
  },
  methods: {
    getMethods() {
      axios.get('/products/groups/payments').then((res) => {
        this.paymentMethods = res.data
      })

      axios.get('/products/groups/shipping').then((res) => {
        this.shippingMethods = res.data
      })
    },
    pushPayment(paymentMethod) {
      this.group.paymentMethods.push(paymentMethod)
      this.paymentMethod = null
    },
    pushShipping(shippingMethod) {
      this.group.shippingMethods.push(shippingMethod)
      this.shippingMethod = null
    },
    createShippingMethod(group) {
      axios
        .post('/products/groups/', group, {
          headers: {
            auth: localStorage.getItem('token')
          }
        })
        .then((res) => {
          const text = 'shipping.success'
          const icon = 'briefcase-check'
          this.$store.dispatch('success', { text, icon })
          this.$router.push('/groups')
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
  },
  mounted() {
    this.getMethods()
  }
})
</script>
