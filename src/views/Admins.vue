<template>
  <v-container>
    <AdminList></AdminList>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import AdminList from '@/components/Admins/AdminList.vue'

export default Vue.extend({
  components: {
    AdminList
  }
})
</script>
