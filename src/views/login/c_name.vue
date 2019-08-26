<template>
  <div class="name">
    <div class="top_bar">
      <div class="t_l">
        <i @click="$router.push({path: `/${cityJX}/edit`})"></i>
        <!-- <span @click="showCity">{{ city || '深圳' }}</span> -->
      </div>
      <div class="t_c_box">
        <div class="t_c">
          <!-- <img src="../../assets/images/home/logo.png" /> -->
          姓名
        </div>
      </div>

      <div class="bc" @click="editName">保存</div>
    </div>

    <div class>
      <div class="n_i">
        <input type="text" v-model="nikeName" />
        <div class="headImg">
          <!-- <img src="../../assets/images/lc.png" /> -->
        </div>
        <b v-show="nikeName" @click="nikeName = ''"></b>
      </div>
    </div>
  </div>
</template>

<script>
import { setCountryMode } from "../../utils/mixins";
import { mapGetters, mapMutations } from "vuex";
export default {
  mixins: [setCountryMode],
  data() {
    return {
      nikeName: this.$store.state.isLogin ? this.$store.state.userInfo.name : ""
    };
  },
  computed: {
    userInfo() {
      return this.userInfo;
    },
    ...mapGetters(["userInfo"])
  },
  methods: {
    editName() {
      console.log(this.userInfo);
      if (this.nikeName) {
        this.$put("/dhr/m/user/login/save", {
          phone: this.userInfo.phone,
          name: this.nikeName
        }).then(res => {
          //   console.log(res);
          if (res.ErrCode == "0000") {
            this.$notify({
              message: "保存成功",
              background: "#1989fa",
              duration: 3 * 1000
            });

            this.$fetch("/dhr/m/user/login", {
              phone: this.userInfo.phone
            }).then(res => {
              console.log(res);
              if (res.ErrCode == "0000") {
                this.setUserInfo(res.Result);
              }
            });
          }
        });
      }
    },
    ...mapMutations({
      login: "Login",
      setUserInfo: "USERINFO"
    })
  }
};
</script>
<style lang="scss">
.van-notify {
  padding: 30px 20px;
  font-size: 32px;
}
</style>

<style scoped lang="scss">
.name {
  background-color: #f5f7f9;
  height: 100vh;
  padding-top: 100px;
  .top_bar {
    position: relative;
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

    .bc {
      position: absolute;
      right: 30px;
      top: 30px;
      font-size: 28px;
    }
  }

  .n_i {
    margin-top: 30px;
    padding-left: 30px;
    background-color: #fff;
    font-size: 30px;
    display: flex;
    height: 90px;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding-right: 70px;
    &:first-child {
      border-bottom: 1px solid #e5e5e5;
    }
    i {
    }

    span {
      color: #999999;
    }

    b {
      position: absolute;
      top: 30px;
      position: absolute;
      background: url("../../assets/images/lc.png") no-repeat center/cover;
      width: 32px;
      height: 32px;
      right: 33px;
    }
    .headImg {
      width: 50px;
      height: 50px;
    }
  }
}
</style>

