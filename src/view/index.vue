<template>
  <div class="container">
    <div class="main">
      <!-- content -->
      <div class="content left">
        <!-- tab_group -->
        <div class="tab_group">
          <span
            :class="index==currentTabIndex?'tab active':'tab'"
            v-for="(item,index) in tabs"
            :key="index"
            @click="clickTab(index,item.tab)"
          >{{item.name}}</span>
        </div>
        <!-- inner -->
        <div class="inner">
          <div class="cell" v-for="item in showData" :key="item.id">
            <div class="left" style="width:80%;">
              <div class="avatar_box left">
                <img :src="item.author.avatar_url" />
              </div>
              <span class="count left">
                <span class="count_of_replies">{{item.reply_count}}</span>
                <span class="count_seperator">/</span>
                <span class="count_of_visits">{{item.visit_count}}</span>
              </span>
              <div
                style="display:flex;"
                :class="item.tab==currentTab||item.top||(item.good&&currentTab=='good')?'tabBox':''"
              >
                <span class="topiclist_tab left" v-if="item.top">置顶</span>
                <span class="topiclist_tab left" v-else-if="item.good">精华</span>
                <span class="topiclist_tab left" v-else>{{item.tab|getTab}}</span>
                <a
                  href="javascript:;"
                  class="topiclist_title left"
                  :title="item.title"
                  @click="goDetail(item.id)"
                >{{item.title}}</a>
              </div>
            </div>
            <div class="last_time right">{{item.last_reply_at|getTime}}</div>
          </div>
          <!-- 分页 -->
          <el-pagination
            style="margin:15px 0;text-align:left;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="1240"
          ></el-pagination>
        </div>
      </div>
      <!-- sidebar -->
      <div class="sidebar right">
        <div class="login_box inner">
          <p>CNode：Node.js专业中文社区</p>
          <div>
            您可以
            <a href style="color:#778087;">登录</a>或
            <a href style="color:#778087;">注册</a>也可以
            <a href>
              <span class="login_info">通过GitHub登录</span>
            </a>
          </div>
        </div>
        <div class="inner">
          <a href v-for="(i,index) in 3" :key="index">
            <img src="//static.cnodejs.org/FlajCCXkxZaOsuWp3k0iaiqfrJaS" alt />
            <div :style="{'height':index==2?'0':'10px'}"></div>
          </a>
        </div>
        <div class="box">
          <div class="title">无人回复的话题</div>
          <ul class="inner">
            <li v-for="(item,index) in 5" :key="index">TNFE-Weekly[第七十周已更新]</li>
          </ul>
        </div>
        <div class="box">
          <div class="title">
            积分榜
            <a href>TOP 100 >></a>
          </div>
          <ul class="inner">
            <li v-for="(item,index) in 10" :key="index">TNFE-Weekly[第七十周已更新]</li>
          </ul>
        </div>
        <div class="box">
          <div class="title">友情社区</div>
          <ul class="inner">
            <li>
              <a href>
                <img
                  style="width:150px;"
                  src="//static2.cnodejs.org/public/images/ruby-china-20150529.png"
                  alt
                />
              </a>
            </li>
            <div style="height:10px;"></div>
            <li>
              <a href>
                <img
                  style="width:150px;"
                  src="//static2.cnodejs.org/public/images/phphub-logo.png"
                  alt
                />
              </a>
            </li>
          </ul>
        </div>
        <!-- <div class="box">
          <div class="title">客户端二维码</div>
          <img src="" alt="">
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      currentTabIndex: 0,
      currentTab: "",
      tabs: [
        {
          tab: "",
          name: "全部",
        },
        {
          tab: "good",
          name: "精华",
        },
        {
          tab: "share",
          name: "分享",
        },
        {
          tab: "ask",
          name: "问答",
        },
        {
          tab: "job",
          name: "招聘",
        },
      ],
      currentPage: 1,
      pageSize: 20,
      showData: [],
    };
  },
  created() {
    this.$nextTick(() => {
      this.getData("");
    });
  },
  methods: {
    //点击tab
    clickTab(i, tab) {
      this.currentTab = tab;
      this.currentTabIndex = i;
      this.currentPage = 1;
      this.getData(tab);
    },
    // 请求首页数据
    async getData(tab) {
      const { data: res } = await this.$http.get("/topics", {
        params: {
          page: this.currentPage,
          limit: this.pageSize,
          tab: tab,
        },
      });
      // console.log(res);
      if (res.success) {
        this.showData = res.data;
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    // 点击标题进入详情页
    goDetail(id) {
      this.$router.push({
        name: "detail",
        path: "/topic/" + id,
        params: { id: id },
      });
    },
  },
  filters: {
    //   tab 格式化
    getTab(tab) {
      if (tab == "share") {
        return (tab = "分享");
      } else if (tab == "ask") {
        return (tab = "问答");
      } else if (tab == "job") {
        return (tab = "招聘");
      } else if (tab == "good") {
        return (tab = "精华");
      }
    },
    // time 格式化
    getTime(value) {
      var time = new Date() - new Date(value);
      var years = Math.floor(time / 1000 / 60 / 60 / 24 / 30 / 12); //年
      var month = Math.floor(time / 1000 / 60 / 60 / 24 / 30); //月
      var days = Math.floor(time / 1000 / 60 / 60 / 24 + 1); //日
      var hours = Math.floor(time / 1000 / 60 / 60); //时
      var minutes = Math.floor(time / 1000 / 60); //分
      var seconds = Math.floor(time / 1000); //秒
      if (years >= 1) {
        return (value = years + "年前");
      } else if (month >= 1) {
        return (value = month + "个月前");
      } else if (days >= 1) {
        return (value = days + "天前");
      } else if (hours >= 1) {
        return (value = hours + "小时前");
      } else if (minutes >= 1) {
        return (value = minutes + "分钟前");
      } else {
        return (value = seconds + "秒前");
      }
    },
  },
};
</script>
<style scoped>
.main {
  width: 80%;
  /* max-width: 1400px;
  min-width: 320px; */
  margin: 0 auto;
  padding: 15px 0;
  min-height: 400px;
  /* border: 1px solid red; */
  overflow: hidden;
}
.left {
  float: left;
}
.right {
  float: right;
}
/* content */
.content {
  width: 75%;
  padding: 0;
  margin-right: 1%;
  background-color: #fff;
  /* border: 1px solid red; */
}
.tab_group {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;
  text-align: left;
}
.tab {
  font-size: 14px;
  margin: 0 10px;
  color: #80bd01;
  cursor: pointer;
}
.active {
  background-color: #80bd01;
  color: #fff;
  padding: 3px 4px;
  border-radius: 3px;
}
.inner {
  border-radius: 0 0 3px 3px;
  padding: 0;
  background-color: #fff;
}
.cell {
  position: relative;
  padding: 10px 0 10px 10px;
  font-size: 14px;
  border-top: 1px solid #f0f0f0;
  padding-right: 10px;
  background: #fff;
  overflow: hidden;
}
.cell:nth-child(1) {
  border-top: none;
}
.avatar_box {
  width: 30px;
  height: 30px;
  display: inline-block;
}
img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
.cell .count {
  width: 70px;
  display: inline-block;
  text-align: center;
  margin-top: 8px;
}
.count_of_replies {
  color: #9e78c0;
}
.count_seperator {
  margin: 0 -3px;
  font-size: 10px;
}
.count_of_visits {
  font-size: 10px;
  color: #b4b4b4;
}
.tabBox .topiclist_tab {
  background: #80bd01;
  color: white;
}
.topiclist_tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin: 8px 10px 0 10px;
}
a.topiclist_title {
  color: #333;
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  text-align: left;
  font-size: 16px;
  line-height: 30px;
  /* border: 1px solid green; */
}
a.topiclist_title:hover {
  text-decoration: underline;
}
a.topiclist_title:visited {
  color: #888;
}
.last_time {
  /* width: 15%; */
  display: inline-block;
  text-align: center;
  color: #778087;
}
/* sidebar */
.sidebar {
  width: 24%;
  font-size: 14px;
  margin-bottom: 20px;
  /* background: green; */
  display: block;
}
.login_box {
  text-align: left;
}
.inner {
  padding: 10px;
  border-radius: 0 0 3px 3px;
  background-color: #fff;
  margin-bottom: 13px;
}
.login_info {
  display: inline-block;
  padding: 3px 10px;
  margin: 0;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  letter-spacing: 2px;
  box-shadow: none;
  border-radius: 3px;
  line-height: 2em;
  vertical-align: middle;
  color: #fff;
  background-color: #5bc0de;
}
.el-pagination {
  display: block;
}
p {
  margin: 0 0 10px;
}
.sidebar .box {
  text-align: left;
}
.sidebar .title {
  color: #51585c;
  border-radius: 3px 3px 0 0;
  padding: 10px;
  background-color: #f6f6f6;
}
.inner li {
  max-width: 270px;
  font-size: 14px;
  line-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #778087;
}
@media screen and (min-width: 320px) and (max-width: 980px) {
  .main {
    width: 100%;
  }
  .content {
    width: 100%;
  }
  .sidebar {
    display: none;
  }
  .el-pagination {
    display: none;
  }
  .cell .count {
    text-align: left;
    width: 70px;
    /* border: 1px solid red; */
    position: absolute;
    top: 26px;
    left: 90px;
  }
}
</style>