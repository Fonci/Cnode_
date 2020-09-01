<template>
  <div class="container">
    <div class="main">
      <!-- left -->
      <div class="content left">
        <div class="mainContent">
          <div class="head">
            <h2>{{detailData.title}}</h2>
            <p
              class="article_info"
            >• 发布于 {{detailData.create_at|getTime}} • 作者 {{detailData.author.loginname}} • {{detailData.visit_count}}次浏览 • 来自 {{detailData.tab=='share'?'分享':detailData.tab=='ask'?'问答':detailData.tab=='good'?'精华':detailData.tab=='job'?'招聘':''}}</p>
          </div>
          <article v-html="detailData.content"></article>
        </div>
        <!-- reply_box -->
        <div class="reply_box">
          <div class="title">{{detailData.reply_count}}回复</div>
          <ul>
            <li class="reply_list" v-for="(item,index) in replyData" :key="index">
              <img :src="item.author.avatar_url" alt />
              <div>
                <p style="font-size:12px;">
                  <span style="color: #666;font-weight: 700;">{{item.author.loginname}}</span>
                  <span style="color: #08c;">{{index+1}}楼 • {{item.create_at|getTime}}</span>
                </p>
                <p style="font-size:14px;" v-html="item.content"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- right -->
      <div class="sidebar right">
        <div class="box">
          <div class="title">作者</div>
          <div style="padding:8px;">
            <img class="avatar" :src="detailData.author.avatar_url" alt />
            <span class="username">{{detailData.author.loginname}}</span>
            <div style="margin:8px 0;">积分：000</div>
            <div>“这家伙很懒，什么个性签名都没有留下。”</div>
          </div>
        </div>
        <div class="inner">
          <a href v-for="(i,index) in 3" :key="index">
            <img src="//static.cnodejs.org/FlajCCXkxZaOsuWp3k0iaiqfrJaS" alt />
            <div :style="{'height':index==2?'0':'10px'}"></div>
          </a>
        </div>
        <div class="box">
          <div class="title">
            作者其他话题
            <a href>TOP 100 >></a>
          </div>
          <ul class="inner">
            <li v-for="(item,index) in 5" :key="index">TNFE-Weekly[第七十周已更新]</li>
          </ul>
        </div>
        <div class="box">
          <div class="title">无人回复的话题</div>
          <ul class="inner">
            <li v-for="(item,index) in 5" :key="index">TNFE-Weekly[第七十周已更新]</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detailId: "",
      detailData: {
        author: {
          loginname: "",
          avatar_url: "",
        },
      },
      replyData: [],
    };
  },
  created() {
    this.$nextTick(() => {
      this.detailId = this.$route.params.id;
      this.getData(this.detailId);
    });
  },
  methods: {
    getData(id) {
      this.$http.get("/topic/" + id).then((res) => {
        if (res.status == 200) {
          console.log(res.data.data)
          this.detailData = res.data.data;
          this.replyData = res.data.data.replies;
        }
      });
    },
  },
  filters: {
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

<style>
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
img {
  width: 100%;
  height: 100%;
  vertical-align: bottom;
}
/* content */
.content {
  width: 75%;
  padding: 0;
  margin-right: 1%;

  /* border: 1px solid red; */
}
.mainContent,
.reply_box {
  background-color: #fff;
  /* width: 100%; */
  text-align: left;
  padding: 1% 1%;
}
.reply_box {
  margin-top: 15px;
  padding: 0;
}
.reply_box .title {
  color: #51585c;
  border-radius: 3px 3px 0 0;
  padding: 10px;
  background-color: #f6f6f6;
}
.reply_list {
  padding: 8px 10px 15px 10px;
  border-bottom: 1px solid #eee;
  display: flex;
}
.reply_list img {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}
.head {
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}
.article_info {
  font-size: 12px;
  color: #838383;
  margin-top: 10px;
}
.markdown-text a {
  color: #08c;
}
.markdown-text li {
  margin-bottom: 8px;
  list-style: disc;
}
.markdown-text h2 {
  font-size: 26px;
  margin: 30px 0 15px;
  border-bottom: 1px solid #eee;
}
.markdown-text strong {
  font-style: normal;
  font-weight: bold;
}
.markdown-text img{
  width:100%;
  height:100%;
}
/* sidebar */
.sidebar {
  width: 24%;
  font-size: 14px;
  margin-bottom: 20px;
  display: block;
  text-align: left;
}

.sidebar .inner {
  padding: 10px;
  border-radius: 0 0 3px 3px;
  background-color: #fff;
  margin-bottom: 13px;
}
.box {
  margin-bottom: 13px;
  background-color: #fff;
}
.avatar {
  width: 48px;
  height: 48px;
  vertical-align: middle;
}
.username {
  max-width: 120px;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
  font-size: 16px;
}
p {
  margin: 0 0 10px;
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
}
</style>