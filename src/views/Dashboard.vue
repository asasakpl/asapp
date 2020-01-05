<template>
  <div>
    <DashboardLayout />
    <span>test</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

export default Vue.extend({
  components: {
    DashboardLayout
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    async getUserdata() {
      let id = localStorage.getItem("m_user");
      await axios.get(`http://localhost:3000/v1/users/${id}`).then(res => {
        localStorage.setItem("token", res.config.headers.auth);
        this.user = res.data.data.user;
        this.$store.state.user = this.user;
        return;
      });
    }
  },
  beforeMount() {
    this.getUserdata();
  }
});
</script>
