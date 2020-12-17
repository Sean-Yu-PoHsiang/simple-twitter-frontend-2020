<template>
  <div class="container">
    <div class="row">
      <div class="col-auto">
        <Navbar />
      </div>
      <div class="col">
        <UserProfile />
        <div class="userNavbar d-flex">
          <router-link class="user-nav-link d-block active" to="/"
            >推文</router-link
          >
          <router-link class="user-nav-link d-block" to="/"
            >推文與回覆</router-link
          >
          <router-link class="user-nav-link d-block" to="/"
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
import Navbar from "./../components/Navbar";
import TopFollowersUser from "./../components/TopFollowersUser";
import UserProfile from "./../components/UserProfile";
import Tweets from "./../components/Tweets.vue";

export default {
  components: {
    Navbar,
    TopFollowersUser,
    UserProfile,
    Tweets,
  },
};
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