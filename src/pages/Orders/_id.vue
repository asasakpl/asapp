<template>
  <v-container>
    <v-row>
      <v-content v-if="order">
        <v-col>
          <v-btn @click="$router.go(-1)" icon fab class="ml-8">
            <v-icon large>arrow_back</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-card class="mx-auto px-auto pb-2 round" tile>
            <v-col>
              <v-row>
                <v-card-title
                  >{{ $t('order.title') }} {{ order.id }}</v-card-title
                >
                <v-spacer></v-spacer>
                <v-card-title
                  class="red--text jutify-space-around"
                  v-if="order.removed"
                >
                  <v-icon color="red">mdi-clipboard-alert</v-icon>
                  <div class="ml-2">{{ $t('order.removed') }}!</div>
                </v-card-title>
              </v-row>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12">
              <v-row>
                <v-card class="mx-auto pr-5" color="primary" width="25%">
                  <v-card-title class="subtitle-1">
                    <v-col cols="12">
                      <div class="headline">
                        {{ $t('order.user.title') }}
                      </div>
                      <div>
                        {{ $t('order.user.name') }}:
                        {{ order.user.firstName }}
                        {{ order.user.lastName }}
                      </div>

                      <div v-if="order.user.phone_number">
                        {{ $t('order.user.phone') }}:
                        {{ order.user.phone_number }}
                      </div>

                      <div>
                        {{ $t('order.user.email') }}: {{ order.user.email }}
                      </div>
                    </v-col>
                  </v-card-title>
                </v-card>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-card class="mx-auto pr-5" color="primary" min-width="60%">
                  <v-card-title class="subtitle-1">
                    <v-col cols="12">
                      <div class="headline">
                        {{ $t('order.products.title') }}
                      </div>
                    </v-col>
                  </v-card-title>
                </v-card>

                <v-card
                  class="mx-auto pr-5"
                  color="primary"
                  width="30%"
                  v-if="order.user.company"
                >
                  <v-card-title class="subtitle-1">
                    <v-col cols="12">
                      <div class="headline">
                        {{ $t('order.company.title') }}
                      </div>

                      <div>
                        {{ $t('order.company.name') }}:
                        {{ order.user.company.name }}
                      </div>

                      <div>
                        {{ $t('order.company.vat_number') }}:
                        {{ order.user.company.vat_number }}
                      </div>
                    </v-col>
                  </v-card-title>
                </v-card>
              </v-row>
            </v-col>

            <v-card-actions class="justify-space-around">
              <v-row>
                <div class="title ml-10 mr-2">
                  {{ $t('order.payment.title') }}:
                </div>
                <div class="title" v-if="order.paymentStatus == 0">
                  {{ $t('order.payment.waiting') }}
                </div>
                <div class="title" v-else>{{ $t('order.payment.done') }}</div>
              </v-row>
              <v-spacer></v-spacer>

              <v-row class="justify-end">
                <div class="title mr-8">
                  {{ $t('order.status.title') }}:
                  {{
                    $t(`order.status.${order_status[this.order.status].title}`)
                  }}
                </div>
                <v-btn
                  color="red"
                  medium
                  class="mr-10"
                  v-if="this.order.status != 1"
                  @click="complete_dialog = true"
                >
                  {{ $t('order.status.complete') }}
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-content>
      <v-content v-else class="pa-0">
        <v-row justify="space-between">
          <v-col cols="1" align="center">
            <v-btn @click="$router.push('/orders')" fab icon>
              <v-icon large>arrow_back</v-icon>
            </v-btn>
          </v-col>
          <v-col class="mr-12 mt-3" cols="6">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-content>
    </v-row>

    <v-dialog v-model="status_dialog" max-width="700">
      <v-card v-if="clicked_product">
        <v-card-title>
          <v-row class="justify-space-between">
            <div v-if="lang == 'pl'">{{ clicked_product.title.pl }}</div>
            <div v-else>{{ clicked_product.title.en }}</div>

            <div class="mr-5">
              {{ $t('order.delivery.price') }} {{ clicked_product.price }} pln
            </div>
          </v-row>
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col col="2">
              <div>
                {{ $t('order.delivery.products.dialog.current_status') }}:
                {{ clicked_product.status.title }}
              </div>
              <v-select
                :items="statuses"
                @change="changeStatus"
                v-model="statuses[clicked_product.status]"
                item-text="title"
                item-value="id"
                v-bind:label="$t('order.delivery.products.dialog.set_status')"
              ></v-select>
            </v-col>
            <v-col>
              <div>{{ $t('order.delivery.products.dialog.legend') }}:</div>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Waiting - Oczekuje na relizacje</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Processing - W trakcie realizacji</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Completed - Zakończono realizacje</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Sent - Wysłano produkt</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="status_dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="700">
      <v-card v-if="delivery">
        <v-card-title class="headline lighten-2 " primary-title>
          <v-row class="justify-space-between">
            <div class="ml-3">
              {{ $t('order.delivery.courier.title') }}
            </div>
            <div class="mr-3">
              {{ $t('order.delivery.price') }} {{ delivery.price }} pln
            </div>
          </v-row>
        </v-card-title>

        <v-card-text>
          <v-row class="justify-space-between">
            <v-card class=" pr-5" flat>
              <v-card-title>{{
                $t('order.delivery.products.title')
              }}</v-card-title>
              <v-card-text>
                <v-list-item v-for="(product, i) in delivery.products" :key="i">
                  <v-list-item-content>
                    <v-list-item-title v-if="lang == 'pl'">{{
                      product.title.pl
                    }}</v-list-item-title>
                    <v-list-item-title v-else>{{
                      product.title.en
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
            </v-card>
            <v-card class=" pr-5" flat>
              <v-card-title>
                {{ $t('order.delivery.address.title') }}
              </v-card-title>
              <v-card-text>
                <v-col cols="12" class="subtitle-1 white--text">
                  <div>
                    {{ $t('order.delivery.address.house_number') }}:
                    {{ delivery.address.house_number }}
                  </div>
                  <div>
                    {{ $t('order.delivery.address.street') }}:
                    {{ delivery.address.street }}
                  </div>
                  <div>
                    {{ $t('order.delivery.address.city') }}:
                    {{ delivery.address.city }}
                  </div>
                  <div>
                    {{ $t('order.delivery.address.state') }}:
                    {{ delivery.address.state }}
                  </div>
                  <div>
                    {{ $t('order.delivery.address.country') }}:
                    {{ delivery.address.country }}
                  </div>
                </v-col>
              </v-card-text>
            </v-card>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="complete_dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">{{
          $t('order.status.warning')
        }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="complete_dialog = false">{{
            $t('order.status.dialog.no')
          }}</v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="completeOrder(), (complete_dialog = false)"
            >{{ $t('order.status.dialog.yes') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" v-if="snackbar" :timeout="5000">
      {{ $t(`order.status.dialog.${msg}`) }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 8px;
}

.select {
  max-width: 260px;
  height: 50px;
}

.vertical {
  vertical-align: center;
  justify-content: center;
}
</style>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { error } from 'electron-log'

export default Vue.extend({
  data() {
    return {
      order: null,
      pick_up: false,
      courier: null,
      special: null,
      msg: 'null',
      dialog: false,
      snackbar: false,
      complete_dialog: false,
      status_dialog: false,
      clicked_product: null,
      delivery: null,
      lang: null,
      order_status: [
        {
          id: 0,
          title: 'created'
        },
        {
          id: 1,
          title: 'completed'
        }
      ],
      statuses: [
        {
          id: 0,
          title: 'Waiting'
        },
        {
          id: 1,
          title: 'Processing'
        },
        {
          id: 2,
          title: 'Completed'
        },
        {
          id: 3,
          title: 'Sent'
        }
      ]
    }
  },
  methods: {
    getCourier() {
      this.delivery = this.order[0].delivery[0].courierDelivery
    },
    getCurrent(item) {
      this.clicked_product = item
      this.statuses[this.clicked_product.status] = undefined
    },
    async changeStatus(status) {
      this.clicked_product.status = this.statuses[status]
      await axios.patch(`/orders/product/${this.clicked_product.id}`, {
        status: status
      })
    },
    async completeOrder() {
      await axios
        .patch(`/orders/complete/${this.order[0].id}`, {
          status: 1
        })
        .then((res) => {
          this.msg = 'success'
          this.snackbar = true
          this.order[0].status = 1
        })
        .catch((error) => ((this.snackbar = true), (this.msg = 'error')))
    }
  },
  async mounted() {
    await axios
      .get(`/orders/${this.$route.params.id}`)
      .then((res) => {
        this.order = res.data

        for (let x in this.order[0].products) {
          let product = this.order[0].products[x]

          switch (product.status) {
            case 0:
              this.order[0].products[x].status = this.statuses[0]
              break

            case 1:
              this.order[0].products[x].status = this.statuses[1]
              break

            case 2:
              this.order[0].products[x].status = this.statuses[2]
              break

            case 3:
              this.order[0].products[x].status = this.statuses[3]
              break
          }
        }

        this.lang = localStorage.getItem('i18n')
      })
      .catch((error) => console.log(error))
  }
})
</script>
