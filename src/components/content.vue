<template>
  <div class="content">
    <!-- 类别 -->
    <div class="artical"></div>
    <!-- 文章 -->
    <ul>
      <li v-for="(item,index) in articalData" :key="index">
        <a href style="font-size:12px;text-decoration:none;color:#778087">
          <img
            class="avatar"
            :src="item.author.avatar_url"
            :alt="item.author.loginname"
            :title="item.author.loginname"
          />
        </a>
        <span style="margin:0 3px;font-size:10px;">{{item.reply_count}}/{{item.visit_count}}</span>
        <span class="cata">{{item.tab|getTab}}</span>
        <a href="javascript:;">
          <span class="title" @click="goDetail(item.id)">{{item.title}}</span>
        </a>
      </li>
    </ul>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,15,20]"
      :page-size="100"
      layout=" sizes, prev, pager, next"
      :total="400"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 接收的全部数据
      articalData: [],
      currentPage: 1,
      pageSize: 10,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //   获取所有数据
    getData() {
      this.$http
        .get("/topics", {
          params: {
            page: this.currentPage,
            limit: this.pageSize,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.articalData = res.data.data;
            console.log(res);
          }
        });
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
    goDetail(id) {
      this.$router.push({
        name: "detail",
        path: "/topic/" + id,
        params: { id: id },
      });
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

<style>
.content {
  width: 60%;
  margin-top: 20px;
  margin-left: 200px;
  background-color: #fff;
}
.artical {
  width: 100%;
  height: 40px;
  background-color: #ddd;
}
li {
  display: flex;
  align-items: center;
  padding: 5px;
  border-top: 1px solid #f0f0f0;
}
.avatar {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.cata {
  display: inline-block;
  background-color: #80bd01;
  padding: 2px 4px;
  color: white;
  border-radius: 3px;
  font-size: 12px;
}
.title {
  display: inline-block;
  width: 70%;
  margin-left: 5px;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>