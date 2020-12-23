<template>
  <div class="top-followers">
    <div class="title">跟隨誰</div>
    <div class="user-list">
      <div v-for="user in topUsers" :key="user.id" class="user">
        <div class="user-info">
          <img class="user-avator" :src="user.avatar" alt="" />
          <div class="user-detail">
            <div class="user-name">{{ user.name }}</div>
            <div class="at-user">@{{ user.account }}</div>
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
      <button class="show-more-btn">顯示更多</button>
    </div>
  </div>
</template>

<script>
import topUsersAPI from "./../apis/user";
import userAPI from "./../apis/user";

import { Toast } from "./../utils/helpers";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjA4NTQxODgzfQ.hjy_pdYF9fBEDsUz4V_YLQO60gWTY3sWcynQgwD2zwg";
localStorage.setItem("token", token);

export default {
  data() {
    return {
      topUsers: [],
    };
  },
  created() {
    this.fetchTopUsers();
  },
  methods: {
    async fetchTopUsers() {
      try {
        const { data } = await topUsersAPI.getTopFollowersUser();
        this.topUsers = data;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得追蹤用戶資料，請稍後再試",
        });
      }
    },
    async addFollowing(userId) {
      try {
        const { data } = await userAPI.addFollowing({ id: userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.topUsers = this.topUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: true,
            };
          } else {
            return user;
          }
        });
        console.log("this.topUsers:", this.topUsers);
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

        this.topUsers = this.topUsers.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: false,
            };
          } else {
            return user;
          }
        });
        console.log("this.topUsers:", this.topUsers);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消跟隨，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
};
</script>



<style scoped>
.top-followers {
  background: #f5f8fa;
  border-radius: 14px;
  width: 350px;
  margin-top: 15px;
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