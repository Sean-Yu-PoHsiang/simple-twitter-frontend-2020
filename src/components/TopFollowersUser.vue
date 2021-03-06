<template>
  <div v-show="isShow" class="top-followers">
    <div class="title">跟隨誰</div>
    <div class="user-list list-scroll">
      <div v-for="user in topUsers" :key="user.id" class="user">
        <div class="user-info">
          <router-link :to="{ name: 'user', params: { userId: user.id } }">
            <img
              class="user-avator"
              :src="user.avatar || 'https://i.imgur.com/S4PE66O.png'"
              alt=""
            />
          </router-link>
          <div class="user-detail">
            <router-link :to="{ name: 'user', params: { userId: user.id } }">
              <div class="user-name">{{ user.name }}</div>
            </router-link>
            <router-link :to="{ name: 'user', params: { userId: user.id } }">
              <div class="at-user">@{{ user.account }}</div>
            </router-link>
          </div>
        </div>
        <button
          v-if="user.isFollowed"
          type="submit"
          id="btn-is-following"
          class="btn follow-btn"
          @click="deleteFollowing(user.id)"
        >
          正在跟隨
        </button>
        <button
          @click.stop.prevent="addFollowing(user.id)"
          v-else
          type="submit"
          id="btn-not-following"
          class="btn follow-btn"
        >
          跟隨
        </button>
      </div>
    </div>
    <button
      v-show="topUsers.length === 4"
      @click="fetchMoreTopUsers"
      class="show-more-btn"
    >
      顯示更多
    </button>
  </div>
</template>

<script>
import topUsersAPI from "./../apis/user"
import userAPI from "./../apis/user"
import { Toast } from "./../utils/helpers"
import { mapState } from "vuex"

export default {
  props: {},
  data() {
    return {
      topUsers: [],
    }
  },
  created() {
    this.fetchTopUsers()
  },
  destroyed() {
    // console.log('>>>>>>topUser component destroyed')
  },
  computed: {
    isShow() {
      const nonShowingPage = ['/setting', '/public-chatroom','/private-chatroom']
      return !nonShowingPage.includes(this.$route.path)
    },
    ...mapState(["currentUser"])
  },
  methods: {
    async fetchTopUsers() {
      try {
        const response = await topUsersAPI.getTopFollowersUser(0, 4)
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }
        this.topUsers = response.data

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法取得推薦用戶資料，請稍後再試",
        })
      }
    },
    async fetchMoreTopUsers() {
      try {
        const response = await topUsersAPI.getTopFollowersUser(this.topUsers.length, 4)
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }
        this.topUsers = this.topUsers.concat(response.data)

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法增加推薦用戶資料，請稍後再試",
        })
      }
    },
    async addFollowing(userId) {
      try {
        const { data } = await userAPI.addFollowing({ id: userId })

        if (data.status !== "success") {
          throw new Error(data.message)
        }

        this.topUsers = this.topUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: true,
            }
          } else {
            return user
          }
        })

        if (Number(this.$route.params.userId) !== this.currentUser.id) {
          return
        } else {
          this.$emit("after-click-add-following", {
            userId: userId
          })
        }

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法跟隨，請稍後再試",
        })
        console.log("error", error)
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await userAPI.deleteFollowing({ userId })

        if (data.status !== "success") {
          throw new Error(data.message)
        }

        this.topUsers = this.topUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: false,
            }
          } else {
            return user
          }
        })

        if (Number(this.$route.params.userId) !== this.currentUser.id) {
          return
        } else {
          this.$emit("after-click-delete-following", {
            userId: userId
          })

        }

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消跟隨，請稍後再試",
        })
        console.log("error", error)
      }
    },
  },
}
</script>

<style scoped>
.top-followers {
  background: #f5f8fa;
  border-radius: 14px;
  width: 320px;
  margin-top: 15px;
}
.list-scroll {
  max-height: 83vh;
  overflow: scroll;
}
.title {
  padding: 10px 15px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #1c1c1c;
}
.user-avator {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
  margin-left: 15px;
}
.user,
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
}
.user {
  justify-content: space-between;
  border-top: 1px solid #e6ecf0;
}
.user-name {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #1c1c1c;
}
.at-user {
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  color: #657786;
}
.follow-btn {
  margin-right: 15px;
  background: transparent;
  width: 62px;
  height: 30px;
  border: 1px solid transparent;
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
#btn-is-following {
  width: auto;
  color: #ffffff;
  background: #ff6600;
}
.show-more-btn {
  margin: 10px 15px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #ff6600;
  border: 1px solid transparent;
  outline: none;
  background-color: transparent;
}
</style>