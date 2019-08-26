<template>
  <div class="immigrant">
    <div>
      <van-tabs
        title-inactive-color="#0D1C31"
        title-active-color="#ED2530"
        v-model="active"
        @click="tabClick"
        sticky
      >
        <div ref="wrap">
          <van-tab v-for="index in immig_country" :title="index.name">
            <div class="card" :index_id="index.id">
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getImmigListData"
                :offset="10"
              >
                <div class="card_wrap" v-for="(immig, i) in list_data" :key="i">
                  <div @click="getDetails(immig.id)">
                    <div class="card_item">
                      <div class="imgs">
                        <img v-lazy="immig.imgs" />
                      </div>

                      <div class="txt">
                        <h1>{{ immig.name }}</h1>
                        <p>{{ immig.subtitle }}</p>
                      </div>
                    </div>

                    <div class="card_ds">
                      <div>
                        <p class="m text_overflow">{{ immig.handlingCycle }}</p>
                        <p>办理周期</p>
                      </div>
                      <div>
                        <p class="m text_overflow">{{ immig.identityType }}</p>
                        <p>身份类别</p>
                      </div>
                      <div>
                        <p
                          class="m text_overflow"
                        >{{ immig.investmentQuota == '无' ?immig.investmentQuota: '￥'+immig.investmentQuota+'万' }}</p>
                        <p>投资额度</p>
                      </div>
                      <div>
                        <p class="m text_overflow need">{{ immig.demand }}</p>
                        <p>居住要求</p>
                      </div>
                    </div>
                  </div>
                </div>
              </van-list>
            </div>
          </van-tab>
        </div>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import { mapGetters, mapMutations } from "vuex";
import { setCountryMode, setShareTitle } from "../../utils/mixins";
import { SEOConfig } from "../../utils/config";
export default {
  name: "immigrant",
  mixins: [setCountryMode, setShareTitle],
  metaInfo() {
    return {
      title: SEOConfig[this.$options.name].title,
      meta: [
        {
          name: "keywords",
          content: SEOConfig[this.$options.name].keywords
        },
        {
          name: "description",
          content: SEOConfig[this.$options.name].description
        }
      ]
    };
  },
  data() {
    return {
      page: 1,
      limit: 5,
      count: "",
      hostCountryNum: this.$route.query.hostCountryNum,
      url: `/dhr/client/migrate/list`,
      merchantUrl: `/dhr/client/migrate/merchant/list`,

      merchant_id: false,
      // active: '',
      // vant
      loading: false,
      finished: false,
      active: 0,
      list_data: [],

      immig_country: [],

      // 国家简写路由
      letter: ""
    };
  },

  methods: {
    getDetails(id) {
      // this.$router.push({path:`/${this.cityJx}/immig/detail`})
      // console.log(this.cityJX);
      console.log(this.active);
      if (!this.letter) {
        console.log(this.letter);
        this.$router.push({
          path: `/${this.cityJX}/immig/detail`,
          query: { id, country: this.letter, active: this.active }
        });
        return;
      }

      this.$router.push({
        path: `/${this.cityJX}/immig/${this.letter}/detail`,
        query: { id, country: this.letter, active: this.active }
      });
    },
    onload() {
      console.log("出发了");
    },
    getImmigData() {
      this.$fetch("/dhr/client/migrate/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.immig_country = res.Result.country;
          console.log(this.immig_country);
        }
      });
    },
    getImmigListData() {
      console.log("加载数据。。。。");
      let params = {
        page: this.page,
        limit: this.limit,
        hostCountryNum: this.hostCountryNum || "",
        by: "index_1"
      };

      this.merchant_id = this.$route.query.merchant_id
        ? this.$route.query.merchant_id
        : false;

      if (this.merchant_id) {
        params = Object.assign(params, {
          merchant_id: this.merchant_id
        });
      }
      // console.log(params);
      setTimeout(() => {
        this.$fetch(this.url, params).then(res => {
          if (res.ErrCode == "0000") {
            this.list_data = this.list_data.concat(res.Result.data);
            this.count = res.Result.count / 1;
            this.loading = false;
            if (this.list_data.length >= this.count) {
              this.finished = true;
            } else {
              this.finished = false;
            }
            this.page++;
          }
        });
      }, 500);
    },

    tabClick(i, pageName) {
      this.letter = this.immig_country[i].letter;
      console.log(this.letter);
      this.$router.push({ path: `/${this.cityJx}/immig/${this.letter}` });

      this.list_data = [];
      this.page = 1;
      sessionStorage.setItem("active", i);
      this.hostCountryNum = this.immig_country[i].id;
      this.initialization();
    },
    initialization() {
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结束
      if (this.loading) {
        this.getImmigListData();
      }
    },
    ...mapMutations({
      wxShare: "SET_SHARETITLE_IMG"
    })
  },

  created() {
    this.isFirstEnter = true;
    this.firstOnload = true;
    this.getImmigData();
    this.initialization();
  },

  activated() {
    this.iosTitleImg(SEOConfig.immigrant.title);

    if (this.$route.query.hostCountryNum) {
      this.active = this.$route.query.hostCountryNum;
    } else {
      this.active = 0;
    }

    this.hostCountryNum = this.$route.query.hostCountryNum;
    this.merchant_id = this.$route.query.merchant_id
      ? this.$route.query.merchant_id
      : false;

    if (!this.$route.meta.isBack || this.isFirstEnter) {
      this.loading = true;
      if (!this.firstOnload) {
        this.list_data = [];
        this.page = 1;

        this.initialization();
      }
    } else {
      this.loading = false;
    }

    this.finished = false;
    this.firstOnload = false;
    this.$route.meta.isBack = false;
    this.isFirstEnter = false;
  },

  beforeRouteEnter(to, from, next) {
    if (from.name == "merchant") {
      next(vm => {
        vm.url = vm.merchantUrl;
      });
    }

    if (from.meta.details && to.meta.keepAlive) {
      to.meta.isBack = true;
      next();
    }

    if (from.meta.homePage) {
      next(vm => {
        vm.merchant_id = false;
        vm.url = vm.url;

        console.log(`home page`);
      });
    }

    next();
  },

  beforeRouteLeave(to, from, next) {
    let app = document.getElementById("app");
    this.homeTop = window.pageYOffset;

    next();
  },

  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>

<style lang="scss">
.immigrant {
  height: 100vh;

  .van-tabs__nav--line {
    padding: 0.4rem 0.4rem 0.4rem 0 !important;
  }

  .van-tabs__wrap--scrollable .van-tab {
    flex: 0 0 22% !important;
  }
}

.van-list__finished-text {
  padding: 30px 0 !important;
}
</style>


<style scoped lang="scss">
.immigrant {
  background-color: #f8f8f8;
  padding-bottom: 60px;

  .card {
    margin-top: 30px;
    padding: 0 30px;
    background-color: #fff;
    .card_wrap {
      padding: 30px 0 30px 0;
      border-bottom: 1px solid #e5e5e5;
      .card_item {
        color: #fff;
        position: relative;
        .imgs {
          border-radius: 6px;
          height: 400px;
          overflow: hidden;
          position: relative;
          &::after {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-color: #000;
            opacity: 0.3;
          }
        }
        .txt {
          width: 90%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          h1 {
            font-size: 48px;
            font-weight: bold;
            position: relative;
            &::after {
              position: absolute;
              content: "";
              width: 120px;
              height: 2px;
              background-color: #fff;
              left: 50%;
              bottom: 0;
              margin-left: -60px;
              margin-top: 10px;
            }
          }
          p {
            line-height: 36px;
            font-size: 24px;
            width: 350px;
            margin: 10px auto 0;
          }
        }
      }

      .card_ds {
        display: flex;
        height: 117px;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        padding-top: 10px;
        & > div {
          width: 25%;
          flex: 1;
          color: #9399a5;
          font-size: 24px;
          display: flex;
          flex-direction: column;
          .m {
            color: #ed2530;
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 19px;
          }
          .need {
            //  width: 50%;
          }
        }
      }
    }
  }
}
</style>
