<template>
  <nav class="d-flex flex-column">
    <Logo class="mt-3 mb-5" />
    <router-link
      to="/admin/tweets"
      class="nav-btn d-flex fonSize18 align-items-center"
    >
      <IconHome class="mr-3" />
      推文清單
    </router-link>
    <router-link
      to="/admin/users"
      class="nav-btn d-flex fonSize18 align-items-center"
    >
      <IconUserProfile class="mr-3" />
      使用者列表
    </router-link>

    <button
      type="button"
      class="btn sign-out-btn d-flex fonSize18 align-items-center"
    >
      <IconSignOut class="mr-3" />
      登出
    </button>
  </nav>
</template>

<script>
import Logo from './Logo'
import IconHome from './IconHome'
import IconUserProfile from './IconUserProfile'
import IconSignOut from './IconSignOut'

export default {
  components: {
    Logo,
    IconHome,
    IconUserProfile,
    IconSignOut
  },
}
</script>

<style scoped>
nav {
  height: 100vh;
}
.nav-btn {
  width: 200px;
  color: #1c1c1c;
  font-weight: 700;
  margin-bottom: 34px;
}
.active {
  color: #ff6600;
}
.nav-btn:hover {
  text-decoration: none;
}
.fonSize18 {
  font-size: 18px;
}
.sign-out-btn {
  width: 200px;
  margin: auto 0 17px 0;
  padding: 0;
  font-weight: 700;
}
.sign-out-btn:focus {
  border-color: transparent;
  box-shadow: 0 0 0 0.2rem transparent;
  background: transparent;
}
.pointer {
  cursor: pointer;
}
</style>