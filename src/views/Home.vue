<template>
  <div class="container">
    <div class="row">
      <!-- left component -->
      <div class="col-auto left-container">
        <Navbar />
      </div>
      <div class="col main-container">
        <!-- user upload newest tweet  -->
        <NewTweet @after-create-tweet="afterCreateTweet" />
        <!-- all users newest tweet  -->
        <Tweets :initialTweets="tweets" />
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
// import { v4 as uuidv4 } from "uuid";

import tweetsAPI from "./../apis/tweet";
import { Toast } from "./../utils/helpers";

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA4NTQxODgzfQ.hjy_pdYF9fBEDsUz4V_YLQO60gWTY3sWcynQgwD2zwg";
// localStorage.setItem("token", token);

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

        this.tweets = data;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試",
        });
      }
    },
    afterCreateTweet(payload) {
      const { description, createdTimestamp, id, User } = payload;
      this.tweets.unshift({
        User: User,
        id: id,
        description: description,
        createdTimestamp: createdTimestamp,
      });
      console.log("tweets", this.tweets);
    },
  },
};
</script>

<style scoped>
</style>
