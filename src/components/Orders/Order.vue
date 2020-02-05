<template>
  <v-container>
    <v-btn @click="$router.go(-1)" icon class="ml-8">
      <v-icon size="32">arrow_back</v-icon>
    </v-btn>
    <v-content v-if="order">
      <v-card class="mx-auto px-auto round" max-width="90%" height="78vh" tile>
        <v-col>
          <v-row>
            <v-card-title
              >{{ $t('order.title') }} {{ order[0].id }}</v-card-title
            >
            <v-spacer></v-spacer>
            <v-card-title
              class="red--text jutify-space-around"
              v-if="order[0].removed"
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
                    {{ $t('order.user.name') }}: {{ order[0].user.firstName }}
                    {{ order[0].user.lastName }}
                  </div>

                  <div v-if="order[0].user.phone_number">
                    {{ $t('order.user.phone') }}:
                    {{ order[0].user.phone_number }}
                  </div>

                  <div>
                    {{ $t('order.user.email') }}: {{ order[0].user.email }}
                  </div>
                </v-col>
              </v-card-title>
            </v-card>

            <v-card class="mx-auto pr-5" color="primary" width="65%">
              <v-card-title class="subtitle-1">
                <div class="headline">
                  {{ $t('order.delivery.title') }}
                </div>
              </v-card-title>
              <v-card-actions v-if="!pick_up">
                <v-btn
                  @click=";(dialog = true), getCourier()"
                  v-if="this.order[0].delivery[0].courierDelivery"
                >
                  {{ $t('order.delivery.courier.title') }}
                </v-btn>
                <v-btn
                  @click="dialog = true"
                  v-if="this.order[0].delivery[0].specialDelivery"
                >
                  {{ $t('order.delivery.special.title') }}
                </v-btn>
              </v-card-actions>
              <v-card-title class="title-1">
                <div v-if="pick_up" class="font-weight-bold">
                  {{ $t('order.delivery.pick_up') }}!
                </div>
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
              <v-card-text>
                <v-list-item v-for="(product, i) in order[0].products" :key="i">
                  <v-list-item-content>
                    <v-list-item-title>
                      <div v-if="lang == 'pl'">
                        {{ product.title.pl }}
                      </div>
                      <div v-else>{{ product.title.en }}</div>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <div v-if="lang == 'pl'">
                        {{ $t('order.delivery.products.list_subtitle') }}:
                        {{
                          $t(`order.delivery.status.${product.status.title}`)
                        }}
                      </div>
                      <div v-else>
                        {{ $t('order.delivery.products.list_subtitle') }}:
                        {{
                          $t(`order.delivery.status.${product.status.title}`)
                        }}
                      </div>
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-btn @click=";(status_dialog = true), getCurrent(product)">
                    {{ $t('order.delivery.products.dialog.title') }}
                  </v-btn>
                </v-list-item>
              </v-card-text>
            </v-card>

            <v-card class="mx-auto pr-5" color="primary" width="30%">
              <v-card-title class="subtitle-1">
                <v-col cols="12">
                  <div class="headline">
                    {{ $t('order.company.title') }}
                  </div>

                  <div>
                    {{ $t('order.company.name') }}:
                    {{ order[0].user.company.name }}
                  </div>

                  <div>
                    {{ $t('order.company.vat_number') }}:
                    {{ order[0].user.company.vat_number }}
                  </div>
                </v-col>
              </v-card-title>
            </v-card>
          </v-row>
        </v-col>
      </v-card>
    </v-content>
    <v-content v-else align="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-content>

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
            <v-col> </v-col>
            <v-col col="2">
              <v-select
                :items="statuses"
                @change="changeStatus"
                item-text="title"
                item-value="id"
                v-bind:label="$t('order.delivery.products.dialog.set_status')"
              ></v-select>
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

export default Vue.extend({
  data() {
    return {
      order: null,
      pick_up: false,
      courier: null,
      special: null,
      dialog: false,
      status_dialog: false,
      clicked_product: null,
      delivery: null,
      lang: null,
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
      // click handler
      this.clicked_product = item //setting current itemd
    },
    async changeStatus(status) {
      console.log(this.clicked_product.id)
      console.log(status)
    }
  },
  async mounted() {
    await axios
      .get(`http://localhost:3000/v1/orders/${this.$route.params.id}`)
      .then(res => {
        this.order = Object.values(res.data.data)

        if (
          this.order[0].delivery[0].specialDelivery == null &&
          this.order[0].delivery[0].courierDelivery == null
        ) {
          this.pick_up = true
        }

        for (let x in this.order[0].products) {
          let product = this.order[0].products[x]

          switch (product.status) {
            case 0:
              this.order[0].products[x].status = { id: '0', title: 'waiting' }
              break

            case 1:
              this.order[0].products[x].status = { id: '1', title: 'process' }
              break

            case 2:
              this.order[0].products[x].status = { id: '2', title: 'completed' }
              break

            case 3:
              this.order[0].products[x].status = { id: '3', title: 'sent' }
              break
          }
        }

        this.lang = localStorage.getItem('i18n')
      })
      .catch(error => console.log(error))
  }
})
</script>
