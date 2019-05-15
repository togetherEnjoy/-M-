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
          v-model="active"
          :color="'#ED2530'"
          :title-active-color="'#ED2530'"
          :title-inactive-color="'#0D1C31'"
          :line-width="0"
          animated
          lazy-render
          @click="tabBtnClick"
          sticky
        >
          <van-tab v-for="(item,i) in tabs" :title="item.name" :key="i" :id="i">
            <!-- 下拉刷新 -->
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!-- 上拉加载 -->
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :offset="100"
            >
              <div>
                <van-swipe indicator-color="white" :autoplay="4000">
                  <van-swipe-item v-if="list_data.length > 0" v-for="sw in list_data.slice(0, 4)">
                    <div
                      class="swip_se"
                      @click="$router.push({path: `/news/newsd`,query: {id: sw.id, index}})"
                    >
                      <div class="img_b">
                        <img v-lazy="sw.coverImg">
                      </div>
                      <div class="sw_mask"></div>
                      <p class="sw_txt" v-text="sw.name"></p>
                    </div>
                  </van-swipe-item>
                </van-swipe>

                <div v-if="list_data.length > 0" v-for="(list, i) in list_data.slice(4)" :key="i">
                  <div class="hot_wrap">
                    <div
                      class="hot_item"
                      @click="getDetails(list.id, list.name)"
                      v-if="!list.coverImg1 && !list.coverImg2"
                    >
                      <div class="item_left">
                        <p class="txt" v-text="list.name"></p>
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
                          {{ list.simpleName }} {{_getDateDiff(list.createdAt)}}
                          <span>评论数：{{list.commentCount}}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </van-list>
            </van-pull-refresh>
          </van-tab>
        </van-tabs>
      </div>
    </div>

    <!-- <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>-->
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import { getDateDiff } from "../../api/api.js";
import { mapMutations, mapGetters } from "vuex";
import { setTimeout } from "timers";

import moment from "moment";
export default {
  name: "hot",
  props: {},
  data() {
    return {
      tabs: [
        {
          name: "24h快讯",
          num: 0,
          where: "newest"
        },
        {
          name: "房产",
          num: 1,
          where: "house"
        },
        {
          name: "游学",
          num: 2,
          where: "immigrant"
        },
        {
          name: "移民",
          num: 3,
          where: "study"
        },
        {
          name: "留学",
          num: 4,
          where: "overseas"
        },
        {
          name: "医疗",
          num: 5,
          where: "medical"
        }
        // {
        //   name: "婚礼",
        //   num: 6,
        //   where: "wedding"
        // }
      ],
      list_data: [],
      index: 0,
      isLoading: false,
      loading: false,
      finished: false,
      // 分页
      page: 1,
      limit: 10,
      count: "",

      active: "",
      pageName: ''
    };
  },
  computed: {
    list() {
      return this.list;
    },
    title() {
      return this.title;
    },
    ...mapGetters(["list", "title"])
  },
  created() {
  },
  methods: {
    // 上拉加载
    onRefresh() {
      let self = this;
      setTimeout(() => {
        self.page = 1;
        self.getList(); //加载数据
      }, 800);
    },
    onLoad(pageName = "24h快讯") {
      console.log("触发了");
      if (this.isLoading) {
        return false;
      }
      if (this.index == 0) {
        this.index == false;
      }

      setTimeout(() => {
        this.$fetch(
          `/dhr/client/article/list${
            this.index
              ? "?cate=" + this.index + "&showCityNum=0"
              : "?showCityNum=0"
          }`,
          {
            page: this.page,
            limit: this.limit
          }
        ).then(res => {
          let data = res.Result;
          this.count = data.count / 1;
          this.list_data = this.list_data.concat(data.data);
          this.loading = false;
          localStorage.setItem("list", JSON.stringify(this.list_data));

          if (this.list_data.length >= this.count) {
            this.finished = true;
            console.log("无更多数据");
          }
          this.page++;
          this.set_list({
            list:   this.list_data || [],
            pageName: this.pageName || pageName,
            page: this.page,
            count: this.count
          });
        });
      }, 500);
    },
    tabBtnClick(index, pageName) {
      let list_data = this.list;
      this.pageName = pageName
      if (pageName in list_data) {
        this.list_data = list_data[pageName].list
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

    //(1 房产 2 游学 3 移民 4 留学 5 留学 6 婚礼 7 定制游)

    getList() {
      if (this.index == 0) {
        this.index == false;
      }
      this.$fetch(
        `/dhr/client/article/list${
          this.index
            ? "?cate=" + this.index + "&showCityNum=0"
            : "?showCityNum=0"
        }`,
        {
          page: this.page,
          limit: this.limit
        }
      )
        .then(res => {
          if (res.Result.data.length > 0 && res.ErrCode == "0000") {
            let data = res.Result;
            this.count = data.count / 1;
            this.list_data = data.data;
            this.loading = false;
            this.isLoading = false; //关闭下拉刷新效果
            this.finished = false;
            this.page++;
            if (this.list_data.length >= this.count) {
              this.finished = true;
              console.log("无更多数据");
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _getDateDiff(t) {
      return getDateDiff(t);
    },

    getDetails(id, name) {
      this.$router.push({
        path: `/news/newsd`,
        query: { id, index: this.index }
      });
      localStorage.setItem("title", name);
      this.set_title(name || localStorage.getItem("title"));
    },
    ...mapMutations({
      set_title: "SET_TITLE",
      set_list: "SET_LIST"
    })
  },
  beforeRouteLeave(to, from, next) {
    document.title = this.title;
    next();
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>

<style lang="scss">
// 下拉刷新
.van-pull-refresh__loading {
  .van-loading {
    // width: 30px !important;
    // height: 30px !important;
  }
  span {
    // font-size: 30px;
  }
}
// 上拉加载
.van-pull-refresh__loading .van-loading {
  width: 30px !important;
  height: 30px !important;
}
.van-list__loading-icon {
  width: 30px !important;
  height: 30px !important;
}
.van-pull-refresh__loading {
  height: 80px;
}
.van-list__loading {
  .van-list__loading-text {
    font-size: 30px;
  }
}
.van-list__finished-text {
  font-size: 30px !important;
}

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
  padding: 30px 30px 30px 30px !important;
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
    width: 10px;
    height: 10px;
  }
  .van-swipe__indicator .van-swipe__indicator--active {
    width: 16px !important;
    height: 10px !important;
    border-radius: 4px !important;
  }
  .van-swipe__indicator--active {
    width: 16px !important;
    height: 10px !important;
    border-radius: 4px !important;
  }
}
</style>

<style scoped lang="scss">
.hot {
  width: 100%;
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
      height: 100%;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .sw_mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
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
      font-weight: bold;
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
        // min-width: 429px;
        flex: 1;
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
</style>
