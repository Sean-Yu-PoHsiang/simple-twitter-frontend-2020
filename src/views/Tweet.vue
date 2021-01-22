<template>
  <div class="col main-container main-area-rwd vh100scroll">
    <UserTweet
      :initialUserTweet="userTweet"
      @after-reply-tweet="afterReplyTweet"
    />
    <!-- all users newest tweet  -->
    <TweetReplies
      :initialTweetReplies="tweetReplies"
      :initialUserTweet="userTweet"
    />
  </div>
</template> 

<script>
import TweetReplies from "./../components/TweetReplies"
import UserTweet from "./../components/UserTweet.vue"
import userTweetAPI from "./../apis/tweet"
import { Toast } from "./../utils/helpers"
import { v4 as uuidv4 } from "uuid"
import { mapState } from "vuex"

export default {
  components: {
    TweetReplies,
    UserTweet,
  },
  data() {
    return {
      userTweet: {},
      tweetReplies: [],
    }
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const tweetId = this.$route.params
    //呼叫指定推文
    this.fetchUserTweet(tweetId)
    //呼叫指定推文的回覆
    this.fetchTweetReplies(tweetId)
  },

  methods: {
    async fetchUserTweet(tweetId) {
      try {
        const { data } = await userTweetAPI.getUserTweet(tweetId)

        this.userTweet = data
        console.log("this.userTweet", this.userTweet)
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        })
      }
    },
    async fetchTweetReplies(tweetId) {
      try {
        const { data } = await userTweetAPI.getTweetReplies(tweetId)

        this.tweetReplies = data
        console.log("this.tweetReplies", this.tweetReplies)
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得該文回覆資料，請稍後再試",
        })
      }
    },
    afterReplyTweet(payload) {
      const { tweetId, comment, createdAt } = payload

      this.tweetReplies.unshift({
        User: this.currentUser,
        tweetId,
        comment,
        createdAt,
        id: uuidv4()
      })
    },
  },
}
</script>


<style scoped>
</style>
