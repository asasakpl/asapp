<template>
  <div class="back">
    <v-app id="no-back">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-layout text-center wrap>
            <v-flex xs12>
              <div class="space"></div>

              <v-layout justify-center>
                <v-form @submit.prevent="login">
                  <v-row style="width: 330px;">
                    <v-col cols="12">
                      <v-text-field
                        dark
                        outlined
                        v-model="email"
                        label="Email"
                        name="email"
                        prepend-inner-icon="mail"
                        type="text"
                      ></v-text-field>

                      <v-text-field
                        dark
                        v-model="password"
                        outlined
                        id="password"
                        label="Password"
                        name="password"
                        prepend-inner-icon="lock"
                        type="password"
                      ></v-text-field>

                      <v-btn type="sumbit">Zaloguj</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>

      <v-footer justify-center class="grey--text" id="no-back">
        <div class="flex-grow-1"></div>
        <div>asapp version {{ $store.getters.appVersion }}</div>
      </v-footer>
    </v-app>
  </div>
</template>

<style scoped>
.back {
  background-image: url(../assets/login_background.png);
  background-size: cover;
}
#no-back {
  background: none;
}
.space {
  height: 400px;
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    image: '../assets/login_background'
    return {
      email: '',
      password: ''
    }
  },
  created() {
    this.$vuetify.theme.dark = false
  },
  methods: {
    login: async function() {
      let email = this.email
      let password = this.password
      this.$store
        .dispatch('login', { email, password })
        .then(res => {
          if (res !== 'admin') {
            this.$router.push('/about')
            return
          }
          this.$router.push('/')
        })
        .catch(err => console.log(err))
    }
  }
})
</script>
