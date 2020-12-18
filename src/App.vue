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

@media (min-width: 576px) {
}

@media (min-width: 768px) {
}

@media (min-width: 992px) {
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .container {
    max-width: 1300px;
  }
}
</style>