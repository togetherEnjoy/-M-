<template>
  <div>
    <div class="top_bar">
      <div class="t_l">
        <i @click="$router.push({path: backURL})"></i>
        <span @click="showCity">{{ city || '深圳' }}</span>
      </div>
      <div class="t_c_box">
        <div class="t_c" @click="$router.push({path: '/'})">
          <img src="../assets/images/home/logo.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {bus} from '../utils/event'
export default {
  props: {
    backURL: {},
    centerImg: {},
   
  },
  data() {
    return {
       city: '深圳'
    };
  },
  methods: {
    getCity() {
      bus.$on('sendCity',(res) => {
        console.log(res)
        this.city = res
      })
    },
    showCity() {
      this.$parent.$refs.city.$el.classList.add("show");
    }
  },
  mounted() {
    this.getCity()
  },
  components: {}
};
</script>

<style scoped lang="scss">
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
      background: url("../assets/images/left_j.png") no-repeat center / cover;
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
        background: url("../assets/images/house/gray_s.png") no-repeat center /
          cover;
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
    width: 132px;
    height: 60px;
    display: inline-block;
    vertical-align: middle;
    img {
      display: block;
      // width: 100%;
    }
  }
}
</style>
