<template>
  <div class="container">
    <div class="row">
      <div class="col-auto">
        <AdminNav />
      </div>
      <div class="panel-right col">
        <h1 class="title">推文清單</h1>
        <div class="tweets-panel px-3">
          <div class="row">
            <div class="col-12">
              <div class="tweet-card d-flex">
                <img
                  class="user-avatar"
                  :src="picture | emptyImage"
                  alt="no pic"
                />
                <div class="tweet-content">
                  <div
                    class="tweet-content-title d-flex align-items-center mb-1"
                  >
                    <span class="user-name">John Doe</span>
                    <span class="user-acount">&#64;heyjohn</span>
                    <span class="dot fonSize30">&#8901;</span>
                    <span class="tweet-create-time">3小時</span>
                    <button class="btn-exit">&#10005;</button>
                  </div>
                  <p>
                    Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                    ullamco cillum dolor. Voluptate exercitation incididunt
                    aliquip deserunt reprehenderit elit laborum.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="tweet-card d-flex">
                <img
                  class="user-avatar"
                  :src="picture | emptyImage"
                  alt="no pic"
                />
                <div class="tweet-content">
                  <div
                    class="tweet-content-title d-flex align-items-center mb-1"
                  >
                    <span class="user-name">John Doe</span>
                    <span class="user-acount">&#64;heyjohn</span>
                    <span class="dot fonSize30">&#8901;</span>
                    <span class="tweet-create-time">3小時</span>
                    <button class="btn-exit">&#10005;</button>
                  </div>
                  <p>
                    Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                    ullamco cillum dolor. Voluptate exercitation incididunt
                    aliquip deserunt reprehenderit elit laborum.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="tweet-card d-flex">
                <img
                  class="user-avatar"
                  :src="picture | emptyImage"
                  alt="no pic"
                />
                <div class="tweet-content">
                  <div
                    class="tweet-content-title d-flex align-items-center mb-1"
                  >
                    <span class="user-name">John Doe</span>
                    <span class="user-acount">&#64;heyjohn</span>
                    <span class="dot fonSize30">&#8901;</span>
                    <span class="tweet-create-time">3小時</span>
                    <button class="btn-exit">&#10005;</button>
                  </div>
                  <p>
                    Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                    ullamco cillum dolor. Voluptate exercitation incididunt
                    aliquip deserunt reprehenderit elit laborum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from './../components/AdminNav'
import { emptyImageFilter } from '../utils/mixins'

export default {
  components: {
    AdminNav
  },
  mixins: [emptyImageFilter],
}
</script>

<style scoped>
.panel-right {
  height: 100vh;
}
.title {
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  color: #1c1c1c;
  font-size: 18px;
  font-weight: 700;
  line-height: 55px;
  padding-left: 25px;
  margin: 0;
}
.user-avatar {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin: 15px 15px 0 0;
}
.col-12 {
  border-bottom: 1px solid #e6ecf0;
  padding-bottom: 15px;
}
.tweet-card {
  position: relative;
  border-radius: 10px;
  width: 100%;
}
.panel-right {
  position: relative;
  height: 100vh;
}
.tweets-panel {
  position: absolute;
  top: 55px;
  bottom: 0px;
  left: 15px;
  right: 15px;
  border: 1px solid #e6ecf0;
  border-bottom: 0;
  overflow: scroll;
}
.tweet-content {
  margin-top: 12px;
}
.tweet-content-title {
  position: relative;
  height: 20px;
}
.user-name {
  font-size: 15px;
  font-weight: 700;
  margin-right: 5px;
}
.user-acount,
.tweet-create-time {
  margin-right: 3px;
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.dot {
  position: relative;
  top: 0px;
  color: #657786;
  font-size: 20px;
  margin-right: 3px;
}
.btn-exit {
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  height: 20px;
  width: 20px;
  line-height: 20px;
  color: #657786;
  border: none;
  background: none;
  padding: 0;
}
p {
  width: 97%;
}
</style>