<template>
  <Tweets :initialTweets="tweetsLikes" />
</template>

<script>
import Tweets from "./../components/Tweets.vue"
import userAPI from "./../apis/user"
import { Toast } from "./../utils/helpers"
import { mapState } from "vuex"

export default {
  components: {
    Tweets,
  },
  data() {
    return {
      tweetsLikes: [],
    }
  },
  async created() {
    const { userId: userId } = this.$route.params
    this.fetchUserTweetsLikes(userId)
  },
  async beforeRouteUpdate(to, from, next) {
    const userId = to.params.userId
    this.fetchUserTweetsLikes(userId)
    next()
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    async fetchUserTweetsLikes(userId) {
      try {
        const { data } = await userAPI.getUserTweetsLikes({ userId })

        this.tweetsLikes = data

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試",
        })
      }
    },
  },
}
</script>

<style scoped>
.user-nav-link {
  text-align: center;
  padding: 15px 0;
  color: #657786;
  width: 120px;
  font-size: 15px;
  font-weight: 700;
}
.user-nav-link:hover {
  color: #ff6600;
}
.userNavbar {
  border: 1px solid #e6ecf0;
  border-top: 0;
}
.active {
  border-bottom: 2px solid #ff6600;
}
</style>