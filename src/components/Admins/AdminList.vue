<template>
  <v-container>
    <v-row>
      <v-btn
        @click="loading(), getAdmins()"
        v-if="!load"
        icon
        class="ml-8 mt-4"
      >
        <v-icon size="32">refresh</v-icon>
      </v-btn>
      <v-btn @click="getAdmins()" v-else loading icon class="ml-8"> </v-btn>

      <v-col>
        <v-card class="mx-auto px-auto round" max-width="90%" tile>
          <v-card-title>
            {{ $t('admin.table.title') }}
            <v-spacer></v-spacer>
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
            <template v-slot:item.image="{ item }">
              <div class="mx-2 mt-1 mb-1">
                <v-img
                  :src="item.pictures[0].url"
                  :alt="item.id.toString()"
                  height="80px"
                  width="80px"
                ></v-img>
              </div>
            </template>
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
      <v-btn @click="newAdmin()" icon class="ml-0 mt-4">
        <v-icon size="32">mdi-pencil-plus</v-icon>
      </v-btn>
    </v-row>
    <NetworkError :error="error"></NetworkError>
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
import NetworkError from '@/components/NetworkError.vue'

export default Vue.extend({
  components: {
    NetworkError
  },
  data() {
    return {
      error: true,
      page: 1,
      pageCount: 5,
      admins: [],
      search: '',
      lang: null,
      singleSelect: true,
      load: false,
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
    loading() {
      this.load = true
    },
    newAdmin() {
      this.$router.push(`/admins/new`)
    },
    rowClick: function(item) {
      console.log(item)
      this.$router.push(`/admins/${item.id}`)
    },
    getAdmins() {
      let id = localStorage.getItem('m_user')
      axios
        .get(`http://localhost:3000/v1/admins`)
        .then(res => {
          this.error = false
          localStorage.setItem('token', res.config.headers.auth)
          this.admins = res.data.data.admins
          return
        })
        .catch(err => {
          this.error = true
          console.log(err)
        })

      this.load = false
    }
  },
  created() {
    this.getAdmins()
  }
})
</script>
