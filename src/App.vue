<template>
  <div id="simple-twitter">
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default {
  name: "App",
  data() {
    return {}
  },
  created() {
    this.$socket.close()
  },
  mounted() { }
}
</script>

<style>
body {
  font-family: Noto Sans TC;
}
.active .svg-fill {
  fill: #ff6600;
}
.router-link-active .svg-fill {
  fill: #ff6600;
}
a,
a:hover {
  color: black;
  text-decoration: none;
}
button:focus {
  outline: none;
}

.vh100scroll {
  height: 100vh;
  overflow: scroll;
}

@media screem and (max-width: 576px) {
  .component-top-followers-user {
    display: none;
  }
  .col {
    min-width: 300px;
  }
}

@media screem and (max-width: 768px) {
  /* .component-top-followers-user {
    display: unset;
  } */
  .main-area-rwd {
    min-width: 500px;
  }
}

@media screem and (max-width: 992px) {
  /* .component-top-followers-user {
    display: unset;
  } */
  .main-area-rwd {
    width: 600px;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media screem and (max-width: 1200px) {
  /* .container {
    min-width: 1200px;
  } */
  /* 
  .component-top-followers-user {
    display: unset;
  } */
  .main-area-rwd {
    width: 700px;
  }
}
</style>