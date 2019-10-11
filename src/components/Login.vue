<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-layout text-center wrap>
          <v-flex xs12>
            <v-img :src="require('../assets/logo.png')" class="mt-5" contain height="200"></v-img>
            <h2 class="headline font-weight-bold mb-3">Zaloguj się</h2>

            <v-layout justify-center>
              <v-form @submit.prevent="login">
                <v-row style="width: 330px;">
                  <v-col cols="12">
                    <v-text-field
                      outlined
                      v-model="email"
                      label="Email"
                      name="email"
                      prepend-inner-icon="mail"
                      type="text"
                      color="green accent-4"
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      outlined
                      id="password"
                      label="Password"
                      name="password"
                      prepend-inner-icon="lock"
                      type="password"
                      color="green accent-4"
                    ></v-text-field>

                    <v-btn color="green accent-4" class="white--text" type="sumbit">Zaloguj</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer justify-center class="grey--text">
      <div class="flex-grow-1"></div>
      <div>asapp version {{ $store.getters.appVersion }}</div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: async function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/dashboard"))
        .catch(err => console.log(err));
    }
  }
});
</script>
