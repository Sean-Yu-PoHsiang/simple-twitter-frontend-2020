<template>
  <div id="simple-twitter">
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: 'App',

}
</script>

<style>
.active .svg-fill {
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
</style>