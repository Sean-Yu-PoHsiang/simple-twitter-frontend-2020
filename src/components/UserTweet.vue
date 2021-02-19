<template>
  <div class="main-user-container">
    <div>
      <router-link class="previous-page" to="/">
        <div class="arrow-icon">
          <ArrowIcon />
        </div>
        <div class="title">推文</div>
      </router-link>
    </div>

    <div class="user-area">
      <div class="user-detail">
        <router-link
          :to="{ name: 'user', params: { userId: userTweet.User.id } }"
        >
          <img
            class="user-avator"
            :src="userTweet.User.avatar || 'https://i.imgur.com/S4PE66O.png'"
            alt=""
          />
        </router-link>
        <span class="connect-line"></span>
        <div class="reply-detail">
          <router-link
            :to="{ name: 'user', params: { userId: userTweet.User.id } }"
          >
            <div class="user-name">{{ userTweet.User.name }}</div>
          </router-link>
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
          <button
            type="button"
            class="btn-reply"
            data-toggle="modal"
            data-target="#replyModal"
          >
            <ReplyIcon class="reply-icon" />
          </button>
        </div>

        <div>
          <button
            v-if="!userTweet.isLiked"
            type="button"
            class="btn-like"
            @click="addLike(userTweet.id)"
          >
            <LikeIcon class="like-icon" />
          </button>
          <button
            v-else
            type="button"
            class="btn-unlike"
            @click="deleteLike(userTweet.id)"
          >
            <IconLikeFill class="unlike-icon" />
          </button>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="replyModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <div class="btn-cancel pointer"></div>
            </button>
          </div>
          <div class="modal-body">
            <!-- 推文內容 -->
            <div class="tweet-container">
              <img
                class="avator"
                :src="
                  userTweet.User.avatar || 'https://i.imgur.com/S4PE66O.png'
                "
                alt=""
              />
              <div class="detail">
                <div class="info">
                  <div class="name">{{ userTweet.User.name }}</div>
                  <div class="at-detail">
                    <span class="tweet-at"> @{{ userTweet.User.account }}</span>
                    <span>・</span>
                    <span class="reply-time">{{
                      userTweet.createdAt | fromNow
                    }}</span>
                  </div>
                </div>
                <div>
                  <span class="reply">回覆給</span>
                  <span class="reply-to-user-at"
                    >@{{ userTweet.User.account }}</span
                  >
                </div>
                <div class="tweet-text">{{ userTweet.description }}</div>
              </div>
            </div>
            <!-- 回文區 -->
            <div class="d-flex">
              <img
                :src="currentUser.avatar || 'https://i.imgur.com/S4PE66O.png'"
                alt="no photo"
              />
              <form class="d-flex flex-column w-100" @submit.stop.prevent>
                <textarea
                  v-model="comment"
                  class="form-textarea w-100"
                  name="text"
                  id="replyTweet"
                  rows="6"
                  placeholder="回覆貼文"
                  autofocus
                ></textarea>
                <button
                  type="submit"
                  class="btn-reply-submit align-self-end"
                  data-dismiss="modal"
                  @click="handleReplySubmit(userTweet.id)"
                >
                  回覆
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowIcon from "./../components/icons/ArrowIcon.vue"
import ReplyIcon from "./../components/icons/ReplyIcon"
import LikeIcon from "./../components/icons/LikeIcon"
import IconLikeFill from "./../components/icons/IconLikeFill"
import moment from "moment"
import { Toast } from "./../utils/helpers"
import userAPI from "./../apis/user"
import tweetAPI from "./../apis/tweet"

import { mapState } from "vuex"

export default {
  components: {
    ArrowIcon,
    ReplyIcon,
    LikeIcon,
    IconLikeFill
  },
  props: {
    initialUserTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userTweet: {
        User: {
          id: -1,
        }
      },
      comment: "",
      createdAt: -1,
    }
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() { },
  watch: {
    initialUserTweet(newValue) {
      this.userTweet = newValue
    }
  },
  methods: {
    async handleReplySubmit(tweetId) {
      this.createdAt = Date.now()

      if (this.comment.trim() === "") {
        Toast.fire({
          icon: "error",
          title: "親愛的用戶，請勿發空空的思念。",
        })
        return
      } else if (this.comment.length > 140) {
        Toast.fire({
          icon: "error",
          title: "推文字數超過140囉！",
        })
        return
      }

      try {
        const response = await userAPI.addUserReply({
          tweetId: tweetId,
          comment: this.comment,
          createdAt: this.createdAt,
        })

        if (response.data.status !== 'success') {
          throw new Error(response.data.message)
        }

        this.userTweet.repliesCount++
        this.$emit("after-reply-tweet", {
          tweetId: tweetId,
          comment: this.comment,
          createdAt: this.createdAt,
        })
        this.comment = ""

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法發送回覆，請稍後再試",
        })
      }
    },
    async addLike(tweetId) {
      try {
        const response = await tweetAPI.addTweetLike({ tweetId })

        console.log(">>>>>>>>>", response)
        if (response.data.status !== 'success') {
          throw new Error(response.data.message)
        }
        this.userTweet.likesCount++
        this.userTweet.isLiked = true

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法點愛心，請稍後再試",
        })
      }
    },
    async deleteLike(tweetId) {
      try {
        const response = await tweetAPI.deleteTweetLike({ tweetId })

        console.log(response)
        if (response.data.status !== 'success') {
          throw new Error(response.data.message)
        }
        this.userTweet.likesCount--
        this.userTweet.isLiked = false

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取消愛心，請稍後再試",
        })
      }
    },
  },
  filters: {
    dateInMandarin(datetime) {
      if (!datetime) {
        return "-"
      }
      //日期顯示一：
      const tweetDate = moment(datetime).calendar()
      return tweetDate

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
.unlike-icon {
  transform: scale(1.25, 1.25);
}
.main-user-container {
  border-bottom: 1px solid #e6ecf0;
}

.previous-page {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6ecf0;
}

.previous-page:hover {
  background-color: #ebebeb;
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
  position: relative;
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
  padding: 0 16px;
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
  margin-left: 10px;
  margin-right: 155px;
}

/* 按鈕滑過效果 */
.reply-icon:hover,
.like-icon:hover,
.unlike-icon:hover {
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
  border-bottom: 1px solid #f3f3f3;
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
</style>