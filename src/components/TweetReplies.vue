<template>
  <div class="reply-list">
    <div class="replyer">
      <img
        class="replyer-avator"
        src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
        alt=""
      />
      <div class="reply-detail">
        <div class="replyer-info">
          <div class="replyer-name">Mary Jane</div>
          <div>
            <span class="replyer-at">@mjjane</span>
            <span>・</span>
            <span class="reply-time">3 小時</span>
          </div>
        </div>
        <div>
          <span>回覆</span> <span class="reply-to-user-at">@apple</span>
        </div>
        <div class="reply-text">Great~</div>
      </div>
    </div>
    <div class="replyer">
      <img
        class="replyer-avator"
        src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
        alt=""
      />
      <div class="reply-detail">
        <div class="replyer-info">
          <div class="replyer-name">Mary Jane</div>
          <div>
            <span class="replyer-at">@mjjane</span>
            <span>・</span>
            <span class="reply-time">3 小時</span>
          </div>
        </div>
        <div>
          <span>回覆</span> <span class="reply-to-user-at">@apple</span>
        </div>
        <div class="reply-text">Great~</div>
      </div>
    </div>
    <div class="replyer">
      <img
        class="replyer-avator"
        src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
        alt=""
      />
      <div class="reply-detail">
        <div class="replyer-info">
          <div class="replyer-name">Mary Jane</div>
          <div>
            <span class="replyer-at">@mjjane</span>
            <span>・</span>
            <span class="reply-time">3 小時</span>
          </div>
        </div>
        <div>
          <span>回覆</span> <span class="reply-to-user-at">@apple</span>
        </div>
        <div class="reply-text">Great~</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
};
</script>

<style scoped>
.reply-list {
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