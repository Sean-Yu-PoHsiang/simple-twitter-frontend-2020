<template>
  <div class="tweet-page">
    <!-- left component -->

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
import TweetReplies from "./../components/TweetReplies";
import UserTweet from "./../components/UserTweet.vue";

import TopFollowersUser from "./../components/TopFollowersUser.vue";

export default {
  components: {
    TweetReplies,
    TopFollowersUser,
    UserTweet,
  },
};
</script>


<style scoped>
.tweet-page {
  display: flex;
  flex-direction: row;
}
</style>
