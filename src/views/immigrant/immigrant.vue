<template>
  <div class="immigrant">
    <div>
      <van-tabs
        title-inactive-color="#0D1C31"
        title-active-color="#ED2530"
        v-model="active"
        @click="tabClick"
      >
        <van-tab v-for="index in immig_country" :title="index.name">
          <div class="card">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="getImmigListData"
              :offset="100"
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

const url = `/dhr/client/migrate/list`;
export default {
  props: {},
  data() {
    return {
      country: ["全部", "希腊", "圣基茨", "美国", "澳大利亚", "加拿大"],
      page: 1,
      limit: 5,
      count: "",
      hostCountryNum: this.$route.query.hostCountryNum,
      // vant
      loading: false,
      finished: false,
      active: this.$route.query.hostCountryNum || 0,
      list_data: [],

      immig_country: []
    };
  },
  computed: {
    // immig_country() {
    //   return this.immig_menu;
    // },
    // ...mapGetters(["immig_menu"])
    // active() {
    //   return this.$route.query.hostCountryNum || 0
    // }
  },
  activated() {
    console.log("actived");
  },
  deactivated() {
    console.log("deactivated");
  },
  created() {
    this.getImmigData();
  },
  methods: {
    getImmigData() {
      this.$fetch("/dhr/client/migrate/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.immig_country = res.Result.country;
        }
      });
    },
    getImmigListData() {
      console.log("触发了");

      setTimeout(() => {
        this.$fetch(url, {
          page: this.page,
          limit: this.limit,
          hostCountryNum: this.hostCountryNum
        }).then(res => {
          if (res.ErrCode == "0000") {
            this.list_data = this.list_data.concat(res.Result.data);
            this.count = res.Result.count / 1;
            console.log(this.list_data);
            this.loading = false;
            if (this.list_data.length >= this.count) {
              this.finished = true;
              console.log("无更多数据");
            }
            this.page++;
          }
        });
      }, 500);
    },
    tabClick(i) {
      console.log(i);
      this.list_data = [];
      this.page = 1;
      this.hostCountryNum = i;
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
  beforeRouteEnter(to, from, next) {
    console.log(to);
    if (to.path == "/home/immig") {
      console.log(to);
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
  .van-tabs__nav--line {
    padding: 0.4rem 0.4rem 0.4rem 0 !important;
  }
}

.van-list__finished-text {
  padding-top: 30px;
}
</style>


<style scoped lang="scss">
.immigrant {
  background-color: #f8f8f8;

  .card {
    margin-top: 30px;
    padding: 0 30px;
    background-color: #fff;
    .card_wrap {
      padding: 30px 0 20px 0;
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
        & > div {
          color: #9399a5;
          font-size: 24px;
          .m {
            color: #ed2530;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 19px;
          }
        }
      }
    }
  }
}
</style>
