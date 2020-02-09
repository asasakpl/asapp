<template>
  <v-container>
    <v-btn @click="loading(), getUsers()" v-if="!load" icon class="ml-8">
      <v-icon size="32">refresh</v-icon>
    </v-btn>
    <v-btn @click="getUsers()" v-else loading icon class="ml-8"> </v-btn>
    <v-card class="mx-auto px-auto" max-width="90%" tile>
      <v-card-title>
        Users list
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          color="white"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        v-if="!error"
        @click:row="rowClick"
        v-model="selected"
        :headers="headers"
        :items="users"
        sort-by="id"
        item-key="id"
        :search="search"
        class="elevation-1"
        :page.sync="page"
        hide-default-footer
        :items-per-page="16"
        @page-count="pageCount = $event"
      >
      </v-data-table>
      <v-data-table
        v-else
        loading
        hide-default-footer
        loading-text="Loading... Please wait"
      ></v-data-table>
    </v-card>
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data() {
    return {
      error: true,
      search: '',
      load: false,
      page: 1,
      pageCount: 0,
      users: [],
      singleSelect: true,
      selected: [],
      headers: [
        {
          text: 'id',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        { text: 'First name', value: 'firstName' },
        { text: 'Last name', value: 'lastName' },
        { text: 'Email', value: 'email' }
      ]
    }
  },
  methods: {
    loading() {
      this.load = true
    },
    rowClick: function(item) {
      this.$router.push(`/users/${item.id}`)
    },
    getUsers() {
      let id = localStorage.getItem('m_user')
      axios
        .get(`http://localhost:3000/v1/users`)
        .then(res => {
          this.error = false
          localStorage.setItem('token', res.config.headers.auth)
          this.users = res.data.data.users

          return
        })
        .catch(err => {
          this.error = true
        })
      this.load = false
    }
  },
  beforeMount() {
    this.getUsers()
  }
})
</script>
