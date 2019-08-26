<template>
  <div class="zi">
    <div class="zi_box" :id="merStyle?'myStyle':''" v-if="showFoot">
      <div class="z_l">
        <div class="z_l_img" @click="$router.push({path: `/${cityJX}/merchant`,query:{id,typeOf}})">
          <img v-lazy="head_img" />
        </div>
        <div class="z_l_t">
          <h3>{{ simpleName }}</h3>
          <p>咨询量：{{ hot }}</p>
        </div>
      </div>

      <div class="btn_wrap">
        <div class="ce">
          <router-link to="/">测一测</router-link>
        </div>

        <div class="z_c" @click="eject();clickRate(id)">
          <p>{{ask}}</p>
        </div>
        <div class="z_r" @click="clickRate(id)">
          <p>
            <a :href="`tel:${myphone}`">打电话</a>
          </p>
        </div>
      </div>
    </div>

    <div class="eject_wrap" ref="eje">
      <h3>{{hd_title}}</h3>
      <p v-if="canShowMer">去海外商户将尽快联系您</p>
      <div class="names">
        <label>
          <p>
            <span>*</span>
            姓名
          </p>
          <input type="text" placeholder="请输入姓名" v-model="name" maxlength="5" minlength="1" />
        </label>
      </div>
      <div class="phone">
        <label>
          <p>
            <span>*</span>
            电话
          </p>
          <input type="telephone" placeholder="请输入电话" v-model="phone" minlength="11" maxlength="11" />
          <span class="error" ref="err_phone">{{errMSG}}</span>
        </label>
      </div>

      <div class="immed" @click="sendMSG">{{ yuyue }}</div>
    </div>

    <!-- 预约成功 toast -->
    <div class="success" ref="success">
      <div class="img">
        <img src="../assets/images/home/success.png" />
      </div>
      <p>恭喜您，预约成功</p>
    </div>

    <div class="mask" ref="mask" @click="close"></div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import { setCountryMode } from "../utils/mixins";
export default {
  mixins: [setCountryMode],
  props: {
    merStyle: {
      default: false
    },
    yuyue: {
      default: "立即预约"
    },
    canShowMer: {
      default: true
    },
    hd_title: {
      default: "预约咨询"
    },
    ask: {
      default: "在线问"
    },
    id: {},
    head_img: {},
    showFoot: {
      default: true
    },
    simpleName: {
      type: String
    },
    hot: {
      default() {
        return 10;
      }
    },
    myphone: {},
    // 产品类型
    typeOf: {},
    showCity: "",
    sourceDescription: "",

    // 文章标题
    sourceTitle: {},
    sourceDetailed: {},
    source: {
      default: 1
    }
  },
  data() {
    return {
      name: "",
      phone: "",
      errMSG: ""
    };
  },
  methods: {
    // 点击率
    clickRate() {
      this.$fetch("dhr/client/merchant_number", {
        id: this.id
      }).then(res => {
        console.log(res);
      });
    },
    // 供应商
    eject() {
      this.showAndHide("add");
      let mask = this.$refs.mask;
      mask.classList.add("show");
    },
    showAndHide(add) {
      let eje = this.$refs.eje;

      eje.classList[add]("zoomin");
    },
    close() {
      let eje = this.$refs.eje;
      let mask = this.$refs.mask;
      mask.classList.remove("show");
      eje.classList.remove("zoomin");
    },
    sendMSG() {
      console.log(this.showCity);
      console.log(this.sourceDescription);
      if (this.name && this.phone) {
        this.$post("/dhr/visitNumber/add", {
          name: this.name,
          phone: this.phone,
          typeOf: this.typeOf,
          showCity: this.showCity,
          sourceTitle: this.sourceTitle,
          showCityNum: 1,
          sourceDescription: this.sourceDescription,
          merchant_id: this.id,
          sourceDetailed: this.sourceDetailed,
          source: this.source
        }).then(res => {
          if (res.ErrCode == "0000") {
            this.showAndHide("remove");
            let success = this.$refs.success;
            success.classList.add("showToast");
            this.$refs.err_phone.style.display = "none";
            setTimeout(() => {
              success.classList.remove("showToast");
              let mask = this.$refs.mask;
              mask.classList.remove("show");
            }, 1000);
          } else {
            this.errMSG = res.ErrMsg;
            this.$refs.err_phone.style.display = "block";
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.zi {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  .zi_box {
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    height: 104px;
    background-color: #fff;
    justify-content: space-between;
    // padding: 0 30px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
  }
  .z_l {
    display: flex;
    align-self: center;
    flex: 1;
    .z_l_img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .z_l_t {
      flex: 1;
      margin-left: 15px;

      h3 {
        font-size: 28px;
        font-weight: bold;
      }
      p {
        font-size: 22px;
        font-weight: 500;
        color: #9399a5;
        margin-top: 10px;
      }
    }
  }
  .btn_wrap {
    display: flex;
    flex: 1;
    & > div {
        flex: 1;
        color:#0D1C31;
    }
    .ce {
    }
  }

  .z_c,
  .z_r {
    // width: 205px;
    // height: 90px;
    // border-radius: 10px;
    font-size: 28px;
    text-align: center;
    font-weight: bold;
    line-height: 104px;
  }
  .z_c {
    // background-color: #3cb584;
    margin-right: 15px;

    // display: none;
  }
  .z_r {
    background-color: #ED2530;
    a {
      color: #fff;
      display: block;
    }
  }

  #myStyle {
    .btn_wrap {
      justify-content: space-around;
    }
    .z_l {
      display: none;
    }
    .z_c,
    .z_r {
      width: 300px;
    }
  }

  .eject_wrap {
    position: fixed;
    background-color: #fff;
    border-radius: 8px;
    width: 690px;
    bottom: 200px;
    text-align: center;
    padding: 38px 30px 40px;
    transform: scale3d(0, 0, 0);
    z-index: 2;
    left: 50%;
    margin-left: -345px;
    h3 {
      font-size: 40px;
      font-weight: bold;
    }
    p {
      font-size: 30px;
      color: #9399a5;
      margin-top: 25px;
    }
    .names,
    .phone {
      label {
        display: flex;
        border-bottom: 1px solid #eeeeee;
        padding: 30px 0;

        p {
          margin-top: 0;
          font-size: 30px;
          margin-right: 90px;
          color: #0d1c31;

          span {
            color: #ed2530;
          }
        }
        input {
          color: #9399a5;
          font-size: 28px;
        }
      }
    }
    .names {
      margin-top: 30px;
    }
    .phone {
      margin-top: 10px;
      position: relative;
      .error {
        color: #ed2530;
        font-size: 24px;
        position: absolute;
        right: 20px;
        top: 30px;
        display: none;
      }
    }
    .immed {
      color: #fff;
      background-color: #ed2530;
      text-align: center;
      height: 80px;
      line-height: 80px;
      font-size: 32px;
      border-radius: 4px;
      margin-top: 40px;
    }
  }

  // 预约成功
  .success {
    width: 604px;
    height: 360px;
    background-color: #fff;
    border-radius: 8px;
    position: fixed;
    z-index: 2;
    top: 40%;
    left: 50%;
    margin-left: -302px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transform-origin: 0 top;
    // transition: all 1000ms cubic-bezier(0.86, 0, 0.34, 1);
    visibility: hidden;
    // opacity: 0;
    transform: translateY(-300px);

    // &.show {
    //   visibility: visible;
    //   // opacity: 1;
    //   transform: none;
    // }
    .img {
      width: 100px;
      height: 100px;
    }
    p {
      font-size: 48px;
      font-weight: 500;
      margin-top: 44px;
    }
  }

  .showToast {
    animation: showToast 1.5s cubic-bezier(0.86, 0, 0.34, 1);
  }
  @keyframes showToast {
    0% {
      visibility: visible;
      opacity: 1;
      transform: translateY(-300px);
    }
    25% {
      visibility: visible;
      opacity: 1;
      transform: none;
    }
    80% {
      visibility: visible;
      opacity: 0.5;
      transform: none;
    }
    100% {
      visibility: hidden;
      opacity: 0;
      transform: none;
    }
  }

  .zoomin {
    animation: zoomIn 0.3s both;
  }

  @keyframes zoomIn {
    0% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }

  .mask {
    visibility: hidden;
    background-color: transparent;
    transition: all 0.15s ease-in-out;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    &.show {
      visibility: visible;
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
}
</style>
