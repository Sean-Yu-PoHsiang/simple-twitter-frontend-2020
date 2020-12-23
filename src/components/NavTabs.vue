<template>
  <ul class="nav justify-content">
    <li class="nav-item">
      <router-link
        class="nav-link"
        :to="{ name: 'user-followers', params: { userId: userId } }"
        >跟隨者</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link"
        :to="{ name: 'user-followings', params: { userId: userId } }"
        >正在跟隨</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    initialUserId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      userId: this.initialUserId
    }
  },
  watch: {
    initialUserId(newValue) {
      console.log(newValue)
      this.userId = newValue
    }
  }
}
</script>

<style scoped>
.nav-link {
  margin-top: 10px;
  color: #657786;
  width: 130px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  color: #657786;
}

.active {
  color: #ff6600;
  border-bottom: 2px solid #ff6600;
}
</style>