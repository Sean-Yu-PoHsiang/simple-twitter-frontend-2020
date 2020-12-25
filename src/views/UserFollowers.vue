<template>
  <div class="container">
    <div class="row">
      <div class="col-auto component-navbar">
        <Navbar />
      </div>
      <div class="col main-container">
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
        <UsersFollowersList :initialFollowers="followers" />
      </div>
      <div class="col-auto right-container">
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
import UsersFollowersList from "./../components/UsersFollowersList.vue";

import userAPI from "./../apis/user";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    Navbar,
    NavTabs,
    TopFollowersUser,
    ArrowIcon,
    UsersFollowersList,
  },
  data() {
    return {
      userProfile: { id: -1 },
      followers: [],
    };
  },
  created() {
    const { userId: userId } = this.$route.params;
    this.fetchUserProfile(userId);
    this.fetchUserFollowers(userId);
  },
  beforeRouteUpdate(to, from, next) {
    const userId = to.params.userId;
    this.fetchUserProfile(userId);
    this.fetchUserFollowers(userId);
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
    async fetchUserFollowers(userId) {
      try {
        const response = await userAPI.getUserFollowers({ userId });
        console.log(response);

        this.followers = response.data;

        if (response.status !== 200) {
          throw new Error(response);
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得跟隨者資料，請稍後再試",
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
  width: 600px;
  height: 100vh;
  border: 1px solid #e6ecf0;
  border-bottom: transparent;
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

.col {
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