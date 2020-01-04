<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

export default Vue.extend({
  methods: {
    async getUserdata() {
      let id = localStorage.getItem('m_user')
      await axios.get(`http://localhost:3000/v1/users/${id}`).then(res => {
        console.log(res)
      })
      console.log(id)
    }
  },
  beforeMount() {
    this.getUserdata()
  }
})
</script>
