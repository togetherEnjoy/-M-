<template>
  <div class="test" ref="test">
    <publicHead />
    <h3>您想要测评的是？</h3>
    <h4>根据选择为您提供精准服务</h4>

    <div class="c_box">
      <div class="t_card">
        <div class="t">房产</div>
        <div class="b">
          <p>获取您的专属购房方案</p>
          <!-- <router-link to=""></router-link> -->
          <span>
            <router-link
              :to="{path:`/${cityJX}/htest`,query:{simpleName:$route.query.simpleName,head_img:$route.query.head_img,id:$route.query.id}}"
            >测一测</router-link>
          </span>
        </div>
      </div>

      <div class="t_card">
        <div class="t">移民</div>
        <div class="b">
          <p>获取您的专属移民方案</p>

          <span>
            <router-link
              :to="{path:`/${cityJX}/itest`,query:{simpleName:$route.query.simpleName,head_img:$route.query.head_img,id:$route.query.id}}"
            >测一测</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setCountryMode, setShareTitle } from "../../utils/mixins";
import publicHead from "../../components/public_detail_head";
export default {
  mixins: [setCountryMode, setShareTitle],
  created() {
    this.iosTitleImg(
      this.$route.query.simpleName + "-" + "去海外测一测",
      "测一测你的去海外指数，定制你的去海外方案。",
      this.$route.query.head_img
    );
  },
  mounted() {
    this.$refs.test.classList.add("show");
  },
  destroyed() {
    this.$refs.test.classList.remove("show");
  },
  data() {
    return {};
  },
  methods: {},
  components: {
    publicHead
  }
};
</script>

<style scoped lang="scss">
.test {
  position: relative;
  padding: 68px 30px 0;
  padding-top: 150px;
  &.show {
    h3 {
      transform: none;
    }
  }
  h3 {
    font-size: 56px;
    height: 80px;
    line-height: 80px;
    transform: translateX(100%) skew(-20deg);
    transition: all 0.5s ease-in-out 0.1s;
  }
  h4 {
    font-size: 30px;
    height: 42px;
    line-height: 42px;
    margin-top: 15px;
  }

  .c_box {
    padding-top: 68px;
  }

  &.show {
    .t_card {
      transform: none;
      opacity: 1;
      &:last-child {
        transition-delay: 0.2s;
      }
    }
  }
  .t_card {
    height: 236px;
    border-radius: 5px;
    background: url("../../assets/images/image_yuan@2x.png") no-repeat center /
      cover;
    padding: 54px 46px 0 56px;
    transform: translateY(200px);
    opacity: 0;
    transition: all 0.3s ease-in-out;

    &:last-child {
      margin-top: 48px;
    }
    .t {
      color: #fff;
      font-size: 52px;
    }
    .b {
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 28px;
        height: 40px;
        line-height: 40px;
        color: #fff;
      }
      span {
        background-color: #fff;
        color: #0d1c31;
        width: 176px;
        height: 64px;
        border-radius: 4px;
        text-align: center;
        line-height: 64px;
        font-size: 32px;
        a {
          display: block;
        }
      }
    }
  }
}
</style>
