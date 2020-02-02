<template>
  <v-container>
    <v-btn @click="$router.go(-1)" icon class="ml-8">
      <v-icon size="32">arrow_back</v-icon>
    </v-btn>
    <v-content v-if="order">
      <v-card class="mx-auto px-auto round" max-width="90%" height="78vh" tile>
        <v-card-title>{{ $t('order.title') }} {{ order[0].id }}</v-card-title>
        <v-spacer></v-spacer>
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
              <v-card-title></v-card-title>
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

export default Vue.extend({
  data() {
    return {
      order: null
    }
  },
  async mounted() {
    await axios
      .get(`http://localhost:3000/v1/orders/${this.$route.params.id}`)
      .then(res => {
        this.order = Object.values(res.data.data)
      })
      .catch(error => console.log(error))

    console.log(this.order[0].user.company)
  }
})
</script>
