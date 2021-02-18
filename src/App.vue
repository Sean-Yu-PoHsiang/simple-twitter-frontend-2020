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
  font-family: "Noto Sans TC", sans-serif;
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
  margin: 0 15px 0 15px;
  padding: 0;
  border-width: 0px 1px 0px 1px;
  border-style: solid;
  border-color: #e6ecf0;
}

@media screen and (max-width: 1200px) {
  .vh100scroll {
    margin: 0;
  }
}
@media screen and (max-width: 992px) {
}
@media screen and (max-width: 768px) {
}
@media screen and (max-width: 576px) {
}
</style>