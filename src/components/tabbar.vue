<template>
  <div class="tabbar">
    <router-link to="/news" tag="div">
      <i class="xiaoxi"></i>
      <p>消息</p>
    </router-link>
    <router-link to="/customer" tag="div">
      <i class="kehu"></i>
      <p>客户</p>
    </router-link>
    <router-link to="/shop" tag="div" class="shop">
      <i class="fffs"></i>
    </router-link>
    <router-link to="/hot" tag="div">
      <i class="remen"></i>
      <p>热门</p>
    </router-link>
    <router-link to="/my" tag="div">
      <i class="wode"></i>
      <p>我的</p>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      selected: "客户"
    };
  },
  mounted() {
    window.onresize = function() {
      console.log(document.documentElement.style.fontSize);
    };
  },

  components: {}
};
</script>

<style lang="scss" scoped>
.active-c {
  color: #5c98f8;
  & > i.xiaoxi {
    background: url("../assets/images/new_s.png") no-repeat center / cover !important;
  }
  & > i.kehu {
    background: url("../assets/images/cus2.png") no-repeat center / cover !important;
  }
  & > i.remen {
    background: url("../assets/images/hot2.png") no-repeat center / cover !important;
  }
  & > i.wode {
    background: url("../assets/images/me2.png") no-repeat center / cover !important;
  }
}
.tabbar {
  background-color: #fff;
  height: 99px;
  border-top: 1px solid #ddd;
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 19px;
  padding-top: 18px;
  z-index: 111111;
  & > div {
    width: 25%;
    flex: 1;
    text-align: center;
    cursor: pointer;
    i {
      display: block;
      width: 48px;
      height: 48px;
      margin: 0 auto;
      background: url("../assets/images/new.png") no-repeat center / cover;
      &.kehu {
        background: url("../assets/images/customer.png") no-repeat center / cover;
      }
      &.fffs {
        width: 76px;
        height: 76px;
        margin-top: -7px;
        background: url('../assets/images/shop.png') no-repeat center / cover;
      }
      &.remen {
        background: url('../assets/images/hot.png') no-repeat center / cover;
      }
      &.wode {
        background: url('../assets/images/me.png') no-repeat center / cover;
      }
    }
    img {
      width: 20pt;
      display: block;
      margin: 0 auto;
    }
  }
  .shop img {
    width: 35pt;
  }
}
</style>
