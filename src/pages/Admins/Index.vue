<template>
  <v-container>
    <v-row>
      <v-col cols="1" align="center" class="pr-0">
        <v-btn @click="getAdmins()" v-if="!load" icon fab class="mt-2">
          <v-icon size="38">refresh</v-icon>
        </v-btn>
        <v-btn
          @click="getAdmins()"
          v-else
          loading
          icon
          fab
          class="mt-4"
        ></v-btn>
      </v-col>
      <v-col class="pr-0 pl-0">
        <v-card class="mx-auto px-auto round" tile>
          <v-card-title>
            {{ $t('admin.table.title') }}
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-if="!error"
            v-model="selected"
            :headers="headers"
            :items="admins"
            @click:row="rowClick"
            sort-by="id"
            :sort-desc="true"
            item-key="id"
            :search="search"
            class="elevation-1"
            :page.sync="page"
            hide-default-footer
            :items-per-page="8"
            @page-count="pageCount = $event"
          >
            <template
              v-for="header in headers"
              v-slot:[`header.${header.value}`]
            >
              {{ $t(`admin.table.${header.text}`) }}
            </template>
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
      <v-col cols="1">
        <v-btn to="/admins/new" icon fab class="ml-0 mt-2">
          <v-icon size="38">mdi-account-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <NetworkError :error="error"></NetworkError>
    <Success v-if="this.$store.state.success"></Success>
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

// components
import NetworkError from '@/components/NetworkError.vue'
import Success from '@/components/Success.vue'

export default Vue.extend({
  components: {
    NetworkError,
    Success
  },
  data() {
    return {
      error: true,
      page: 1,
      pageCount: 1,
      admins: [],
      search: '',
      lang: null,
      singleSelect: true,
      load: true,
      selected: [],
      headers: [
        {
          text: 'id',
          align: 'center',
          sortable: true,
          value: 'id'
        },
        {
          text: 'name',
          value: 'firstName'
        },
        {
          text: 'second_name',
          value: 'lastName'
        },
        {
          text: 'email',
          value: 'email'
        },
        {
          text: 'type',
          value: 'type'
        }
      ]
    }
  },
  methods: {
    rowClick: function(item) {
      this.$router.push(`/admins/${item.id}`)
    },
    getAdmins() {
      this.load = true
      let id = localStorage.getItem('m_user')
      axios
        .get(`/admins`)
        .then((res) => {
          this.error = false
          this.admins = res.data
          this.load = false
          return
        })
        .catch((err) => {
          this.error = true
        })
    }
  },
  created() {
    this.getAdmins()
  }
})
</script>
