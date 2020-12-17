<template>
  <div class="container tweet-page">
    <div class="row">
      <!-- left component -->
      <div class="col-auto left-container">
        <Navbar />
      </div>
      <div class="col main-container">
        <UserTweet />
        <!-- all users newest tweet  -->
        <TweetReplies />
      </div>
      <div class="col-auto right-container">
        <TopFollowersUser />
      </div>

      <!-- right component -->
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar.vue";
import TweetReplies from "./../components/TweetReplies";
import UserTweet from "./../components/UserTweet.vue";
import TopFollowersUser from "./../components/TopFollowersUser.vue";

export default {
  components: {
    TweetReplies,
    TopFollowersUser,
    UserTweet,
    Navbar,
  },
};
</script>


<style scoped>
.tweet-page {
  display: flex;
  flex-direction: row;
}
</style>
