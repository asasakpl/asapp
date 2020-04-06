<template>
  <v-container>
    <v-row v-if="m35" class="pl-8">
      <v-col>
        <v-hover
          v-slot:default="{ hover }"
          close-delay="200"
          disabled
          class="dark"
        >
          <v-card
            :elevation="hover ? 16 : 2"
            class="mx-auto px-auto round"
            max-width="90%"
            tile
          >
            <v-img
              :aspect-ratio="16 / 9"
              src="@/assets/newsletter/m35.jpg"
              gradient="to top right, rgba(19,19,19, .7), rgba(19,19,19, .7)"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                  @click="m35Push"
                >
                  <v-row
                    class="lightbox white--text pa-2 fill-height fill-width"
                    align="center"
                    justify="center"
                  >
                    <v-col>
                      <div class="title">Moje 35 metrów newsletter</div>
                      <div class="body-1">moje35metrow.pl</div>
                    </v-col>
                  </v-row>
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>

      <v-col>
        <v-hover v-slot:default="{ hover }" close-delay="200">
          <v-card
            :elevation="hover ? 16 : 2"
            class="mx-auto px-auto round"
            max-width="90%"
            tile
          >
            <v-img :aspect-ratio="16 / 9" src="@/assets/newsletter/asasak.jpg">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                  @click="asasakPush"
                >
                  <v-row
                    class="lightbox white--text pa-2 fill-height fill-width"
                    align="center"
                    justify="center"
                  >
                    <v-col>
                      <div class="title">Asasak newsletter</div>
                      <div class="body-1">asasak.pl</div>
                    </v-col>
                  </v-row>
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-content v-else align="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-content>

    <NetworkError :error="error"></NetworkError>
  </v-container>
</template>

<style scoped>
.round {
  border-radius: 8px;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import NetworkError from '@/components/NetworkError.vue'

export default Vue.extend({
  components: {
    NetworkError,
  },
  data() {
    return {
      error: true,
      m35: null,
      asasak: null,
    }
  },
  async mounted() {
    axios
      .get('/mail')
      .then((res) => {
        this.error = false
        this.m35 = res.data.data.m35.list
        this.asasak = res.data.data.asasak.list
      })
      .catch((err) => {
        this.error = true
      })
  },
  methods: {
    asasakPush() {
      this.$router.push('/asasak')
    },
    m35Push() {
      this.$router.push('/m35')
    },
  },
})
</script>
