<template>
  <div class="zi">
    <div class="zi_box" v-if="showFoot">
      <div class="z_l">
        <div class="z_l_img">
          <img :src="head_img">
        </div>
        <div class="z_l_t">
          <h3>{{ simpleName }}</h3>
          <p>咨询量：{{ hot }}</p>
        </div>
      </div>
      <div class="z_c" @click="eject">
        <p>立即咨询</p>
      </div>
      <div class="z_r">
        <p>
          <a href="tel:400 877 1008">免费电话</a>
        </p>
      </div>
    </div>

    <div class="eject_wrap" ref="eje">
      <h3>预约咨询</h3>
      <p>去海外商户将尽快联系您</p>
      <div class="names">
        <label>
          <p>
            <span>*</span>
            姓名
          </p>
          <input type="text" placeholder="请输入姓名" v-model="name" maxlength="5" minlength="1">
        </label>
      </div>
      <div class="phone">
        <label>
          <p>
            <span>*</span>
            电话
          </p>
          <input type="telephone" placeholder="请输入电话" v-model="phone" minlength="11" maxlength="11">
        </label>
      </div>

      <div class="immed" @click="sendMSG">立即预约</div>
    </div>
    <div class="mask" ref="mask" @click="close"></div>
  </div>
</template>

<script>
export default {
  props: {
    head_img: {
      // default() {
      //   return require("../assets/images/hot/logo2.png");
      // }
    },
    showFoot: {
      default: true
    },
    simpleName: {
      type: String
    },
    hot: {},
    // 产品类型
    typeOf: {},
  },
  data() {
    return {
      name: "",
      phone: ""
    };
  },
  methods: {
    eject() {
      let eje = this.$refs.eje;
      let mask = this.$refs.mask;
      mask.classList.add("show");
      eje.classList.add("zoomin");
    },
    close() {
      let eje = this.$refs.eje;
      let mask = this.$refs.mask;
      mask.classList.remove("show");
      eje.classList.remove("zoomin");
    },
    sendMSG() {
      if (this.name && this.phone) {
        this.$post("/dhr/visitNumber/add", {
          name: this.name,
          phone: this.phone,
          typeOf: this.typeOf
        }).then(res => {
          console.log(res);
        });
      }
    }
  },
  components: {}
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
    display: flex;
    height: 98px;
    // margin-top: 60px;
    background-color: #fff;
    justify-content: space-between;
    padding: 0 30px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
  }

  .z_l {
    display: flex;
    align-self: center;
    .z_l_img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      align-self: center;
      img {
        display: block;
        width: 70%;
        object-position: center;
        margin: 0 auto;
        // height: 100%;
      }
    }
    .z_l_t {
      margin-left: 27px;

      h3 {
        font-size: 22px;
        font-weight: bold;
      }
      p {
        font-size: 20px;
        font-weight: 500;
        color: #9399a5;
        margin-top: 15px;
      }
    }
  }
  .z_c,
  .z_r {
    width: 220px;
    height: 80px;
    border-radius: 10px;
    color: #fff;
    font-size: 28px;
    text-align: center;
    line-height: 80px;
    align-self: center;
  }
  .z_c {
    background-color: #3cb584;
    // display: none;
  }
  .z_r {
    background-color: #ed2530;
    a {
      color: #fff;
      display: block;
    }
  }

  .eject_wrap {
    position: fixed;
    background-color: #fff;
    border-radius: 8px;
    width: 690px;
    bottom: 110px;
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
