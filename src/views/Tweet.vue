<template>
  <div class="container tweet-page">
    <div class="row">
      <!-- left component -->
      <div class="col-auto left-container">
        <Navbar />
      </div>
      <div class="col main-container">
        <UserTweet :userTweet="userTweet" />
        <!-- all users newest tweet  -->
        <TweetReplies :tweetReplies="tweetReplies" :userTweet="userTweet" />
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

import userTweetAPI from "./../apis/tweet";
import { Toast } from "./../utils/helpers";

const dummyCurrentUser = {
  id: 2,
  name: "User1",
  email: "user1@example.com",
  role: null,
};

export default {
  components: {
    TweetReplies,
    TopFollowersUser,
    UserTweet,
    Navbar,
  },
  data() {
    return {
      currentUser: {},
      userTweet: {},
      tweetReplies: [],
    };
  },
  created() {
    const tweetId = this.$route.params;
    this.currentUser = dummyCurrentUser;
    //呼叫指定推文
    this.fetchUserTweet(tweetId);
    //呼叫指定推文的回覆
    this.fetchTweetReplies(tweetId);
  },
  methods: {
    async fetchUserTweet(tweetId) {
      try {
        const { data } = await userTweetAPI.getUserTweet(tweetId);

        this.userTweet = data;
        console.log("this.userTweet", this.userTweet);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
    async fetchTweetReplies(tweetId) {
      try {
        const { data } = await userTweetAPI.getTweetReplies(tweetId);

        this.tweetReplies = data;
        console.log("this.tweetReplies", this.tweetReplies);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得該文回覆資料，請稍後再試",
        });
      }
    },
  },
};
</script>


<style scoped>
.tweet-page {
  display: flex;
  flex-direction: row;
}
</style>
