<template>
  <div class="study_more">
    <supplier
      :item="item"
      :athor="athor"
      :id="id"
      :url="url"
      params1="countryName"
    ></supplier>

    <div>
      <con
        :simpleName="simpleName"
        :head_img="head_img"
        :hot="hot"
        :typeOf="2"
        :id="id"
        ref="con"
        :showFoot="false"
      />
    </div>
  </div>
</template>

<script>
import supplier from "../../components/supplier";
import con from "../../components/conf";
export default {
  props: {},
  data() {
    return {
      item: ["国家"],
      athor: [],
      url: `/dhr/business/study/support?showCityNum=1`,
      simpleName: "",
      head_img: "",
      hot: "",
      id: this.$route.query.id
    };
  },
  methods: {
    getMenu() {
      console.log(this.id);
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
