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

          <v-list-item-content class="ml-3">
            <v-list-item-title>{{ name }}</v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="orders" disabled>
          <v-list-item-icon>
            <v-icon>mdi-truck</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Zamówienia</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="users" disabled>
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Użytkownicy</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="products" disabled>
          <v-list-item-icon>
            <v-icon>mdi-folder-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Produkty</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="sellers" disabled>
          <v-list-item-icon>
            <v-icon>mdi-account-cash</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Sprzedawcy</v-list-item-title>
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
            <v-list-item-title>Ustawienia</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-on:click="login()">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Wyloguj się</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-ev-station</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              >v{{ $store.getters.appVersion }}</v-list-item-title
            >
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
      name: localStorage.getItem('m_name'),
      email: localStorage.getItem('m_email'),
      drawer: true,
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          to: '/'
        },
        { title: 'Orders', icon: 'mdi-truck', to: 'orders' },
        {
          title: 'Users',
          icon: 'mdi-account-group',
          to: 'users'
        },
        {
          title: 'Products',
          icon: 'mdi-folder-home',
          to: 'products'
        }
      ],
      color: '#45d66b',
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
    async getUserdata() {}
  },
  beforeMount() {
    this.getUserdata()
  }
})
</script>
