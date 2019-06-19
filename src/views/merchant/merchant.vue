<template>
  <div class="merchant">
    <div class="head_wrap">
      <div class="hbc">
        <div class="imgs">
          <h3 v-if="mer_data.merchant">{{ mer_data.merchant.simpleName }}</h3>
        </div>
        <!-- <span @click="makeShare"></span> -->
      </div>

      <div class="bigimg">
        <img src="../../assets/images/merchant/banner.png">
      </div>

      <div class="m_sl">
        <div class="sl_item">
          <p class="num">{{ mer_data.softLanguageBer }}</p>
          <p class="txt">产品数</p>
        </div>
        <div class="sl_item">
          <p class="num">{{ mer_data.pageNumber }}</p>
          <p class="txt">文章数</p>
        </div>
        <div class="sl_item">
          <p class="num">{{ mer_data.browseNumber }}</p>
          <p class="txt">咨询量</p>
        </div>
      </div>
    </div>

    <div class="house">
      <div class="top_bar">
        <h1>海外{{ titleName }}</h1>
        <p
          style="cursor:pointer"
          @click="$router.push({path: titleURL,query:{merchant_id:$route.query.id}})"
        >探索更多海外{{ titleName }}</p>
      </div>

      <van-tabs :line-height="0" :line-width="0" @click="onTabClick">
        <van-tab title="房产">
          <div class="h_cate">
            <div class="house_wrap">
              <div
                class="list_box"
                v-for="(item, i) in house_data"
                :key="i"
                @click="$router.push({name: 'housedetail',params: {id: item.id}})"
              >
                <div class="l_left">
                  <img v-lazy="item.coverImg">
                  <p>{{ item.belongCountryName }}·{{ item.belongCityName }}</p>
                </div>
                <div class="l_right">
                  <h3 class="tit">{{ item.title }}</h3>
                  <p
                    class="de"
                  >{{ houstType(item.hoseType) }} | {{ item.propertyRightYears }} | {{ item.minArea }}m-{{ item.maxArea }}m</p>
                  <p class="price">
                    <i class="le">
                      ￥
                      <span>{{ item.price }}</span>万起
                    </i>

                    <span class="ri">
                      首付比例
                      <i>{{ item.downPay }}%</i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </van-tab>

        <van-tab title="移民">
          <div class="ym">
            <div
              class="card_wrap"
              v-for="(item,i) in immig_data"
              :key="i"
              @click="$router.push({path: '/home/immig/detail'})"
            >
              <div class="card_item">
                <div class="imgs">
                  <img v-lazy="item.imgs">
                </div>

                <div class="txt">
                  <h1>{{ item.name }}</h1>
                  <p>{{ item.subtitle }}</p>
                </div>
              </div>

              <div class="card_ds">
                <div>
                  <p class="m">{{ item.handlingCycle }}个月</p>
                  <p>办理周期</p>
                </div>
                <div>
                  <p class="m">{{ item.identityType }}</p>
                  <p>身份类别</p>
                </div>
                <div>
                  <p class="m">{{ item.investmentQuota }}万澳币</p>
                  <p>投资额度</p>
                </div>
                <div>
                  <p class="m">{{ item.demand }}</p>
                  <p>居住要求</p>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="留学">
          <div class="lx">
            <div
              class="study_item"
              v-for="(item,i) in study_data"
              :key="i"
              @click="$router.push({path: `/home/study/${item.id}`})"
            >
              <div class="imgs">
                <div class="imgs_box">
                  <img v-lazy="item.schoolBadgeImg">
                </div>
              </div>

              <div class="content">
                <h3>{{ item.schoolName }}</h3>
                <p class="yw">{{ item.englishName }}</p>
                <p class="addr">{{ item.hostCountry }} {{ item.hostCity }}</p>
                <p class="pm">
                  <span>
                    国内综合排名：
                    <i>{{ item.countryRanking }}</i>
                  </span>
                  <span class="r">
                    录取率：
                    <i>{{ item.acceptanceRate }}.0%</i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="游学">
          <div class="yx">
            <div
              class="lx_c_item"
              v-for="(item, i) in studyTour_data"
              :key="i"
              @click="$router.push({path: `/home/studytour/${item.id}`})"
            >
              <div class="imgs">
                <img v-lazy="item.coverImg">
              </div>
              <div class="lx_r">
                <p class="tit">{{ item.title }}</p>

                <p class="price">
                  价格&nbsp;
                  <i>
                    <b>￥</b>
                    {{ item.price }}
                  </i>
                  <span>{{ app._goTime(item.startTime,item.endTime) | goTime() }}</span>
                </p>
              </div>
            </div>
          </div>
        </van-tab>
        <!-- <van-tab title="医疗"></van-tab> -->
        <!-- <van-tab title="婚礼"></van-tab>
        <van-tab title="定制游"></van-tab>-->
      </van-tabs>
    </div>

    <div class="hai_hot house">
      <div class="top_bar">
        <h1>海外热门</h1>
        <p style="cursor:pointer" v-on:click="$router.push({path: '/news'})">探索更多海外热门</p>
      </div>

      <van-tabs :line-height="0" :line-width="0" @click="tabBtnClick" animated>
        <van-tab v-for="(item, i ) in hot" :key="i" :title="item">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :offset="10"
          >
            <div>
              <div v-if="list_data.length > 0" v-for="(list, i) in list_data" :key="i">
                <div class="hot_wrap">
                  <div
                    class="hot_item"
                    @click="getDetails(list.id, list.name)"
                    v-if="!list.coverImg1 && !list.coverImg2"
                  >
                    <div class="item_left">
                      <p class="txt" v-text="list.name"></p>
                      <p class="hover">
                        {{ list.simpleName }} · {{_getDateDiff(list.createdAt)}}
                        <span>评论数：{{list.commentCount}}</span>
                      </p>
                    </div>
                    <div class="item_right">
                      <img v-lazy="list.coverImg">
                    </div>
                  </div>

                  <div
                    class="hot_all"
                    @click="$router.push({path:  `/news/newsd`,query: {id: list.id, index}})"
                    v-if="list.coverImg && list.coverImg1 && list.coverImg2"
                    :key="i"
                  >
                    <div class="all_t">
                      <p>{{ list.name }}</p>
                    </div>
                    <div class="all_c">
                      <div>
                        <img v-lazy="list.coverImg">
                      </div>
                      <div>
                        <img v-lazy="list.coverImg1">
                      </div>
                      <div>
                        <img v-lazy="list.coverImg2">
                      </div>
                    </div>
                    <div class="all_b">
                      <p class="hover">
                        {{ list.simpleName }} · {{_getDateDiff(list.createdAt)}}
                        <span>评论数：{{list.commentCount}}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import { getDateDiff } from "../../api/api.js";
import { mapMutations, mapGetters } from "vuex";
import NativeShare from "nativeshare";
export default {
  inject: ["app"],
  data() {
    return {
      merchant: ["房产", "移民", "留学", "游学", "医疗", "婚礼", "定制游"],
      hot: ["24h快讯", "房产", "游学", "移民", "留学", "医疗"],
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
      index: 0,
      limit: 10,
      count: "",
      list_data: [],

      sendURL: [
        `/dhr/client/house/list`,
        `/dhr/client/migrate/merchant/list`,
        `/dhr/client/study_abroad/merchant/list`,
        `/dhr/client/study_tour/list`
      ],
      house_data: [],
      immig_data: [],
      study_data: [],
      studyTour_data: [],

      all_data: ["house_data", "immig_data", "study_data", "studyTour_data"],

      titleName: "房产",
      titleURL: "/home/house",
      // 缓存
      all_cache: {},
      mer_data: []
    };
  },
  computed: {
    list() {
      return this.list;
    },
    ...mapGetters(["list"])
  },

  methods: {
    // 通用分享
    makeShare(command) {
      let nativeShare = new NativeShare();
      let shareData = {
        title: "NativeShare",
        desc: "NativeShare是一个整合了各大移动端浏览器调用原生分享的插件",
        // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
        link: "https://github.com/fa-ge/NativeShare",
        icon:
          "https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg",
        // 不要过于依赖以下两个回调，很多浏览器是不支持的
        success: function() {
          alert("success");
        },
        fail: function() {
          alert("fail");
        }
      };
      nativeShare.setShareData(shareData);

      // return nativeShare
      try {
        nativeShare.call(command);
      } catch (err) {
        // 如果不支持，你可以在这里做降级处理
        alert(err.message);
      }
    },

    call(command) {
      try {
        this.makeShare().call(command);
      } catch (err) {
        // 如果不支持，你可以在这里做降级处理
        alert(err.message);
      }
    },

    // 获取供应商详情
    getMerDetail() {
      const { id } = this.$route.query;
      this.$post("/dhr/client/house/merchant_page", {
        id: parseInt(id),
        showCityNum: this.$store.state.number || 1
      }).then(res => {
        console.log(res);
        if (res.ErrCode == "0000") {
          this.mer_data = res.Result;
        }
      });
    },
    // house
    houseListData(i = 0, pageName = "房产") {
      const { id } = this.$route.query;
      this.$fetch(this.sendURL[i], {
        page: 1,
        limit: 4,
        merchant_id: id
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.house_data = res.Result.data;
          console.log(this.house_data);
          switch (i) {
            case 0:
              this.house_data = res.Result.data;
              this.setcache(this.house_data, pageName);
              break;
            case 1:
              this.immig_data = res.Result.data;

              this.setcache(this.immig_data, pageName);
              break;
            case 2:
              this.study_data = res.Result.data;
              this.setcache(this.study_data, pageName);
              break;
            case 3:
              this.studyTour_data = res.Result.data;
              this.setcache(this.studyTour_data, pageName);
              break;
          }
        } else if (res.ErrCode == "9999") {
          this.$toast("刷新太快了");
        }
      });
    },
    houstType(type) {
      switch (type) {
        case 1:
          return "独栋别墅";
        case 2:
          return "联排别墅";
        case 3:
          return "精品住宅";
        case 4:
          return "双拼别墅";
      }
    },
    onTabClick(i, pageName) {
      this.titleName = pageName;
      if (i == 0) {
        this.titleURL = "/home/house";
      } else if (i == 1) {
        this.titleURL = "/home/immig";
      } else if (i == 2) {
        this.titleURL = "/home/study";
      } else if (i == 3) {
        this.titleURL = "/home/studytour";
      }
      console.log(this.titleName);

      if (!this.getcache("all_list", this.all_data[i], pageName)) return;

      this.houseListData(i, pageName);
    },
    setcache(cache, pageName) {
      this.all_cache[pageName] = cache;
      sessionStorage.setItem("all_list", JSON.stringify(this.all_cache));
    },
    getcache(cacheName, data, pageName) {
      let list = JSON.parse(sessionStorage.getItem(cacheName));
      if (pageName in list) {
        this[data] = list[pageName];
        console.log(this[data]);
        return false;
      } else {
        this[data] = [];
        return true;
      }
    },

    onLoad(pageName = "24h快讯") {
         const { id } = this.$route.query;
      console.log("触发了");
      let params = {
        page: this.page,
        limit: this.limit,
        merchant_id: id
      };
      if (this.index == 0) {
        params = Object.assign(params, { by: "createdAt" });
      } else {
        params = Object.assign(params, { cate: this.index });
      }
      console.log(params);
      if (this.isLoading) {
        return false;
      }
      if (this.index == 0) {
        this.index == false;
      }

      setTimeout(() => {
        this.$fetch(`/dhr/client/article/list`, params).then(res => {
          let data = res.Result;
          this.count = data.count / 1;
          this.list_data = this.list_data.concat(data.data);
          this.loading = false;
          // localStorage.setItem("list", JSON.stringify(this.list_data));

          if (this.list_data.length >= this.count) {
            this.finished = true;
            console.log("无更多数据");
          }
          this.page++;
          this.set_list({
            list: this.list_data || [],
            pageName: this.pageName || pageName,
            page: this.page,
            count: this.count
          });
        });
      }, 500);
    },
    tabBtnClick(index, pageName) {
      let list_data = this.list;
      this.pageName = pageName;
      if (pageName in list_data) {
        this.list_data = list_data[pageName].list;
        this.page = list_data[pageName].page;
        this.count = list_data[pageName].count;
        this.index = index;
        this.finished = false;
        return;
      }

      this.page = 1;
      this.list_data = [];
      this.count = "";
      this.index = index;

      this.initialization(pageName);
    },
    // 加载数据
    initialization(pageName) {
      this.loading = true; //下拉加载中
      this.finished = false; //下拉结束
      if (this.loading) {
        this.onLoad(pageName);
      }
    },
    getDetails(id, name) {
      this.$router.push({
        path: `/news/newsd`,
        query: { id, index: this.index }
      });
      localStorage.setItem("title", name);
      this.set_title(name || localStorage.getItem("title"));
    },

    _getDateDiff(t) {
      return getDateDiff(t);
    },
    ...mapMutations({
      set_list: "SET_LIST"
    })
  },
  created() {
    this.houseListData();
    this.getMerDetail();
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>
<style lang="scss">
.merchant {
  .van-tabs__nav--line {
    padding: 30px 0 !important;
    // margin-right: 30px;
  }
  .van-tab {
    display: inline-block;
    margin-right: 18px;
    font-weight: 500;
    white-space: nowrap;
    padding: 15px 28px;
    border-radius: 4px;
    background-color: #f5f5f5;
    font-size: 28px;
    flex-basis: initial !important;
    .van-ellipsis {
      text-overflow: initial !important;
      overflow: initial !important;
    }

    &.van-tab--active {
      background: linear-gradient(
        90deg,
        rgba(237, 77, 86, 1),
        rgba(237, 37, 48, 1)
      );
      color: #fff;
    }
  }

  .van-tabs__content {
    margin-top: 30px;
  }
}
</style>

<style scoped lang="scss">
.merchant {
  background-color: #f8f8f8;
  .head_wrap {
    background-color: #fff;
    .hbc {
      display: flex;
      height: 100px;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      .imgs {
        width: 177px;
        // height: 35px;
        h3 {
          font-size: 36px;
        }
      }
      span {
        height: 36px;
        width: 36px;
        background: url("../../assets/images/merchant/house_icon_share@2x.png")
          no-repeat center / cover;
      }
    }
    .bigimg {
      height: 265px;
    }
    .m_sl {
      display: flex;
      padding: 30px 0;
      .sl_item {
        flex: 1;
        text-align: center;
        border-right: 1px solid #eeeeee;
        &:last-child {
          border: none;
        }
        .num {
          font-size: 48px;
          font-weight: bold;
        }
        .txt {
          margin-top: 30px;
          font-size: 30px;
          color: #9399a5;
        }
      }
    }
  }

  // 海外热门
  .hai_hot {
    margin-top: 30px;
    .house_ca {
      margin-top: 38px;
    }

    .hot_wrap {
      background-color: #fff;
      // padding-bottom: 60px;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        left: 0;
        right: 30px;
        bottom: 0;
        background-color: #eee;
        height: 1px;
      }
      .hot_item {
        display: flex;
        padding: 30px 30px 30px 0;
        justify-content: space-between;
        .item_left {
          margin-right: 21px;
          width: 429px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .txt {
            font-size: 30px;
            line-height: 40px;
            font-weight: bold;
            height: 77px;
          }
        }

        .item_right {
          width: 210px;
          height: 140px;
          border-radius: 4px;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }

      .hover {
        line-height: 24px;
        color: #9399a5;
        font-size: 22px;
        span {
          margin-left: 30px;
        }
      }

      .hot_all {
        padding: 30px 30px 30px 0;
        .all_t {
          p {
            font-size: 30px;
            line-height: 40px;
            font-weight: bold;
          }
        }

        .all_c {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
          div {
            width: 210px;
            height: 140px;
            border-radius: 4px;
            overflow: hidden;
          }
          img {
            display: block;
            width: 100%;
          }
        }

        .all_b {
          padding-top: 15px;
        }
      }
    }
  }

  .house {
    background-color: #fff;
    margin-top: 30px;
    padding: 40px 0 50px 30px;
    overflow: hidden;
    .h_cate {
      margin-top: 39px;
      padding-right: 30px;
    }
    .top_bar {
      display: flex;
      justify-content: space-between;
      padding-right: 30px;
      align-items: center;
      h1 {
        font-size: 48px;
      }
      p {
        font-size: 24px;
        color: #9399a5;
        position: relative;
        padding-right: 30px;
        &::after {
          position: absolute;
          content: "";
          right: 0;
          top: 9px;
          width: 18px;
          height: 18px;
          background: url("../../assets/images/home/ri.png") no-repeat
            center/cover;
        }
      }
    }

    .house_wrap {
      background-color: #fff;
      margin-top: 30px;
      .list_box {
        display: flex;
        padding: 30px 0;
        border-bottom: 1px solid #e6e6e6;
        &:first-child {
          padding-top: 0;
        }
        .l_left {
          width: 240px;
          height: 160px;
          border-radius: 5px;
          overflow: hidden;
          position: relative;
          img {
            height: 100%;
          }
          p {
            position: absolute;
            width: 100%;
            padding: 10px 0 10px 30px;
            bottom: 0px;
            left: 0px;
            font-size: 20px;
            color: #fff;
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.2),
              rgba(0, 0, 0, 0.8)
            );
            &::after {
              position: absolute;
              content: "";
              width: 24px;
              height: 24px;
              left: 5px;
              top: 12px;
              background: url("../../assets/images/house/posi.png") no-repeat
                center / cover;
            }
          }
        }
        .l_right {
          padding-left: 20px;
          font-size: 22px;
          flex: 1;
          overflow: hidden;
          .tit {
            font-size: 30px;
            font-weight: bold;
          }
          .de {
            color: #9399a5;
            margin-top: 20px;
            font-size: 24px;
          }
          .price {
            margin-top: 30px;
            display: flex;
            font-size: 24px;
            .le {
              flex: 0.7;
              color: #ed2530;

              span {
                font-size: 34px;
                font-weight: bold;
              }
            }
            .ri {
              flex: 1;
              color: #9399a5;
              margin-left: 20px;
              i {
                color: #ed2530;
                font-size: 34px;
                font-weight: bold;
              }
            }
          }
        }
      }
    }

    .ym {
      margin-right: 30px;
      .card_wrap {
        padding: 30px 0 20px 0;
        border-bottom: 1px solid #e5e5e5;
        &:first-child {
          padding-top: 0;
        }
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
              font-size: 30px;
              font-weight: bold;
              margin-bottom: 19px;
            }
          }
        }
      }
    }
    .lx {
      padding-right: 30px;
      .study_item {
        padding: 30px 0;
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        &:first-child {
          padding-top: 0;
        }
        .imgs {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 5px solid rgba(228, 228, 228, 1);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          .imgs_box {
            width: 106px;
            height: 106px;
            border-radius: 50%;
            overflow: hidden;
          }
        }
        .content {
          padding-left: 30px;
          font-weight: 500;
          h3 {
            font-size: 30px;
          }
          .yw {
            font-size: 22px;
            color: #9399a5;
            margin-top: 10px;
          }
          .addr {
            font-size: 22px;
            margin-top: 10px;
            padding-left: 30px;
            position: relative;
            &::after {
              position: absolute;
              content: "";
              width: 24px;
              height: 24px;
              background: url("../../assets/images/study/posi.png") no-repeat
                center / cover;
              left: 0;
              top: 3px;
            }
          }
          .pm {
            margin-top: 16px;
            color: #9399a5;
            font-size: 24px;
            display: flex;
            justify-content: space-between;
            span {
              i {
                font-size: 34px;
                color: #ed2530;
                width: 80px;
                display: inline-block;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    .yx {
      padding-right: 30px;
      .lx_c_item {
        display: flex;
        padding: 15px 0;
        &:first-child {
          padding-top: 0;
        }
        .imgs {
          width: 210px;
          height: 210px;
          border-radius: 5px;
          overflow: hidden;

          // img {
          //   height: 100%;
          // }
        }

        .lx_r {
          flex: 1;
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .tit {
            font-size: 30px;
            font-weight: bold;
            line-height: 48px;
          }
          .price {
            margin-bottom: 5px;
            font-size: 22px;
            color: #9399a5;
            display: flex;
            align-items: center;
            b {
              color: #ed2530;
              font-size: 24px;
              margin-top: 5px;
              font-weight: normal;
            }
            i {
              color: #ed2530;
              font-size: 34px;
              width: 150px;
              font-weight: bold;
            }
            span {
              width: 110px;
              height: 36px;
              display: inline-block;
              vertical-align: text-bottom;
              border: 1px solid #5c98f8;
              color: #5c98f8;
              font-size: 22px;
              line-height: 36px;
              text-align: center;
              margin-left: 20px;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
  .hot {
    margin-top: 0;
    padding-top: 0;
    .hot_wrap {
      background-color: #fff;
      .hot_item {
        display: flex;
        padding: 30px 30px 30px 0;
        border-bottom: 1px solid #e5e5e5;

        .item_left {
          margin-right: 21px;
          width: 429px;
          .txt {
            font-size: 30px;
            line-height: 40px;
            font-weight: bold;
          }
        }

        .item_right {
          width: 240px;
          height: 160px;
          border-radius: 4px;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }

      .hover {
        line-height: 24px;
        color: #9399a5;
        font-size: 22px;
        margin-top: 50px;
        span {
          margin-left: 30px;
        }
      }

      .hot_all {
        padding: 30px 30px 30px 0;
        border-bottom: 1px solid #e5e5e5;

        .all_t {
          p {
            font-size: 30px;
            line-height: 40px;
            font-weight: bold;
          }
        }

        .all_c {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
          div {
            width: 210px;
            height: 140px;
            border-radius: 4px;
            overflow: hidden;
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        // .all_b {

        // }
      }
    }
  }
  .house_ca {
    overflow: hidden;
    height: auto;

    ul {
      display: inline-block;
      white-space: nowrap;

      li {
        display: inline-block;
        margin-right: 18px;
        font-weight: 500;
        white-space: nowrap;
        padding: 19px 28px;
        border-radius: 4px;
        background-color: #f5f5f5;
        font-size: 28px;

        &.active {
          background: linear-gradient(
            90deg,
            rgba(237, 77, 86, 1),
            rgba(237, 37, 48, 1)
          );
          color: #fff;
        }
      }
    }
  }
}
</style>
