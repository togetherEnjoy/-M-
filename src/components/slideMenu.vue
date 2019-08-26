<template>
  <div class="menu">
    <div class="item_wrap">
      <div id="items" v-for="(l, i) in item" @click.prevent="chang(i,$event)" ref="par">
        <p class="txt">{{ l }}</p>
      </div>
    </div>
    <!-- :cs="navs == 0" -->
    <div :class="navs===0? 'city cs': 'city'" v-show="showCity">
      <div class="c_left" ref="bs1">
        <ul>
          <li
            v-for="(item, i) in country"
            :key="i"
            :class="{active: i == 0}"
            @click="checkCountry(i,item.id,item.letter,$event)"
          >{{ item.name }}</li>
        </ul>
      </div>

      <div class="c_right">
        <div ref="bs_city">
          <ul
            v-for="(item, i) in country"
            :key="i"
            :city="item.name"
            :id="i == 0?'fir':''"
            :class="{checked: i==checked}"
          >
            <div>
              <li
                v-for="(ci, i) in item.city"
                :key="i"
                @click="checkCtry(ci.id, $event)"
                ref="ctry"
                :country="true"
              >{{ ci.name }}</li>
            </div>
          </ul>
        </div>
      </div>
    </div>

    <div :class="navs===1? 'some one cs': 'some one'" ref="bs2">
      <div class="one">
        <ul>
          <li
            v-for="(item, i) in athor"
            :key="i"
            @click="oneClick(item.id, $event)"
            :data-id="item.id"
          >{{ item.name }}</li>
        </ul>
      </div>
    </div>

    <div :class="navs===2? 'some two cs': 'some two'" ref="bs3">
      <div class="two">
        <ul>
          <li
            v-for="(item, i) in two"
            :key="i"
            @click="twoClick(item.id, item.letter,$event)"
            :data-id="item.id"
          >{{ item.name }}</li>
        </ul>
      </div>
    </div>

    <div :class="navs===3? 'some three cs': 'some three'" :style="more? 'height:initial' : '100%'">
      <div ref="bs4" v-if="!more" style="height: 100%;overflow:hidden" class="three">
        <ul>
          <li
            v-for="(item, i) in three"
            :key="i"
            @click="threeClick(item.id, $event)"
            :data-id="item.id"
          >{{ item.name }}</li>
        </ul>
      </div>

      <div v-if="more" class="letter_more">
        <!-- 托福 -->
        <div class="tuofu t">
          <h3>托福要求</h3>
          <div class="condition">
            <p v-for="i in tf" @click="tfcheck(i.id,$event)" ref="all_p">{{i.name}}</p>
          </div>
        </div>
        <!-- 雅思 -->
        <div class="tuofu y">
          <h3>雅思要求</h3>
          <div class="condition">
            <p v-for="i in ys" @click="yscheck(i.id,$event)" ref="all_p">{{ i.name }}</p>
          </div>
        </div>

        <!-- 每年费用 -->
        <div class="tuofu f">
          <h3>每年费用</h3>
          <div class="condition">
            <p v-for="i in fy" @click="fycheck(i.id,$event)" ref="all_p">{{ i.name }}</p>
          </div>
        </div>

        <div class="func">
          <p class="cz" @click="reset">重置</p>
          <p class="qd" @click="confirm">确定</p>
        </div>
      </div>
    </div>

    <div class="mask" @click="close" ref="mask"></div>
  </div>
</template>

<script>
import { BSConfigY } from "../utils/config.js";
import BScroll from "better-scroll";
import { mapGetters, mapMutations } from "vuex";
import { setCountryMode } from "../utils/mixins";
export default {
  mixins: [setCountryMode],
  props: {
    // 国家
    setCountrymod: {},
    // 城市
    setCitymod: {},
    item: {
      type: Array
    },
    country: {
      type: Array
    },
    athor: {
      type: Array,
      default() {
        return ["不限", "投资", "教育留学", "购房移民", "自住", "度假养老"];
      }
    },
    two: {
      type: Array,
      default() {
        return ["不限", "独栋别墅", "联排别墅", "精品住宅", "双拼别墅"];
      }
    },
    three: {
      type: Array,
      default() {
        return [
          "不限",
          "50万以下",
          "50~100万",
          "100~200万",
          "200~300万",
          "300~500万",
          "500~700万",
          "700~1000万",
          "1000~1500万"
        ];
      }
    },
    more: {
      type: Boolean,
      default: false
    },

    showCity: {
      default: true
    },
    // 托福
    tf: {
      type: Array,
      default() {
        return ["不限", "不要求", "80分以下", "80~90", "91~100", "100分以上"];
      }
    },
    // 雅思
    ys: {
      type: Array,
      default() {
        return [
          "不限",
          "不要求",
          "5.5分以下",
          "5.5~6.0",
          "6.0~6.5",
          "6.5~7.0",
          "7.0~7.5",
          "7.5分以上"
        ];
      }
    },
    // 费用
    fy: {
      type: Array,
      default() {
        return [
          "不限",
          "2万美元以下",
          "2万~3万美元",
          "3万~4万美元",
          "4万美元以上"
        ];
      }
    },
    params1: "",
    params2: "",
    params3: "",
    what: {},
    oneData: {},
    twoData: {},
    threeData: {}
  },
  data() {
    return {
      checked: 0,
      navs: "",
      countryresult: "",
      result_data: [],

      ones: {},
      twos: {},
      threes: {},

      // 单选结果筛选
      radio_data: [],
      g_house: "",
      g_type: "",

      sendObj: {},
      moreData: {},

      // 设置国家
      c_jx: "",

      firstIn: true
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.aBScroll1 = new BScroll(this.$refs.bs1, BSConfigY);
      this.aBScroll2 = new BScroll(this.$refs.bs2, BSConfigY);
      this.aBScroll3 = new BScroll(this.$refs.bs3, BSConfigY);

      // this.bs_city = new BScroll(this.$refs.bs_city, BSConfigY);

      if (this.$refs.bs4) {
        this.aBScroll4 = new BScroll(this.$refs.bs4, BSConfigY);
      }
    });

    if (this.$route.query.id) {
      let par = this.$refs.par;
      console.log(par);
      let c = this.filterCountry(parseInt(this.$route.query.id));
      console.log(c);
      par[0].children[0].innerHTML = c.html;
      par[0].classList.add("active");
    }
  },
  computed: {
    screen() {
      return this.screen;
    },
    getCountry() {
      return this.set_country;
    },
    ...mapGetters({
      screen: "screen",
      setCountry: "set_country"
    })
  },

  methods: {
    tfcheck(i, e) {
      this.checkall(e);
      this.$set(this.sendObj, "TOEFL", {
        id: i,
        html: e.target.innerHTML,
        type: "TOEFL"
      });
      this.moreData.TOEFL = {
        name: e.target.innerHTML
      };
      console.log(this.sendObj);
    },
    yscheck(i, e) {
      this.checkall(e);
      this.$set(this.sendObj, "IELTS", {
        id: i,
        html: e.target.innerHTML,
        type: "IELTS"
      });
      this.moreData.IELTS = {
        name: e.target.innerHTML
      };
    },
    fycheck(i, e) {
      this.checkall(e);
      this.$set(this.sendObj, "cost", {
        id: i,
        html: e.target.innerHTML,
        type: "cost"
      });
      this.moreData.cost = {
        name: e.target.innerHTML
      };
    },

    reset() {
      let allp = this.$refs.all_p;
      allp.forEach(val => {
        if (val.classList.contains("check")) {
          val.classList.remove("check");
        }
      });
      this.$delete(this.sendObj, "TOEFL");
      this.$delete(this.sendObj, "IELTS");
      this.$delete(this.sendObj, "cost");
      this.moreData = {};
      console.log(this.moreData);
    },
    confirm() {
      let par = this.$refs.par;
      par.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });

      if (Object.keys(this.moreData).length > 1) {
        // console.log(this.moreData);
        par[3].classList.add("sect");
        par[3].children[0].innerHTML = "更多";
      } else if (Object.keys(this.moreData).length == 0) {
        par[3].classList.remove("sect");
        par[3].children[0].innerHTML = "更多";
      } else {
        par[3].classList.add("sect");
        console.log(Object.values(this.moreData)[0]);
        par[3].children[0].innerHTML = Object.values(this.moreData)[0].name;
      }

      this.$refs.mask.classList.remove("show");
      this.navs = "";

      //调用父组件方法
      this.$parent.page = 1;
      this.$parent.allListData = [];
      this.$parent.getAllList(this.sendObj);

      console.log(this.sendObj);
      this.$emit("get_result", this.sendObj);
      document.body.style.overflow = "initial";
    },

    checkall(e) {
      let ch = [...e.target.parentNode.children];
      ch.forEach(val => {
        if (val.classList.contains("check")) {
          val.classList.remove("check");
        }
      });
      e.target.classList.add("check");
    },
    chang(i, e) {
      console.log(e.target.innerHTML);

      this.$nextTick(() => {
        if (this.aBScroll1 && this.$refs.bs1) {
          // this.aBScroll1 = new BScroll(this.$refs.bs1, BSConfigY);
        }
        if (this.$refs.bs4 && !this.aBScroll4) {
          this.aBScroll4 = new BScroll(this.$refs.bs4, BSConfigY);
        }
      });

      if (!this.showCity) {
        i += 1;
      }
      let par = this.$refs.par;

      if (e.target.parentNode.classList.contains("active")) {
        if (this.firstIn) {
          if (this.$route.query.id) {
            this.navs = 0;
            this.$refs.mask.classList.remove("show");
            document.body.style.overflow = "initial";
            this.firstIn = false;
            return;
          }
        }

        e.target.parentNode.classList.remove("active");
        this.navs = "";
        this.$refs.mask.classList.remove("show");
        document.body.style.overflow = "initial";
        return;
      }

      par.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });

      e.target.parentNode.classList.add("active");
      document.body.style.overflow = "hidden";
      this.$refs.mask.classList.add("show");
      this.navs = i;
    },
    checkCountry(i, id, letter, e) {
      let par = this.$refs.par;
      let target = e.target;

      console.log(par);
      /**
       * @letter 国家的英文 名词
       */
      this.c_jx = letter;
      console.log(this.c_jx);

      if (target.innerHTML == "不限") {
        /**
         * 设置国家路由
         */
        this.$router.push({
          path: `/${this.cityJx}/${this.$parent.$options.name}`
        });

        par[0].classList.remove("sect");
        par[0].children[0].innerHTML = "国家";
        this.$delete(this.sendObj, this.setCitymod);
        this.$delete(this.sendObj, this.setCountrymod);

        console.log(this.sendObj);
        this.$parent.allListData = [];
        this.$parent.page = 1;

        this.$parent.getAllList(this.sendObj);
        this.close_all();
      } else {
        par[0].children[0].innerHTML = target.innerHTML;
        this.set_country(target.innerHTML);
      }

      let all_li = target.parentNode.children;
      let html = target.innerHTML;
      let li = [...all_li];
      li.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });
      target.classList.add("active");
      this.checked = i;
      this.$set(this.sendObj, this.setCountrymod, {
        id,
        html: html,
        type: this.setCountrymod
      });
      this.$emit("get_result", this.sendObj, this.c_jx);
      // document.body.style.overflow = "initial";
    },

    checkCtry(id, e) {
      // console.log(this.c_jx)
      let par = this.$refs.par;
      let target = e.target;

      this.$router.push({
        path: `/${this.cityJx}/${this.$parent.$options.name}/${this.c_jx}`
      });

      par[0].classList.add("sect");
      if (target.innerHTML != "不限") {
        par[0].children[0].innerHTML = target.innerHTML;
      } else {
        par[0].children[0].innerHTML = this.setCountry;
      }

      let html = e.target.innerHTML;
      this.countryresult = html;
      let ctry = this.$refs.ctry;
      ctry.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });
      e.target.classList.add("active");
      if (e.target.parentNode.id == "fir") {
        this.$set(this.sendObj, this.setCountrymod, {
          id: 0,
          html: "美国",
          type: this.setCountrymod
        });
      }

      this.$set(this.sendObj, this.setCitymod, {
        id: id,
        html: html,
        type: this.setCitymod
      });
      this.close_all();
      this.$parent.page = 1;
      this.$parent.allListData = [];
      this.$emit("get_result", this.sendObj, this.c_jx);

      this.$parent.getAllList(this.sendObj);
      this.$parent.allListData = [];
      document.body.style.overflow = "initial";
    },

    teds(name, type, id, e) {
      // console.log("触发了");
      console.log(this.$parent.loading);
      let target = e.target;
      let html = target.innerHTML;
      let parent = target.parentNode.parentNode;
      let all_li = target.parentNode.children;
      let par = target.parentNode.parentNode.parentNode;
      let li = [...all_li];
      li.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });
      target.classList.add("active");
      document.body.style.overflow = "initial";
      this.$set(this.sendObj, name, {
        id: id,
        html: html,
        type: name
      });

      this.close_all();
      this.$parent.page = 1;
      this.$parent.allListData = [];
      //调用父组件方法
      this.$parent.getAllList(this.sendObj);
      console.log(this.c_jx);
      this.$emit("get_result", this.sendObj, this.c_jx);
    },

    oneClick(id, e) {
      this.setHTML(1, 0, e, this.oneData);

      console.log(e.target);
      let type = 1;
      let name = this.params1;
      this.teds(name, type, id, e);
    },
    twoClick(id, letter, e) {
      console.log(letter);
      let canLetter = true;
      if (!this.canmetaInfo) {
        canLetter = false;
      }
      if (canLetter) {
        if (letter) {
          this.c_jx = letter;
          /**
           * 设置国家路由
           */
          this.$router.push({
            path: `/${this.cityJx}/${this.$parent.$options.name}/${this.c_jx}`
          });
        } else {
          this.$router.push({
            path: `/${this.cityJx}/${this.$parent.$options.name}`
          });
        }
      }

      this.setHTML(2, 1, e, this.twoData);
      let type = 2;
      let name = this.params2;
      this.teds(name, type, id, e);
    },
    threeClick(id, e) {
      this.setHTML(3, 2, e, this.threeData);
      let type = 3;
      let name = this.params3;
      this.teds(name, type, id, e);
    },

    close() {
      this.close_all();
      document.body.style.overflow = "initial";
    },

    close_all() {
      this.$refs.mask.classList.remove("show");
      this.navs = "";
      this.$refs.par.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });
    },

    setHTML(one, two, e, InnerHTML) {
      let par = this.$refs.par;
      console.log(par[1]);
      if (this.what == 0) {
        if (e.target.innerHTML != "不限") {
          par[one].children[0].innerHTML = e.target.innerHTML;
          par[one].classList.add("sect");
        } else {
          par[one].children[0].innerHTML = InnerHTML;
          par[one].classList.remove("sect");
        }
      }
      if (this.what == 1) {
        if (e.target.innerHTML != "不限") {
          par[one].children[0].innerHTML = e.target.innerHTML;
          par[one].classList.add("sect");
        } else {
          par[one].children[0].innerHTML = InnerHTML;
          par[one].classList.remove("sect");
        }
      }
      if (this.what == 2) {
        if (e.target.innerHTML != "不限") {
          console.log(par[two]);
          par[two].children[0].innerHTML = e.target.innerHTML;
          par[two].classList.add("sect");
        } else {
          par[two].children[0].innerHTML = InnerHTML;
          par[two].classList.remove("sect");
        }
      }
    },
    filterCountry(id) {
      switch (id) {
        case 1:
          return {
            id: 1,
            html: "英国",
            type: "hostCountryNum"
          };
        case 2:
          return {
            id: 2,
            html: "加拿大",
            type: "hostCountryNum"
          };
        case 3:
          return {
            id: 3,
            html: "澳大利亚",
            type: "hostCountryNum"
          };

        case 4:
          return {
            id: 4,
            html: "美国",
            type: "hostCountryNum"
          };
      }
    },

    ...mapMutations({
      screen_result: "SCREEN_RESULT",
      set_country: "SET_COUNTRY"
    })
  },
  components: {}
};
</script>

<style scoped lang="scss">
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 999;
  .item_wrap {
    box-shadow: 0px 2px 15px 0px rgba(16, 29, 55, 0.06);
    height: 100px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    z-index: 3;
    #items {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &.sect {
        color: #ed2530 !important;
        .txt {
          &::after {
            background: url("../assets/images/house/red_s.png") no-repeat center /
              cover;
          }
        }
      }
      .txt {
        font-size: 28px;
        font-weight: 500;
        padding-right: 29px;
        position: relative;
        cursor: pointer;
        &::after {
          position: absolute;
          content: "";
          width: 24px;
          height: 24px;
          top: 7px;
          right: -2px;
          background: url("../assets/images/house/gray_s.png") no-repeat center /
            cover;
        }
      }

      &.active {
        color: #ed2530;
        .txt {
          &::after {
            background: url("../assets/images/house/red_s.png") no-repeat center /
              cover;
          }
        }
      }
    }
  }

  .city {
    height: 617px;
    display: flex;
    overflow: hidden;
    // transform: translateY(100%);
    transition: all 0.5s cubic-bezier(0.36, 0.66, 0.04, 1);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;

    &.cs {
      transform: translateY(100%);
    }
    li {
      height: 80px;
      font-size: 28px;
      font-weight: 500;
      padding-left: 80px;
      line-height: 80px;
      border-bottom: 1px solid #e5e5e5;
    }
    .c_left {
      width: 270px;
      background-color: #f8f8f8;
      overflow-y: auto;
      ul {
        display: flex;
        flex-direction: column;
        li {
          &.active {
            color: #ed2530;
          }
        }
      }
    }
    .c_right {
      flex: 1;
      position: relative;
      background-color: #fff;
      ul {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        visibility: hidden;
        overflow-y: scroll;
        opacity: 0;
        transition: all 0.5s cubic-bezier(0.36, 0.66, 0.04, 1);

        &.checked {
          visibility: visible;
          opacity: 1;
        }

        li {
          padding-left: 30px;
          &.active {
            color: #ed2530;
          }
        }
      }
    }
  }

  .some {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 617px;
    transform: translateY(-50%);
    transition: all 0.5s cubic-bezier(0.36, 0.66, 0.04, 1);
    background-color: #fff;
    z-index: 2;
    overflow: hidden;
    &.one.cs {
      transform: translateY(100%);
    }
    &.two.cs {
      transform: translateY(100%);
    }
    &.three.cs {
      transform: translateY(100%);
    }

    ul {
      display: flex;
      flex-direction: column;
      li {
        height: 80px;
        text-align: center;
        font-size: 28px;
        font-weight: 500;
        line-height: 80px;
        border-bottom: 1px solid #e5e5e5;
        &:first-child {
          // background-color: #f8f8f8;
        }
        &.active {
          color: #ed2530;
        }
      }
    }
  }

  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    visibility: hidden;
    background-color: transparent;
    transition: all 0.15s ease-in-out;
    z-index: 1;

    &.show {
      visibility: visible;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }

  .three {
    // height: initial;
  }
  .letter_more {
    padding: 30px;
    .tuofu {
      h3 {
        font-size: 28px;
        font-weight: bold;
      }
      .condition {
        display: flex;
        flex-wrap: wrap;
        padding: 30px 0 40px;
        p {
          width: 150px;
          height: 50px;
          border: 1px solid rgba(229, 229, 229, 1);
          text-align: center;
          line-height: 50px;
          font-size: 24px;
          margin-right: 30px;
          color: #9399a5;
          border-radius: 4px;
          overflow: hidden;

          &:nth-child(4n) {
            margin-right: 0;
          }
          &:nth-child(n + 5) {
            margin-top: 25px;
          }

          &.check {
            background: linear-gradient(90deg, #ed4d56, #ed2530);
            color: #fff;
            border: none;
          }
        }
      }
    }
    .func {
      display: flex;
      justify-content: space-between;
      margin: 40px 0 50px;
      p {
        width: 320px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 30px;
        font-weight: 500;
        border-radius: 4px;
      }
      .cz {
        border: 1px solid rgba(237, 37, 48, 1);
        color: #ed2530;
      }
      .qd {
        background-color: #ed2530;
        color: #fff;
      }
    }

    .t {
      label {
        display: block;
        width: 100%;
        height: 100%;
        input {
          &:checked {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
