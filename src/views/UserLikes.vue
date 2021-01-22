<template>
  <div class="col main-area-rwd vh100scroll">
    <UserProfile :initialUserProfile="userProfile" />
    <div class="userNavbar d-flex">
      <router-link
        class="user-nav-link d-block"
        :to="{ name: 'user', params: { userId: userProfile.id } }"
        >推文</router-link
      >
      <router-link
        class="user-nav-link d-block"
        :to="{
          name: 'user-with-replies',
          params: { userId: userProfile.id },
        }"
        >推文與回覆</router-link
      >
      <router-link
        :to="{ name: 'user-likes', params: { userId: userProfile.id } }"
        class="user-nav-link d-block"
        >喜歡的內容</router-link
      >
    </div>
    <Tweets :initialTweets="tweetsLikes" />
  </div>
</template>

<script>
import UserProfile from "./../components/UserProfile"
import Tweets from "./../components/Tweets.vue"
import userAPI from "./../apis/user"
import { Toast } from "./../utils/helpers"
import { mapState } from "vuex"

export default {
  components: {
    UserProfile,
    Tweets,
  },
  data() {
    return {
      userProfile: {},
      tweetsLikes: [],
    }
  },
  async created() {
    const { userId: userId } = this.$route.params
    await this.fetchUserProfile(userId)
    this.fetchUserTweetsLikes(userId)
  },
  async beforeRouteUpdate(to, from, next) {
    const userId = to.params.userId
    await this.fetchUserProfile(userId)
    this.fetchUserTweetsLikes(userId)
    next()
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    async fetchUserProfile(userId) {
      try {
        const { data } = await userAPI.getUserProfile({ userId })
        this.userProfile = data
        this.userProfile = {
          ...this.userProfile,
          ...data,
        };
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        })
      }
    },
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