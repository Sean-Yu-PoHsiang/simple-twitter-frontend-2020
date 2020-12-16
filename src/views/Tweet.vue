<template>
  <div class="tweet-page">
    <!-- left component -->
    <div class="left-container">
      <Navbar />
    </div>
    <div class="main-container">
      <UserTweet />
      <!-- all users newest tweet  -->
      <TweetReplies />
    </div>
    <div class="right-container">
      <TopFollowersUser />
    </div>

    <!-- right component -->
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
.left-container {
  margin: 0 65px 0 50px;
}
.tweet-page {
  display: flex;
  flex-direction: row;
}
</style>
