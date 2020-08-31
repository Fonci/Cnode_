<template>
  <div class="mainContent">
    <h3>{{detailData.title}}</h3>
    <p style="margin:20px 0;">
      <img
        style="width:30px;height:30px;vertical-align:middle;"
        :src="detailData.author.avatar_url"
      />
      作者：{{detailData.author.loginname}}
    </p>
    <article v-html="detailData.content"></article>
  </div>
</template>
<script>
export default {
  data() {
    return {
      detailId: "",
      detailData: {}
    };
  },
  created() {
    this.detailId = this.$route.params.id;
    this.getData(this.detailId);
  },
  methods: {
    getData(id) {
      this.$http.get("/topic/" + id).then(res => {
        if (res.status == 200) {
          this.detailData = res.data.data;
          console.log(this.detailData);
        }
      });
    }
  }
};
</script>

<style>
.mainContent {
  width: 70%;
}
</style>