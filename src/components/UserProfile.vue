<template>
  <div>
    <div class="title-box d-flex">
      <button type="button" class="btn btn-link" @click="$router.back()">
        <ArrowIcon />
      </button>
      <div class="title-content d-flex flex-column justify-content-center ml-4">
        <span class="user-name">John Doe</span>
        <span class="tweets-count">25推文</span>
      </div>
    </div>

    <div class="user-card d-flex flex-column">
      <img
        class="user-cover"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Classic_view_of_a_cloudfree_Peyto_Lake%2C_Banff_National_Park%2C_Alberta%2C_Canada_%284110933448%29.jpg/240px-Classic_view_of_a_cloudfree_Peyto_Lake%2C_Banff_National_Park%2C_Alberta%2C_Canada_%284110933448%29.jpg"
        alt="no pic"
      />
      <img class="user-avatar" :src="picture | emptyImage" alt="no pic" />
      <div class="control-panel d-flex justify-content-end px-2 pt-2">
        <button class="btn btn-shallow">編輯個人資料</button>
        <button class="btn"><IconMessage /></button>
        <button class="btn"><IconRing /></button>
        <button class="btn"><IconRingActive /></button>

        <button class="btn btn-shallow">跟隨</button>
        <button class="btn btn-solid">正在跟隨</button>
      </div>
      <div class="user-content d-flex flex-column p-3">
        <span class="user-name">John Doe</span>
        <span class="user-acount">&#64;heyjohn</span>
        <p class="user-description">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint.
        </p>
        <div>
          <router-link to="/" class="user-follow following">34個</router-link>
          <router-link to="/" class="user-follow follower ml-2"
            >59位</router-link
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

export default {
  components: {
    ArrowIcon,
    IconMessage,
    IconRing,
    IconRingActive

  },
  mixins: [emptyImageFilter],
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