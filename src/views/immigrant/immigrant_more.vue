<template>
  <div class="immig_more">
    <supplier
      :item="item"
      :athor="athor"
      :two="two"
      :id="id"
      :url="url"
      params1="countryNum"
      params2="immigrationType"
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
        :showCity="showCity"
        :sourceDescription="sourceDescription"
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
      item: ["国家", "移民项目"],
      athor: [],
      two: [
        {
          name: "技术移民",
          id: 1
        },
        {
          name: "投资移民",
          id: 2
        }
      ],

      simpleName: "",
      head_img: "",
      hot: "",
      id: this.$route.query.id,
      showCity: this.$route.query.showCity,
      sourceDescription: this.$route.query.sourceDescription,
      // 供应商
      url: `/dhr/client/immigrant/support`
    };
  },
  methods: {
    getMenu() {
      this.$fetch("/dhr/client/migrate/menu").then(res => {
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
