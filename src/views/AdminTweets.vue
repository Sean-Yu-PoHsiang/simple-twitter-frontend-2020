<template>
  <div class="container">
    <div class="row">
      <div class="col-auto">
        <AdminNav />
      </div>
      <div class="panel-right col">
        <h1 class="title">推文清單</h1>
        <div class="tweets-panel px-3">
          <div class="row">
            <div v-for="tweet in tweets" :key="tweet.id" class="col-12">
              <div class="tweet-card d-flex">
                <img
                  class="user-avatar"
                  :src="tweet.User.avatar | emptyImage"
                  alt="no pic"
                />
                <div class="tweet-content">
                  <div
                    class="tweet-content-title d-flex align-items-center mb-1"
                  >
                    <span class="user-name">{{ tweet.User.name }}</span>
                    <span class="user-acount"
                      >&#64;{{ tweet.User.account }}</span
                    >
                    <span class="dot fonSize30">&#8901;</span>
                    <span class="tweet-create-time">
                      {{ tweet.createdAt }}
                    </span>
                    <button class="btn-exit" @click="deleteTweet(tweet.id)">
                      &#10005;
                    </button>
                  </div>
                  <p>
                    {{ tweet.description | contentToLong }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from './../components/AdminNav'
import { emptyImageFilter } from '../utils/mixins'
import { fromNowFilter } from '../utils/mixins'
import { contentLengthFilter } from '../utils/mixins'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      tweets: []
    }
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    async fetchTweets() {
      try {
        const { data } = await adminAPI.getAllTweets()
        data.map(tweet => {
          tweet.createdAt = new Date(tweet.createdAt).toLocaleString()
        })
        this.tweets = data

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得推文，請稍後再試'
        })
      }
    },
    async deleteTweet(tweetId) {
      try {
        if (!confirm('確定刪除？')) {
          return
        }

        console.log('confirm delete')

        const { data } = await adminAPI.deleteTweet({ tweetId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.tweets = this.tweets.filter(tweet =>
          tweet.id !== tweetId
        )

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '刪除推文失敗，請稍後再試'
        })
      }
    }
  },
  mixins: [emptyImageFilter, fromNowFilter, contentLengthFilter],
}
</script>

<style scoped>
.panel-right {
  height: 100vh;
}
.title {
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  color: #1c1c1c;
  font-size: 18px;
  font-weight: 700;
  line-height: 55px;
  padding-left: 25px;
  margin: 0;
}
.user-avatar {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin: 15px 15px 0 0;
}
.col-12 {
  border-bottom: 1px solid #e6ecf0;
  padding-bottom: 15px;
}
.tweet-card {
  position: relative;
  border-radius: 10px;
  width: 100%;
}
.panel-right {
  position: relative;
  height: 100vh;
}
.tweets-panel {
  position: absolute;
  top: 55px;
  bottom: 0px;
  left: 15px;
  right: 15px;
  border: 1px solid #e6ecf0;
  border-bottom: 0;
  overflow: scroll;
}
.tweet-content {
  margin-top: 12px;
  width: 100%;
}
.tweet-content-title {
  position: relative;
  height: 20px;
}
.user-name {
  font-size: 15px;
  font-weight: 700;
  margin-right: 5px;
}
.user-acount,
.tweet-create-time {
  margin-right: 3px;
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.dot {
  position: relative;
  top: 0px;
  color: #657786;
  font-size: 20px;
  margin-right: 3px;
}
.btn-exit {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  height: 20px;
  width: 20px;
  line-height: 20px;
  color: #657786;
  border: none;
  background: none;
  padding: 0;
}
p {
  width: 97%;
}
</style>