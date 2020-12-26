<template>
  <div class="following-list">
    <div v-if="followings.length === 0" class="warning-sign">
      沒有正在跟隨的人
    </div>
    <div v-for="following in followings" :key="following.id" class="user">
      <img
        class="user-avator"
        :src="following.avatar || '' | emptyImage"
        alt=""
      />
      <div class="user-detail">
        <div class="user-and-follow-btn">
          <div class="user-info">
            <div class="user-name">{{ following.name }}</div>

            <div class="user-at">@{{ following.account }}</div>
          </div>
          <div v-if="following.id !== currentUser.id">
            <button
              v-if="!following.isFollowed"
              type="submit"
              id="follow-btn"
              class="btn btn-primary follow-btn"
              @click="addFollowing(following.id)"
            >
              跟隨
            </button>
            <button
              v-else
              type="submit"
              id="follow-btn"
              class="btn follow-btn active"
              @click="deleteFollowing(following.id)"
            >
              正在跟隨
            </button>
          </div>
        </div>
        <div class="user-description">
          {{
            following.introduction || "-- no introduction --" | contentToLong
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { contentLengthFilter } from "../utils/mixins";
import userAPI from "./../apis/user";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex"

export default {
  components: {},
  props: {
    initialFollowings: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      followings: this.initialFollowings
    }
  },
  computed: {
    ...mapState(["currentUser"])
  },
  watch: {
    initialFollowings(newValue) {
      this.followings = newValue;
    },
  },
  methods: {
    async addFollowing(userId) {
      try {
        const { data } = await userAPI.addFollowing({ id: userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.followings = this.followings.map((following) => {
          if (following.id === userId) {
            return {
              ...following,
              isFollowed: true,
            };
          } else {
            return following;
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法跟隨，請稍後再試",
        });
        console.log("error", error);
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await userAPI.deleteFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.followings = this.followings.map((following) => {
          if (following.id === userId) {
            return {
              ...following,
              isFollowed: false,
            };
          } else {
            return following;
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消跟隨，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
  mixins: [emptyImageFilter, contentLengthFilter],
};
</script>

<style scoped>
.following-list {
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
  margin: 10px;
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
  content: "正在跟隨";
  color: #ffffff;
  background: #ff6600;
  width: 92px;
}

.user-description {
  margin-top: 3px;
  margin-right: 15px;
}
</style>