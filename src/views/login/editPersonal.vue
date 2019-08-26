<template>
  <div class="edit" ref="edit">
    <div class="top_bar">
      <div class="t_l">
        <i @click="$router.push({path: `/${cityJX}`})"></i>
        <!-- <span @click="showCity">{{ city || '深圳' }}</span> -->
      </div>
      <div class="t_c_box">
        <div class="t_c">
          <!-- <img src="../../assets/images/home/logo.png" /> -->
          编辑个人信息
        </div>
      </div>
    </div>

    <div class="name">
      <div class="n_i l" @click="toast">
        <i>头像</i>
        <div class="headImg">
          <img :src="userInfo.icon || defaultImg" />
        </div>
        <b></b>

        <!-- <input type="file" accept="image/*" multiple="multiple" capture="camera" /> -->
      </div>
      <router-link :to="{path:`/${cityJX}/nickname`}">
        <div class="n_i">
          <i>姓名</i>
          <span>{{ $store.state.isLogin ? $store.state.userInfo.name : ''}}</span>
          <b></b>
        </div>
      </router-link>
    </div>

    <div @click="logout" class="logout">
      <div class="n_i">
        <i>退出登录</i>
      </div>
    </div>

    <div class="out" v-if="iframe">
      <div class="out_wrap">
        <h3>您确定退出吗？</h3>
        <div class="mt">
          <span class="sure" @click="sure">确定</span>
          <span class="cancle" @click="cancle">取消</span>
        </div>
      </div>
    </div>

    <div class="sheet" @click.self="closeToast">
      <div class="sheet_box">
        <div class="ca">
          <div class="one">
            <label for="a">
              拍照
              <input
                id="a"
                type="file"
                accept="image/*"
                capture="camera"
                style="display:none"
                @change="upload"
              />
            </label>
          </div>
          <div class="two">
            <label for="b">
              从手机相册选择
              <input
                id="b"
                type="file"
                accept="image/*"
                style="display:none"
                @change="upload"
              />
            </label>
          </div>
        </div>
        <div class="can" @click.self="closeToast">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { setCountryMode } from "../../utils/mixins";
import { mapGetters, mapMutations } from "vuex";
import exif from "exif-js";
export default {
  mixins: [setCountryMode],
  data() {
    return {
      iframe: false,

      picValue: "",

      defaultImg:require('../../assets/images/edit.png')
      // headImg: require('../../assets/images/edit.png')
    };
  },
  computed: {
    userInfo() {
      return this.userInfo;
    },
    // head() {
    //   return this.headImg;
    // },
    ...mapGetters(["userInfo", "headImg"])
  },
  methods: {
    upload(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return; //没有图片结束操作
      this.picValue = files[0];
      console.log(this.picValue);
      this.imgPreview(this.picValue);
    },

    imgPreview(file) {
      let orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      exif.getData(file, () => {
        orientation = exif.getTag(this, "orientation");
      });

      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        let self = this;
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调

        reader.onload = function() {
          console.log(this);
          // self.headImg = this.result
          //   console.log(self.headImg)

          let param = new FormData();
          param.append("file", self.picValue);
          console.log("param::", param);
          self.$post("/dhr/user/file/test", param).then(res => {
            console.log("res", res);
            if (res.ErrCode == "0000") {
              let h = res.Result.host + "/" + res.Result.path;

              const edit = self.$refs.edit;
              edit.classList.remove("open");

              self
                .$put("/dhr/m/user/login/save", {
                  phone: self.userInfo.phone,
                  icon: h
                })
                .then(ress => {
                  if (ress.ErrCode == "0000") {
                    // self.h_img(res.Result.host + "/" + res.Result.path);
                    self
                      .$fetch("/dhr/m/user/login", {
                        phone: self.userInfo.phone
                      })
                      .then(result => {
                        self.setUserInfo(result.Result);
                      });
                  }
                });
            }
          });
        };
      }
    },

    imgPreview2(file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function() {
        Orientation = Exif.getTag(this, "Orientation");
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调

        reader.onload = function() {
          console.log(this);
        };
        // reader.onloadend = function() {
        //   let result = this.result;
        //   let img = new Image();
        //   img.src = result;
        //   //判断图片是否大于100K,是就直接上传，反之压缩图片
        //   if (this.result.length <= 100 * 1024) {
        //     self.headerImage = this.result;
        //     self.postImg();
        //   } else {
        //     img.onload = function() {
        //       let data = self.compress(img, Orientation);
        //       self.headerImage = data;
        //       self.postImg();
        //     };
        //   }
        // };
      }
    },

    // 弹出相册
    toast() {
      const edit = this.$refs.edit;
      edit.classList.add("open");
    },
    closeToast() {
      const edit = this.$refs.edit;
      edit.classList.remove("open");
    },

    logout() {
      this.iframe = true;
    },
    sure() {
      this.login(false);
      this.setUserInfo({});
      this.iframe = false;
      this.$router.push({ path: `/${this.cityJX}` });
    },
    cancle() {
      this.iframe = false;
    },
    ...mapMutations({
      login: "Login",
      setUserInfo: "USERINFO",
      h_img: "HEADIMG"
    })
  }
};
</script>

<style scoped lang="scss">
.edit {
  position: relative;
  background-color: #f5f7f9;
  height: 100vh;
  padding-top: 100px;
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
  .name,
  .logout {
    margin-top: 30px;
    padding-left: 30px;
    background-color: #fff;
    font-size: 30px;
    .n_i {
      display: flex;
      height: 90px;
      align-items: center;
      justify-content: space-between;
      position: relative;
      padding-right: 70px;

      &.l {
        border-bottom: 1px solid #e5e5e5;
      }
      i {
      }

      span {
        color: #999999;
      }

      b {
        position: absolute;
        top: 35px;
        position: absolute;
        background: url("../../assets/images/home/ri.png") no-repeat
          center/cover;
        width: 11px;
        height: 20px;
        right: 33px;
      }
      .headImg {
        width: 80px;
        height: 80px;
        overflow: hidden;
        border-radius: 50%;
      }
    }
  }

  .out {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);

    .out_wrap {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 560px;
      border-radius: 8px;
      transform: translate(-50%, -50%);
      background-color: #fff;
      font-size: 28px;
      text-align: center;
      h3 {
        padding: 77px 0 125px;
      }
      .mt {
        display: flex;

        height: 70px;
        span {
          flex: 1;
          height: 70px;
          line-height: 70px;
        }
        .sure {
          color: #f6524e;
        }
        .cancle {
          color: #999999;
        }
      }
    }
  }

  &.open .sheet {
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.4) !important;
  }
  &.open .sheet .sheet_box {
    transform: none !important;
  }
  .sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    visibility: hidden;
    width: 100%;
    height: 100%;
    background-color: transparent;
    transition: all 0.15s ease-in-out;
    .sheet_box {
      position: absolute;
      left: 0;
      bottom: 20px;
      right: 0;
      width: 100%;
      transform: translate3d(0, 100%, 0);
      transition: all 0.5s cubic-bezier(0.36, 0.66, 0.04, 1);
      & > div {
        width: 9.2rem;
        background: #fff;
        border-radius: 0.10667rem;
        text-align: center;
        line-height: 1.32rem;
        font-size: 0.45333rem;
        margin: 0 auto;
      }

      .ca {
        color: #5c98f8;
        margin-bottom: 0.13333rem;
        label {
          width: 100%;
          display: block;
        }
      }

      .can {
        color: #ed2530;
      }
    }
  }
}
</style>
