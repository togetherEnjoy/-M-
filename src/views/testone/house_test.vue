<template>
  <div class="h_test">
    <b @click="$router.push(`/${cityJX}`)"></b>
    <div class="h_top">
      <h3>去海外为您定制专属方案</h3>
      <p class="onep">想知道您最适合购买的房产项目？</p>
      <p class="twop">完成测一测，获取您的专属购房方案</p>
    </div>

    <!-- 意向国家 -->
    <div class="some" style="margin-top:0px">
      <h3>
        1.意向国家
        <span>（最多可选3个）</span>
      </h3>

      <div class="yewub pt24">
        <label class="country" v-for="i  in lovecountry" :key="i.id">
          <input type="checkbox" ref="country" :value="i.name" name="country" v-model="country" />
          <span class="inner">{{ i.name }}</span>
        </label>
      </div>
    </div>
    <!-- 购房预算 -->
    <div class="some">
      <h3>
        2.购房预算
        <span>（单位人民币）</span>
      </h3>
      <p class="label">您为本次购房准备的未加入杠杠的预算</p>

      <div class="yusuan pt24">
        <label class="country" v-for="i in gfdata">
          <input type="radio" ref="yusuan" :value="i" name="yusuanId" v-model="gfys" />
          <span class="inner">{{i}}</span>
        </label>
      </div>
    </div>
    <!-- 计划购房开启时间 -->
    <div class="some">
      <h3>3.计划购房开启时间</h3>
      <div class="stime pt24">
        <label class="country" v-for="i in jhdata">
          <input type="radio" ref="stime" :value="i" name="stimeId" v-model="kqsj" />
          <span class="inner">{{i}}</span>
        </label>
      </div>
    </div>
    <!-- 置业目的 -->
    <div class="some">
      <h3>
        4.置业目的
        <span>（最多可选3个）</span>
      </h3>
      <div class="mudi pt24">
        <label class="country" v-for="i in zydata">
          <input type="checkbox" ref="mudi" name="mudiId" :value="i" v-model="zhiye" />
          <span class="inner">{{i}}</span>
        </label>
      </div>
    </div>
    <!-- 投资 -->
    <div class="some">
      <h3>5.当您进行投资时，您的首要目标是</h3>
      <div class="touzi pt24">
        <label class="country" v-for="i in tzdata">
          <input type="radio" ref="touzi" :value="i" name="touziId" v-model="tzmb" />
          <span class="inner">{{ i }}</span>
        </label>
      </div>
    </div>
    <!-- 手机号 -->
    <div class="some">
      <h3>6.您的手机号码</h3>

      <div class="usrphone">
        <input type="phone" placeholder="请输入您的手机号" maxlength="11" v-model="phone" />
      </div>

      <p class="anquan">您的联系方式我们会绝对保密，稍后会有顾问与您沟通测评结果</p>
    </div>

    <div class="send">
      <button @click="sendover">提交答案</button>
    </div>

    <!-- mask -->
    <div class="mask" v-show="show">
      <div class="ok">
        <div class="tr">提交成功，稍后会有移动顾问与您沟通测评结果</div>
        <div class="bd" @click.self="backhome">好的</div>
      </div>
    </div>
  </div>
</template>

<script>
import { setCountryMode, setShareTitle } from "../../utils/mixins";
export default {
  mixins: [setCountryMode, setShareTitle],
  data() {
    return {
      country: [],
      gfys: "",
      kqsj: "",
      zhiye: [],
      tzmb: "",
      phone: "",
      show: false,

      // 意向国家
      lovecountry: [],

      gfdata: [
        "100万以内",
        "100万-300万",
        "300万-500万",
        "500万-1000万",
        "1000万-3000万",
        "3000万以上"
      ],
      jhdata: [
        "随时",
        "1个月以内",
        "1个月到3个月",
        "3个月到6个月",
        "6个月到1年",
        "1年以上"
      ],
      zydata: ["投资理财", "生活自住", "旅游度假", "养老储备", "教育留学"],
      tzdata: [
        "资产保值，我不愿意承担任何投资风险",
        "尽可能保证本金安全，不在乎收益率比较低",
        "产生较多的收益，可以承担一定的投资风险",
        "实现资产大幅增长，愿意承担很大的投资风险"
      ]
    };
  },
  created() {
    this.getCountry();

    this.iosTitleImg(
      this.$route.query.simpleName + "-" + "去海外测一测",
      "测一测你的去海外指数，定制你的去海外方案。",
      this.$route.query.head_img
    );
  },
  methods: {
    getCountry() {
      this.$fetch("/dhr/client/house/menu").then(res => {
        this.lovecountry = res.Result.country.slice(1);
        console.log(this.lovecountry);
      });
    },
    sendover() {
      if (this.phone) {
        this.$post("/dhr/visitNumber/add", {
          country: this.country.toString(),
          gfys: this.gfys,
          kqsj: this.kqsj,
          zhiye: this.zhiye.toString(),
          tzmb: this.tzmb,
          phone: this.phone,
          typeOf: 1,
          merchant_id: this.$route.query.id,
          sourceDetailed: 8
        }).then(res => {
          if (res.ErrCode == "0000") {
            console.log(res);
            this.show = true;
          }
        });
      }
    },
    backhome() {
      this.show = false; 
      this.$router.push(`/${this.cityJX}`)
    }
  },
  watch: {
    country(v) {
      console.log(v);
      if (v.length >= 3) {
        let a = this.$refs.country.map(item => {
          if (!item.checked) {
            console.log("!item.checked", !item.checked);
            item.disabled = true;
          }
        });
      } else {
        let a = this.$refs.country.map(item => {
          item.disabled = false;
        });
      }
    },
    zhiye(v) {
      console.log(v);
      if (v.length >= 3) {
        let a = this.$refs.mudi.map(item => {
          if (!item.checked) {
            console.log("!item.checked", !item.checked);
            item.disabled = true;
          }
        });
      } else {
        let a = this.$refs.mudi.map(item => {
          item.disabled = false;
        });
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.h_test {
  background-color: #f8f8f8;
  position: relative;
  b {
    position: absolute;
    left: 30px;
    top: 30px;
    width: 36px;
    height: 45px;
    background: url("../../assets/images/hot/logo.png") no-repeat center / cover;
  }
  .h_top {
    // padding-top: 48px;
    background: url("../../assets/images/image_yuan@2x.png") no-repeat center /
      cover;
    height: 304px;
    text-align: center;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 40px;
      height: 56px;
      line-height: 56px;
      font-weight: normal;
    }
    p {
      min-width: 460px;
      //   padding-left: 22px;
      //   margin: 0 auto;
      font-size: 28px;
      height: 40px;
      line-height: 40px;
      margin-top: 44px;
      position: relative;
      //   text-align: left;
      &::after {
        position: absolute;
        content: "";
        width: 36px;
        height: 36px;
        left: -32px;
        top: 0;
        background: url("../../assets/images/ok.png") no-repeat center / cover;
      }
    }
    .onep {
      padding-left: 22px;
    }
    .twop {
      padding-left: 48px;
      &::after {
        left: -15px;
      }
      margin-top: 26px;
    }
  }

  .some {
    padding: 40px 52px;
    background-color: #fff;
    margin-top: 24px;
    &:first-child {
      margin-top: 0;
    }
    h3 {
      line-height: 50px;
      font-size: 36px;
      span {
        color: #9a9a9a;
        font-size: 24px;
      }
    }
    .pt24 {
      padding-top: 24px;
    }
    .label {
      color: #9a9a9a;
      font-size: 24px;
      margin-top: 5px;
    }
    .country {
      display: inline-block;
      margin-top: 24px;
      margin-right: 42px;
      input {
        display: none;
        visibility: hidden;
        &:checked + span {
          border: 1px solid #ed2530;
          color: #ed2530;
        }
      }
      span {
        display: block;
        width: 184px;
        height: 76px;
        font-size: 32px;
        color: #656c7a;
        text-align: center;
        line-height: 76px;
        border: 1px solid #656c7a;
        border-radius: 8px;
      }
    }
    .yewub {
      .country {
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
    .yusuan,
    .stime,
    .mudi {
      .country {
        &:nth-child(2n) {
          margin-right: 0;
        }
        .inner {
          width: 294px;
        }
      }
    }

    .touzi {
      .country {
        &:nth-child(2n) {
          margin-right: 0;
        }
        .inner {
          width: 648px;
        }
      }
    }

    .usrphone {
      width: 648px;
      height: 76px;
      border-radius: 8px;
      border: 1px solid #dcdcdc;
      padding-left: 20px;
      margin-top: 48px;
      font-size: 28px;
      input {
        width: 100%;
        height: 100%;
        // font-size: 28px;
      }
      & + p {
        color: #9b9b9b;
        font-size: 24px;
        // letter-spacing: 1px;
        line-height: 34px;
        margin-top: 16px;
      }
    }
  }

  .send {
    margin-top: 15px;
    background-color: #ed2530;
    text-align: center;
    font-size: 36px;
    color: #fff;
    height: 98px;
    line-height: 98px;
    button {
      display: block;
      width: 100%;
      height: 100%;
      background: transparent;
    }
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);

    .ok {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 540px;
      // margin-left: -270px;
      transform: translate(-50%, -50%);
      background-color: #fff;
      border-radius: 24px;
      text-align: center;
      .tr {
        font-size: 30px;
        line-height: 48px;
        padding: 34px 52px 22px;
        color: #030303;
        border-bottom: 1px solid #4d4d4d;
      }
      .bd {
        color: #007aff;
        font-size: 34px;
        line-height: 86px;
      }
    }
  }
}
</style>
