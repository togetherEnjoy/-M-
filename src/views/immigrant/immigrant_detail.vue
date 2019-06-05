<template>
  <div class="immg_detail">
    <div class="ser_img_wrap">
      <div class="card_item">
        <div class="imgs">
          <img v-lazy="immig_detail.imgs">
        </div>

        <div class="txt">
          <h1>{{ immig_detail.name }}</h1>
          <p>{{ immig_detail.subtitle }}</p>
        </div>
      </div>

      <div class="card_wrap">
        <div class="card_ht">
          <span class="fuwuf">参考服务费</span>
          <span class="price">
            ￥
            <i>{{ immig_detail.referenceServiceFee }}</i>万
          </span>
          <span class="yi">（以服务商为准）</span>
        </div>

        <div class="card_ds">
          <div>
            <div class="c_ch os">
              <p class="m">{{ immig_detail.handlingCycle }}个月</p>
              <p>办理周期</p>
            </div>
            <div class="c_ch">
              <p class="m">{{ immig_detail.identityType }}</p>
              <p>身份类别</p>
            </div>
          </div>
          <div>
            <div class="c_ch os">
              <p class="m">{{ immig_detail.investmentQuota }}万澳币</p>
              <p>投资额度</p>
            </div>
            <div class="c_ch">
              <p class="m">{{ immig_detail.demand }}</p>
              <p>居住要求</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="supplier">
      <div class="s_tit">
        <h3>移民供应商</h3>

        <div class="s_huan" ref="change">
          <p @click="referer">换一换</p>
          <span @click="$router.push({path: '/home/immigmore', query:{id}})">更多</span>
        </div>
      </div>

      <div class="s_item" v-for="(item,i) in merchant_data.slice(0, 4)" :key="i">
        <div class="heads_img">
          <img v-lazy="item.img">
        </div>

        <div class="text">
          <h3>{{ item.merchantName }}</h3>
          <p>咨询量：{{ item.hot }}</p>
        </div>

        <div class="func">
          <span @click="showToast">
            <i class="email"></i>
          </span>
          <span class="pb">
            <!-- <i class="phone"></i> -->
            <a href="tel:400 877 1008" class="phone"></a>
          </span>
        </div>
      </div>
    </div>

    <div class="project">
      <van-tabs v-model="active" title-active-color="#ED2530" :line-height="1" sticky>
        <van-tab title="项目介绍">
          <div class="content" v-html="immig_detail.projectIntroduction">
            <!-- <p>
              如果申请墨尔本则需投资40万澳元，悉尼需50万澳元。澳洲188A创业移民，是澳洲188系列签证之一。188A签证是澳洲政府为吸引和鼓励成功商业人士前往澳洲定居，并利用其经验技术在澳继续经营生意或从事投资，设立的临时居留签证（TR）。
              澳洲188A签证申请人登陆澳洲之后，投资不少于20万澳元新建一门生意，就可符合移民局要求。如果申请墨尔本则需投资40万澳元，悉尼需50万澳元。
               
            </p>-->

            <!-- <div class="imgs">
              <img src="../../assets/images/house/pro.png">
            </div>

            <p>
              如果申请墨尔本则需投资40万澳元，悉尼需50万澳元。澳洲188A创业移民，是澳洲188系列签证之一。188A签证是澳洲政府为吸引和鼓励成功商业人士前往澳洲定居，并利用其经验技术在澳继续经营生意或从事投资，设立的临时居留签证（TR）。
              澳洲188A签证申请人登陆澳洲之后，投资不少于20万澳元新建一门生意，就可符合移民局要求。如果申请墨尔本则需投资40万澳元，悉尼需50万澳元。
            </p>-->
          </div>
        </van-tab>
        <van-tab title="申请条件">
          <div class="content" v-html="immig_detail.requirement"></div>
        </van-tab>
        <van-tab title="申请流程">
          <div class="content" v-html="immig_detail.process"></div>
        </van-tab>
        <van-tab title="费用详情">
          <div class="content" v-html="immig_detail.costDetails"></div>
        </van-tab>
      </van-tabs>
    </div>

    <con :simpleName="simpleName" :head_img="head_img" :hot="hot" :typeOf="2" ref="con" />
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import con from "../../components/conf";
import { setTimeout } from "timers";

const url = `/dhr/client/migrate/`;
const gysUrl = `/dhr/business/immigrant/support`;
export default {
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
      ],
      id: this.$route.query.id,
      referer_can: true,
      immig_detail: [],
      merchant_data: [],
      simpleName: "",
      head_img: "",
      hot: "",

    };
  },
  methods: {
    // 换一换
    referer() {
      const change = this.$refs.change;
      if (this.referer_can) {
        this.referer_can = false;
        change.classList.add("refe");
        this.getMerchantData();
        setTimeout(() => {
          change.classList.remove("refe");
          this.referer_can = true;
        }, 4000);
      }
    },
    getImmigDetail() {
      this.$fetch(url + this.id).then(res => {
        console.log(res);
        if (res.ErrCode == "0000") {
          this.immig_detail = res.Result;
        }
      });
    },
    // 供应商
    getMerchantData() {
      this.$fetch(gysUrl, {
        id: this.id
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.merchant_data = res.Result.data;
          console.log(this.merchant_data);
          this.simpleName = this.merchant_data[0].merchantName;
          this.head_img = this.merchant_data[0].img;
          this.hot = this.merchant_data[0].hot;
        }
      });
    },
    // 咨询框
    showToast() {
      let con = this.$refs.con;
      con.eject();
    }
  },
  created() {
    this.getImmigDetail();
    this.getMerchantData();
  },
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
  padding-bottom: 158px;
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
        display: flex;
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
        }
        span {
          color: #9399a5;
          margin-left: 30px;
        }
        &.refe {
          p {
            &::after {
              animation: referer linear 3s forwards;
            }
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
          i,
          a {
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
      padding-top: 20px;
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
