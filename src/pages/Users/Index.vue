<template>
  <v-container>
    <v-row>
      <v-col cols="1">
        <v-btn @click="loading(), getUsers()" v-if="!load" icon fab>
          <v-icon large>refresh</v-icon>
        </v-btn>

        <v-btn @click="getUsers()" fab v-else large loading icon> </v-btn>
      </v-col>
      <v-col class="pl-0 pr-0">
        <v-card class="mx-auto px-auto round" tile>
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
            v-if="!load"
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
      </v-col>
    </v-row>
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
      this.load = true
      axios
        .get(`/users`)
        .then((res) => {
          this.users = res.data
          this.load = false
          return
        })
        .catch((err) => {
          let text
          let icon
          if (!err.response) {
            // network error
            text = 'Check your internet connection'
            icon = 'network-strength-off'
          } else {
            text = err
            icon = 'alert-circle-outline'
          }

          this.$store.dispatch('error', { text, icon })
        })
    }
  },
  async mounted() {
    this.getUsers()
  }
})
</script>
