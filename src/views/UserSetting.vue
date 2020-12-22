<template>
  <div class="container setting-page">
    <div class="row">
      <div class="col-auto left-container">
        <Navbar />
      </div>
      <div class="col user-setting-wrapper">
        <div class="title">帳戶設定</div>
        <form class="input-forms">
          <div class="input-container">
            <div class="input-account">帳號</div>
            <label class="form-label"></label>
            <input v-model="account" type="text" class="form-control" />
          </div>
          <div class="input-container">
            <div class="input-name">名稱</div>
            <label class="form-label"></label>
            <input v-model="name" type="text" class="form-control" />
          </div>
          <div class="input-container">
            <div class="input-email">email</div>
            <label for="inputEmail" class="form-label"></label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text"></div>
          </div>
          <div class="input-container">
            <div class="input-title">密碼</div>
            <label
              for="password"
              class="form-label"
              aria-placeholder="密碼"
            ></label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
            />
          </div>
          <div class="input-container">
            <div class="input-title">密碼確認</div>
            <label
              for="password-check"
              class="form-label"
              aria-placeholder="密碼確認"
            ></label>
            <input
              v-model="passwordCheck"
              type="password"
              class="form-control"
              id="password-check"
            />
          </div>
        </form>
        <div class="flex-end">
          <button type="submit" class="btn btn-submit" id="btn-submit">
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./../components/Navbar.vue";

const dummyData = {
  id: 2,
  name: "User1",
  email: "user1@example.com",
  account: "User1",
  cover: "https://loremflickr.com/598/200/landscape/?random=29",
  avatar: "https://loremflickr.com/140/140/people/?random=11",
  introduction:
    "Iusto animi qui et sapiente impedit animi molestiae provident. Enim ad aut vitae est inventore deserunt enim. Sint et corporis reprehenderit praesentium. Blanditiis molestias reprehenderit tenetur dolorem qui. Minus sit nihil ea deserunt enim ad error.",
  FollowingsCount: 4,
  FollowersCount: 0,
  isFollowed: false,
};

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    // eslint-disable-next-line
    fetchUser() {
      const { account, name, email } = dummyData;
      this.account = account;
      this.name = name;
      this.email = email;
      // this.password = dummyData.password;
      // 密碼核對好像要寫邏輯，但是不用送進後端資料中
      // TODO: 向後端驗證使用者登入資訊是否合法
      // console.log("this.data", this.data);
    },
    // handleSubmit(e){
    //表單提交時要put回去修改原始資料}
  },
};
</script>

<style scoped>
/* 版面調整 */
.setting-page {
  width: 100%;
  display: flex;
}

/* 表單區 */
.user-setting-wrapper {
  width: 100%;
  border-left: 1px solid #e6ecf0;
}

.col {
  padding: 0;
}

.title {
  padding: 15px;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 28px;
  color: #1c1c1c;
  border-bottom: 1px solid #e6ecf0;
}

.input-forms {
  width: 100%;
  max-width: 640px;
  padding: 0 15px;
}
/* 表單本身 */
.input-container {
  position: relative;
}

input {
  text-align: start;
  vertical-align: bottom;
  position: relative;
  height: 50px;
  border-style: none;
  background: #f5f8fa;
  border-radius: 4px;
  border-bottom: 2px solid #657786;
  padding-top: 30px;
}

.input-title {
  position: absolute;
  font-family: Noto Sans TC;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 15px;
  color: #657786;
  top: 28px;
  left: 12px;
  z-index: 2;
}
/* 按鈕 */

.btn-submit {
  height: 50px;
  background: #ff6600;
  border-radius: 50px;
  width: 122px;
  margin-top: 30px;
  border: 1px solid transparent;
  outline: none;
  color: #ffffff;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
}

.active {
  background: #ff6600;
  border-radius: 50px;
  width: 122px;
  margin-top: 30px;
  border: 1px solid transparent;
  outline: none;
}
</style>