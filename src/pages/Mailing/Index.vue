<template>
  <v-container>
    <v-row v-if="m35">
      <v-col>
        <v-hover v-slot:default="{ hover }" close-delay="200" class="dark">
          <v-card
            :elevation="hover ? 16 : 2"
            class="mx-auto px-auto round"
            max-width="90%"
            tile
          >
            <v-img :aspect-ratio="16 / 9" src="@/assets/newsletter/m35.jpg">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text text-center"
                  style="height: 100%;"
                  @click="m35Push"
                >
                  <v-row
                    class="lightbox white--text pa-2 fill-height fill-width"
                    align="center"
                  >
                    <v-col>
                      <div class="display-1 font-weight-medium">
                        moje35metrow.pl
                      </div>
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
                  class="d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text text-center"
                  style="height: 100%;"
                  @click="asasakPush"
                >
                  <v-row
                    class="lightbox white--text pa-2 fill-height"
                    align="center"
                  >
                    <v-col>
                      <div class="display-1 font-weight-medium">asasak.pl</div>
                    </v-col>
                  </v-row>
                </div>
              </v-expand-transition>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-content v-else align="center" class="pl-0 ml-0 mr-12">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-content>
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
  opacity: 0.6;
  position: absolute;
  width: 100%;
}
</style>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  data() {
    return {
      m35: null,
      asasak: null
    }
  },
  async mounted() {
    axios
      .get('/mail')
      .then((res) => {
        this.m35 = res.data.m35.list
        this.asasak = res.data.asasak.list
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
  },
  methods: {
    asasakPush() {
      this.$router.push('/asasak')
    },
    m35Push() {
      this.$router.push('/m35')
    }
  }
})
</script>
