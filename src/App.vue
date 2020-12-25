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
@media (max-width: 576px) {
}

@media (max-width: 768px) {
}

@media (max-width: 992px) {
  /* navbar component 使用本身有傳遞資料，如果像TopFollowUser一樣綁在component上， 會沒辦法調整CSS，所以改綁在外層div*/
  .component-navbar {
    /* display: none; */
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
    max-width: 1300px;
  }
  .col {
    min-width: 500px;
  }
  body {
    min-width: 750px;
  }
}
</style>