<template>
  <div class="container">
    <div class="title">首頁</div>
    <div class="user-area">
      <div class="avator-and-tweet">
        <img
          class="user-avator"
          src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
          alt=""
        />
        <form class="new-tweet">
          <label for="tweet-textarea" class="form-label"></label>
          <textarea
            class="form-control"
            id="tweet-textarea"
            rows="3"
            placeholder="有什麼新鮮事？"
          ></textarea>
        </form>
        <div class="flex-end">
          <button type="submit" id="tweet-submit-btn" class="btn btn-primary">
            推文
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import userAPI from "./../apis/user";
import { Toast } from "./../utils/helpers";

const dummyCurrentUser = {
  id: 2,
  name: "User1",
  email: "user1@example.com",
  role: null,
};

export default {
  data() {
    return {
      currentUser: {},
      userProfile: {},
    };
  },
  created() {
    const { userId: userId } = this.$route.params;
    this.currentUser = dummyCurrentUser;
    this.fetchUserProfile(userId);
  },
  methods: {
    async fetchUserProfile(userId) {
      try {
        const { data } = await userAPI.getUserProfile({ userId });
        this.userProfile = data;
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