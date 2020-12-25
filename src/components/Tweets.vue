<template>
  <div class="all-users-newest-tweets">
    <router-link
      :to="{
        name: 'tweet',
        params: { tweetId: tweet.id },
      }"
      v-for="tweet in tweets"
      :key="tweet.id"
      class="avator-and-tweet"
    >
      <router-link :to="{ name: 'user', params: { userId: tweet.User.id } }">
        <img
          class="user-avator"
          :src="tweet.User.avatar || 'https://i.imgur.com/S4PE66O.png'"
          alt=""
        />
      </router-link>

      <div>
        <div class="tweet-detail">
          <router-link
            :to="{ name: 'user', params: { userId: tweet.User.id } }"
          >
            <div class="user-name">{{ tweet.User.name }}</div>
          </router-link>
          <div>
            <span class="at-user">@{{ tweet.User.account }}</span>
            <span>・</span>
            <span class="tweet-update-time">{{
              tweet.createdAt | fromNow
            }}</span>
          </div>
        </div>
        <div class="tweet-text words">
          {{ tweet.description }}
        </div>
        <div class="reply-and-like-btn">
          <div class="reply-container">
            <div class="btn-container">
              <!-- 點回文可以跳轉到回文頁面 -->

              <ReplyIcon class="reply-icon" />

              <p class="replies-count">{{ tweet.repliesCount }}</p>
            </div>
          </div>

          <!-- 點like -->
          <div class="like-container">
            <div class="btn-container">
              <LikeIcon class="like-icon" />
              <p class="likes-count">{{ tweet.likesCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import ReplyIcon from "./../components/ReplyIcon";
import LikeIcon from "./../components/LikeIcon";
import moment from "moment";
// import tweet from "../apis/tweet";

export default {
  components: {
    ReplyIcon,
    LikeIcon,
  },

  props: {
    initialTweets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tweets: this.initialTweets,
    };
  },
  watch: {
    initialTweets(newValue) {
      this.tweets = newValue;
    },
  },
  created() {
    console.log("initial", this.initialTweets);
  },
  filters: {
    fromNow(datetime) {
      if (!datetime) {
        return "-";
      }
      // 使用 moment 提供的 fromNow 方法
      return moment(datetime).fromNow();
    },
  },
};
</script>

<style scoped>
.all-users-newest-tweets {
  /* width: 600px; */
  border: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
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
/* 貼文單字過長時，切割單字換行 */
.words {
  word-break: break-all;
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
  /* width: auto; */
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