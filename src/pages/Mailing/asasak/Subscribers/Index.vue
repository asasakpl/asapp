<template>
  <v-container>
    <v-row>
      <v-col align="center" class="mx-auto px-auto">
        <v-btn @click="$router.push('/asasak')" icon fab class="ml-2">
          <v-icon large>arrow_back</v-icon>
        </v-btn>

        <v-btn @click="getInfo()" v-if="!load" icon fab class="ml-2 mt-2">
          <v-icon large>refresh</v-icon>
        </v-btn>
        <v-btn
          @click="getInfo()"
          v-else
          loading
          icon
          fab
          class="ml-2 mt-4"
        ></v-btn>
      </v-col>

      <v-col cols="10" class="mx-auto px-auto">
        <v-card class="mx-auto px-auto round" tile>
          <v-card-title>
            Subskrybenci
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
            :items="members"
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
            <template v-slot:item="row">
              <tr>
                <td>{{ row.item.name }}</td>
                <td>{{ row.item.address }}</td>
                <td>{{ row.item.subscribed }}</td>
                <td>
                  <v-btn dark small color="#45d66b" @click="click(row.item)"
                    >Usuń</v-btn
                  >
                </td>
              </tr>
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
      <v-col align="center" class="mx-auto px-auto">
        <v-btn icon fab class="ml-0 mt-2" to="/asasak/subscribers/new">
          <v-icon size="34">mdi-account-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title primary-title
          >Czy napewno chcesz usunąć ten email z listy?</v-card-title
        >

        <v-card-text class="title red--text">{{ email }}</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="this.dialog = false">Anuluj</v-btn>
          <v-btn color="primary" text @click="removeSubscriber()">Usuń</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

// Components
import NetworkError from '@/components/NetworkError.vue'
import Success from '@/components/Success.vue'

export default Vue.extend({
  components: {
    NetworkError,
    Success
  },
  data() {
    return {
      members: [],
      error: true,
      page: 1,
      pageCount: 1,
      search: '',
      dialog: false,
      singleSelect: true,
      email: null,
      load: true,
      selected: [],
      headers: [
        {
          text: 'Imie i nazwisko',
          value: 'name'
        },
        {
          text: 'Adres email',
          value: 'address'
        },
        {
          text: 'Subskrybuje?',
          value: 'subscribed'
        },
        {
          text: '',
          value: ''
        }
      ]
    }
  },
  methods: {
    getInfo() {
      axios
        .get('/mail/asasak')
        .then((res) => {
          this.load = true
          for (let x in res.data.asasak.members) {
            if (res.data.asasak.members[x].subscribed == true) {
              res.data.asasak.members[x].subscribed = 'Tak'
            } else {
              res.data.asasak.members[x].subscribed = 'Nie'
            }
          }
          this.members = res.data.asasak.members
          this.error = false
          this.load = false
        })
        .catch((err) => {
          this.error = true
        })
    },
    click(item) {
      this.dialog = true
      this.email = item.address
    },
    removeSubscriber() {
      axios
        .post('/asasak/cancel', { email: this.email })
        .then((res) => {
          this.load = true
          this.dialog = false
          const text = 'mail.subscriber.removed'
          const icon = 'account-check'
          this.$store.dispatch('success', { text, icon })
          this.getInfo()
        })
        .catch((err) => {
          console.log(err)
          return
        })
    }
  },
  mounted() {
    this.getInfo()
  }
})
</script>
