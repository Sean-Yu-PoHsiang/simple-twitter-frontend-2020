<template>
  <div class="user-follows-list">
    <div v-if="followers.length === 0" class="warning-sign">沒有跟隨者</div>
    <div v-for="follower in followers" :key="follower.id" class="user">
      <router-link :to="{ name: 'user', params: { userId: follower.id } }">
        <img
          class="user-avator"
          :src="follower.avatar || '' | emptyImage"
          alt=""
        />
      </router-link>
      <div class="user-detail">
        <div class="user-and-follow-btn">
          <div class="user-info">
            <div class="user-name">{{ follower.name }}</div>

            <div class="user-at">@{{ follower.account }}</div>
          </div>
          <div v-if="follower.id !== currentUser.id">
            <button
              v-if="!follower.isFollowed"
              type="submit"
              id="follow-btn"
              class="btn btn-primary follow-btn"
              @click="addFollowing(follower.id)"
            >
              跟隨
            </button>
            <button
              v-else
              type="submit"
              id="follow-btn"
              class="btn follow-btn active"
              @click="deleteFollowing(follower.id)"
            >
              正在跟隨
            </button>
          </div>
        </div>
        <div class="user-description">
          {{ follower.introduction || "-- no introduction --" | contentToLong }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { emptyImageFilter } from '../utils/mixins'
import { contentLengthFilter } from '../utils/mixins'
import userAPI from './../apis/user'
import { Toast } from './../utils/helpers'
import { mapState } from "vuex"

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
  computed: {
    ...mapState(["currentUser"])
  },
  watch: {
    initialFollowers(newValue) {
      this.followers = newValue
    }
  },
  methods: {
    async addFollowing(userId) {
      // console.log(userId)
      try {
        const { data } = await userAPI.addFollowing({ id: userId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.followers = this.followers.map(follower => {
          if (follower.id === userId) {
            return {
              ...follower,
              isFollowed: true
            }
          } else {
            return follower
          }
        })

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法跟隨，請稍後再試'
        })
        console.log('error', error)
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await userAPI.deleteFollowing({ userId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.followers = this.followers.map(follower => {
          if (follower.id === userId) {
            return {
              ...follower,
              isFollowed: false
            }
          } else {
            return follower
          }
        })

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取消跟隨，請稍後再試'
        })
        console.log('error', error)
      }
    }
  },
  mixins: [emptyImageFilter, contentLengthFilter],
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
  width: 100%;
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
  width: 92px;
}

.user-description {
  margin-top: 3px;
  padding-right: 15px;
}
</style>