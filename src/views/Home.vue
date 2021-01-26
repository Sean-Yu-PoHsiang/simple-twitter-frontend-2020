<template>
  <div class="col main-container main-area-rwd vh100scroll">
    <!-- user upload newest tweet  -->
    <NewTweet @after-create-tweet="afterCreateTweet" />
    <!-- all users newest tweet  -->
    <Tweets :initialTweets="tweets" />
  </div>
</template>

<script>
import NewTweet from "./../components/NewTweet.vue"
import Tweets from "./../components/Tweets.vue"
import tweetsAPI from "./../apis/tweet"
import { Toast } from "./../utils/helpers"

export default {
  components: {
    NewTweet,
    Tweets,
  },
  props: {
    newTweetsPayload: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweets: [],
    }
  },
  watch: {
    newTweetsPayload(newValue) {
      this.afterCreateTweet(newValue)
    }
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets() {
      try {
        const { data } = await tweetsAPI.getAllTweets()
        this.tweets = data

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試",
        })
      }
    },
    afterCreateTweet(payload) {
      const {
        User,
        id,
        name,
        description,
        createdAt,
        repliesCount,
        likesCount,
        isLiked,
      } = payload
      this.tweets.unshift({
        User,
        id,
        name,
        description,
        createdAt,
        repliesCount,
        likesCount,
        isLiked,
      })
    },
    afterClickDeleteLike(payload) {
      console.log('payload', payload)
      // const { tweets } = payload
      // this.tweets = payload
    }
  },
}
</script>

<style scoped>
</style>
