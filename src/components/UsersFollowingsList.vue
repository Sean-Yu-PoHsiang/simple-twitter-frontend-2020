<template>
  <div class="following-list">
    <div class="user">
      <img
        class="user-avator"
        src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
        alt=""
      />
      <div class="user-detail">
        <div class="user-and-follow-btn">
          <div class="user-info">
            <div class="user-name">Mary Jane</div>

            <div class="user-at">@apple</div>
          </div>

          <button type="submit" id="follow-btn" class="btn follow-btn active">
            正在跟隨
          </button>
        </div>
        <div class="user-description">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </div>
      </div>
    </div>
    <div class="user">
      <img
        class="user-avator"
        src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
        alt=""
      />
      <div class="user-detail">
        <div class="user-and-follow-btn">
          <div class="user-info">
            <div class="user-name">Mary Jane</div>

            <div class="user-at">@apple</div>
          </div>

          <button type="submit" id="follow-btn" class="btn follow-btn active">
            正在跟隨
          </button>
        </div>
        <div class="user-description">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </div>
      </div>
    </div>
    <div class="user">
      <img
        class="user-avator"
        src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
        alt=""
      />
      <div class="user-detail">
        <div class="user-and-follow-btn">
          <div class="user-info">
            <div class="user-name">Mary Jane</div>

            <div class="user-at">@apple</div>
          </div>

          <button type="submit" id="follow-btn" class="btn follow-btn">
            跟隨
          </button>
        </div>
        <div class="user-description">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.following-list {
  min-width: 300px;
  /* width: 600px; */
}
.user {
  display: flex;
  border-bottom: 1px solid #e6ecf0;
}
.user-detail {
  margin: 10px;
}
.user-and-follow-btn {
  display: flex;
  justify-content: space-between;
}

.user-avator {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px 0 0px 15px;
}
.user-name {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #1c1c1c;
}
.user-at {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 15px;
  color: #657786;
}

.follow-btn {
  width: 62px;
  margin-right: 15px;
  background: transparent;
  height: 30px;
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

.active {
  content: "正在跟隨";
  color: #ffffff;
  background: #ff6600;
  width: 92px;
}

.user-description {
  margin-right: 15px;
}
</style>