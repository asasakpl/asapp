<template>
  <v-container>
    <v-row justify="space-around">
      <v-navigation-drawer
        v-model="drawer"
        :color="color"
        :expand-on-hover="expandOnHover"
        :mini-variant="miniVariant"
        :right="right"
        :src="bg"
        absolute
        dark
      >
        <v-list dense nav class="py-0">
          <v-list-item two-line>
            <v-avatar size="42">
              <v-icon large>mdi-account</v-icon>
            </v-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ user.firstName }}</v-list-item-title>
              <v-list-item-subtitle>{{ user.lastName }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <span>{{ user }} </span>

      <v-footer app>
        <v-spacer />
        <span>&copy; 2019</span>
      </v-footer>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  props: {
    source: String
  },
  created() {
    this.$vuetify.theme.dark = true
  },
  data() {
    return {
      user: null,
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Orders', icon: 'mdi-truck' },
        { title: 'About', icon: 'mdi-help-box' }
      ],
      color: 'red',
      colors: ['primary', 'blue', 'success', 'red', 'teal'],
      right: false,
      miniVariant: false,
      expandOnHover: true,
      background: false
    }
  },
  components: {},
  methods: {
    async getUserdata() {
      let id = localStorage.getItem('m_user')
      await axios.get(`http://localhost:3000/v1/users/${id}`).then(res => {
        localStorage.setItem('token', res.config.headers.auth)
        console.log(res.config.headers)
        this.user = res.data.data.user
        return
      })
    }
  },
  beforeMount() {
    this.getUserdata()
  }
})
</script>
