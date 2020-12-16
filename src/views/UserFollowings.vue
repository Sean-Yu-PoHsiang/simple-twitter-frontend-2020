<template>
  <div class="user-follows">
    <div class="left-container">
      <AdminNav />
    </div>
    <div class="main-container">
      <div class="control-area">
        <div class="previous-page">
          <div class="arrow-icon">
            <ArrowIcon />
          </div>
          <div class="user-detail">
            <div class="user-name">John Doe</div>
            <div class="tweet-count">25 推文</div>
          </div>
        </div>
        <NavTabs />
      </div>
      <UsersFollowingsList />
    </div>

    <div class="right-container">
      <TopFollowersUser />
    </div>
  </div>
</template>


<script>
import AdminNav from "./../components/AdminNav";
import NavTabs from "./../components/NavTabs";
import TopFollowersUser from "./../components/TopFollowersUser.vue";
import ArrowIcon from "./../components/ArrowIcon.vue";
// UserFollowsList 載入跟隨者清單
import UsersFollowingsList from "./../components/UsersFollowingsList";

export default {
  components: {
    AdminNav,
    NavTabs,
    TopFollowersUser,
    ArrowIcon,
    UsersFollowingsList,
  },
};
</script>

<style scoped>
/* 最外層整個網頁大方向排版 */
.user-follows {
  display: flex;
}
/* 中間區塊排版 */
.main-container {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 100%;
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