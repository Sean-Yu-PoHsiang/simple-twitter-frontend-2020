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
        <img class="user-avator" :src="userTweet.User.avatar" alt="" />
        <div class="reply-detail">
          <div class="user-name">{{ userTweet.User.name }}</div>
          <div>
            <span class="user-self-at">@{{ userTweet.User.account }}</span>
          </div>
        </div>
      </div>
      <div class="tweet-text">
        <p>
          {{ userTweet.description }}
        </p>
      </div>
      <div class="tweet-upload-time">
        <div>{{ userTweet.createdAt | dateInMandarin }}</div>
      </div>
      <div class="count-container">
        <div class="count-info">
          <p class="replies-count">{{ userTweet.repliesCount }}</p>
          <p class="count-title">回覆</p>
        </div>
        <div class="count-info">
          <p class="likes-count">{{ userTweet.likesCount }}</p>
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
import moment from "moment";

export default {
  components: {
    ArrowIcon,
    ReplyIcon,
    LikeIcon,
  },
  props: {
    userTweet: {
      type: Object,
      required: true,
    },
  },
  created() {
    console.log("this.userTweet", this.userTweet);
  },

  filters: {
    dateInMandarin(datetime) {
      if (!datetime) {
        return "-";
      }
      //日期顯示一：
      const tweetDate = moment(datetime).calendar();
      return tweetDate;

      //日期顯示二：
      //可以回傳中文日期，但是下方程式僅限很久之前的文，才可以正常顯示。
      //因為太近的，calendar()，會回傳today、yesterday，而不是日月年，就會變成undefine
      // const tweetDate = moment(datetime).subtract("days").calendar();
      // const timeArraySplit = tweetDate.toString().split("/");
      // console.log("timeArraySplit", timeArraySplit);
      // const dateInMandarin = `
      // ${timeArraySplit[2]}年${timeArraySplit[1]}月${timeArraySplit[0]}日`;
      //    return dateInMandarin;
    },
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