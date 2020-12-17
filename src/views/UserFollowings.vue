<template>
  <div class="container user-follows">
    <div class="row">
      <div class="col-auto left-container">
        <Navbar />
      </div>
      <div class="col main-container">
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

      <div class="col-auto right-container">
        <TopFollowersUser />
      </div>
    </div>
  </div>
</template>


<script>
import Navbar from "./../components/Navbar.vue";
import NavTabs from "./../components/NavTabs";
import TopFollowersUser from "./../components/TopFollowersUser.vue";
import ArrowIcon from "./../components/ArrowIcon.vue";
// UserFollowsList 載入使用者已跟隨的清單
import UsersFollowingsList from "./../components/UsersFollowingsList";

export default {
  components: {
    Navbar,
    NavTabs,
    TopFollowersUser,
    ArrowIcon,
    UsersFollowingsList,
  },
};
</script>


<style scoped>
/* 中間區塊排版 */
.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
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