<template>
  <div class="reg">
    <div class="top_bar">
      <div class="t_l">
        <i @click="$router.push({path: `/${cityJX}/in`})"></i>
        <!-- <span @click="showCity">{{ city || '深圳' }}</span> -->
      </div>
      <div class="t_c_box">
        <div class="t_c" @click="$router.push({path: `/${cityJX}`})">
          <!-- <img src="../../assets/images/home/logo.png" /> -->
          登录/注册
        </div>
      </div>
    </div>

    <div class="lo_in">
      <h1>短信快捷登录</h1>
      <div class="ph">
        <div class="phone d">
          <label>
            <input
              type="text"
              placeholder="请输入手机号"
              maxlength="11"
              v-model="phone"
              @blur="checkPhone"
            />
            <button @click="sendQRcode" ref="code">{{getCode}}</button>
          </label>
          <b :class="{err:phoneErr}"></b>
          <i v-show="phoneErr" ref="errphone">手机号码格式错误，请重新输入</i>
        </div>

        <div class="code d">
          <label>
            <input type="text" placeholder="请输入验证码" v-model="ercode" maxlength="5" />
          </label>
        </div>
      </div>
    </div>

    <div :class="['btn',{'can': phone&&ercode&&!phoneErr}]" @click="nowLogin">
      立即登录
      <van-loading type="spinner" color="#fff" v-if="showLoading" class="vanloading" />
    </div>
  </div>
</template>

<script>
import { setCountryMode } from "../../utils/mixins";
import { clearInterval } from "timers";
import { mapMutations } from "vuex";
export default {
  mixins: [setCountryMode],
  data() {
    return {
      phone: "",
      phoneErr: false,
      ercode: "",

      getCode: "获取验证码",

      showLoading: false,
      ptiem: null,

      disable: false
    };
  },
  methods: {
    checkPhone() {
      let errphone = this.$refs.errphone;
      if (this.phone == "") {
        errphone.innerHTML = "请输入手机号码";
        this.phoneErr = true;
        return;
      }

      if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.phoneErr = true;
        errphone.innerHTML = "手机号码格式错误，请重新输入";
      } else {
        this.phoneErr = false;
      }
    },
    sendQRcode() {
      console.log(this.disable);
      // if (this.disable) return;
      if (!this.phoneErr && this.phone) {
        console.log(11);
        this.$fetch("/dhr/get/verification/sendSms", {
          phone: this.phone
        }).then(res => {
          console.log(res);
          this.disable = true;
          if (res.ErrCode == "0000") {
            let code = this.$refs.code;
            let s = 120;
            let timer = setInterval(() => {
              this.getCode = s-- + "s后重新获取";
              code.style.color = "#999999";
              if (s < 0) {
                this.getCode = "获取验证码";
                code.style.color = "#506DBB";
                this.disable = false;
                window.clearInterval(timer);
              }
            }, 1000);
          } else {
            this.$notify({
              message: '获取验证码失败',
              background: "#F23742",
              duration: 5 * 1000
            });
          }
        });
      }
    },
    // 立即登录
    nowLogin() {
      this.showLoading = true;
      if (this.phone && this.ercode && !this.phoneErr) {
        this.$post("/dhr/m/user/login", {
          phone: this.phone,
          CodeNum: this.ercode
        }).then(res => {
          console.log(res);
          if (res.ErrCode == "0000") {
            this.showLoading = false;
            this.login(true);
            this.userInfo(res.Result);
            this.$notify({
              message: "登录成功",
              background: "#1989fa",
              duration: 3 * 1000
            });
            // 3秒后跳转
            this.ptiem = setInterval(() => {
              this.$router.push(`/${this.cityJX}/in`);
            }, 3 * 1000);
          } else if (res.ErrCode == "1000") {
            this.showLoading = false;
            this.$notify({
              message: res.ErrMsg,
              background: "#F23742",
              duration: 5 * 1000
            });
          }
        });
      }
    },
    ...mapMutations({
      login: "Login",
      userInfo: "USERINFO"
    })
  },
  destroyed() {
    window.clearInterval(this.ptiem);
  },
  components: {}
};
</script>
<style lang="scss">
.van-notify {
  padding: 30px 20px;
  font-size: 32px;
}
</style>

<style scoped lang="scss">
.reg {
  background-color: #fff;
  .top_bar {
    padding: 0 15px;
    height: 100px;
    background-color: #fff;
    //   display: flex;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    // position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    text-align: center;
    .t_l {
      // background: url("../assets/images/hot/logo2.png") no-repeat center / cover;
      // width: 48px;
      height: 100px;
      line-height: 100px;
      position: absolute;
      left: 10px;
      // top: 10px;
      padding-left: 95px;
      i {
        position: absolute;
        width: 36px;
        height: 36px;
        background: url("../../assets/images/left_j.png") no-repeat center /
          cover;
        left: 15px;
        top: 32px;
      }
      span {
        color: #9399a5;
        font-size: 28px;
        display: inline-block;
        height: 100%;
        position: relative;
        &::after {
          position: absolute;
          content: "";
          width: 24px;
          height: 24px;
          background: url("../../assets/images/house/gray_s.png") no-repeat
            center / cover;
          top: 39px;
          right: -30px;
        }
      }
    }
    .t_c_box {
      height: 100px;
      line-height: 100px;
    }
    .t_c {
      font-size: 36px;
      height: 60px;
      display: inline-block;
      img {
        display: block;
        // width: 100%;
      }
    }
  }
  .lo_in {
    padding: 80px 20px;
    h1 {
      font-size: 40px;
      font-weight: normal;
    }
    .ph {
      font-size: 30px;
      padding-top: 40px;
      div {
        padding: 32px 0;
        border-bottom: 1px solid #eee;
        input {
          width: 100%;
        }
      }
      .phone {
        position: relative;
        button {
          background-color: #fff;
          position: absolute;
          color: #506dbb;
          font-size: 28px;
          right: 5px;
          top: 40px;
        }
        i {
          position: absolute;
          bottom: -35px;
          left: 2px;
          color: #f6524e;
          font-size: 24px;
        }
        b {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background-color: #f6524e;
          transform: scaleX(0);
          transform-origin: right center;
          transition: transform 0.1s ease-in-out;
        }
        b.err {
          transform: scaleX(1);
          transform-origin: left center;
        }
      }
      .code {
        margin-top: 10px;
      }
    }
  }
  .btn {
    width: 640px;
    height: 80px;
    border-radius: 8px;
    background-color: #e4b9c4;
    color: #fff;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    margin: 236px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &.can {
      background: linear-gradient(
        90deg,
        rgba(251, 111, 119, 1) 0%,
        rgba(242, 55, 66, 1) 100%
      );
    }
  }
  .vanloading {
    margin-left: 20px;
  }
}
</style>
