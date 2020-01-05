<template>
  <div>
    <Default />

    <span>{{ user }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import Default from '../layouts/Default.vue'

export default Vue.extend({
  data() {
    return {
      user: null
    }
  },
  components: {
    Default
  },
  methods: {
    async getUserdata() {
      let id = localStorage.getItem('m_user')
      await axios.get(`http://localhost:3000/v1/users/${id}`).then(res => {
        localStorage.setItem('token', res.config.headers.auth)
        console.log(res.config.headers)
        this.user = res.data.data.user
        return
      })
    }
  },
  beforeMount() {
    this.getUserdata()
  }
})
</script>
