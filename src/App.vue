<template>
  <div id="simple-twitter">
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "App",
};
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

@media (max-width: 576px) {
  .component-top-followers-user {
    display: none;
  }
}

@media (max-width: 768px) {
  .component-top-followers-user {
    display: unset;
  }
  .col {
    min-width: auto;
  }
}

@media (max-width: 992px) {
  .component-top-followers-user {
    display: unset;
  }
  .col {
    min-width: auto;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (max-width: 1200px) {
  .container {
    max-width: 1200px;
  }
  .main-rwd {
    min-width: 600px;
  }
}
</style>