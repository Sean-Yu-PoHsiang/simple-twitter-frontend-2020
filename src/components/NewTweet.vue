<template>
  <div class="container">
    <div class="title">首頁</div>
    <div class="user-area">
      <div class="avator-and-tweet">
        <img class="user-avator" :src="userProfile.avatar" alt="" />
        <form class="new-tweet" @submit.stop.prevent="handleSubmit">
          <label for="tweet-textarea" class="form-label"></label>
          <textarea
            v-model="description"
            class="form-control"
            id="tweet-textarea"
            rows="3"
            placeholder="有什麼新鮮事？"
          ></textarea>
          <div class="flex-end">
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

// const tweetSimple = {
//   description: "my post contents is here.",
//   createdTimestamp: 21531564847,
// };

const dummyCurrentUser = {
  id: 2,
  name: "User1",
  email: "user1@example.com",
  role: null,
};

export default {
  data() {
    return {
      avatar: "",
      currentUser: {},
      userProfile: {},
      id: -1,
      description: "",
      createdTimestamp: "",
    };
  },
  created() {
    this.currentUser = dummyCurrentUser;
    const userId = this.currentUser.id;
    console.log("userId", userId);
    this.fetchUserProfile(userId);
    console.log("Date.now", this.createdTimestamp);
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
      try {
        this.createdTimestamp = Date.now();
        const response = await userAPI.addUserNewTweet({
          description: this.description,
          createdTimestamp: this.createdTimestamp,
        });
        console.log("this.createdTimestamp", this.createdTimestamp);

        // console.log("response", response);

        if (response.status !== 200) {
          throw new Error(response);
        }

        this.$emit("after-create-tweet", {
          User: { avatar: this.userProfile.avatar },
          id: uuidv4(),
          description: this.description,
          createdTimestamp: this.createdTimestamp,
        });
        this.description = "";
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }

      // return userAPI.post("/tweets", {
      //   description,
      //   createdTimestamp,
      // });
    },
  },
};
</script>

<style scoped>
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
  height: 120px;
  resize: none;
  overflow-y: scroll;
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

.flex-end {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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