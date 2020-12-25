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

.col {
  height: 100vh;
  overflow: scroll;
}

@media (max-width: 576px) {
}

@media (max-width: 768px) {
  .col {
    min-width: auto;
  }
  body {
    min-width: 768px;
  }
}

@media (max-width: 992px) {
  .col {
    min-width: auto;
  }
  body {
    min-width: 992px;
  }
}
@media (max-width: 1000px) {
  /* 通一設定 TopFollowUser 的隱藏，TopFollowUser都有加上class */
  .component-top-followers-user {
    display: none;
  }
  /* 貼文正中間這塊 class都是col */
  .col {
    min-width: 600px;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (max-width: 1200px) {
  .container {
    max-width: 1200px;
  }
  .col {
    min-width: 600px;
  }
  body {
    min-width: 750px;
  }
}
</style>