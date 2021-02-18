<template>
  <div class="all-users-newest-tweets">
    <div
      v-if="tweetsAndReplies.length === 0"
      class="d-flex justify-content-center"
    >
      <p class="p-3 text-black-50">No replies</p>
    </div>
    <router-link
      :to="{
        name: 'tweet',
        params: { tweetId: tweetAndReply.Tweet.id },
      }"
      v-for="tweetAndReply in tweetsAndReplies"
      :key="tweetAndReply.id"
      class="avator-and-tweet d-flex flex-column hover-background"
    >
      <div class="d-flex first-box">
        <router-link
          :to="{ name: 'user', params: { userId: tweetAndReply.Tweet.UserId } }"
        >
          <img
            class="user-avator"
            :src="
              tweetAndReply.Tweet.User.avatar ||
              'https://i.imgur.com/S4PE66O.png'
            "
            alt=""
          />
        </router-link>

        <div class="w-100">
          <div class="tweet-detail">
            <router-link
              class="hover-underline"
              :to="{
                name: 'user',
                params: { userId: tweetAndReply.Tweet.UserId },
              }"
            >
              <div class="user-name">{{ tweetAndReply.Tweet.User.name }}</div>
            </router-link>
            <div>
              <span class="at-user"
                >@{{ tweetAndReply.Tweet.User.account }}</span
              >
              <span>・</span>
              <span class="tweet-update-time">{{
                tweetAndReply.Tweet.createdAt | fromNow
              }}</span>
            </div>
          </div>
          <div class="tweet-text words">
            {{ tweetAndReply.Tweet.description }}
          </div>
        </div>
        <div class="connection-line"></div>
      </div>

      <div class="d-flex mt-3">
        <router-link :to="{ name: 'user', params: { userId: userProfile.id } }">
          <img
            class="user-avator"
            :src="userProfile.avatar || 'https://i.imgur.com/S4PE66O.png'"
            alt=""
          />
        </router-link>
        <div class="w-100">
          <div class="tweet-detail">
            <router-link
              class="hover-underline"
              :to="{
                name: 'user',
                params: { userId: userProfile.id },
              }"
            >
              <div class="user-name">{{ userProfile.name }}</div>
            </router-link>
            <div>
              <span class="at-user">@{{ userProfile.account }}</span>
              <span>・</span>
              <span class="tweet-update-time">{{
                tweetAndReply.createdAt | fromNow
              }}</span>
            </div>
          </div>

          <div class="tweet-detail">
            <div class="">回覆給</div>
            <span class="at-user orange"
              >@{{ tweetAndReply.Tweet.User.account }}</span
            >
          </div>

          <div class="tweet-text words">
            {{ tweetAndReply.comment }}
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>


<script>
import moment from "moment"
import { mapState } from "vuex"

export default {
  components: {},
  props: {
    initialTweetsAndReplies: {
      type: Array,
      required: true,
    },
    initialUserProfile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tweetsAndReplies: this.initialTweetsAndReplies,
      userProfile: this.initialUserProfile
    }
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  watch: {
    initialTweetsAndReplies(newValue) {
      this.tweetsAndReplies = newValue
    },
    initialUserProfile(newValue) {
      this.userProfile = newValue
    },
  },
  filters: {
    fromNow(datetime) {
      if (!datetime) {
        return "-"
      }
      // 使用 moment 提供的 fromNow 方法
      return moment(datetime).fromNow()
    },
  },
}
</script>

<style scoped>
.hover-background:hover {
  background-color: #f7f7f7;
}
.hover-underline:hover {
  text-decoration: underline #1c1c1c;
}
.orange {
  color: salmon;
}
.first-box {
  position: relative;
}
.connection-line {
  /* height: 50px; */
  width: 2px;
  background: #cccccc;
  position: absolute;
  top: 65px;
  left: 33px;
  bottom: -20px;
}
/* .all-users-newest-tweets {
  width: 600px;
  border: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
} */

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
/* 
.reply-btn-show-model {
  position: relative;
  z-index: 20;
} */

/* modal-setting */
.new-tweet-card-pack {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.new-tweet-card {
  position: relative;
  height: auto;
  width: 600px;
  background: white;
  margin: 30px auto;
  z-index: 999;
  border-radius: 14px;
}
textarea {
  margin: 0;
  padding: 0;
  margin-top: 12px;
  resize: none;
  border: none;
}
textarea:focus {
  outline: none;
}
.btn-cancel {
  position: relative;
  width: 24px;
  height: 24px;
}
.btn-cancel::before,
.btn-cancel::after {
  content: "";
  position: absolute;
  height: 24px;
  width: 4px;
  border-radius: 2px;
  background: #ff6600;
  z-index: 99;
  left: 42%;
  /* transform: translate(-50%, -50%); */
}
.btn-cancel::before {
  transform: rotate(45deg);
}
.btn-cancel::after {
  transform: rotate(-45deg);
}

.btn-reply-submit {
  color: white;
  background: #ff6600;
  border-color: transparent;
  height: 40px;
  border-radius: 20px;
  width: 64px;
}
img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 16px;
}

/* 回覆model中的model 原始推文內容 */
.tweet-container,
.info {
  display: flex;
  position: relative;
}
.tweet-container {
  padding-bottom: 20px;
}

.name,
.at-detail,
.tweet-text,
.reply,
.reply-to-user-at {
  font-family: Noto Sans TC;
  font-style: normal;
}

.name {
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #1c1c1c;
}
.at-detail {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}
.tweet-text {
  width: 95%;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #1c1c1c;
  word-break: break-all;
}
.reply,
.reply-to-user-at {
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #657786;
}

.reply-to-user-at {
  color: #ff6600;
}

.tweet-container::before {
  position: absolute;
  height: 100px;
  width: 2px;
  left: -10px;
  top: 10px;
  bottom: 10px;
  background-color: red;
}

button {
  width: auto;
  border: 1px solid transparent;
  background: transparent;
}
button:hover {
  background: #f0f0f0;
  border-radius: 30px;
}
</style>