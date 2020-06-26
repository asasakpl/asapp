<template>
  <v-container>
    <v-row>
      <v-col cols="1" align="center" justify="center">
        <div class="flex-column">
          <v-btn @click="$router.push('/products/list')" icon fab>
            <v-icon size="38">arrow_back</v-icon>
          </v-btn>
          <v-btn @click=";(load = true), getCategories()" v-if="!load" icon fab>
            <v-icon size="38">refresh</v-icon>
          </v-btn>
          <v-btn @click="getCategories()" v-else loading icon> </v-btn>
        </div>
      </v-col>

      <v-col>
        <v-card class="mx-auto px-auto round" tile>
          <v-card-title>
            Lista kategorii
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
            :headers="headers"
            :items="categories"
            sort-by="id"
            :sort-desc="true"
            item-key="id"
            :search="search"
            class="elevation-1"
            :page.sync="page"
            hide-default-footer
            :items-per-page="5"
            @page-count="pageCount = $event"
          >
            <template v-slot:item="row">
              <tr>
                <td>{{ row.item.id }}</td>
                <td>{{ row.item.pl }}</td>
                <td>{{ row.item.en }}</td>
                <td>
                  <v-btn dark small color="primary" @click="click(row.item)"
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
      <v-col cols="1" align="center">
        <v-btn @click="create_dialog = true" icon fab>
          <v-icon large>mdi-pencil-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="remove_dialog" width="500">
      <v-card v-if="category">
        <v-card-title primary-title
          >Czy napewno chcesz usunąć kategorię "{{ category.pl }}"
          ?</v-card-title
        >

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="this.remove_dialog = false"
            >Anuluj</v-btn
          >
          <v-btn color="primary" text @click="removeCategory(category.id)"
            >Usuń</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="create_dialog" width="500">
      <v-card>
        <v-card-title>
          Tworzysz nową kategorię
        </v-card-title>

        <v-col>
          <v-text-field
            label="Nazwa kategorii pl"
            outlined
            v-model="new_category.pl"
          ></v-text-field>

          <v-text-field
            label="Nazwa kategorii en"
            outlined
            v-model="new_category.en"
          ></v-text-field>
        </v-col>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="this.remove_dialog = false"
            >Anuluj</v-btn
          >
          <v-btn color="primary" text @click="createCategory(new_category)"
            >Dodaj</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      categories: [],
      search: '',
      load: false,
      page: 1,
      remove_dialog: false,
      create_dialog: false,
      category: null,
      new_category: {
        pl: '',
        en: ''
      },
      pageCount: 0,
      headers: [
        {
          text: 'id',
          align: 'left',
          sortable: true,
          value: 'id'
        },
        { text: 'Nazwa pl', value: 'pl' },
        { text: 'Nazwa en', value: 'en' },
        {
          text: '',
          value: ''
        }
      ]
    }
  },
  methods: {
    click(row) {
      this.category = row
      this.remove_dialog = true
    },
    async createCategory(category) {
      axios
        .post('/products/category', category)
        .then((res) => {
          const text = 'Pomyślnie dodałeś nową kategorię'
          const icon = 'database-check'
          this.$store.dispatch('success', { text, icon })
          this.create_dialog = false
          this.getCategories()
        })
        .catch((err) => {
          this.create_dialog = false
          const text =
            'Nie możesz usunąć kategorii do której przypisane są jeszcze produkty.'
          const icon = 'alert-circle-outline'
          this.$store.dispatch('error', { text, icon })
        })
    },
    async removeCategory(id) {
      axios
        .delete(`/products/category/${id}`)
        .then((res) => {
          const text = 'Pomyślnie usunąłeś kategorię'
          const icon = 'database-check'
          this.$store.dispatch('success', { text, icon })
          this.remove_dialog = false
          this.getCategories()
        })
        .catch((err) => {
          this.remove_dialog = false
          const text =
            'Nie możesz usunąć kategorii do której przypisane są jeszcze produkty.'
          const icon = 'alert-circle-outline'
          this.$store.dispatch('error', { text, icon })
        })
    },
    async getCategories() {
      this.load = true

      await axios
        .get('/products/category')
        .then((res) => {
          this.categories = res.data
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
            text = err.response.data.error.message
            icon = 'alert-circle-outline'
          }

          this.$store.dispatch('error', { text, icon })
        })
    }
  },
  async mounted() {
    this.getCategories()
  }
})
</script>
