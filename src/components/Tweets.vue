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
            <button
              type="button"
              class="btn-reply"
              data-toggle="modal"
              data-target="#reply-modal"
              @click.prevent="getTweetForModel(tweet.id)"
            >
              <div class="btn-container">
                <!-- 點回文可以跳轉到回文頁面 -->

                <ReplyIcon class="reply-icon" />

                <p class="replies-count">{{ tweet.repliesCount }}</p>
              </div>
            </button>
          </div>

          <!-- 點like -->
          <div class="like-container">
            <button
              v-if="!tweet.isLiked"
              type="button"
              class="btn-like"
              @click.prevent="addLike(tweet.id)"
            >
              <div class="btn-container">
                <LikeIcon class="like-icon" />
                <p class="likes-count">{{ tweet.likesCount }}</p>
              </div>
            </button>

            <button
              v-else
              type="button"
              class="btn-unlike"
              @click.prevent="deleteLike(tweet.id)"
            >
              <div class="btn-container">
                <IconLikeFill class="unlike-icon" />
                <p class="likes-count">{{ tweet.likesCount }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </router-link>
    <!-- Modal -->
    <div
      class="modal fade"
      id="reply-modal"
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
                  tweetDataForModel.User.avatar ||
                  'https://i.imgur.com/S4PE66O.png'
                "
                alt=""
              />
              <div class="detail">
                <div class="info">
                  <div class="name">{{ tweetDataForModel.User.name }}</div>
                  <div class="at-detail">
                    <span class="tweet-at">
                      @{{ tweetDataForModel.User.account }}</span
                    >
                    <span>・</span>
                    <span class="reply-time">{{
                      tweetDataForModel.createdAt | fromNow
                    }}</span>
                  </div>
                </div>
                <div>
                  <span class="reply">回覆給</span>
                  <span class="reply-to-user-at"
                    >@{{ tweetDataForModel.User.account }}</span
                  >
                </div>
                <div class="tweet-text">
                  {{ tweetDataForModel.description }}
                </div>
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
                  @click="handleReplySubmit(tweetDataForModel.id)"
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
import ReplyIcon from "./../components/icons/ReplyIcon"
import LikeIcon from "./../components/icons/LikeIcon"
import moment from "moment"
import tweetAPI from "../apis/tweet"
import userAPI from "./../apis/user"
import IconLikeFill from "./../components/icons/IconLikeFill"


import { Toast } from "./../utils/helpers"

import { mapState } from "vuex"

export default {
  components: {
    ReplyIcon,
    LikeIcon,
    IconLikeFill
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
      comment: "",
      tweetId: -1,
      tweetDataForModel: {
        User: {
          account: "",
          avatar: '',
          id: -1,
          name: "User1",
        },
        UserId: -1,
        createdAt: '',
        description: "",
        id: -1
      },
    }
  },
  methods: {
    async getTweetForModel(tweetId) {
      try {
        const { data } = await tweetAPI.getUserTweet({ tweetId })
        this.tweetId = tweetId
        this.tweetDataForModel = data
        console.log('this.tweetDataForModel ', this.tweetDataForModel)

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法發送回覆，請稍後再試",
        })
      }
    },
    async handleReplySubmit(tweetId) {
      try {
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

        const response = await userAPI.addUserReply({
          tweetId: this.tweetId,
          comment: this.comment,
          createdAt: this.createdAt,

        })

        if (response.status !== 200) {
          throw new Error(response)
        }
        this.comment = ""

        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            const newRepliesCount = tweet.repliesCount + 1
            return {
              ...tweet,
              repliesCount: newRepliesCount
            }

          } else {
            return tweet
          }
        })

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

        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            const newLikesCount = tweet.likesCount + 1

            return {
              ...tweet,
              isLiked: true,
              likesCount: newLikesCount
            }

          } else {
            return tweet
          }
        })

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

        this.tweets = this.tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            const newLikesCount = tweet.likesCount - 1

            return {
              ...tweet,
              isLiked: false,
              likesCount: newLikesCount
            }


          } else {
            return tweet
          }

        })

        this.$emit("after-click-delete-like", {
          tweets: this.tweets
        })


      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取消愛心，請稍後再試",
        })
      }
    },

  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  watch: {
    initialTweets(newValue) {
      this.tweets = newValue
    },
  },
  created() { },
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
.all-users-newest-tweets {
  /* width: 600px; */
  border: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
}

.avator-and-tweet {
  border-bottom: 1px solid #e6ecf0;
  padding: 10px 0 5px 0;
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

/* 點讚、回文按鈕 */
.unlike-icon {
  transform: scale(0.7);
  margin: 0;
}

.btn-container {
  width: auto;
  border-radius: 50px;
}

.reply-icon,
.like-icon,
.unlike-icon {
  margin-right: 5px;
}

button {
  width: auto;
  border: 1px solid transparent;
  background: transparent;
}

.unlike-icon:hover,
button:hover {
  background: #f0f0f0;
  border-radius: 30px;
}

.likes-count,
.replies-count {
  display: inline-block;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  color: #657786;
  margin: 0;
}

.like-container,
.reply-container {
  display: flex;
  align-content: center;
  height: 30px;
  padding-right: 50px;
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
</style>