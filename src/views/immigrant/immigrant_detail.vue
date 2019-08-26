<template>
  <div class="immg_detail">
    <city ref="city" />
    <publicHead
      :centerImg="centerImg"
      :backURL="`/${cityJx}/immig/${$route.query.country}?hostCountryNum=${$route.query.active}`"
    />
    <div class="ser_img_wrap">
      <div class="card_item">
        <div class="imgs">
          <img v-lazy="immig_detail.imgs" />
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
              <p>办理周期</p>
              <p class="m">{{ immig_detail.handlingCycle }}</p>
            </div>
            <div class="c_ch">
              <p>投资额度</p>
              <p
                class="m"
              >{{ immig_detail.investmentQuota == '无' ?immig_detail.investmentQuota: '￥'+immig_detail.investmentQuota+'万' }}</p>
            </div>
          </div>
          <div>
            <div class="c_ch os">
              <p>身份类别</p>
              <p class="m">{{ immig_detail.identityType }}</p>
            </div>
            <div class="c_ch">
              <p>居住要求</p>
              <p class="m">{{ immig_detail.demand }}</p>
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
          <span
            @click="$router.push({path: `/${cityJx}/immigmore`, query:{id,sourceDescription,showCity,sourceTitle:immig_detail.name}})"
          >更多</span>
        </div>
      </div>

      <div class="s_item" v-for="(item,i) in merchant_data" :key="i">
        <div
          class="heads_img"
          @click="$router.push({path: `/${cityJX}/merchant`,query:{id:item.id}})"
        >
          <img v-lazy="item.headPortrait" />
        </div>

        <div class="text">
          <h3>{{ item.simpleName }}</h3>
          <p>咨询量：{{ item.actualNumber }}</p>
        </div>

        <div class="func">
          <span @click="showToast();clickRate(item.id)">
            <i class="email"></i>
          </span>
          <span class="pb" @click="clickRate(item.id)">
            <!-- <i class="phone"></i> -->
            <a :href="`tel:${item.xuNiPhone||phone}`" class="phone"></a>
          </span>
        </div>
      </div>
    </div>

    <div class="project">
      <van-tabs v-model="active" title-active-color="#ED2530" :line-height="1" sticky>
        <van-tab title="项目介绍">
          <div class="content" v-html="immig_detail.projectIntroduction"></div>
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

    <con
      v-if="merchant_data[0]"
      :simpleName="simpleName"
      :id="merchant_data[0].id"
      :head_img="head_img"
      :hot="hot"
      :myphone="merchant_data[0].xuNiPhone ||phone"
      :typeOf="2"
      ref="con"
      :showCity="immig_detail.showCity"
      :sourceDescription="sourceDescription"
      :sourceTitle="immig_detail.name"
      :sourceDetailed="2"
    />
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import con from "../../components/conf";
import {
  referer,
  clickRate,
  setCountryMode,
  phone,
  setShareTitle
} from "../../utils/mixins";
import publicHead from "../../components/public_detail_head";
import city from "../../components/city_station";
const url = `/dhr/client/migrate/`;
export default {
  mixins: [referer, clickRate, setCountryMode, phone, setShareTitle],
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
      // 供应商url
      refererURL: `/dhr/client/immigrant/support`,

      sourceDescription: location.href,
      showCity: "",

      centerImg: require("../../assets/images/immig/immig_center.png"),

      mer_name: this.$route.query.mer_name || ""
    };
  },
  metaInfo() {
    return {
      title: this.immig_detail.name + "-去海外网",
      meta: [
        {
          name: "keywords",
          content:
            this.immig_detail.labels +
            ",移民申请条件，移民申请流程，移民费用详情，移民参考服务费，投资移民，技术移民,投资移民政策，移民供应商，去海外网"
        },
        {
          name: "description",
          content: `去海外网留学为您提供美国移民项目介绍，美国移民申请条件，美国移民申请流程，美国移民政策等内容，更多精彩移民信息，就上去海外网。`
        }
      ]
    };
  },

  methods: {
    getImmigDetail() {
      console.log(this.id);
      this.$fetch(url + this.id).then(res => {
        if (res.ErrCode == "0000") {
          this.immig_detail = res.Result;
          console.log(this.immig_detail);
          this.showCity = this.immig_detail.showCity;

          // this.titleImg( this.immig_detail.name + "-去海外网",this.immig_detail.imgs);

          // ios
          this.iosTitleImg(
            this.immig_detail.name + (this.mer_name ? ("-" + this.mer_name + "-去海外网") : "-去海外网"),
            this.desc.immigd,
            this.immig_detail.imgs
          );
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
    console.log(this.$route.query.country);
    this.getImmigDetail();
    this.getMerchantData();
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    con,
    publicHead,
    city
  }
};
</script>

<style lang="scss">
</style>


<style scoped lang="scss">
.immg_detail {
  background-color: #f8f8f8;
  padding-bottom: 208px;
  padding-top: 100px;
  // position: absolute;
  // top: 0px;
  // left: 0px;
  // right: 0px;
  // bottom: 0px;
  // height: 100%;
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
        width: 90%;
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
          width: 350px;
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
            font-weight: bold;
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
          font-size: 24px;
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
            font-size: 30px;
            font-weight: bold;
            margin-top: 19px;
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
            top: 8px;
          }
        }
        span {
          color: #9399a5;
          margin-left: 30px;
        }
        &.refe {
          p {
            &::after {
              animation: referer ease-in 1s forwards;
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
          margin-top: 15px;
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
          margin-left: 30px;
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
    color: #9399a5;
    line-height: 48px;
    font-size: 30px;
    .content {
      padding: 20px 30px;
      font-size: 30px;
      min-height: 100vh;
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
