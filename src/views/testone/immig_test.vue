<template>
  <div class="immig_test">
    <b @click="$router.push(`/${cityJX}`)"></b>
    <div class="h_top">
      <h3>去海外为您定制专属方案</h3>
      <p class="onep">想知道您最适合移民的国家是哪个？</p>
      <p class="twop">完成移民评估，获取您的专属移民方案</p>
    </div>

    <div class="some" style="margin-top:0px">
      <h3>
        1.意向国家
        <span>（最多可选3个）</span>
      </h3>

      <div class="yewub pt24">
        <label class="country" v-for="i  in immig_country">
          <input type="checkbox" ref="country" :value="i.name" name="country" v-model="country" />
          <span class="inner">{{i.name}}</span>
        </label>
      </div>
    </div>

    <div class="some" style="margin-top:0px">
      <h3>
        2.移民目的
        <span>（最多可选3个）</span>
      </h3>

      <div class="yewub pt24">
        <label class="country" v-for="i  in ymdata">
          <input type="checkbox" ref="ymmd" :value="i" name="ymmd" v-model="ymmd" />
          <span class="inner">{{i}}</span>
        </label>
      </div>
    </div>

    <div class="some" style="margin-top:0px">
      <h3>
        3.家庭资产
        <span>（最多可选3个）</span>
      </h3>
      <p class="label">部分移民项目对主申请人的家庭净资产有一定额度的要求</p>
      <div class="yusuan pt24">
        <label class="country" v-for="i  in jtdata">
          <input type="checkbox" ref="jtzc" :value="i" name="jtzc" v-model="jtzc" />
          <span class="inner">{{i}}</span>
        </label>
      </div>
    </div>

    <div class="some">
      <h3>
        4.居住要求
        <span>（选择您可接受的居住时间）</span>
      </h3>
      <p class="label">部分移民项目有在当地居住一定时间的要求</p>

      <div class="yusuan pt24">
        <label class="country" v-for="i in jzdata">
          <input type="radio" ref="jzyq" :value="i" name="jzyqId" v-model="jzyq" />
          <span class="inner">{{i}}</span>
        </label>
      </div>
    </div>

    <div class="some">
      <h3>
        5.最高学历
        <span>（选择您取得最高有效学历）</span>
      </h3>
      <div class="yusuan pt24">
        <label class="country" v-for="i in xldata">
          <input type="radio" ref="zgxl" :value="i" name="zgxlId" v-model="zgxl" />
          <span class="inner">{{i}}</span>
        </label>
      </div>
    </div>

    <div class="some">
      <h3>
        6.英语能力
        <span>（选择您的英语能力等级）</span>
      </h3>
      <div class="touzi pt24">
        <label class="country" v-for="i in yydata">
          <input type="radio" ref="yynl" :value="i" name="yynlId" v-model="yynl" />
          <span class="inner">{{i}}</span>
        </label>
      </div>
    </div>

    <!-- 手机号 -->
    <div class="some">
      <h3>7.您的手机号码</h3>

      <div class="usrphone">
        <input type="phone" placeholder="请输入您的手机号" maxlength="11" v-model="phone"/>
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
      ymmd: [],
      jtzc: [],
      jzyq: "",
      zgxl: "",
      yynl: "",
      phone: '',
      show: false,

      // list
      immig_country: [],
      ymdata: [
        "子女教育",
        "海外生育",
        "养老储蓄",
        "出行便利",
        "海外置业",
        "躲避雾霾",
        "投资理财",
        "旅游度假",
        "税务筹划"
      ],
      jtdata: [
        "100万以内",
        "100万-300万",
        "300万500万",
        "500万1000万",
        "1000万3000万",
        "3000万以上"
      ],
      jzdata: [
        "每年入境1次",
        "每年住7天",
        "每年住30天",
        "每年住半年",
        "累计住满2年",
        "不方便居住"
      ],
      xldata: ["高中以下", "高中或中专", "大专", "本科或硕士", "博士"],
      yydata: [
        "完全不会",
        "专业英语8级（雅思7分及以上）",
        "大学英语6级优秀（雅思6分）",
        "大学英语4级（雅思4分）",
        "中学英语水平（雅思3分）"
      ]
    };
  },
  methods: {
    getMenu() {
      this.$fetch("/dhr/client/migrate/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.immig_country = res.Result.country.slice(1);
          console.log(this.immig_country);
        }
      });
    },
    sendover() {
      if (this.phone) {
        this.$post("/dhr/visitNumber/add", {
          country: this.country.toString(),
          ymmd: this.ymmd.toString(),
          jtzc: this.jtzc.toString(),
          jzyq: this.jzyq,
          zgxl: this.zgxl,
          yynl: this.yynl,
          phone: this.phone,
          typeOf: 2,
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
  created() {
    this.getMenu();
    this.iosTitleImg(
      this.$route.query.simpleName + "-" + "去海外测一测",
      "测一测你的去海外指数，定制你的去海外方案。",
      this.$route.query.head_img
    );
  },

  watch: {
    country(v) {
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
    ymmd(v) {
      if (v.length >= 3) {
        let a = this.$refs.ymmd.map(item => {
          if (!item.checked) {
            console.log("!item.checked", !item.checked);
            item.disabled = true;
          }
        });
      } else {
        let a = this.$refs.ymmd.map(item => {
          item.disabled = false;
        });
      }
    },
    jtzc(v) {
      if (v.length >= 3) {
        let a = this.$refs.jtzc.map(item => {
          if (!item.checked) {
            console.log("!item.checked", !item.checked);
            item.disabled = true;
          }
        });
      } else {
        let a = this.$refs.jtzc.map(item => {
          item.disabled = false;
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.immig_test {
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
      padding-left: 27px;
    }
    .twop {
      padding-left: 52px;
      &::after {
        left: -6px;
      }
      margin-top: 26px;
    }
  }

  .some {
    padding: 40px 52px;
    background-color: #fff;
    margin-top: 24px;
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
