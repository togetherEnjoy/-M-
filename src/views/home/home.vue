<template>
  <div class="home">
    <city ref="city" @getCity="getCity" />
    <div class="home_top">
      <div class="top_le">
        <p @click="showCity">{{ cityName|| '北京' }}</p>
      </div>
      <div class="top_cen_wrap">
        <div class="top_cen">
          <img src="../../assets/images/home/logo.png" />
        </div>
      </div>
      <div class="top_ri">
        <router-link :to="{path:`/${cityJX}/in`}">
          <img
            :src="login ? (userInfo.icon || defaultImg ) : defaulHometImg"
            :style="{borderRadius: (login ? '50%':'')}"
          />
        </router-link>
      </div>
    </div>

    <!-- 精品推荐 -->
    <div class="jinp">
      <div class="tuij">精品推荐</div>
      <div class="box">
        <div class="jinp_some" v-for="(item, i) in recommen" :key="i">
          <a :href="item.host">{{ item.title }}</a>
        </div>
      </div>
    </div>

    <div class="swip">
      <van-swipe indicator-color="white" :autoplay="3000">
        <van-swipe-item v-for="(image, index) in swipeImg" :key="index">
          <div class="banner_box">
            <a :href="image.host">
              <img v-lazy="image.imgPath" />
              <!-- <img src="../../assets/images/home/" alt=""> -->
            </a>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="categroy">
      <!-- ${city_number} -->
      <div class="cate_item" @click="$router.push({path: `/${cityJx}/house`})">
        <div class="shadow">
          <img src="../../assets/images/home/house.png" />
        </div>
        <p>房产</p>
      </div>
      <div
        class="cate_item"
        @click="$router.push({path: `/${cityJx}/immig`,query: {hostCountryNum:''}})"
      >
        <div class="shadow">
          <img src="../../assets/images/home/yimin.png" />
        </div>
        <p>移民</p>
      </div>
      <div class="cate_item" @click="$router.push({path: `/${cityJx}/study`})">
        <div class="shadow">
          <img src="../../assets/images/home/liuxue.png" />
        </div>
        <p>留学</p>
      </div>
      <div class="cate_item" @click="$router.push({path: `/${cityJx}/studytour`})">
        <div class="shadow">
          <img src="../../assets/images/home/youxue.png" />
        </div>
        <p>游学</p>
      </div>
      <div class="cate_item" @click="$router.push({path: `/${cityJx}/news`})">
        <div class="shadow">
          <img src="../../assets/images/home/hot.png" />
        </div>
        <p>头条</p>
      </div>
    </div>

    <div class="content">
      <!-- 活动  -->
      <div class="hd_hw">
        <ul>
          <li v-for="i in HD" :key="i.id">
            <router-link :to="{path:`/${cityJX}/hwhd`,query:{id:i.id}}">
              <div class="img_content">
                <img v-lazy="i.coverImg" />
                <span>{{_UTCTimeForMat(i.startTime,'mm-dd')}}</span>
                <p class="txt_double">{{i.title}}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 海外好房 -->
      <div class="house">
        <div class="top_bar">
          <h1>海外好房</h1>
          <p style="cursor:pointer" v-on:click="$router.push({path: `/${cityJx}/house`})">探索更多海外房产</p>
        </div>
        <van-tabs :line-height="0" @click="hsTabClick" color="#000">
          <van-tab v-for="(item, i) in house_country" :key="i" :title="item.name">
            <div class="h_cate">
              <!--  @scroll="load_more" -->
              <div class="house_content" ref="house_content">
                <div class="show_box">
                  <van-loading color="#ed2530" v-if="house_data.length == 0"></van-loading>

                  <div
                    class="show_item"
                    v-for="(item, i) in house_data"
                    :key="i"
                    v-if="house_data.length>0"
                    @click="$router.push({path: `/${cityJx}/house/details`,query: {id: item.id}})"
                  >
                    <div class="show_bg">
                      <img v-lazy="item.coverImg" />
                    </div>

                    <p class="tit text_overflow">{{ item.title }}</p>
                    <p class="param">{{ item.minArea }}~{{ item.maxArea }}㎡ | 首付 10%</p>
                    <p class="price">
                      ￥
                      <span>{{ item.price }}</span>万起
                    </p>
                  </div>

                  <div
                    v-show="house_data.length>0"
                    class="show_item loadMore"
                    ref="loadmore"
                    @click="loadmore"
                  >
                    <div>
                      <span>加载更多</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <!-- 热门移民 -->
      <div class="yim">
        <div class="top_bar">
          <h1>热门移民</h1>
          <p @click="$router.push({path: `/${cityJx}/immig`,query: {hostCountryNum: ''}})">探索更多移民国家</p>
        </div>
        <div class="yim_box" ref="yim">
          <ul>
            <li
              @click="$router.push({path: `/${cityJx}/immig/${immig_menu[1].letter}`, query: {hostCountryNum: immig_menu[1].id}})"
            >
              <img src="../../assets/images/home/immig_yg.jpg" />
              <p v-if="immig_menu.length>0">{{ immig_menu[1].name }}</p>
            </li>
            <li
              @click="$router.push({path: `/${cityJx}/immig/${immig_menu[2].letter}`, query: {hostCountryNum: immig_menu[2].id}})"
            >
              <img src="../../assets/images/home/immig_jnd.jpg" />
              <p v-if="immig_menu.length>0">{{ immig_menu[2].name }}</p>
            </li>
            <li
              @click="$router.push({path: `/${cityJx}/immig/${immig_menu[3].letter}`, query: {hostCountryNum: immig_menu[3].id}})"
            >
              <img src="../../assets/images/home/aodaliya.png" />
              <p v-if="immig_menu.length>0">{{ immig_menu[3].name }}</p>
            </li>
            <li
              @click="$router.push({path: `/${cityJx}/immig/${immig_menu[4].letter}`, query: {hostCountryNum: immig_menu[4].id}})"
            >
              <img src="../../assets/images/home/meiguo.png" />
              <p v-if="immig_menu.length>0">{{ immig_menu[4].name }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 热门留学 -->
      <div class="liuxue">
        <div class="top_bar lx_top_bar">
          <h1>热门留学</h1>
          <p @click="$router.push({path: `/${cityJx}/study`})">探索更多海外留学</p>
        </div>

        <div class="lx_box">
          <div
            class="lx_item"
            @click="$router.push({path: `/${cityJx}/study`,query: {id: study_menu[1].id}})"
          >
            <div>
              <img src="../../assets/images/home/yin_l.png" />
              <p v-if="study_menu.length>0">{{ study_menu[1].name }}学院</p>
            </div>
          </div>
          <div
            class="lx_item"
            @click="$router.push({path: `/${cityJx}/study`,query: {id: study_menu[2].id}})"
          >
            <div>
              <img src="../../assets/images/home/jia_l.png" />
              <p v-if="study_menu.length>0">{{ study_menu[2].name }}学院</p>
            </div>
          </div>
          <div
            class="lx_item"
            @click="$router.push({path: `/${cityJx}/study`,query: {id: study_menu[3].id}})"
          >
            <div>
              <img src="../../assets/images/home/ao_l.png" />
              <p v-if="study_menu.length>0">{{ study_menu[3].name }}学院</p>
            </div>
          </div>
          <div
            class="lx_item"
            @click="$router.push({path: `/${cityJx}/study`,query: {id: study_menu[4].id}})"
          >
            <div>
              <img src="../../assets/images/home/m_l.png" />
              <p v-if="study_menu.length>0">{{ study_menu[4].name }}学院</p>
            </div>
          </div>
        </div>

        <van-tabs :line-height="0" @click="lxTabClick">
          <van-tab v-for="(item, i) in schoolType" :key="i" :title="item.name">
            <div class="stydu_box">
              <div class="study_box_wrap scrollBar_none">
                <van-loading color="#ed2530" v-if="lx_data.length == 0"></van-loading>
                <div
                  class="stydy_item"
                  v-for="(data, index) in lx_data"
                  :key="index"
                  @click="$router.push({path: `/${cityJx}/study/detail`,query:{id:data.id}})"
                >
                  <div class="imgs">
                    <div class="img_box">
                      <img v-lazy="data.schoolBadgeImg" />
                    </div>
                  </div>
                  <p class="text_overflow">{{ data.schoolName }}</p>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <!-- 精品海外游学 -->
      <div class="jin_liuxue">
        <div class="top_bar">
          <h1>海外游学</h1>
          <p @click="$router.push({path: `/${cityJx}/studytour`})">探索更多海外游学</p>
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
                  @click="$router.push({path:`/${cityJx}/studytour/detail`,query:{id:item.id}})"
                >
                  <div class="imgs">
                    <img v-lazy="item.coverImg" />
                  </div>
                  <div class="lx_r">
                    <p class="tit">{{ item.name }}</p>

                    <p class="price">
                      价格 &nbsp;
                      <b>￥</b>
                      <i>{{ item.price }}</i>
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
          <h1>海外头条</h1>
          <p @click="$router.push({path: `/${cityJx}/news`})">探索更多海外热门</p>
        </div>

        <van-tabs :line-height="0" @click="tabBtnClick">
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
                        <p class="txt txt_double" v-text="list.name"></p>
                        <p class="hover">
                          {{ list.merchant.simpleName }} · {{_getDateDiff(list.createdAt)}}
                          <!-- <span>评论数：{{list.comment.length}}</span> -->
                        </p>
                      </div>
                      <div class="item_right">
                        <img v-lazy="list.coverImg" />
                      </div>
                    </div>

                    <div
                      class="hot_all"
                      @click="$router.push({path:  `/${cityJx}/news/newsd`,query: {id: list.id, index}})"
                      v-if="list.coverImg && list.coverImg1 && list.coverImg2"
                      :key="i"
                    >
                      <div class="all_t">
                        <p>{{ list.name }}</p>
                      </div>
                      <div class="all_c">
                        <div>
                          <img v-lazy="list.coverImg" />
                        </div>
                        <div>
                          <img v-lazy="list.coverImg1" />
                        </div>
                        <div>
                          <img v-lazy="list.coverImg2" />
                        </div>
                      </div>
                      <div class="all_b">
                        <p class="hover">
                          {{ list.merchant.simpleName }} · {{_getDateDiff(list.createdAt)}}
                          <!-- <span>评论数：{{list.comment.length}}</span> -->
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
      </div>-->
    </div>
    <!-- foot -->
    <!-- <footer class="foot">
      <p>关于去海外</p>
      <p class="s">市场合作：support@qhiwi.com</p>
      <p class="b">备案号：xxxxxxxxxxxxx</p>
    </footer>-->
  </div>
</template>

<script>
import { BSConfigX } from "../../utils/config.js";
import { Tab, Tabs } from "vant";
import BScroll from "better-scroll";
import city from "../../components/city_station";
import { mapMutations, mapGetters } from "vuex";

import { getDateDiff } from "../../api/api.js";
import { SEOConfig, logo } from "../../utils/config";
import { UTCTimeForMat } from "../../common/timeFormat";
import { setShareTitle } from "../../utils/mixins";
export default {
  inject: ["app"],
  mixins: [setShareTitle],
  data() {
    return {
      defaulHometImg: require("../../assets/images/home/per.png"),
      defaultImg: require("../../assets/images/edit.png"),
      msg: process.env.VUE_APP_MSG,
      url: process.env.VUE_APP_FLAG,
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
      hot: ["24h快讯", "房产", "游学 ", "移民", "留学", "医疗"],

      // 活动
      HD: [],

      // 城市站
      city: "",

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
      house_country: [],
      house_data: [],
      houst_cache: {},
      house_referer: 0,
      // 移民menu
      immig_menu: [],
      // 留学
      study_menu: [],
      schoolType: [],
      lx_data: [],
      lx_page: 1,
      lx_limit: 4,
      lx_cache: {},
      // 轮播图
      swipeImg: [],
      // 精品推荐
      recommen: []
    };
  },
  computed: {
    cityName() {
      return this.cityName;
    },
    cityJx() {
      return this.cityJX;
    },
    list() {
      return this.list;
    },
    city_number() {
      return this.city_number;
    },
    login() {
      return this.login;
    },
    userInfo() {
      return this.userInfo;
    },
    ...mapGetters([
      "list",
      "city_number",
      "cityJX",
      "cityName",
      "login",
      "userInfo"
    ])
  },

  activated(){
    console.log('home activated::执行力')
     this.iosTitleImg(SEOConfig.home.title);
  },
  // beforeRouteEnter(to, from, next) { 
  //   next(vm => {
  //      console.log(vm) 
  //      vm.iosTitleImg(SEOConfig.home.title) 
  //   })
  // },
  
  methods: {
    // 左拉加载更多
    // load_more(e) {
    //   console.log(e.target.scrollLeft)
    //   let sl=e.target.scrollLeft
    //   let loadmore=   this.$refs.loadmore[0]
    //   // console.log(loadmore)
    //   if  (sl>5640&&sl<6000) {
    //     loadmore.style.width  = 300 + sl-5640 +'px'
    //     var wid =  300 + sl-5640

    //   }
    //   if (sl-5640>=wid ) {
    //       this.$router.push({path:`/${cityJX}/house`})
    //     }
    // },

    // 活动
    getHD() {
      this.$fetch("/dhr/merchant/activity/management", {
        shelf: 1,
        checkState: 1,
        by: "index_1",
        limit: 4
      }).then(res => {
        if (res.ErrCode == "0000") {
          console.log(res);
          this.HD = res.Result.data;
        }
      });
    },
    _UTCTimeForMat(utc, time = true) {
      return UTCTimeForMat(utc, time);
    },

    loadmore() {
      this.$router.push({ path: `/${this.cityJX}/house` });
    },

    // 获取城市
    getCity(val) {
      this.city = val;
    },
    // 展示城市站
    showCity() {
      let city = this.$refs.city.$el;

      city.classList.add("show");
      document.body.style = "overflow:hidden";
    },
    getSwipeImg() {
      this.$fetch("/dhr/activity/news", {
        typeOf: 6
        // businessNum: 100
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.swipeImg = res.Result.data;
          console.log(this.swipeImg);
        }
      });
      this.$fetch("/dhr/activity/news", {
        typeOf: 7,
        businessNum: 0
      }).then(res => {
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
          // console.log( this.yx_menu)
        }
      });
    },
    // 获取留学国家
    getStudyData() {
      this.$fetch("/dhr/client/study_abroad/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.study_menu = res.Result.country;
          // console.log(this.study_menu);
          this.schoolType = res.Result.schoolType;
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
        this.house_country = this.house_menu.country.slice(0, 6);
        this.houseMenu(this.house_menu);
      });
    },

    // 房产
    hsTabClick(i = "", pageName = "不限") {
      console.log(i);
      if (!this.getcache("houseList", "house_data", pageName)) return;

      // if (i) {
      //   i -= 1
      // }
      this.houseListData(i, pageName);
    },
    houseListData(i = "", pageName = "不限") {
      this.$fetch("/dhr/client/house/list", {
        belongCountry: i,
        page: 1,
        limit: 8,
        by: "index_1"
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.house_data = res.Result.data;

          this.houst_cache[pageName] = this.house_data;

          sessionStorage.setItem("houseList", JSON.stringify(this.houst_cache));
        } else if (res.ErrCode == "9999") {
          this.$toast("刷新太快了");
        }
      });
    },
    // 游学
    yxBtnClick(index = "", pageName = "不限") {
      if (!this.getcache("yxList", "yx_data", pageName)) return;
      // if (index) {
      //   index = index
      // }
      this.yxListData(index, pageName);
    },
    yxListData(index = "", pageName = "不限") {
      this.$fetch("/dhr/client/study_tour/list", {
        page: this.yx_page,
        limit: this.yx_limit,
        recruitStudent: index,
        by: "index_1"
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.yx_data = res.Result.data;
          this.yx_cache[pageName] = this.yx_data;

          sessionStorage.setItem("yxList", JSON.stringify(this.yx_cache));
        } else if (res.ErrCode == "9999") {
          this.$toast("刷新太快了");
        }
      });
    },
    // 留学
    lxTabClick(i = "", pageName = "不限") {
      if (!this.getcache("lx_List", "lx_data", pageName)) return;
      this.lxListData(i, pageName);
    },
    lxListData(index = "", pageName = "不限") {
      this.$fetch("/dhr/client/study_abroad/list", {
        page: this.lx_page,
        limit: this.lx_limit,
        schoolType: index,
        by: "index_1"
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.lx_data = res.Result.data;
          this.lx_cache[pageName] = this.lx_data;
          sessionStorage.setItem("lx_List", JSON.stringify(this.lx_cache));
        } else if (res.ErrCode == "9999") {
          this.$toast("刷新太快了");
        }
      });
    },

    getcache(cacheName, data, pageName) {
      let list = JSON.parse(sessionStorage.getItem(cacheName));
      if (pageName in list) {
        this[data] = list[pageName];

        return false;
      } else {
        this[data] = [];
        return true;
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
      let params = {
        page: this.page,
        limit: this.limit,
        checkState: 1,
        by: "index_1"
      };
      if (this.index == 0) {
        params = Object.assign(params, { by: "createdAt" });
      } else {
        params = Object.assign(params, { cate: this.index });
      }

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
        path: `/${this.cityJx}/news/hour/newsd`,
        query: { id, index: this.index }
      });
      localStorage.setItem("title", name);
      this.set_title(name || localStorage.getItem("title"));
    },

    _getDateDiff(t) {
      return getDateDiff(t);
    },
    init() {
      this.getSwipeImg();
      this.getMenuData();
      this.houseListData();
      this.getImmigData();
      this.getStudyData();
      this.getStudyTourdata();
      this.yxListData();
      this.lxListData();
    },
    ...mapMutations({
      set_list: "SET_LIST",
      set_title: "SET_TITLE",
      houseMenu: "HOUSE_MENU",
      immigMenu: "IMMIG_MENU"
      // wxShare: "SET_SHARETITLE_IMG"
    })
  },

  metaInfo() {
    return {
      title: SEOConfig.home.title,
      meta: [
        {
          name: "keywords",
          content: SEOConfig.home.keywords
        },
        {
          name: "description",
          content: SEOConfig.home.description
        }
      ]
    };
  },
  created() {
    this.getHD();
    this.init();
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    city
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
  // 去掉home的line
  .van-tabs__line {
    height: 0px !important;
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
    // display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    text-align: center;
    img {
      display: block;
      width: 100%;
    }
    .top_cen_wrap {
      height: 100px;
      line-height: 100px;
    }
    .top_cen {
      width: 140px;
      height: 60px;
      display: inline-block;
      vertical-align: middle;
    }

    .top_le {
      position: absolute;
      height: 100px;
      line-height: 100px;
      padding-left: 30px;
      color: #9399a5;
      font-size: 28px;
      margin-left: 20px;
      &::after {
        position: absolute;
        content: "";
        left: -5px;
        top: 31px;
        width: 36px;
        height: 36px;
        background: url("../../assets/images/home/location.png") no-repeat
          center / cover;
      }
    }

    .top_ri {
      position: absolute;
      right: 35px;
      top: 30px;
      width: 40px;
      height: 40px;
      img {
        object-fit: initial;
      }
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
    .box {
      white-space: nowrap;
      overflow-x: auto;
      flex: 1;
    }

    .jinp_some {
      margin-right: 12px;
      display: inline-block;
      a {
        display: inline-block;
        height: 48px;
        line-height: 48px;
        text-align: center;
        padding: 0 15px;
        border: 1px solid #eee;
        border-radius: 24px;
      }
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
    height: 188px;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
    .cate_item {
      .shadow {
        border-radius: 50%;
        box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
      }
      img {
        display: block;
        width: 86px;
        height: 86px;

        margin: 0 auto;
      }
      p {
        font-size: 24px;
        font-weight: 500;
        margin-top: 10px;
        text-align: center;
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

    // 活动版块
    .hd_hw {
      padding-bottom: 20px;
      overflow-x: auto;
      ul {
        display: inline-block;
        white-space: nowrap;
        li {
          width: 340px;
          height: 190px;
          margin-right: 10px;
          display: inline-block;
          border-radius: 4px;
          overflow: hidden;
          .img_content {
            position: relative;
            height: 100%;
            color: #fff;
            img {
            }
            span {
              position: absolute;
              left: 0;
              top: 0;
              background-color: #ed4750;
              font-size: 24px;
              padding: 7px;
            }
            p {
              font-size: 28px;
              position: absolute;
              width: 90%;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
              white-space: normal;
            }
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
          -webkit-overflow-scrolling: touch;
        }
        .show_box {
          // margin-top: 40px;
          position: relative;
          // padding-right: 80px;
          overflow-x: scroll;
          &::-webkit-scrollbar {
            /*隐藏滚轮*/
            display: none;
          }

          &::-webkit-scrollbar {
            width: 0;
            height: 0;
            background-color: rgba(240, 240, 240, 0);
          }

          display: inline-block;
          white-space: nowrap;
          .show_item {
            display: inline-block;
            margin-right: 30px;
            text-align: left;
            width: 480px;
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
              height: 57px;
              font-size: 30px;
              font-weight: bold;
              margin-top: 18px;
              overflow: hidden;
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
                font-weight: bold;
              }
            }
          }

          .loadMore {
            // position: absolute;
            // width:auto;
            // display: flex;
            display: inline-block;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.3);
            height: 320px;
            width: 100px;
            border-radius: 20px 0 0 20px;
            vertical-align: top;
            div {
              width: 50px;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            span {
              // display: block;
              // height: 100%;
              text-align: center;
              width: 35px;
              white-space: pre-wrap;
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
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            p {
              position: absolute;
              width: 100%;
              height: 70px;
              padding: 10px 10px 0;
              font-size: 30px;
              color: #fff;
              left: 0px;
              bottom: 0px;
              background: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.1),
                rgba(0, 0, 0, 0.5)
              );
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
        justify-content: space-around;
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
          flex-basis: 49%;
          &:nth-child(1) {
            background: url("../../assets/images/home/yg.jpg") no-repeat center /
              cover;
          }
          &:nth-child(2) {
            background: url("../../assets/images/home/jnd.jpg") no-repeat center /
              cover;
          }
          &:nth-child(3) {
            background: url("../../assets/images/home/adly.jpg") no-repeat
              center / cover;
            margin-top: 10px;
          }
          &:nth-child(4) {
            background: url("../../assets/images/home/mg.jpg") no-repeat center /
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

      .stydu_box {
        overflow-x: auto;
        margin-top: 38px;
        text-align: center;
        &::-webkit-scrollbar {
          /*隐藏滚轮*/
          display: none;
        }
        .study_box_wrap {
          // display: flex;
          display: inline-block;
          white-space: nowrap;
        }
        .stydy_item {
          display: inline-block;
          width: 180px;
          margin-right: 30px;

          .imgs {
            width: 180px;
            height: 180px;
            border-radius: 4px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #e4e4e4;
            .img_box {
              width: 106px;
              height: 106px;
              border-radius: 50%;
              overflow: hidden;
            }
            img {
              width: 100%;
            }
          }
          p {
            font-size: 30px;
            font-weight: 500;
            text-align: center;
            margin-top: 20px;
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
            border-radius: 4px;
            overflow: hidden;
          }

          .lx_r {
            flex: 1;
            // padding: px 0;
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
              font-size: 22px;
              color: #9399a5;
              display: flex;
              align-items: center;
              b {
                font-size: 22px;
                color: #ed2530;
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
                font-size: 24px;

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
