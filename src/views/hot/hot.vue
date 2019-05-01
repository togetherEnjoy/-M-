<template>
  <div class="hot">
    <div class="top_bar">
      <div class="t_l"></div>
      <div class="t_c">
        <img src="../../assets/images/hot/tit.png">
      </div>
      <div class="t_r">
        <span class="search"></span>
        <span class="download" style="display:none"></span>
      </div>
    </div>

    <div>
      <div class="pro">
        <div class="mask"></div>
        <van-tabs
          :color="'#ED2530'"
          :title-active-color="'#ED2530'"
          :title-inactive-color="'#0D1C31'"
          :line-width="50"
          animated
          lazy-render
          @click="getList"
        >
          <van-tab v-for="(item,i) in tabs" 
          :title="item.name" 
          :key="i"   
          :id='i'
                
          >
            <div>
              <van-swipe indicator-color="white" :autoplay="3000">
                <van-swipe-item v-if="list_data.length > 0" v-for="sw in list_data.slice(0, 4)">
                  <div
                    class="swip_se"
                    @click="$router.push({path: `/news/newsd`,query: {id: sw.id}})"
                  >
                    <div class="img_b">
                      <img v-lazy="sw.coverImg">
                    </div>
                    <div class="sw_mask"></div>
                    <p class="sw_txt">{{ sw.name }}</p>
                  </div>
                </van-swipe-item>
              </van-swipe>

              <div v-if="list_data.length > 0" v-for="(list, i) in list_data.slice(4)" :key="i">
                <div class="hot_wrap">
                  <div
                    class="hot_item"
                    @click="$router.push({path: `/news/newsd`,query: {id: list.id}})"
                    v-if="!list.coverImg1 && !list.coverImg2"
                  >
                    <div class="item_left">
                      <p class="txt">{{ list.name }}</p>
                      <p class="hover">
                        {{ list.simpleName }} {{_getDateDiff(list.createdAt)}}
                        <span>评论数：{{list.commentCount}}</span>
                      </p>
                    </div>
                    <div class="item_right">
                      <img v-lazy="list.coverImg">
                    </div>
                  </div>

                  <div
                    class="hot_all"
                    @click="$router.push({path:  `/news/newsd`,query: {id: list.id}})"
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
                        {{ list.simpleName }} {{_getDateDiff(list.createdAt)}}
                        <span>评论数：{{list.commentCount}}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import { getDateDiff } from "../../api/api.js";
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {},
  data() {
    return {
      tabs: [
        {
          name: "最新",
          num: 0,
          where: 'newest'
        },
        {
          name: "房产",
          num: 1,
           where: 'house'
        },
        {
          name: "移民",
          num: 2,
           where: 'immigrant'
        },
        {
          name: "游学",
          num: 3,
           where: 'study'
        },
        {
          name: "留学",
          num: 4,
           where:'overseas'
        },
        {
          name: "医疗",
          num: 5,
           where: 'medical'
        },
        {
          name: "婚礼",
          num: 6,
           where: 'wedding'
        }
      ],
      list_data: [],
      index: 0
    };
  },
  computed: {},
  created() {
    this.getList();
  },
  methods: {
    getList(index, title) {
      this.index = index
      console.log(this.index)
      if (index == 0) {
        index = false;
      }

      this.$fetch(
        // ?showCityNum=0
        `/dhr/client/article/list${index ? "?cate=" + index + '&showCity=0' : "?showCity=0"}`
      ).then(res => {
        // console.log(res);
        if (res.Result.data.length > 0) {
          this.list_data = res.Result.data;
          console.log(this.list_data);

          this.$store.commit("SET_LIST", this.list_data);
        }
      }).catch(err => {
        console.log(err)
      });
    },
    _getDateDiff(t) {
      return getDateDiff(t);
    }
  },
  mounted() {},
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>

<style lang="scss">

.van-tab {
  font-size: 28px !important;
}
.van-tabs--line {
  padding-top: 100px !important;
}

.van-tabs--line .van-tabs__wrap {
  height: initial !important;
}
.van-tabs__nav--line {
  padding: 30px 30px 30px 0 !important;
}
.van-tabs__wrap--scrollable .van-tab {
  flex-basis: 17% !important;
}
.van-tabs__wrap--scrollable .van-tab:last-child {
  margin-right: 50px !important;
}
</style>
<style lang="scss">
.pro {
  .van-swipe__indicator {
    width: 14px;
    height: 14px;
  }
  .van-swipe__indicator .van-swipe__indicator--active {
    width: 24px !important;
    height: 14px !important;
    border-radius: 7px !important;
  }
  .van-swipe__indicator--active {
    width: 24px !important;
    height: 14px !important;
    border-radius: 7px !important;
  }
}
</style>

<style scoped lang="scss">
.hot {
  .top_bar {
    padding: 0 15px;
    height: 90px;
    background-color: #ed2530;
    display: flex;
    justify-content: space-between;
    .t_l {
      background: url("../../assets/images/hot/logo.png") no-repeat center /
        cover;
      width: 48px;
      height: 60px;
      align-self: center;
    }
    .t_c {
      align-self: center;
      width: 210px;
      height: 40px;
      img {
        display: block;
        width: 100%;
      }
    }
    .t_r {
      align-self: center;
      display: flex;

      span {
        width: 36px;
        height: 36px;
      }
      .search {
        display: none;
        background: url("../../assets/images/hot/search.png") no-repeat center /
          cover;
        margin-right: 19px;
      }
      .download {
        background: url("../../assets/images/hot/download.png") no-repeat center /
          cover;
      }
    }
  }

  .swip_se {
    position: relative;
    height: 388px;
    width: 100%;
    .img_b {
      width: 100%;
      img {
        display: block;
        width: 100%;
      }
    }

    .sw_mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
    }

    .sw_txt {
      position: absolute;
      font-size: 30px;
      width: 678px;
      left: 32px;
      bottom: 47px;
      color: #fff;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .hot_wrap {
    background-color: #fff;
    padding-left: 30px;
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
        }
      }

      // .all_b {

      // }
    }
  }
}
</style>
