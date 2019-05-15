<template>
  <div class="immg_detail">
    <div class="ser_img_wrap">
      <div class="card_item">
        <div class="imgs">
          <img src="../../assets/images/immig/immig.png">
        </div>

        <div class="txt">
          <h1>澳洲创业移民</h1>
          <p>移民速度最快的澳洲商业移民签证</p>
        </div>
      </div>

      <div class="card_wrap">
        <div class="card_ht">
          <span class="fuwuf">参考服务费</span>
          <span class="price">
            ￥
            <i>3.8</i>万
          </span>
          <span class="yi">（以服务商为准）</span>
        </div>

        <div class="card_ds">
          <div>
            <div class="c_ch os">
              <p class="m">3-6个月</p>
              <p>办理周期</p>
            </div>
            <div class="c_ch">
              <p class="m">永久居民</p>
              <p>身份类别</p>
            </div>
          </div>
          <div>
            <div class="c_ch os">
              <p class="m">20-50万澳币</p>
              <p>投资额度</p>
            </div>
            <div class="c_ch">
              <p class="m">无居住要求</p>
              <p>居住要求</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="supplier">
      <div class="s_tit">
        <h3>移民供应商</h3>

        <div class="s_huan">
          <p>
            换一换
            <span @click="$router.push({path: '/home/immigmore'})">更多</span>
          </p>
        </div>
      </div>

      <div class="s_item" v-for="i in 4">
        <div class="heads_img">
          <img src="../../assets/images/immig/immig.png">
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

    <div class="project">
      <van-tabs v-model="active" title-active-color="#ED2530" :line-height="1">
        <van-tab title="项目介绍">
          <div class="content">
            <p>
              如果申请墨尔本则需投资40万澳元，悉尼需50万澳元。澳洲188A创业移民，是澳洲188系列签证之一。188A签证是澳洲政府为吸引和鼓励成功商业人士前往澳洲定居，并利用其经验技术在澳继续经营生意或从事投资，设立的临时居留签证（TR）。
              澳洲188A签证申请人登陆澳洲之后，投资不少于20万澳元新建一门生意，就可符合移民局要求。如果申请墨尔本则需投资40万澳元，悉尼需50万澳元。
            </p>

            <div class="imgs">
              <img src="../../assets/images/house/pro.png">
            </div>

            <p>
              如果申请墨尔本则需投资40万澳元，悉尼需50万澳元。澳洲188A创业移民，是澳洲188系列签证之一。188A签证是澳洲政府为吸引和鼓励成功商业人士前往澳洲定居，并利用其经验技术在澳继续经营生意或从事投资，设立的临时居留签证（TR）。
              澳洲188A签证申请人登陆澳洲之后，投资不少于20万澳元新建一门生意，就可符合移民局要求。如果申请墨尔本则需投资40万澳元，悉尼需50万澳元。
            </p>
          </div>
        </van-tab>
        <van-tab title="申请条件">
          <div class="content">
            <p v-for="i in 20">1.55周岁以下或州政府豁免年龄要求,随行子女23周岁</p>
          </div>
        </van-tab>
        <van-tab title="申请流程">
          <div class="content">
            <p v-for="i in liucheng">{{ i }}</p>
          </div>
        </van-tab>
        <van-tab title="费用详情">
          <div class="content">
            <p v-for="i in liucheng">{{ i }}</p>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <con :simpleName="'海外网'"/>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import con from "../../components/conf";
export default {
  props: {},
  data() {
    return {
      active: 0,
      liucheng: [
        "1. 评估移民资格",
        "2. 签订代理协议，提供材料 ",
        "3. 向澳洲移民局递交EOI和州担保 ",
        "5. 递交移民申请材料 ",
        "6. 通知补充移民材料或直接通知体检 ",
        "7. 缴纳英语培训费 ",
        "8. 获批188A签证"
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    con
  }
};
</script>

<style lang="scss">
</style>


<style scoped lang="scss">
.immg_detail {
  background-color: #f8f8f8;
  .ser_img_wrap {
    .card_item {
      color: #fff;
      position: relative;
      .imgs {
        border-radius: 6px;
        height: 400px;
        overflow: hidden;
        position: relative;
        &::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: #000;
          opacity: 0.3;
        }
      }
      .txt {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        h1 {
          font-size: 48px;
          font-weight: bold;
          position: relative;
          &::after {
            position: absolute;
            content: "";
            width: 120px;
            height: 2px;
            background-color: #fff;
            left: 50%;
            bottom: 0;
            margin-left: -60px;
            margin-top: 10px;
          }
        }
        p {
          line-height: 36px;
          font-size: 24px;
          width: 195px;
          margin: 10px auto 0;
        }
      }
    }

    .card_wrap {
      background-color: #fff;
      padding: 30px;
      .card_ht {
        .fuwuf {
          font-size: 36px;
          font-weight: bold;
        }
        .price {
          font-size: 24px;
          color: #ed2530;
          i {
            font-size: 34px;
          }
        }
        .yi {
          color: #9399a5;
          font-size: 24px;
        }
      }

      .card_ds {
        display: flex;
        // justify-content: space-around;
        align-items: center;
        text-align: center;
        & > div {
          color: #9399a5;
          margin-top: 30px;
          font-size: 22px;
          flex: 1;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          &:first-child {
            border-right: 1px solid #eee;
          }

          .c_ch {
            padding: 49px 0;
          }
          .os {
            border-bottom: 1px solid #eee;
          }
          .m {
            color: #ed2530;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 19px;
          }
        }
      }
    }
  }

  .supplier {
    margin-top: 30px;
    padding: 40px 30px 0;
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
            background: url("../../assets/images/immig/refresh.png") no-repeat
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
          background: url("../../assets/images/immig/email.png") no-repeat
            center / 30px;
        }
        .phone {
          background: url("../../assets/images/immig/phone.png") no-repeat
            center / 30px;
        }
      }
    }
  }

  .project {
    margin-top: 30px;
    background-color: #fff;
    padding: 0 30px;
    color: #9399a5;
    line-height: 48px;
    font-size: 24px;
    .content {
      .imgs {
        width: 480px;
        height: 320px;
        overflow: hidden;
        border-radius: 5px;
        margin: 15px auto;
      }
      p {
        text-indent: 2em;
      }
    }
  }
}
</style>
