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
    <Tweets v-if="$route.name === 'user'" :initialTweets="tweets" />
    <router-view />
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
      tweets: [],
    }
  },
  watch: {
    initialTweets(newValue) {
      this.tweets = newValue
    },
    initialUserProfile(newValue) {
      this.userProfile = newValue
    }
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    const { userId: userId } = this.$route.params
    this.fetchUserProfile(userId)
    this.fetchUserTweets(userId)
  },
  beforeRouteUpdate(to, from, next) {
    const userId = to.params.userId
    this.fetchUserProfile(userId)
    this.fetchUserTweets(userId)
    next()
  },
  methods: {
    async fetchUserProfile(userId) {
      try {
        const response = await userAPI.getUserProfile({ userId })

        this.userProfile = {
          ...this.userProfile,
          ...response.data,
        }

        if (response.status !== 200) {
          throw new Error(response)
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        })
      }
    },
    async fetchUserTweets(userId) {
      try {
        const response = await userAPI.getUserTweets({ userId })

        this.tweets = response.data
        this.tweets = this.tweets.map((tweet) => {
          return {
            ...tweet,
            User: { ...this.userProfile },
          }
        })

        if (response.status !== 200) {
          throw new Error(response)
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試",
        })
      }
    },
    afterClickDeleteFollowing(payload) {
      const { userId } = payload

      if (userId === this.userProfile.id) {
        //被追蹤減一
        const newFollowersCount = this.userProfile.FollowersCount - 1
        this.userProfile = {
          ...this.userProfile,
          FollowersCount: newFollowersCount
        }
        return
      } else if (this.userProfile.id === this.currentUser.id) {
        //追蹤減一
        const newFollowingCount = this.userProfile.FollowingsCount - 1
        this.userProfile = {
          ...this.userProfile,
          FollowingsCount: newFollowingCount
        }
        return
      }

    },
    afterClickAddFollowing(payload) {
      const { userId } = payload

      if (userId === this.userProfile.id) {
        //被追蹤加一
        const newFollowersCount = this.userProfile.FollowersCount + 1
        this.userProfile = {
          ...this.userProfile,
          FollowersCount: newFollowersCount
        }
        return
      } else if (this.userProfile.id === this.currentUser.id) {
        //追蹤加一
        const newFollowingCount = this.userProfile.FollowingsCount + 1
        this.userProfile = {
          ...this.userProfile,
          FollowingsCount: newFollowingCount
        }
        return
      }
    }
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