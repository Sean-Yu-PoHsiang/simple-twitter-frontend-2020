<template>
  <div class="all-users-newest-tweets">
    <div class="avator-and-tweet">
      <img
        class="user-avator"
        src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
        alt=""
      />
      <div>
        <div class="tweet-detail">
          <div class="user-name">Apple</div>
          <div>
            <span class="at-user">@apple</span>
            <span>・</span>
            <span class="tweet-update-time">3 小時</span>
          </div>
        </div>
        <div class="tweet-text">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
        <div class="reply-and-like-btn">
          <div class="reply-container">
            <div class="btn-container">
              <!-- 點回文可以跳轉到回文頁面 -->

              <ReplyIcon class="reply-icon" />

              <p class="replies-count">13</p>
            </div>
          </div>

          <!-- 點like -->
          <div class="like-container">
            <div class="btn-container">
              <LikeIcon class="like-icon" />
              <p class="likes-count">76</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="avator-and-tweet">
      <img
        class="user-avator"
        src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
        alt=""
      />
      <div>
        <div class="tweet-detail">
          <div class="user-name">Apple</div>
          <div>
            <span class="at-user">@apple</span>
            <span>・</span>
            <span class="tweet-update-time">3 小時</span>
          </div>
        </div>
        <div class="tweet-text">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
        <div class="reply-and-like-btn">
          <div class="reply-container">
            <div class="btn-container">
              <!-- 點回文可以跳轉到回文頁面 -->
              <ReplyIcon class="reply-icon" />

              <p class="replies-count">13</p>
            </div>
          </div>

          <!-- 點like -->
          <div class="like-container">
            <div class="btn-container">
              <LikeIcon class="like-icon" />
              <p class="likes-count">76</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="avator-and-tweet">
      <img
        class="user-avator"
        src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
        alt=""
      />
      <div>
        <div class="tweet-detail">
          <div class="user-name">Apple</div>
          <div>
            <span class="at-user">@apple</span>
            <span>・</span>
            <span class="tweet-update-time">3 小時</span>
          </div>
        </div>
        <div class="tweet-text">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </div>
        <div class="reply-and-like-btn">
          <div class="reply-container">
            <div class="btn-container">
              <!-- 點回文可以跳轉到回文頁面 -->

              <ReplyIcon class="reply-icon" />

              <p class="replies-count">13</p>
            </div>
          </div>

          <!-- 點like -->
          <div class="like-container">
            <div class="btn-container">
              <LikeIcon class="like-icon" />
              <p class="likes-count">76</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ReplyIcon from "./../components/ReplyIcon";
import LikeIcon from "./../components/LikeIcon";

export default {
  components: {
    ReplyIcon,
    LikeIcon,
  },
};
</script>

<style scoped>
.all-users-newest-tweets {
  width: 600px;
  border: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  height: 1000px;
}

.avator-and-tweet {
  border-bottom: 1px solid #e6ecf0;
  padding: 10px 0;
}

.user-avator {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
}

.tweet-detail {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.user-name {
  margin-right: 5px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #1c1c1c;
}

.tweet-text {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #1c1c1c;
}

.reply-and-like-btn,
.avator-and-tweet,
.tweet-detail,
.tweet-text,
.comment-and-like {
  display: flex;
}

.reply-icon,
.like-icon {
  margin-right: 10px;
}

.likes-count,
.replies-count {
  display: inline-block;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  color: #657786;
}

.like-container,
.reply-container {
  display: flex;
  align-content: center;
  height: 30px;
  width: auto;
  padding-right: 50px;
}

/* 按鈕滑過效果 */
.btn-container:hover {
  z-index: -2;
  background-color: #e6ecf0;
  border-radius: 30px;
}

/* 按鈕滑過效果的背景大小 */
.btn-container {
  padding: 0 8px;
}
</style>