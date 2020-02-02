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
      theme: localStorage.getItem('theme'),
      langs: ['pl', 'en'],
      themes: ['dark', 'light']
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
