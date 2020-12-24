<template>
  <div class="container">
    <div v-for="reply in tweetReplies" :key="reply.id" class="replyer">
      <img class="replyer-avator" :src="reply.User.avatar" alt="" />
      <div class="reply-detail">
        <div class="replyer-info">
          <div class="replyer-name">{{ reply.User.name }}</div>
          <div>
            <span class="replyer-at"> @{{ reply.User.account }}</span>
            <span>・</span>
            <span class="reply-time">{{ reply.createdAt }}</span>
          </div>
        </div>
        <div>
          <span>回覆</span>
          <span class="reply-to-user-at">@{{ userTweet.User.account }}</span>
        </div>
        <div class="reply-text">Great~</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    tweetReplies: {
      type: Array,
      required: true,
    },
    userTweet: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
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
</style>