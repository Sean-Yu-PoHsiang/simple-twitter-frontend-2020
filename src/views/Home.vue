<template>
  <div class="home-page">
    <!-- left component -->
    <div class="left-container">
      <Navbar />
    </div>

    <div class="main-container">
      <!-- user upload newest tweet  -->
      <NewTweet />
      <!-- all users newest tweet  -->
      <Tweets />
    </div>
    <div class="right-container">
      <TopFollowersUser />
    </div>

    <!-- right component -->
  </div>
</template>

<script>
import NewTweet from "./../components/NewTweet.vue";
import Tweets from "./../components/Tweets.vue";
import TopFollowersUser from "./../components/TopFollowersUser.vue";
import Navbar from "./../components/Navbar.vue";

export default {
  components: {
    NewTweet,
    Tweets,
    TopFollowersUser,
    Navbar,
  },
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: row;
}

.left-container {
  margin: 0 65px 0 50px;
}
</style>
