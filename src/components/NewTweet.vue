<template>
  <div class="container">
    <div class="title">首頁</div>
    <div class="user-area">
      <div class="avator-and-tweet">
        <router-link :to="{ name: 'user', params: { userId: currentUser.id } }">
          <img
            class="user-avator"
            :src="userProfile.avatar || 'https://i.imgur.com/S4PE66O.png'"
            alt=""
          />
        </router-link>
        <form
          class="new-tweet d-flex flex-column"
          @submit.stop.prevent="handleSubmit"
        >
          <label for="tweet-textarea" class="form-label"></label>
          <textarea
            v-model="description"
            class="form-control"
            id="tweet-textarea"
            rows="3"
            placeholder="有什麼新鮮事？"
          ></textarea>
          <div class="new-tweets-btn-box d-flex justify-content-end">
            <div v-if="description.length">
              <span
                class="contentAlert"
                :class="{ fontRed: isDescriptionOverSize }"
                >{{ description.length }}</span
              ><span class="contentAlert mr-3">/140</span>
            </div>
            <button type="submit" id="tweet-submit-btn" class="btn btn-primary">
              推文
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import userAPI from "./../apis/user";
import { Toast } from "./../utils/helpers";
import { v4 as uuidv4 } from "uuid";
import { mapState } from "vuex";

export default {
  data() {
    return {
      avatar: "",
      userProfile: {},
      id: -1,
      description: "",
      createdAt: "",
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
    isDescriptionOverSize() {
      return this.description.length > 140 ? true : false;
    },
  },
  created() {
    const userId = this.currentUser.id;
    this.fetchUserProfile(userId);
  },
  methods: {
    async fetchUserProfile(userId) {
      try {
        const response = await userAPI.getUserProfile({ userId });

        this.userProfile = {
          ...this.userProfile,
          ...response.data,
        };

        if (response.status !== 200) {
          throw new Error(response);
        }
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
    async handleSubmit() {
      if (this.description.trim() === "") {
        Toast.fire({
          icon: "error",
          title: "親愛的用戶，請勿發空空的思念。",
        });
        return;
      } else if (this.description.length > 140) {
        Toast.fire({
          icon: "error",
          title: "推文字數超過140囉！",
        });
        return;
      }

      try {
        this.createdAt = Date.now();
        const response = await userAPI.addUserNewTweet({
          description: this.description,
          createdAt: this.createdAt,
        });

        if (response.status !== 200) {
          throw new Error(response);
        }

        this.$emit("after-create-tweet", {
          User: {
            id: this.userProfile.id,
            account: this.userProfile.account,
            name: this.userProfile.name,
            avatar: this.userProfile.avatar,
          },
          id: uuidv4(),
          name: this.userProfile.name,
          description: this.description,
          createdAt: this.createdAt,
          repliesCount: 0,
          likesCount: 0,
          isLiked: false,
        });
        this.description = "";
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
textarea::placeholder {
  font-size: 15px;
  padding: 0;
}
.fontRed {
  color: red;
}
.contentAlert {
  line-height: 60px;
}
.container {
  padding: 0;
  /* width: 600px; */
  border: 1px solid #e6ecf0;
  border-bottom: 10px solid #e6ecf0;
}

.title {
  border-bottom: 1px solid #e6ecf0;
  padding: 15px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 26px;
  color: #1c1c1c;
}
.avator-and-tweet {
  display: flex;
}
.user-area {
  display: flex;
  flex-direction: column;
}
.user-avator {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
}

.form-label {
  position: absolute;
  z-index: -2;
}
/* tweet input */
.new-tweet {
  width: 100%;
}
textarea {
  border: none;
  height: 80px;
  resize: none;
  overflow-y: scroll;
  padding: 12px 16px 12px 0;
}
textarea:focus {
  box-shadow: 0 0 0 0.2rem transparent;
}

::placeholder {
  padding-top: 10px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  color: #9197a3;
}

.new-tweets-btn-box {
  padding: 0;
}

#tweet-submit-btn {
  border: 1px solid transparent;
  outline: none;
  width: 64px;
  height: 40px;
  left: 899px;
  top: 123px;
  background: #ff6600;
  border-radius: 100px;
  margin: 10px;
}
</style>>