<template>
  <v-container>
    <v-row v-if="group">
      <v-col cols="1" align="end">
        <v-btn @click="$router.push('/groups')" icon fab class="mt-2">
          <v-icon size="38">arrow_back</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-content class="pa-0 pl-5" style="overflow: scroll">
          <v-card
            class="round"
            style="overflow: scroll;"
            max-height="80vh"
            tile
          >
            <v-card-title class="pb-2">
              {{ $t('groups.single.number') }}: {{ group.id }}
              <v-spacer></v-spacer>
              <v-btn @click="editGroup()" large icon class="mb-1 pb-1" disabled>
                <v-icon size="32" class>mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>

            <v-row>
              <v-col cols="4" class="pr-2 ml-6">
                <v-col class="pb-0">
                  <div class="headline ml-1 mb-3">
                    {{ $t('groups.single.name_pl') }}
                  </div>
                  <v-text-field
                    v-model="group.name.pl"
                    outlined
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
              </v-col>
              <v-col cols="4" class="pr-2 ml-6">
                <v-col class="pb-0">
                  <div class="headline ml-1 mb-3">
                    {{ $t('groups.single.name_en') }}
                  </div>
                  <v-text-field
                    v-model="group.name.en"
                    outlined
                    :disabled="disabled"
                  ></v-text-field>
                </v-col>
              </v-col>
            </v-row>
            <v-row class="mx-auto ">
              <v-col cols="5" class="pr-2 ml-6">
                <span class="title">{{ $t('groups.single.payment') }}</span>
                <v-flex align="center">
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(item, i) in group.paymentMethods"
                      :key="i"
                    >
                      <v-expansion-panel-header
                        class="subtitle-1 font-weight-bold "
                      >
                        {{ item.method.name[app_lang] }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-col class="body-1">
                          {{ $t('payments.table.code') }}:
                          {{ item.method.code }}
                        </v-col>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-flex>
              </v-col>

              <v-col cols="5" class="pr-2 ml-6">
                <span class="title">{{ $t('groups.single.shipping') }}</span>
                <v-flex align="center">
                  <v-expansion-panels>
                    <v-expansion-panel
                      v-for="(item, i) in group.shippingMethods"
                      :key="i"
                    >
                      <v-expansion-panel-header
                        class="subtitle-1 font-weight-bold "
                      >
                        {{ item.method.name[app_lang] }}
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-col class="body-1">
                          {{ $t('payments.table.price') }}:
                          {{ item.method.price }}
                        </v-col>
                        <v-col class="body-1">
                          {{ $t('payments.table.code') }}:
                          {{ item.method.code }}
                        </v-col>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-flex>
              </v-col>
            </v-row>
          </v-card>
        </v-content>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-btn @click="$router.push('/groups')" icon fab class="mt-4 ml-4">
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
      group: null,
      disabled: true,
      save: false,
      error: true,
      types: [0, 1],
      app_lang: localStorage.getItem('i18n'),
      emailRules: [
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ]
    }
  },
  methods: {
    editGroup() {
      this.disabled = false
      this.save = true
    },
    saveGroup(group) {
      console.log(group)
    },
    cancelEdit() {
      this.disabled = true
      this.save = false
    }
  },
  async mounted() {
    await axios
      .get(`/products/groups/${this.$route.params.id}`)
      .then((res) => {
        this.error = false
        this.group = res.data
      })
      .catch((err) => {
        this.error = true
      })
  }
})
</script>
