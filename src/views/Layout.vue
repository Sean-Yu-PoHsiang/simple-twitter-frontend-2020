<template>
  <div class="container">
    <div class="row">
      <div class="col-auto left-container left-area-rwd component-navbar">
        <Navbar @after-create-tweet="afterCreateTweet" />
      </div>

      <router-view />

      <div class="col-auto right-container right-area-rwd">
        <TopFollowersUser class="component-top-followers-user" />
      </div>
    </div>
  </div>
</template>

<script>
import TopFollowersUser from "./../components/TopFollowersUser.vue"
import Navbar from "./../components/Navbar.vue"

export default {
  components: {
    TopFollowersUser,
    Navbar,
  },
  data() {
    return {}
  },
  created() { },
  mounted() { }
}
</script>

<style scoped>
</style>