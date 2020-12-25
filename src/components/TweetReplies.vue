<template>
  <div class="replies-box">
    <div v-for="reply in tweetReplies" :key="reply.id" class="replyer">
      <router-link :to="{ name: 'user', params: { userId: reply.User.id } }">
        <img class="replyer-avator" :src="reply.User.avatar" alt="" />
      </router-link>
      <div class="reply-detail">
        <div class="replyer-info">
          <router-link
            :to="{ name: 'user', params: { userId: reply.User.id } }"
          >
            <div class="replyer-name">{{ reply.User.name }}</div>
          </router-link>
          <div class="at-detail">
            <span class="replyer-at"> @{{ reply.User.account }}</span>
            <span>・</span>
            <span class="reply-time">{{ reply.createdAt | fromNow }}</span>
          </div>
        </div>
        <div>
          <span class="reply">回覆</span>
          <span class="reply-to-user-at">@{{ userTweet.User.account }}</span>
        </div>
        <div class="reply-text">{{ reply.comment }}</div>
      </div>
    </div>
  </div>
</template>


<script>
import moment from "moment";

export default {
  props: {
    initialTweetReplies: {
      type: Array,
      required: true,
    },
    initialUserTweet: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tweetReplies: this.initialTweetReplies,
      userTweet: this.initialUserTweet,
    };
  },
  watch: {
    initialTweetReplies(newValue) {
      this.tweetReplies = newValue;
    },
    initialUserTweet(newValue) {
      this.userTweet = newValue;
    },
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
.replies-box {
  width: 100%;
  border-right: 1px solid #e6ecf0;
  border-left: 1px solid #e6ecf0;
}
.replyer-avator {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.replyer-info {
  display: flex;
}

.reply-detail {
  display: flex;
  flex-direction: column;
}

.replyer {
  padding: 15px;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #e6ecf0;
}

.replyer-name {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  color: #1c1c1c;
}

.at-detail {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}

.reply,
.reply-to-user-at {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  color: #657786;
}
.reply-to-user-at {
  color: #ff6600;
}
.reply-text {
  color: #1c1c1c;
}
</style>