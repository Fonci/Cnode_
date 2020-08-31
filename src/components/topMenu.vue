<template>
  <div class="topNav">
    <div class="main_box flex">
      <div class="top_left flex">
        <img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" alt />
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="searchValue"></el-input>
      </div>

      <div class="top_right flex">
        <span class="btns" v-for="btn in btns" :key="btn.id">{{btn.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      btns: [
        { name: "首页", id: 1 },
        { name: "新手入门", id: 2 },
        { name: "API", id: 3 },
        { name: "关于", id: 4 },
        { name: "注册", id: 5 },
        { name: "登录", id: 6 },
      ],
    };
  },
};
</script>

<style>
.topNav {
  margin-bottom: 0;
  z-index: 9;
  width: 100%;
  position: relative;
  background: #444;
  font-size: 13px;
}

.main_box {
  height: 100%;
  width: 80%;
  margin: 0 auto !important;
  /* border: 1px solid red; */
  justify-content: space-between;
  padding: 5px 0;
}

.flex {
  display: flex;
}

.top_left img {
  width: 160px;
  height: 40px;
  margin-right: 20px;
}
.el-input {
  line-height: 50px;
}
.el-input,
.el-input__inner {
  width: 233px;
  height: 26px;
  border-radius: 20px;
}
.el-input__inner {
  background: #888;
  border: #888;
}
.el-input__inner:hover,
.el-input__inner:focus {
  background: #fff;
  border: #fff;
}
.top_right {
  margin-top: 10px;
}
.btns {
  color: #ccc;
  line-height: 25px;
  cursor: pointer;
  margin-right: 15px;
}
.btns:hover {
  color: white;
}
@media screen and (max-width: 980px) {
  .flex {
    flex-wrap: wrap;
  }
  .top_right {
    margin-top: 20px;
  }
}
</style>