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
            v-for="(item, i) in city"
            :key="i"
            :class="{active: i == 0}"
            @click="checkCountry(i,$event)"
          >{{ item.zo }}</li>
        </ul>
      </div>
      <div class="c_right">
        <ul v-for="(item, i) in city" :key="i" :city="item.zo" :class="{checked: i==checked}">
          <li
            v-for="(ci, i) in item.city"
            :class="{active: i==0}"
            :key="i"
            @click="checkCtry"
            ref="ctry"
          >{{ ci }}</li>
        </ul>
      </div>
    </div>

    <div :class="navs===1? 'some one cs': 'some one'" ref="bs2">
      <ul>
        <li v-for="(item, i) in athor" :key="i" @click="act">{{ item }}</li>
      </ul>
    </div>

    <div :class="navs===2? 'some two cs': 'some two'">
      <ul>
        <li v-for="(item, i) in two" :key="i" @click="act">{{ item }}</li>
      </ul>
    </div>

    <div :class="navs===3? 'some three cs': 'some three'" :style="more? 'height:inherit' : '100%'">
      <div ref="bs4" v-show="!more" style="height: 100%;overflow:hidden">
        <ul>
          <li v-for="(item, i) in three" :key="i" @click="act">{{ item }}</li>
        </ul>
      </div>

      <div v-if="more" class="letter_more">
        <!-- 托福 -->
        <div class="tuofu t">
          <h3>托福要求</h3>
          <div class="condition">
            <p v-for="i in tf" @click="tfcheck" ref="all_p">{{i}}</p>
          </div>
        </div>
        <!-- 雅思 -->
        <div class="tuofu y">
          <h3>雅思要求</h3>
          <div class="condition">
            <p v-for="i in ys" @click="yscheck" ref="all_p">{{ i }}</p>
          </div>
        </div>

        <!-- 每年费用 -->
        <div class="tuofu f">
          <h3>每年费用</h3>
          <div class="condition">
            <p v-for="i in fy" @click="fycheck" ref="all_p">{{ i }}</p>
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
export default {
  props: {
    item: {
      type: Array
    },
    city: {
      type: Array,
      default() {
        return [
          {
            zo: "不限",
            city: ["不限"]
          },
          {
            zo: "泰国",
            city: ["不限", "加利福尼亚州", "马萨诸塞州", "新泽西州", "新泽西州"]
          },
          {
            zo: "马来西亚",
            city: [
              "不限",
              "加利福尼亚州",
              "马萨诸塞州",
              "新泽西州",
              "新泽西州",
              "新泽西州"
            ]
          },
          {
            zo: "日本",
            city: ["不限", "加利福尼亚州", "马萨诸塞州", "新泽西州", "新泽西州"]
          },
          {
            zo: "美国",
            city: ["不限", "加利福尼亚州", "马萨诸塞州", "新泽西州", "新泽西州"]
          },
          {
            zo: "英国",
            city: ["不限", "加利福尼亚州", "新泽西州", "新泽西州", "新泽西州"]
          },
          {
            zo: "澳大利亚",
            city: ["不限", "马萨诸塞州", "新泽西州", "新泽西州", "新泽西州"]
          },
          {
            zo: "希腊",
            city: ["不限", "马萨诸塞州", "新泽西州", "新泽西州"]
          }
        ];
      }
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
    }
  },
  data() {
    return {
      checked: 0,
      navs: "",
      tfresult: "",
      ysresult: "",
      fyresult: "",
      countryresult: "",
      type: "",
      rank: "",
      result_data: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.aBScroll1 = new BScroll(this.$refs.bs1, BSConfigY);
      this.aBScroll2 = new BScroll(this.$refs.bs2, BSConfigY);
      if (this.$refs.bs4) {
        this.aBScroll4 = new BScroll(this.$refs.bs4, BSConfigY);
      }
    });
  },
  methods: {
    tfcheck(e) {
      this.checkall(e);
      console.log(e.target.innerHTML);
      this.tfresult = e.target.innerHTML;
    },
    yscheck(e) {
      this.checkall(e);
      this.ysresult = e.target.innerHTML;
    },
    fycheck(e) {
      this.checkall(e);
      this.fyresult = e.target.innerHTML;
    },

    reset() {
      let allp = this.$refs.all_p;
      allp.forEach(val => {
        if (val.classList.contains("check")) {
          val.classList.remove("check");
        }
      });
      this.tfresult = this.ysresult = this.fyresult = this.countryresult = this.type = this.rank =
        "";
    },
    confirm() {
      let par = this.$refs.par;
      par.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });
      this.$refs.mask.classList.remove("show");
      this.navs = "";

      if (
        !this.tfresult &&
        !this.ysresult &&
        !this.fyresult &&
        !this.countryresult &&
        !this.type &&
        !this.rank
      ) {
        this.result_data = [];
        this.$emit("get_result", this.result_data);
      } else {
        this.result_data = [
          this.tfresult,
          this.ysresult,
          this.fyresult,
          this.countryresult,
          this.type,
          this.rank
        ];

        let data = [];
        this.result_data.forEach(val => {
          if (val != "") {
            data.push(val);
          }
        });
        this.$emit("get_result", data);
        document.body.style.overflow = "initial";
      }
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
      this.$nextTick(() => {
        this.aBScroll1 = new BScroll(this.$refs.bs1, BSConfigY);
        if (this.$refs.bs4) {
          this.aBScroll4 = new BScroll(this.$refs.bs4, BSConfigY);
        }
      });

      if (!this.showCity) {
        i += 1;
      }
      let par = this.$refs.par;
      if (e.target.parentNode.classList.contains("active")) {
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
    act(e) {
      this.teds(e);
    },
    checkCountry(i, e) {
      let target = e.target;
      let all_li = target.parentNode.children;

      let li = [...all_li];
      li.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });

      target.classList.add("active");
      this.checked = i;
    },
    checkCtry(e) {
      let html = e.target.innerHTML;
      this.countryresult = html;

      let ctry = this.$refs.ctry;

      ctry.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });
      e.target.classList.add("active");
    },

    teds(e) {
      let target = e.target;
      let all_li = target.parentNode.children;
      let par = target.parentNode.parentNode;
      if (par.classList.contains("one")) {
        this.type = e.target.innerHTML;
      }
      if (par.classList.contains("two")) {
        this.rank = e.target.innerHTML;
      }
      let li = [...all_li];
      li.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });

      target.classList.add("active");
    },
    close() {
      this.$refs.mask.classList.remove("show");
      this.navs = "";
      this.$refs.par.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });
      document.body.style.overflow = "initial";
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.menu {
  position: relative;
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
      display: flex;
      align-items: center;
      cursor: pointer;
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
        visibility: hidden;
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
          background-color: #f8f8f8;
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

          &:nth-child(4n) {
            margin-right: 0;
          }
          &:nth-child(n + 5) {
            margin-top: 25px;
          }

          &.check {
            background-color: #ed2530;
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
