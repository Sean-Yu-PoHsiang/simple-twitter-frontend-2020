<template>
  <div class="col main-area-rwd main-container vh100scroll">
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
    <UsersFollowersList />
  </div>
</template>


<script>
import NavTabs from "./../components/NavTabs"
import ArrowIcon from "./../components/ArrowIcon.vue"
import UsersFollowersList from "./../components/UsersFollowersList.vue"

export default {
  components: {
    NavTabs,
    ArrowIcon,
    UsersFollowersList,
  },
}
</script>

<style scoped>
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