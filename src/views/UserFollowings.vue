<template>
  <div class="container">
    <div class="row">
      <div class="col-auto component-navbar left-area-rwd">
        <Navbar />
      </div>
      <div class="col main-area-rwd main-container vh100scroll">
        <div class="control-area">
          <div class="previous-page">
            <div class="arrow-icon" @click="$router.push('/')">
              <ArrowIcon />
            </div>
            <div class="user-detail">
              <div class="user-name">{{ userProfile.name }}</div>
              <div class="tweet-count">{{ userProfile.tweetsCount }} 推文</div>
            </div>
          </div>
          <NavTabs :initialUserId="userProfile.id" />
        </div>
        <UsersFollowingsList :initialFollowings="followings" />
      </div>
      <div class="col-auto right-container right-area-rwd">
        <TopFollowersUser class="component-top-followers-user" />
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from "./../components/Navbar.vue";
import NavTabs from "./../components/NavTabs";
import TopFollowersUser from "./../components/TopFollowersUser.vue";
import ArrowIcon from "./../components/ArrowIcon.vue";
import UsersFollowingsList from "./../components/UsersFollowingsList";

import userAPI from "./../apis/user";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    Navbar,
    NavTabs,
    TopFollowersUser,
    ArrowIcon,
    UsersFollowingsList,
  },
  data() {
    return {
      userProfile: { id: -1 },
      followings: [],
    };
  },
  created() {
    const { userId: userId } = this.$route.params;
    this.fetchUserProfile(userId);
    this.fetchUserFollowings(userId);
  },
  beforeRouteUpdate(to, from, next) {
    const userId = to.params.userId;
    this.fetchUserProfile(userId);
    this.fetchUserFollowings(userId);
    next();
  },
  methods: {
    async fetchUserProfile(userId) {
      try {
        const response = await userAPI.getUserProfile({ userId });

        this.userProfile = {
          ...this.userProfile,
          ...response.data,
        };

        if (response.status !== 200) {
          throw new Error(response);
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
    async fetchUserFollowings(userId) {
      try {
        const response = await userAPI.getUserFollowings({ userId });
        console.log(response);

        this.followings = response.data;

        if (response.status !== 200) {
          throw new Error(response);
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得正在跟隨資料，請稍後再試",
        });
      }
    },
  },
};
</script>


<style scoped>
/* 中間區塊排版 */
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 1px solid #e6ecf0;
  border-bottom: transparent;
}
.main-container {
  padding: 0;
}

.previous-page {
  display: flex;
  align-items: center;
}
.arrow-icon {
  margin-right: 43px;
  margin-left: 15px;
  cursor: pointer;
}

.user-detail {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 900;
  font-size: 19px;
  line-height: 28px;
  color: #1c1c1c;
  margin: 0;
  padding: 0;
}

.tweet-count {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  color: #657786;
  margin: 0;
  padding: 0;
}

.active {
  background: #ff6600;
  border: 1px solid #ff6600;
  box-sizing: border-box;
  border-radius: 100px;
}

.control-area {
  border-bottom: 1px solid #e6ecf0;
}
</style>