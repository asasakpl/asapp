<template>
  <v-container>
    <v-card class="mx-auto px-auto round" tile round max-width="90%">
      <v-card-title>
        {{ $t('settings.title') }}
      </v-card-title>
      <v-row class="justify-left pl-5">
        <v-card-title>
          <v-switch
            color="primary"
            v-bind:label="$t('settings.theme')"
            v-model="themeColor"
            @change="changeTheme()"
          ></v-switch>
        </v-card-title>

        <v-card-title>
          <v-flex xs6>
            <v-subheader>{{ $t('settings.locale') }}</v-subheader>
          </v-flex>

          <v-flex xs6>
            <v-select single-line bottom v-model="$i18n.locale" :items="langs">
              <option
                v-for="(lang, i) in langs"
                :key="`Lang${i}`"
                :value="lang"
                >{{ lang }}</option
              >
            </v-select>
          </v-flex>
        </v-card-title>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 20px;
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      themeColor: this.$vuetify.theme.dark,
      langs: ['pl', 'en']
    }
  },
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
})
</script>
