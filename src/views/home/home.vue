<template>
  <div class="home">
    <div class="home_top">
      <div class="top_le">
        <p>深圳</p>
      </div>
      <div class="top_cen">
        <img src="../../assets/images/home/logo.png">
      </div>
      <div class="top_ri">
        <img src="../../assets/images/home/per.png">
      </div>
    </div>

    <!-- 精品推荐 -->
    <div class="jinp">
      <div class="tuij">精品推荐</div>
      <div class="jinp_some">泰国</div>
      <div class="jinp_some">日本</div>
      <div class="jinp_some">新加坡</div>
    </div>

    <div class="swip">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in 4" :key="index">
         <div class="banner_box">
              <img src="../../assets/images/home/m-banner.png">
         </div>
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="categroy">
        <div class="cate_item">
            <img src="../../assets/images/home/house.png">
            <p>房产</p>
        </div>
        <div class="cate_item">
            <img src="../../assets/images/home/yimin.png">
            <p>移民</p>
        </div>
        <div class="cate_item">
            <img src="../../assets/images/home/liuxue.png">
            <p>留学</p>
        </div>
        <div class="cate_item">
            <img src="../../assets/images/home/youxue.png">
            <p>游学</p>
        </div>
        <div class="cate_item">
            <img src="../../assets/images/home/hot.png">
            <p>热门</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      msg: process.env.VUE_APP_MSG,
      url: process.env.VUE_APP_URL,
    };
  },
  mounted() {
    console.log(this.msg)
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss">
.swip {
  .van-swipe__indicator {
    width: 14px;
    height: 14px;
  }
  .van-swipe__indicator .van-swipe__indicator--active {
    width: 24px !important;
    height: 14px !important;
    border-radius: 7px !important;
  }
  .van-swipe__indicator--active {
    width: 24px !important;
    height: 14px !important;
    border-radius: 7px !important;
  }
}
</style>


<style scoped lang="scss">
.home {
  .home_top {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px 0 40px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    img {
      display: block;
      width: 100%;
    }

    .top_le {
      padding-left: 30px;
      color: #9399a5;
      font-size: 28px;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        left: -5px;
        top: 2px;
        width: 36px;
        height: 36px;
        background: url("../../assets/images/home/location.png") no-repeat
          center / cover;
      }
    }
  }

  .jinp {
    height: 100px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    font-size: 24px;
    font-weight: 500;
    .tuij {
      margin-right: 15px;
    }

    .jinp_some {
      margin-right: 12px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      width: 116px;
      border: 1px solid #eee;
      border-radius: 24px;
    }
  }
  .swip {

      .banner_box {
          height: 420px;
          width: 750px;
          img {
              width: 100%;
              display: block;
          }
      }
  }

  .categroy {
      display: flex;
      height: 150px;
      justify-content: space-around;
      align-items: center;
      .cate_item {
          
          img {
              display: block;
              margin: 0 auto;
              
          }
          p {
              font-size: 24px;
              font-weight: 500;
                margin-top: 10px;
          }
      }
  }
}
</style>
