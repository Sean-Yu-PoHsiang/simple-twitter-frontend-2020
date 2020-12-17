<template>
  <div class="container home-page">
    <div class="row">
      <!-- left component -->
      <div class="col-auto left-container">
        <Navbar />
      </div>
      <div class="col main-container">
        <!-- user upload newest tweet  -->
        <NewTweet />
        <!-- all users newest tweet  -->
        <Tweets />
      </div>
      <div class="col-auto right-container">
        <!-- right component -->
        <TopFollowersUser />
      </div>
    </div>
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
</style>
