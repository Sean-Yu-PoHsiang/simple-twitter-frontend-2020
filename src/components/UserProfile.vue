<template>
  <div>
    <div class="title-box d-flex">
      <button type="button" class="btn btn-link" @click="$router.push('/')">
        <ArrowIcon />
      </button>
      <div class="title-content d-flex flex-column justify-content-center ml-4">
        <span class="user-name">{{ userProfile.name }}</span>
        <span class="tweets-count">25推文???</span>
      </div>
    </div>

    <div class="user-card d-flex flex-column">
      <img
        class="user-cover"
        :src="userProfile.cover | emptyCover"
        alt="no pic"
      />
      <img
        class="user-avatar"
        :src="userProfile.avatar | emptyImage"
        alt="no pic"
      />
      <div class="control-panel d-flex justify-content-end px-2 pt-2">
        <button
          v-if="userProfile.id === currentUser.id"
          class="btn btn-shallow"
        >
          編輯個人資料
        </button>
        <button v-if="userProfile.id !== currentUser.id" class="btn">
          <IconMessage />
        </button>
        <button v-if="userProfile.id !== currentUser.id" class="btn">
          <IconRing />
        </button>
        <button v-if="false" class="btn"><IconRingActive /></button>

        <button
          v-if="userProfile.id !== currentUser.id && !userProfile.isFollowed"
          class="btn btn-shallow"
        >
          跟隨
        </button>
        <button
          v-if="userProfile.id !== currentUser.id && userProfile.isFollowed"
          class="btn btn-solid"
        >
          正在跟隨
        </button>
      </div>
      <div class="user-content d-flex flex-column p-3">
        <span class="user-name">{{ userProfile.name }}</span>
        <span class="user-acount">&#64;{{ userProfile.account }}</span>
        <p class="user-description">
          {{ userProfile.introduction }}
        </p>
        <div>
          <router-link to="/" class="user-follow following"
            >{{ userProfile.FollowingsCount }}個</router-link
          >
          <router-link to="/" class="user-follow follower ml-2"
            >{{ userProfile.FollowersCount }}位</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowIcon from './../components/ArrowIcon'
import IconMessage from './../components/IconMessage'
import IconRing from './../components/IconRing'
import IconRingActive from './../components/IconRingActive'

import { emptyImageFilter } from '../utils/mixins'
import { emptyCoverFilter } from '../utils/mixins'

const dummyCurrentUser = {
  "id": 2,
  "name": "User1",
  "email": "user1@example.com",
  "role": null
}

export default {
  components: {
    ArrowIcon,
    IconMessage,
    IconRing,
    IconRingActive

  },
  props: {
    userProfile: {
      type: Object,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    },
  },
  mixins: [emptyImageFilter, emptyCoverFilter],
  data() {
    return {
      isCurrentUser: true,
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 0;
  margin: 0 5px;
}
.btn-shallow {
  border: 1px solid #ff6600;
  border-radius: 20px;
  height: 40px;
  padding: 0 16px;
  color: #ff6600;
  font-size: 15px;
  font-weight: 700;
}
.btn-solid {
  border: 1px solid #ff6600;
  border-radius: 20px;
  height: 40px;
  padding: 0 16px;
  color: white;
  background: #ff6600;
  font-size: 15px;
  font-weight: 700;
}
.title-box {
  height: 55px;
  border-right: 1px solid #e6ecf0;
  border-left: 1px solid #e6ecf0;
}
.user-name {
  font-size: 19px;
  font-weight: 900;
  color: #1c1c1c;
}
.tweets-count {
  font-size: 13px;
  font-weight: 500;
  color: #657786;
}

.user-avatar {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
  position: absolute;
  top: 192px;
  left: 85px;
  transform: translate(-50%, -50%);
}
.user-cover {
  height: 200px;
  width: 100%;
  object-fit: cover;
}
.user-card {
  position: relative;
  border: 1px solid #e6ecf0;
  border-bottom: 0;
  width: 100%;
  /* height: 450px; */
}
/* .user-content {
  margin-top: 70px;
} */
.user-acount {
  font-size: 13px;
  font-weight: 500;
  color: #657786;
}
.user-description {
  font-size: 14px;
  font-weight: 400;
  color: black;
}
.user-like {
  font-size: 15px;
  font-weight: 500;
}
.user-follow {
  font-size: 14px;
  font-weight: 500;
}
.following:after {
  content: "跟隨中";
  color: #657786;
}
.follower::after {
  content: "跟隨者";
  color: #657786;
}
</style>