<template>
  <TweetsAndReplies
    :initialTweetsAndReplies="tweetsWithReplies"
    :initialUserProfile="userProfile"
  />
</template>

<script>
import TweetsAndReplies from "./../components/TweetsAndReplies.vue"

import userAPI from "./../apis/user"
import { Toast } from "./../utils/helpers"
import { mapState } from "vuex"

export default {
  components: {
    TweetsAndReplies,
  },
  data() {
    return {
      userProfile: {},
      tweetsWithReplies: [],
    }
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  async created() {
    const { userId: userId } = this.$route.params
    await this.fetchUserProfile(userId)
    this.fetchUserTweetsWithReplies(userId)
  },
  async beforeRouteUpdate(to, from, next) {
    const userId = to.params.userId
    await this.fetchUserProfile(userId)
    this.fetchUserTweetsWithReplies(userId)
    next()
  },
  methods: {
    async fetchUserProfile(userId) {
      try {
        const { data } = await userAPI.getUserProfile({ userId })
        this.userProfile = data
        this.userProfile = {
          ...this.userProfile,
          ...data,
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        })
      }
    },
    async fetchUserTweetsWithReplies(userId) {
      try {
        const { data } = await userAPI.getUserTweetsWithReplies({ userId })
        // console.log(data)

        this.tweetsWithReplies = data

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