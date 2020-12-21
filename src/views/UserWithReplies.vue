<template>
  <div class="container">
    <div class="row">
      <div class="col-auto">
        <Navbar />
      </div>
      <div class="col">
        <UserProfile :userProfile="userProfile" :currentUser="currentUser" />
        <div class="userNavbar d-flex">
          <router-link
            class="user-nav-link d-block"
            :to="{ name: 'user-tweets', params: { userId: userProfile.id } }"
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
        <Tweets />
      </div>
      <div class="col-auto">
        <TopFollowersUser />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './../components/Navbar'
import TopFollowersUser from './../components/TopFollowersUser'
import UserProfile from './../components/UserProfile'
import Tweets from "./../components/Tweets.vue";

import userAPI from './../apis/user'
import { Toast } from './../utils/helpers'


const currentUser = {
  "id": 2,
  "name": "User1",
  "email": "user1@example.com",
  "role": null
}
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA4NTQxODgzfQ.hjy_pdYF9fBEDsUz4V_YLQO60gWTY3sWcynQgwD2zwg'
localStorage.setItem('token', token)

export default {
  components: {
    Navbar,
    TopFollowersUser,
    UserProfile,
    Tweets
  },
  data() {
    return {
      currentUser: {},
      userProfile: {}
    }
  },
  created() {
    const { userId: userId } = this.$route.params
    this.currentUser = currentUser
    this.fetchUserProfile(userId)
  },
  beforeRouteUpdate(to, from, next) {
    const { userId: userId } = to.params
    // const { name: name } = to.name
    // console.log(name)
    this.fetchUserProfile(userId)
    next()
  },
  methods: {
    async fetchUserProfile(userId) {
      try {
        const { data } = await userAPI.getUserProfile({ userId })
        this.userProfile = data

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    },
  }
}
</script>

<style scoped>
.user-nav-link {
  text-align: center;
  padding: 15px 0;
  color: #657786;
  /* padding: 15px 40px; */
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