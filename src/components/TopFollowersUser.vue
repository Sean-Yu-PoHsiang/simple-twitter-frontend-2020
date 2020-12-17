<template>
  <div class="top-followers">
    <div class="title">跟隨誰</div>
    <div class="user-list">
      <div class="user">
        <div class="user-info">
          <img
            class="user-avator"
            src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
            alt=""
          />
          <div class="user-detail">
            <div class="user-name">Pizza Hut</div>
            <div class="at-user">@pizzahut</div>
          </div>
        </div>
        <button type="submit" id="follow-btn" class="btn follow-btn">
          跟隨
        </button>
      </div>
      <div class="user">
        <div class="user-info">
          <img
            class="user-avator"
            src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
            alt=""
          />
          <div class="user-detail">
            <div class="user-name">Pizza Hut</div>
            <div class="at-user">@pizzahut</div>
          </div>
        </div>
        <button type="submit" id="follow-btn" class="btn follow-btn">
          跟隨
        </button>
      </div>
      <div class="user">
        <div class="user-info">
          <img
            class="user-avator"
            src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
            alt=""
          />
          <div class="user-detail">
            <div class="user-name">Pizza Hut</div>
            <div class="at-user">@pizzahut</div>
          </div>
        </div>
        <button type="submit" id="follow-btn" class="btn follow-btn">
          跟隨
        </button>
      </div>
      <button class="show-more-btn">顯示更多</button>
    </div>
  </div>
</template>

<style scoped>
.top-followers {
  background: #f5f8fa;
  border-radius: 14px;
  width: 350px;
  margin-top: 15px;
}

.title {
  padding: 10px 15px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #1c1c1c;
}
.user-avator {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
  margin-left: 15px;
}
.user,
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.user {
  justify-content: space-between;
  border-top: 1px solid #e6ecf0;
}

.user-name {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #1c1c1c;
}
.at-user {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #657786;
}
.follow-btn {
  margin-right: 15px;
  background: transparent;
  width: 62px;
  height: 30px;
  border: 1px solid transparent;
  outline: none;
  border: 1px solid #ff6600;
  border-radius: 100px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #ff6600;
}
/* 按鈕被點時改文字與背景色 */
.active {
  color: #ffffff;
  background: #ff6600;
}

.show-more-btn {
  margin: 10px 15px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #ff6600;
  border: 1px solid transparent;
  outline: none;
  background-color: transparent;
}
</style>