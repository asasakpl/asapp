<template>
  <div id="wrapper">
    <main>
      <h1>ddd</h1>
    </main>
  </div>
</template>

<script>
import SystemInformation from "./LandingPage/SystemInformation";

export default {
  name: "landing-page",
  components: { SystemInformation },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Roboto", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

main {
  display: flex;
}
</style>
