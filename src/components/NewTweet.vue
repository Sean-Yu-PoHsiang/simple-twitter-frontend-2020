<template>
  <div class="main-user-container">
    <div class="title">首頁</div>
    <div class="user-area">
      <div class="avator-and-tweet">
        <img
          class="user-avator"
          src="https://img.ruten.com.tw/s1/3/53/81/21728707593089_916.jpg"
          alt=""
        />
        <form class="tweet-container">
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




<style scoped>
.main-user-container {
  width: 600px;
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
textarea {
  border: none;
  width: 445px;
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
  margin-bottom: 10px;
  margin-right: 5px;
}
</style>>