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
        <Tweets :tweets="tweets" />
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

import tweetsAPI from "./../apis/tweet";
import { Toast } from "./../utils/helpers";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA4NTQxODgzfQ.hjy_pdYF9fBEDsUz4V_YLQO60gWTY3sWcynQgwD2zwg";
localStorage.setItem("token", token);

export default {
  components: {
    NewTweet,
    Tweets,
    TopFollowersUser,
    Navbar,
  },
  data() {
    return {
      tweets: [],
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const { data } = await tweetsAPI.getAllTweets();
        // data.map((tweet) => {
        //   tweet.createdAt = new Date(tweet.createdAt).toLocaleString();
        // });
        console.log(data);

        this.tweets = data;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: row;
}
</style>
