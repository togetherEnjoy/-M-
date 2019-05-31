<template>
  <div class="home">
    <div class="home_top">
      <div class="top_le">
        <p>深圳</p>
      </div>
      <div class="top_cen">
        <img src="../../assets/images/home/logo.png">
      </div>
      <div class="top_ri">
        <img src="../../assets/images/home/per.png">
      </div>
    </div>

    <!-- 精品推荐 -->
    <div class="jinp">
      <div class="tuij">精品推荐</div>
      <div class="jinp_some" v-for="(item, i) in recommen" :key="i">{{ item.img }}</div>
    </div>

    <div class="swip">
      <van-swipe indicator-color="white" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in swipeImg" :key="index">
          <div class="banner_box">
            <img v-lazy="image.img">
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="categroy">
      <div class="cate_item" @click="$router.push({path: '/home/house'})">
        <img src="../../assets/images/home/house.png">
        <p>房产</p>
      </div>
      <div class="cate_item" @click="$router.push({path: '/home/immig',query: {hostCountryNum:0}})">
        <img src="../../assets/images/home/yimin.png">
        <p>移民</p>
      </div>
      <div class="cate_item" @click="$router.push({path: '/home/study'})">
        <img src="../../assets/images/home/liuxue.png">
        <p>留学</p>
      </div>
      <div class="cate_item" @click="$router.push({path: '/home/studytour'})">
        <img src="../../assets/images/home/youxue.png">
        <p>游学</p>
      </div>
      <div class="cate_item" @click="$router.push({path: `/news`})">
        <img src="../../assets/images/home/hot.png">
        <p>热门</p>
      </div>
    </div>

    <div class="content">
      <!-- 海外好房 -->
      <div class="house">
        <div class="top_bar">
          <h1>海外好房</h1>
          <p style="cursor:pointer" v-on:click="$router.push({path: '/home/house'})">探索更多海外房产</p>
        </div>
        <van-tabs :line-height="0" @click="hsTabClick">
          <van-tab v-for="(item, i) in house_menu.country" :key="i" :title="item.name">
            <div class="h_cate">
              <div class="house_content" ref="house_content">
                <div class="show_box">
                  <van-loading color="#ed2530" v-if="house_data.length == 0"></van-loading>

                  <div
                    class="show_item"
                    v-for="(item, i) in house_data"
                    :key="i"
                    v-if="house_data.length>0"
                    @click="$router.push({name: 'housedetail',params: {id: item.id}})"
                  >
                    <div class="show_bg">
                      <img v-lazy="item.coverImg">
                    </div>

                    <p class="tit">{{ item.title }}</p>
                    <p class="param">{{ item.minArea }}~{{ item.maxArea }}㎡ | 首付 10%</p>
                    <p class="price">
                      ￥
                      <span>{{ item.price }}</span>万起
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <!-- 热门移民国家 -->
      <div class="yim">
        <div class="top_bar">
          <h1>热门移民</h1>
          <p @click="$router.push({path: '/home/immig',query: {hostCountryNum: 0}})">探索更多移民国家</p>
        </div>
        <div class="yim_box" ref="yim">
          <ul>
            <li
              @click="$router.push({path: '/home/immig', query: {hostCountryNum: immig_menu[0].id}})"
            >
              <img src="../../assets/images/home/meiguo.png">
              <p v-if="immig_menu.length>0">{{ immig_menu[0].name }}</p>
            </li>
            <li
              @click="$router.push({path: '/home/immig', query: {hostCountryNum: immig_menu[1].id}})"
            >
              <img src="../../assets/images/home/aodaliya.png">
              <p v-if="immig_menu.length>0">{{ immig_menu[1].name }}</p>
            </li>
            <li
              @click="$router.push({path: '/home/immig', query: {hostCountryNum: immig_menu[2].id}})"
            >
              <img src="../../assets/images/home/jianada.png">
              <p v-if="immig_menu.length>0">{{ immig_menu[2].name }}</p>
            </li>
            <li
              @click="$router.push({path: '/home/immig', query: {hostCountryNum: immig_menu[3].id}})"
            >
              <img src="../../assets/images/home/jianada.png">
              <p v-if="immig_menu.length>0">{{ immig_menu[3].name }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 热门留学 -->
      <div class="liuxue">
        <div class="top_bar lx_top_bar">
          <h1>热门留学</h1>
          <p @click="$router.push({path: '/home/study'})">探索更多海外国家</p>
        </div>

        <div class="lx_box">
          <div
            class="lx_item"
            @click="$router.push({path: '/home/study',query: {id: study_menu[0].id}})"
          >
            <div>
              <img src="../../assets/images/home/m_l.png">
              <p v-if="study_menu.length>0">{{ study_menu[0].name }}学院</p>
            </div>
          </div>
          <div
            class="lx_item"
            @click="$router.push({path: '/home/study',query: {id: study_menu[1].id}})"
          >
            <div>
              <img src="../../assets/images/home/ao_l.png">
              <p v-if="study_menu.length>0">{{ study_menu[1].name }}学院</p>
            </div>
          </div>
          <div
            class="lx_item"
            @click="$router.push({path: '/home/study',query: {id: study_menu[2].id}})"
          >
            <div>
              <img src="../../assets/images/home/yin_l.png">
              <p v-if="study_menu.length>0">{{ study_menu[2].name }}学院</p>
            </div>
          </div>
          <div
            class="lx_item"
            @click="$router.push({path: '/home/study',query: {id: study_menu[3].id}})"
          >
            <div>
              <img src="../../assets/images/home/jia_l.png">
              <p v-if="study_menu.length>0">{{ study_menu[3].name }}学院</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 精品海外游学 -->
      <div class="jin_liuxue">
        <div class="top_bar">
          <h1>精品海外游学</h1>
          <p @click="$router.push({path: '/home/studytour'})">探索更多海外留学</p>
        </div>
        <van-tabs :line-height="0" @click="yxBtnClick">
          <van-tab v-for="(item, i) in yx_menu" :key="i" :title="item.name">
            <div class="liux_box">
              <div class="lx_content">
                <van-loading color="#ed2530" v-if="yx_data.length == 0"></van-loading>
                <div
                  class="lx_c_item"
                  v-for="(item, i) in yx_data"
                  :key="i"
                  @click="$router.push({path:`/home/studytour/${item.id}`})"
                >
                  <div class="imgs">
                    <img v-lazy="item.coverImg">
                  </div>
                  <div class="lx_r">
                    <p class="tit">{{ item.name }}</p>

                    <p class="price">
                      价格：
                      <i>￥{{ item.price }}</i>
                      <span>{{ app._goTime(item.startTime,item.endTime) | goTime() }}天</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <!-- 海外热门 -->
      <div class="hai_hot">
        <div class="top_bar">
          <h1>海外热门</h1>
          <p @click="$router.push({path: '/news'})">探索更多海外热门</p>
        </div>

        <van-tabs :line-height="0" @click="tabBtnClick" animated>
          <van-tab v-for="(item, i ) in hot" :key="i" :title="item">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :offset="10"
            >
              <!-- <div>
                <div class="hot_wrap">
                  <div
                    class="hot_item"
                    @click="$router.push({path: `/news/newsd`,query: {id: list.id}})"
                  >
                    <div class="item_left">
                      <p class="txt">
                        白发苍苍的老人，用他自己对音乐
                        的热爱感染了在场的每一位游客！
                      </p>
                      <p class="hover">
                        皇包车 · 2天前
                        <span>评论数：5</span>
                      </p>
                    </div>
                    <div class="item_right">
                      <img src="../../assets/images/home/1.png">
                    </div>
                  </div>

                  <div
                    class="hot_all"
                    @click="$router.push({path:  `/news/newsd`,query: {id: list.id}})"
                  >
                    <div class="all_t">
                      <p>
                        白发苍苍的老人，用他自己对音乐的热爱感染了在场
                        的每一位游客，感染了在场的每一位游客！
                      </p>
                    </div>
                    <div class="all_c">
                      <div>
                        <img src="../../assets/images/home/1.png">
                      </div>
                      <div>
                        <img src="../../assets/images/home/2.png">
                      </div>
                      <div>
                        <img src="../../assets/images/home/3.png">
                      </div>
                    </div>
                    <div class="all_b">
                      <p class="hover">
                        皇包车 · 2天前
                        <span>评论数：5</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>-->

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
          </van-tab>
        </van-tabs>
      </div>

      <!-- footb -->
      <!-- <div class="footb">
        <div class="f_box">
          <div class="f_item">
            <div class="imgs">
              <img src="../../assets/images/home/f1.png">
            </div>
            <p>严选商家</p>
          </div>
          <div class="f_item">
            <div class="imgs">
              <img src="../../assets/images/home/f2.png">
            </div>
            <p>标准服务</p>
          </div>
        </div>
        <div class="f_box t">
          <div class="f_item">
            <div class="imgs">
              <img src="../../assets/images/home/f3.png">
            </div>
            <p>信息安全</p>
          </div>
          <div class="f_item">
            <div class="imgs">
              <img src="../../assets/images/home/f4.png">
            </div>
            <p>会员增值</p>
          </div>
        </div>
      </div> -->
    </div>
    <!-- foot -->
    <!-- <footer class="foot">
      <p>关于去海外</p>
      <p class="s">市场合作：support@qhiwi.com</p>
      <p class="b">备案号：xxxxxxxxxxxxx</p>
    </footer> -->
  </div>
</template>

<script>
import { BSConfigX } from "../../utils/config.js";
import { Tab, Tabs } from "vant";
import BScroll from "better-scroll";
import { mapMutations, mapGetters } from "vuex";

import { getDateDiff } from "../../api/api.js";
export default {
  inject: ["app"],
  data() {
    return {
      msg: process.env.VUE_APP_MSG,
      url: process.env.VUE_APP_URL,
      house: ["精选", "泰国", "马来西亚", "美国", "英国", "柬埔寨", "希腊"],
      jin_lx: [
        "精选",
        "幼儿",
        "小学生",
        "初中生",
        "高中生",
        "大学生",
        "在职人士",
        "亲子"
      ],
      hot: ["24h快讯", "房产", "游学", "移民", "留学", "医疗"],

      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
      index: 0,
      limit: 10,
      count: "",
      list_data: [],

      // 游学
      yx_menu: [],
      yx_page: 1,
      yx_limit: 4,
      yx_data: [],
      yx_cache: {}, // 缓存
      // 房产menu
      house_menu: [],
      house_data: [],
      houst_cache: {},
      house_referer: 0,
      // 移民menu
      immig_menu: [],
      // 留学
      study_menu: [],
      // 轮播图
      swipeImg: [],
      // 精品推荐
      recommen: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      let house = this.$refs;
      let yim = this.$refs.yim;
      if (!this.yim) {
        // this.yim = new BScroll(yim, BSConfigX);
      }
    });
  },
  computed: {
    list() {
      return this.list;
    },
    ...mapGetters(["list"])
  },
  methods: {
    getSwipeImg() {
      this.$fetch("/dhr/advertise/img?showCityNum=1").then(res => {
        if (res.ErrCode == "0000") {
          this.swipeImg = res.Result.data.slice(0, 4);
        }
      });
      this.$fetch("/dhr/advertise/text?showCityNum=1").then(res => {
        // console.log(res)
        if (res.ErrCode == "0000") {
          this.recommen = res.Result.data;
          console.log(this.recommen);
        }
      });
    },
    // 获取游学menu
    getStudyTourdata() {
      this.$fetch("/dhr/client/study_tour/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.yx_menu = res.Result.recruitStudent;
        }
      });
    },
    // 获取留学国家
    getStudyData() {
      this.$fetch("/dhr/client/study_abroad/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.study_menu = res.Result.country;
        }
      });
    },
    // 获取移民国家
    getImmigData() {
      this.$fetch("/dhr/client/migrate/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.immig_menu = res.Result.country;
          this.immigMenu(this.immig_menu);
        }
      });
    },
    // 获取房产国家
    getMenuData() {
      this.$fetch("/dhr/client/house/menu").then(res => {
        this.house_menu = res.Result;
        console.log(this.house_menu);
        this.houseMenu(this.house_menu);
      });
    },

    // 房产
    hsTabClick(i = 0, pageName = "美国") {
      if (!this.getcache('houseList','house_data', pageName))  return
      
      this.houseListData(i, pageName);
    },
    houseListData(i = 0, pageName = "美国") {
      this.$fetch("/dhr/client/house/list", {
        belongCountry: i,
        page: 1,
        limit: 4
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.house_data = res.Result.data;

          this.houst_cache[pageName] = this.house_data;
          console.log(this.houst_cache);
          sessionStorage.setItem("houseList", JSON.stringify(this.houst_cache));
        } else if (res.ErrCode == "9999") {
          this.$toast("刷新太快了");
        }
      });
    },
    // 游学
    yxBtnClick(index = 0, pageName = "幼儿") {
      if (!this.getcache('yxList', 'yx_data', pageName)) return
      this.yxListData(index, pageName)
    },
    yxListData(index = 0, pageName = "幼儿") {
      this.$fetch("/dhr/client/study_tour/list", {
        page: this.yx_page,
        limit: this.yx_limit,
        recruitStudent: index + 1
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.yx_data = res.Result.data;

          this.yx_cache[pageName] = this.yx_data;
          console.log(this.yx_cache);
          sessionStorage.setItem("yxList", JSON.stringify(this.yx_cache));
        } else if (res.ErrCode == "9999") {
          this.$toast("刷新太快了");
        }
      });
    },

    getcache(cacheName,data, pageName) {
      let list = JSON.parse(sessionStorage.getItem(cacheName));
      if (pageName in list) {
        this[data] = list[pageName];
        console.log(this[data]);
        return false;
      } else {
        this[data] = [];
        return true
      }
    },

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
    init() {
      this.getMenuData();
      this.houseListData();
      this.getImmigData();
      this.getStudyData();
      this.getStudyTourdata();
      this.yxListData();
      this.getSwipeImg();
    },
    ...mapMutations({
      set_list: "SET_LIST",
      set_title: "SET_TITLE",
      houseMenu: "HOUSE_MENU",
      immigMenu: "IMMIG_MENU"
    })
  },
  created() {
    this.init();
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>

<style lang="scss">
.swip {
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

.home {
  // card
  .van-tabs__nav--line {
    padding: 30px 0 0 0 !important;
    // margin-right: 30px;
  }
  .van-tab {
    display: inline-block;
    margin-right: 18px;
    font-weight: 500;
    white-space: nowrap;
    padding: 19px 28px;
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

  // loading
  .van-loading {
    width: 80px;
    height: 80px;
    display: inline-block;
  }
  // van-list__loading
  .van-list__loading {
    padding-top: 25px;
  }
}

// toast
.van-toast {
  font-size: 30px !important;
  padding: 30px !important;
}
</style>


<style scoped lang="scss">
.home {
  width: 100%;
  .home_top {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px 0 40px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    img {
      display: block;
      width: 100%;
    }
    .top_cen {
      width: 132px;
      height: 60px;
    }

    .top_le {
      padding-left: 30px;
      color: #9399a5;
      font-size: 28px;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        left: -5px;
        top: 2px;
        width: 36px;
        height: 36px;
        background: url("../../assets/images/home/location.png") no-repeat
          center / cover;
      }
    }

    .top_ri {
      width: 36px;
      height: 40px;
    }
  }

  .jinp {
    height: 100px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    font-size: 24px;
    font-weight: 500;
    .tuij {
      margin-right: 15px;
    }

    .jinp_some {
      margin-right: 12px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      padding: 0 15px;
      border: 1px solid #eee;
      border-radius: 24px;
    }
  }
  .swip {
    .banner_box {
      height: 420px;
      // width: 750px;
    }
  }

  .categroy {
    display: flex;
    height: 150px;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
    .cate_item {
      img {
        display: block;
        width: 48px;
        height: 48px;

        margin: 0 auto;
      }
      p {
        font-size: 24px;
        font-weight: 500;
        margin-top: 10px;
      }
    }
  }

  .content {
    padding: 50px 0 50px 30px;
    overflow: hidden;
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
    // 海外好房
    .house {
      .h_cate {
        margin-top: 39px;
        .house_content {
          overflow-y: hidden;
          overflow-x: scroll;
          text-align: center;
          // -webkit-overflow-scrolling: touch;
          &::-webkit-scrollbar {
            /*隐藏滚轮*/
            display: none;
          }
        }
        .show_box {
          // margin-top: 40px;
          display: inline-block;
          white-space: nowrap;

          .show_item {
            display: inline-block;
            margin-right: 30px;
            text-align: left;
            &:last-child {
              margin-right: 0;
            }
            .show_bg {
              width: 480px;
              height: 320px;
              border-radius: 4px;
              overflow: hidden;
            }
            .tit {
              font-size: 30px;
              font-weight: 500;
              margin-top: 18px;
            }
            .param {
              font-size: 24px;
              color: #9399a5;
              margin-top: 13px;
            }
            .price {
              font-size: 24px;
              color: #ed2530;
              margin-top: 13px;

              span {
                font-size: 34px;
              }
            }
          }
        }
      }
    }
    // 移民热门
    .yim {
      margin-top: 50px;

      .yim_box {
        margin-top: 38px;
        overflow-x: auto;
        &::-webkit-scrollbar {
          /*隐藏滚轮*/
          display: none;
        }
        ul {
          display: inline-block;
          white-space: nowrap;
          li {
            display: inline-block;
            position: relative;
            width: 200px;
            height: 200px;
            border-radius: 4px;
            overflow: hidden;
            margin-right: 30px;
            p {
              position: absolute;
              font-size: 30px;
              font-weight: bold;
              color: #fff;
              left: 10px;
              bottom: 19px;
            }

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }

    // 热门留学
    .liuxue {
      padding-right: 30px;
      margin-top: 50px;
      .lx_top_bar {
        padding-right: 0;
      }
      .lx_box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 38px;
        .lx_item {
          width: 340px;
          height: 163px;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 24px;
          flex-wrap: wrap;
          &:nth-child(1) {
            background: url("../../assets/images/home/m.png") no-repeat center /
              cover;
          }
          &:nth-child(2) {
            background: url("../../assets/images/home/ao.png") no-repeat center /
              cover;
          }
          &:nth-child(3) {
            background: url("../../assets/images/home/yin.png") no-repeat center /
              cover;
            margin-top: 10px;
          }
          &:nth-child(4) {
            background: url("../../assets/images/home/jia.png") no-repeat center /
              cover;
            margin-top: 10px;
          }
          & > div {
            img {
              width: 48px;
              height: 48px;
              display: block;
              margin: 0 auto;
            }
          }
        }
      }
    }

    // 精品海外游学
    .jin_liuxue {
      margin-top: 50px;

      .liux_box {
        margin-top: 38px;
      }
      .lx_content {
        padding-right: 35px;
        text-align: center;
        .lx_c_item {
          display: flex;
          margin-bottom: 20px;
          text-align: left;
          .imgs {
            width: 210px;
            height: 210px;
            overflow: hidden;
            img {
              // height: auto !important;
            }
          }

          .lx_r {
            padding: 20px 0;
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .tit {
              font-size: 24px;
              font-weight: bold;
              line-height: 48px;
            }
            .price {
              font-size: 22px;
              color: #9399a5;
              display: flex;
              align-items: center;
              i {
                color: #ed2530;
                font-size: 34px;
                width: 150px;
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
              }
            }
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
            .txt {
              font-size: 30px;
              line-height: 40px;
              font-weight: bold;
            }
          }

          .item_right {
            width: 210px;
            height: 140px;
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
          margin-top: 40px;
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

          // .all_b {

          // }
        }
      }
    }

    .footb {
      display: flex;
      flex-direction: column;
      padding: 73px 30px 50px 0;
      .f_box {
        display: flex;
        justify-content: space-around;
        position: relative;
        &.t {
          margin-top: 60px;
        }
        &::after {
          position: absolute;
          content: "";
          width: 1px;
          height: 100%;
          background-color: #eee;
          left: 50%;
          top: 0;
        }
      }

      .f_item {
        display: flex;
        align-items: center;

        .imgs {
          width: 60px;
          height: 60px;
          overflow: hidden;
        }
        p {
          margin-left: 20px;
          font-size: 30px;
          font-weight: 500;
        }
      }
    }
  }
  .foot {
    font-size: 24px;
    color: #fff;
    font-weight: 500;
    height: 200px;
    background-color: #0d1c31;
    text-align: center;
    padding-top: 48px;
    .s {
      margin-top: 10px;
    }
    .b {
      color: #fff;
      opacity: 0.5;
      font-size: 22px;
      margin-top: 10px;
    }
  }
}
</style>
