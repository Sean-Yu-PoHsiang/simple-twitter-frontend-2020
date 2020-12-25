<template>
  <div class="container">
    <div class="row">
      <!-- left component -->
      <div class="col-auto left-container component-navbar">
        <Navbar />
      </div>
      <div class="col main-container">
        <UserTweet
          :userTweet="userTweet"
          @after-reply-tweet="afterReplyTweet"
        />
        <!-- all users newest tweet  -->
        <TweetReplies
          :initialTweetReplies="tweetReplies"
          :initialUserTweet="userTweet"
        />
      </div>
      <div class="col-auto right-container">
        <TopFollowersUser class="component-top-followers-user" />
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

import { mapState } from "vuex";

export default {
  components: {
    TweetReplies,
    TopFollowersUser,
    UserTweet,
    Navbar,
  },
  data() {
    return {
      userTweet: {},
      tweetReplies: [],
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const tweetId = this.$route.params;
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
    afterReplyTweet(payload) {
      console.log("afterReplyTweet執行");
      // console.log("payload::", payload);

      const { User, tweetId, comment, createdAt, id } = payload;
      this.tweets.unshift({
        User,
        tweetId,
        comment,
        createdAt,
        id,
      });
    },
  },
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: row;
}
</style>
