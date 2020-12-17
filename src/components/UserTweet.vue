<template>
  <div class="main-user-container">
    <div class="previous-page">
      <div class="arrow-icon">
        <ArrowIcon />
      </div>
      <div class="title">推文</div>
    </div>

    <div class="user-area">
      <div class="user-detail">
        <img
          class="user-avator"
          src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
          alt=""
        />
        <div class="reply-detail">
          <div class="user-name">Apple</div>
          <div>
            <span class="user-self-at">@apple</span>
          </div>
        </div>
      </div>
      <div class="tweet-text">
        <p>
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </p>
      </div>
      <div class="tweet-upload-time">
        <div>上午 10:05・2020年6月10日</div>
      </div>
      <div class="count-container">
        <div class="count-info">
          <p class="replies-count">34</p>
          <p class="count-title">回覆</p>
        </div>
        <div class="count-info">
          <p class="likes-count">808</p>
          <p class="count-title">喜歡次數</p>
        </div>
      </div>
      <div class="reply-and-like-btn-container">
        <div>
          <ReplyIcon class="reply-icon" />
        </div>
        <div>
          <LikeIcon class="like-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowIcon from "./../components/ArrowIcon.vue";
import ReplyIcon from "./../components/ReplyIcon";
import LikeIcon from "./../components/LikeIcon";

export default {
  components: {
    ArrowIcon,
    ReplyIcon,
    LikeIcon,
  },
};
</script>



<style scoped>
.main-user-container {
  /* width: 600px; */
  border: 1px solid #e6ecf0;
}

.previous-page {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6ecf0;
}

.arrow-icon {
  line-height: 26px;
  padding: 0;
  margin: 0 43px 5px 20px;
}

.title {
  padding: 15px 0;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #1c1c1c;
}

/* 發文人區塊 */
.user-detail {
  display: flex;
  align-items: center;
}
.user-area {
  display: flex;
  flex-direction: column;
}
.user-avator {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
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

/* 發文人＠樣式 */
.user-self-at {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

/* 貼文內容 */
.tweet-text {
  margin: 0 75px 0 15px;

  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
  line-height: 34px;
  color: #1c1c1c;
}

/* 貼文時間 */
.tweet-upload-time {
  margin: 15px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
  border-bottom: 1px solid #e6ecf0;
}

/* icons */
.reply-icon,
.like-icon {
  transform: scale(2, 2);
  margin-right: 155px;
}

/* 按鈕滑過效果 */
.reply-icon:hover,
.like-icon:hover {
  z-index: -2;
  background-color: #e6ecf0;
  border-radius: 50%;
}

/* 回覆與喜歡次數 */
.reply-and-like-btn-container {
  display: flex;
  padding: 15px;
}

.count-container {
  display: flex;
  border-bottom: 1px solid #e6ecf0;
}

.count-info {
  display: flex;
  margin-left: 20px;
}
.count-title,
.likes-count,
.replies-count {
  margin-right: 2px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 28px;
  color: #657786;
}

.likes-count,
.replies-count {
  color: #000000;
}
</style>