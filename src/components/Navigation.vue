<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="color"
    :expand-on-hover="expandOnHover"
    :right="right"
    dark
    app
  >
    <v-layout column fill-height>
      <v-list dense class="py-0">
        <v-list-item class="px-2" two-line>
          <v-list-item-avatar>
            <v-icon large>mdi-account</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav class="py-0">
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-monitor-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              $t('navigation.dashboard')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/orders" disabled>
          <v-list-item-icon>
            <v-icon>mdi-truck-delivery</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('navigation.orders') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/users" disabled>
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('navigation.users') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/products" disabled>
          <v-list-item-icon>
            <v-icon>mdi-folder-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              $t('navigation.products')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/payments">
          <v-list-item-icon>
            <v-icon>mdi-credit-card-marker-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              $t('navigation.payments')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/shipping">
          <v-list-item-icon>
            <v-icon>mdi-truck-fast</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              $t('navigation.shipping')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/sellers" disabled>
          <v-list-item-icon>
            <v-icon>mdi-account-cash</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              $t('navigation.sellers')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/mail">
          <v-list-item-icon>
            <v-icon>mdi-email-multiple</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('navigation.mail') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/admins" v-if="type == 1">
          <v-list-item-icon>
            <v-icon>mdi-shield-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ $t('navigation.admins') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-spacer></v-spacer>

      <v-list dense nav>
        <v-list-item link to="/settings">
          <v-list-item-icon>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              $t('navigation.settings')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-on:click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              $t('navigation.log_out')
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/changelog">
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
      type: localStorage.getItem('m_type'),
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
      right: false,
      miniVariant: false,
      expandOnHover: true,
      background: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
})
</script>
