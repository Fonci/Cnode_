<template>
  <div class="container">
    <div class="main">
      <!-- content -->
      <div class="content left">
        <!-- tab_group -->
        <div class="tab_group">
          <span
            :class="index==currentTab?'tab active':'tab'"
            v-for="(item,index) in tabs"
            :key="index"
            @click="clickTab(index)"
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
              <span class="topiclist_tab left">{{item.tab|getTab}}</span>
              <a href class="topiclist_title left" :title="item.title">{{item.title}}</a>
            </div>

            <div class="last_time right">1年前</div>
          </div>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next"
            :total="1240"
          ></el-pagination>
        </div>
      </div>

      <!-- sidebar -->
      <div class="sidebar right">sidebar</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      currentTab: 0,
      tabs: [
        {
          tab: "all",
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
      this.getData();
    });
  },
  methods: {
    //点击tab
    clickTab(i) {
      this.currentTab = i;
    },
    // 请求首页数据
    async getData() {
      const { data: res } = await this.$http.get("/topics", {
        params: {
          page: this.currentPage,
          limit: this.pageSize,
        },
      });
      console.log(res);
      if (res.success) {
        this.showData = res.data;
        console.log(this.showData);
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getData();
    },
  },
  filters: {
    getTab(tab) {
      return (tab = "share"
        ? "分享"
        : (tab = "ask" ? "问答" : (tab = "job" ? "招聘" : "精华")));
    },
  },
};
</script>
<style scoped>
.main {
  width: 80%;
  /* max-width: 1400px;
  min-width: 320px; */
  margin: 15px auto;
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
  margin-right: 5%;
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
.topiclist_tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-top: 8px;
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
  margin-left: 10px;
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
  width: 20%;
  font-size: 14px;
  margin-bottom: 20px;
  background: green;
  display: block;
}
.el-pagination {
  display: block;
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
}
</style>