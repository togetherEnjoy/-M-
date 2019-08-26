<template>
  <div class="study_more">
    <supplier :item="item" :athor="athor" :id="id" :url="url" params1="countryName" :myPhone="myPhone"></supplier>

    <div>
      <con
        :simpleName="simpleName"
        :head_img="head_img"
        :hot="hot"
        :typeOf="5"
        :id="id"
        ref="con"
        :showFoot="false"
        :showCity="showCity"
        :sourceDescription="sourceDescription"
        :sourceTitle="sourceTitle"
      />
    </div>
  </div>
</template>

<script>
import supplier from "../../components/supplier";
import con from "../../components/conf";
export default {
  data() {
    return {
      item: ["国家"],
      athor: [],
      url: `/dhr/client/study/support`,
      simpleName: "",
      head_img: "",
      hot: "",
      myPhone : '',
      id: this.$route.query.id,
      showCity: this.$route.query.showCity,
      sourceDescription: this.$route.query.sourceDescription,
      sourceTitle: this.$route.query.sourceTitle
    };
  },
  methods: {
    getMenu() {
      this.$fetch("/dhr/client/study_abroad/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.athor = res.Result.country;
        }
      });
    },
    // 咨询框
    showToast() {
      let con = this.$refs.con;
      con.eject();
    }
  },
  created() {
    this.getMenu();
  },
  components: {
    supplier,
    con
  }
};
</script>

<style scoped lang="scss">
</style>
