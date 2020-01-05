<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="color"
    :expand-on-hover="expandOnHover"
    :mini-variant="miniVariant"
    :right="right"
    absolute
    dark
  >
    <v-layout column fill-height>
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

        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <v-list dense nav>
        <v-list-item link to="/settings">
          <v-list-item-icon>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-on:click="login()">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-layout>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  props: {
    source: String
  },
  data() {
    return {
      user: [],
      drawer: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
        { title: 'Orders', icon: 'mdi-truck', to: 'orders' },
        { title: 'Users', icon: 'mdi-account-group', to: 'users' }
      ],
      color: 'red',
      colors: ['primary', 'blue', 'success', 'red', 'teal'],
      right: false,
      miniVariant: false,
      expandOnHover: true,
      background: false
    }
  },
  methods: {
    login() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    async getUserdata() {
      let id = localStorage.getItem('m_user')
      await axios.get(`http://localhost:3000/v1/users/${id}`).then(res => {
        localStorage.setItem('token', res.config.headers.auth)
        this.user = res.data.data.user
        this.$store.state.user = this.user
        return
      })
    }
  },
  beforeMount() {
    this.getUserdata()
  }
})
</script>
