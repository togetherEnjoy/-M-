<template>
  <div class="supplier_box">
    <smenu :item="item" :athor="athor"></smenu>

    <div class="supplier">
      <div class="s_item" v-for="i in 4">
        <div class="heads_img">
          <img src="../assets/images/immig/immig.png">
        </div>

        <div class="text">
          <h3>启德留学</h3>
          <p>咨询量：500</p>
        </div>

        <div class="func">
          <span>
            <i class="email"></i>
          </span>
          <span class="pb">
            <i class="phone"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import smenu from "./slideMenu";
export default {
  props: {
    item: {
      type: Array
    },
    athor: {
      type: Array
    }
  },
  data() {
    return {
      item: ["国家", "移民项目"],
      athor: [
        "中国",
        "美国",
        "俄罗斯",
        "意大利",
        "德国",
        "英国",
        "加拿大",
        "泰国",
        "韩国"
      ]
    };
  },
  methods: {},
  components: {
    smenu
  }
};
</script>

<style scoped lang="scss">
.supplier_box {
    background-color: #F8F8F8;
  .supplier {
    margin-top: 30px;
    padding: 0 30px;
    background-color: #fff;
    .s_tit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      h3 {
        font-size: 34px;
        font-weight: 500;
      }
      .s_huan {
        font-size: 24px;
        p {
          color: #3db484;
          position: relative;
          padding-left: 25px;
          &::after {
            position: absolute;
            content: "";
            width: 18px;
            height: 18px;
            background: url("../assets/images/immig/refresh.png") no-repeat
              center / cover;
            left: 0;
            top: 6px;
          }
          span {
            color: #9399a5;
            margin-left: 30px;
          }
        }
      }
    }

    .s_item {
      display: flex;
      padding: 32px 0;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      .heads_img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
      .text {
        margin-left: 30px;
        margin-right: auto;
        h3 {
          font-size: 30px;
          font-weight: 500;
        }
        p {
          font-size: 24px;
          margin-top: 20px;
          font-weight: 500;
          color: #9399a5;
        }
      }
      .func {
        display: flex;

        span {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: #fde9ea;
          text-align: center;
          i {
            display: inline-block;
            width: 48px;
            height: 48px;
          }
        }
        .pb {
          margin-left: 20px;
        }
        .email {
          background: url("../assets/images/immig/email.png") no-repeat center /
            30px;
        }
        .phone {
          background: url("../assets/images/immig/phone.png") no-repeat center /
            30px;
        }
      }
    }
  }
}
</style>
