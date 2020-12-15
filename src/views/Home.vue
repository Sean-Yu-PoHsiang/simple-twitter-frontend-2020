<template>
  <div>
    <!-- left component -->

    <!-- user upload newest tweet  -->
    <NewTweet />

    <!-- all users newest tweet  -->
    <Tweets />

    <!-- right component -->
  </div>
</template>

<script>
import NewTweet from "./../components/NewTweet.vue";
import Tweets from "./../components/Tweets.vue";

export default {
  components: {
    NewTweet,
    Tweets,
  },
};
</script>
