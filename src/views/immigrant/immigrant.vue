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
                <div @click="$router.push({path:'/home/immig/detail', query: {id: immig.id}})">
                  <div class="card_item">
                    <div class="imgs">
                      <img v-lazy="immig.imgs">
                    </div>

                    <div class="txt">
                      <h1>{{ immig.name }}</h1>
                      <p>{{ immig.subtitle }}</p>
                    </div>
                  </div>

                  <div class="card_ds">
                    <div>
                      <p class="m">{{ immig.handlingCycle }}个月</p>
                      <p>办理周期</p>
                    </div>
                    <div>
                      <p class="m">{{ immig.identityType }}</p>
                      <p>身份类别</p>
                    </div>
                    <div>
                      <p class="m">{{ immig.investmentQuota }}万澳币</p>
                      <p>投资额度</p>
                    </div>
                    <div>
                      <p class="m">{{ immig.demand }}</p>
                      <p>居住要求</p>
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import { mapGetters } from "vuex";
import { screen_data } from "../../utils/mixins";

export default {
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

      immig_country: []
    };
  },
  watch: {
    // active(val) {
    //   console.log(val)
    //   this.active = val + 1
    // }
  },

  methods: {
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
        hostCountryNum: this.hostCountryNum
      };

      if (this.merchant_id) {
        params = Object.assign(params, {
          merchant_id: this.merchant_id
        });
      }
      console.log(params);
      setTimeout(() => {
        this.$fetch(this.url, params).then(res => {
          if (res.ErrCode == "0000") {
            this.list_data = this.list_data.concat(res.Result.data);
            this.count = res.Result.count / 1;

            this.loading = false;
            if (this.list_data.length >= this.count) {
              this.finished = true;
            }
            this.page++;
          }
        });
      }, 500);
    },

    tabClick(i) {
      this.list_data = [];
      this.page = 1;

      this.hostCountryNum = this.immig_country[i].id;

      console.log(this.hostCountryNum);
      this.initialization();
    },
    initialization() {
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结束
      if (this.loading) {
        this.getImmigListData();
      }
    }
  },

  created() {
    this.isFirstEnter = true;
    this.firstOnload = true;
    this.getImmigData();
    this.initialization();
  },

  activated() {
   console.log(sessionStorage.getItem('active'))
    this.active = parseInt(this.$route.query.hostCountryNum) + 1 
 console.log(this.active)
    this.hostCountryNum = this.$route.query.hostCountryNum
    this.merchant_id = this.$route.query.merchant_id
      ? this.$route.query.merchant_id
      : false;

    console.log(this.merchant_id);
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
    // console.log(from);
    // console.log(to);
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

        console.log(vm.url);
      });
    }

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
            width: 195px;
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
          color: #9399a5;
          font-size: 24px;
          .m {
            color: #ed2530;
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 19px;
          }
        }
      }
    }
  }
}
</style>
