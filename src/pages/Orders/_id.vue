<template>
  <v-container>
    <v-row v-if="order">
      <v-col cols="1" align="center">
        <v-btn @click="$router.push('/orders')" icon fab>
          <v-icon large>arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto px-auto round"
          style="max-height: 80vh; overflow: scroll;"
          tile
        >
          <v-card-title>{{ $t('order.title') }} {{ order.id }}</v-card-title>
          <v-spacer></v-spacer>
          <v-card-title
            class="red--text jutify-space-around"
            v-if="order.removed"
          >
            <v-icon color="red">mdi-clipboard-alert</v-icon>
            <div class="ml-2">{{ $t('order.removed') }}!</div>
          </v-card-title>

          <v-divider></v-divider>
          <v-row class="mx-auto px-auto">
            <v-col cols="6" class="d-flex">
              <v-card
                class="mx-auto px-auto round flex d-flex flex-column"
                color="primary"
              >
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
            </v-col>
            <v-col cols="6" class="d-flex">
              <v-card
                class="mx-auto px-auto px-auto round flex d-flex flex-column"
                color="primary"
              >
                <v-card-title class="subtitle-1">
                  <v-col>
                    <v-row class="headline">
                      {{ $t('order.status.info') }}
                    </v-row>
                    <v-row>
                      {{ $t('order.status.title') }}: &nbsp;
                      {{
                        $t(
                          `orders_table.status_obj.${
                            order_status[this.order.status].title
                          }`
                        )
                      }}
                    </v-row>
                    <v-row>
                      {{ $t('order.payment.title') }}: ‎‎‎&nbsp;
                      <div v-if="order.paymentStatus == 0">
                        {{ $t('orders_table.payment_status_obj.waiting') }}
                      </div>
                      <div v-else>
                        {{ $t('orders_table.payment_status_obj.finished') }}
                      </div>
                    </v-row>
                  </v-col>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="status_dialog = true">
                    {{ $t('order.status.change_status') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mx-auto px-auto">
            <v-col>
              <v-card class="mx-auto px-auto pb-2" color="primary">
                <v-card-title class="headline">
                  {{ $t('order.products.title') }}
                </v-card-title>
                <v-flex align="center" class="mx-2">
                  <v-expansion-panels accordion class="round">
                    <v-expansion-panel
                      v-for="(item, i) in order.products"
                      :key="i"
                    >
                      <v-expansion-panel-header
                        class="subtitle-1 font-weight-bold "
                      >
                        {{ item.title[app_lang] }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-col>
                          Tytuł wariantu: {{ item.variant.title[app_lang] }}
                          <v-list rounded>
                            <v-list-item
                              v-for="(attribute, i) in item.variant.attributes"
                              :key="i"
                              dense
                            >
                              <v-list-item-content>
                                <v-list-item-title
                                  v-text="
                                    `Nazwa atrybutu: ${attribute.name[app_lang]}`
                                  "
                                ></v-list-item-title>

                                <v-list-item-subtitle>
                                  <v-col>
                                    <v-row>
                                      Nazwa zamówionej opcji:
                                      <div class="white--text ml-1 mr-1">
                                        {{ attribute.value.name[app_lang] }}
                                      </div>
                                    </v-row>
                                    <v-row>
                                      Cena zamówionej opcji:
                                      <div class="white--text ml-1 mr-1">
                                        {{ attribute.value.price }}
                                      </div>
                                      PLN
                                    </v-row>
                                  </v-col>
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-col></v-expansion-panel-content
                      >
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-flex>
              </v-card>
            </v-col>
            <v-col v-if="order.user.company" cols="4">
              <v-card class="mx-auto" color="primary">
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
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
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
    </v-row>

    <v-dialog v-model="status_dialog" width="50%" persistent>
      <v-window v-model="onboarding" class="elevation-1">
        <v-window-item>
          <v-card>
            <v-card-title class="pb-0">
              <v-select
                outlined
                :items="order_status"
                v-model="status"
                item-text="title"
                item-value="id"
                label="Zmień status zamówienia"
              >
                <template slot="default" slot-scope="{ item }">
                  {{ $t(`orders_table.status_obj.${item.title}`) }}
                </template>
                <template slot="selection" slot-scope="{ item }">
                  {{ $t(`orders_table.status_obj.${item.title}`) }}
                </template>
                <template slot="item" slot-scope="{ item }">
                  {{ $t(`orders_table.status_obj.${item.title}`) }}
                </template>
              </v-select>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="status_dialog = false">Anuluj</v-btn>
              <v-btn color="primary" @click="next">Zmień</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
        <v-window-item>
          <v-card>
            <v-card-title>
              Czy jesteś pewny że chcesz zmienić status zamówienia?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" @click="prev">Nie</v-btn>
              <v-btn
                color="primary"
                @click="
                  changeStatus(status),
                    (status_dialog = false),
                    (onboarding = 0)
                "
                >Tak</v-btn
              >
            </v-card-actions>
          </v-card></v-window-item
        >
      </v-window>
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
import { error } from 'electron-log'

export default Vue.extend({
  data() {
    return {
      order: null,
      pick_up: false,
      courier: null,
      special: null,
      length: 2,
      onboarding: 0,
      msg: 'null',
      snackbar: false,
      status_dialog: false,
      clicked_product: null,
      delivery: null,
      app_lang: null,
      status: null,
      order_status: [
        {
          id: 0,
          title: 'created'
        },
        {
          id: 1,
          title: 'during'
        },
        {
          id: 2,
          title: 'ready'
        },
        {
          id: 3,
          title: 'finished'
        }
      ]
    }
  },
  methods: {
    next() {
      this.onboarding =
        this.onboarding + 1 === this.length ? 0 : this.onboarding + 1
    },
    prev() {
      this.onboarding =
        this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1
    },
    getCurrent(item) {
      this.clicked_product = item
    },
    async changeStatus(status) {
      await axios
        .patch(`/orders/status/${this.$route.params.id}`, {
          status: status
        })
        .then((res) => {
          this.order.status = res.data.order.status
          this.onboarding = 0
          const text = 'order.status.success'
          const icon = 'package-variant'
          this.$store.dispatch('success', { text, icon })
        })
        .catch((err) => {
          let text
          let icon
          if (!err.response) {
            // network error
            text = 'Check your internet connection'
            icon = 'network-strength-off'
          } else {
            text = err
            icon = 'alert-circle-outline'
          }

          this.$store.dispatch('error', { text, icon })
        })
    }
  },
  async mounted() {
    await axios
      .get(`/orders/${this.$route.params.id}`)
      .then((res) => {
        this.order = res.data
        this.status = this.order_status[this.order.status]
        this.app_lang = localStorage.getItem('i18n')
      })
      .catch((error) => {
        let text
        let icon
        if (!error.response) {
          // network error
          text = 'Check your internet connection'
          icon = 'network-strength-off'
        } else {
          text = error.response.data.error.message
          icon = 'alert-circle-outline'
        }

        this.$store.dispatch('error', { text, icon })
      })
  }
})
</script>
