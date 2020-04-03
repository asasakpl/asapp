<template>
  <v-container>
    <v-card class="mx-auto px-auto round" tile round max-width="90%">
      <v-card-title>
        {{ $t('settings.title') }}
      </v-card-title>
      <v-row class="justify-left pl-5">
        <v-card-title>
          <v-flex xs6>
            <v-subheader>{{ $t('settings.theme') }}</v-subheader>
          </v-flex>

          <v-flex xs6>
            <v-select
              single-line
              bottom
              v-model="theme"
              :items="themes"
              @change="setTheme"
            >
              <option
                v-for="(theme, i) in themes"
                :key="`Lang${i}`"
                :value="theme"
                >{{ theme }}</option
              >
            </v-select>
          </v-flex>
        </v-card-title>

        <v-card-title>
          <v-flex xs6>
            <v-subheader>{{ $t('settings.locale') }}</v-subheader>
          </v-flex>

          <v-flex xs6>
            <v-select
              single-line
              bottom
              v-model="$i18n.locale"
              :items="langs"
              @change="setLanguage"
            >
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
      <v-card-title>
        {{ $t('settings.about.title') }}
      </v-card-title>
      <v-row class="justify-left pl-5">
        <v-col>
          <v-card-title>
            <v-icon color="light-blue lighten-3">mdi-electron-framework</v-icon>
            <span class="ml-2">
              {{ electron }}
            </span>
          </v-card-title>

          <v-card-title>
            <v-icon color="green">mdi-nodejs</v-icon>
            <span class="ml-2">
              {{ node }}
            </span>
          </v-card-title>
          <v-card-title>
            <v-icon color="light-blue accent-4">mdi-google-chrome</v-icon>
            <span class="ml-2">
              {{ chrome }}
            </span>
          </v-card-title>
        </v-col>
        <v-col>
          <v-card-title>
            <v-icon color="green accent-3">mdi-vuejs</v-icon>
            <span class="ml-2">
              {{ vue }}
            </span>
          </v-card-title>
          <v-card-title>
            <v-icon color="blue lighten-2">mdi-vuetify</v-icon>
            <span class="ml-2">
              {{ vuetify }}
            </span>
          </v-card-title>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 8px;
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      theme: localStorage.getItem('theme'),
      langs: ['pl', 'en'],
      themes: ['dark', 'light'],
      chrome: process.versions.chrome,
      electron: process.versions.electron,
      node: process.versions.node,
      platform: require('os').platform(),
      vue: require('vue/package.json').version,
      vuetify: require('vuetify/package.json').version
    }
  },
  methods: {
    setTheme(themeColor) {
      if (themeColor == 'light') {
        this.$vuetify.theme.dark = false
        localStorage.setItem('theme', 'light')
      } else if (themeColor == 'dark') {
        this.$vuetify.theme.dark = true
        localStorage.setItem('theme', 'dark')
      }
    },
    setLanguage(lang) {
      localStorage.setItem('i18n', lang)
    }
  }
})
</script>
