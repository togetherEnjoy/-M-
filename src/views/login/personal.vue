<template>
  <div class="login">
    <div class="top_bar">
      <div class="t_l">
        <i @click="$router.push({path: `/${cityJX}`})"></i>
        <!-- <span @click="showCity">{{ city || '深圳' }}</span> -->
      </div>
      <div class="t_c_box">
        <div class="t_c" @click="$router.push({path: `/${cityJX}`})">
          <!-- <img src="../../assets/images/home/logo.png" /> -->
          我的个人信息
        </div>
      </div>
    </div>
    <div class="wrap">
      <div class="reg" @click="jump">
        <div class="reg_wrap">
          <div class="img">
            <img :src="userInfo.icon || defaultImg" />
          </div>
          <p>{{ $store.state.isLogin ? ($store.state.userInfo.name ? $store.state.userInfo.name : $store.state.userInfo.phone) : '注册/登录'}}</p>
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setCountryMode } from "../../utils/mixins";
import { mapGetters } from "vuex";
export default {
  name: "login",
  mixins: [setCountryMode],
  data() {
    return {
      defaultImg:require('../../assets/images/edit.png')
    };
  },
  computed: {
    login() {
      return this.login;
    },
    userInfo() {
      return this.userInfo;
    },
    head() {
      return this.headImg;
    },
    ...mapGetters(["login", "userInfo",'headImg'])
  },
  methods: {
    jump() {
      console.log(this.login);
      let path;

      //  path = `/${this.cityJX}/edit`;

      if (this.login) {
        path = `/${this.cityJX}/edit`;
      } else {
        path = `/${this.cityJX}/login`;
      }
      this.$router.push({ path });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  background-color: #f5f7f9;
  .top_bar {
    padding: 0 15px;
    height: 100px;
    background-color: #fff;
    //   display: flex;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    position: fixed;
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
  .wrap {
    padding-top: 100px;
    .reg {
      height: 220px;
      background-color: #fff;
      .reg_wrap {
        display: flex;
        height: 220px;
        position: relative;
        align-items: center;
        padding: 51px 41px;
        .img {
          width: 118px;
          height: 118px;
          border-radius: 50%;
          overflow: hidden;
        }
        p {
          font-size: 36px;
          padding-left: 36px;
          color: #333333;
        }
        i {
          position: absolute;
          background: url("../../assets/images/home/ri.png") no-repeat
            center/cover;
          width: 11px;
          height: 20px;
          right: 50px;
          top: 100px;
        }
      }
    }
  }
}
</style>
