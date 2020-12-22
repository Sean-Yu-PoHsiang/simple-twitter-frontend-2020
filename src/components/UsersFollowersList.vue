<template>
  <div class="user-follows-list">
    <div v-if="followers.length === 0" class="warning-sign">沒有跟隨者</div>
    <div v-for="follower in followers" :key="follower.id" class="user">
      <img class="user-avator" :src="follower.avatar | emptyImage" alt="" />
      <div class="user-detail">
        <div class="user-and-follow-btn">
          <div class="user-info">
            <div class="user-name">{{ follower.name }}</div>

            <div class="user-at">@{{ follower.account }}</div>
          </div>

          <button
            type="submit"
            id="follow-btn"
            class="btn btn-primary follow-btn"
          >
            跟隨
          </button>
        </div>
        <div class="user-description">
          {{ follower.introduction }}
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { emptyImageFilter } from '../utils/mixins'

export default {
  components: {},
  props: {
    initialFollowers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      followers: this.initialFollowers
    }
  },
  watch: {
    initialFollowers(newValue) {
      this.followers = newValue
    }
  },
  mixins: [emptyImageFilter],
};
</script>

<style scoped>
/* 最外層div */
.user-follows-list {
  min-width: 300px;
  overflow: scroll;
  /* width: 600px; */
}

.warning-sign {
  text-align: center;
  line-height: 100px;
  color: #657786;
}

.user {
  display: flex;
  border-bottom: 1px solid #e6ecf0;
}
.user-detail {
  padding: 10px;
}
.user-and-follow-btn {
  display: flex;
  justify-content: space-between;
}

.user-avator {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px 0 0px 15px;
}
.user-name {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 20px;
  color: #1c1c1c;
}

.user-at {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: #657786;
}

.follow-btn {
  width: 62px;
  margin-right: 15px;
  background: transparent;
  width: 62px;
  height: 30px;
  outline: none;
  border: 1px solid #ff6600;
  border-radius: 100px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #ff6600;
}

.active {
  color: #ffffff;
  background: #ff6600;
}

.user-description {
  margin-top: 3px;
  padding-right: 15px;
}
</style>