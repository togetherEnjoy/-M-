<template>
  <div class="study_detail">
    <city ref="city"/>
    <publicHead :centerImg="centerImg" backURL="/home/study"/>
    <div class="ser_img_wrap">
      <div class="card_item">
        <div class="imgs">
          <img v-lazy="detail_data.bgImg">
        </div>

        <div class="cont_txt">
          <div
            class="badge"
            :style="{'background': `url('${detail_data.schoolBadgeImg}'),url('../../assets/images/study/yuan.png') no-repeat center/cover`}"
          ></div>
          <p class="dx">{{ detail_data.schoolName }}</p>
          <p class="yw">{{ detail_data.englishName }}</p>
          <p class="addr">{{ detail_data.hostCountry }} {{ detail_data.hostCity }}</p>
          <p class="website">{{ detail_data.schoolWebsite }}</p>
        </div>
      </div>
      <div class="rank">
        <div class="rank_l">
          <h3>国内排名</h3>
          <div>{{ detail_data.countryRanking }}</div>
          <p class="fir">1（耶鲁）</p>
          <p class="sec">3（剑桥）</p>
        </div>
        <div class="rank_r">
          <h3>国际排名</h3>
          <div>{{ detail_data.internationalRanking }}</div>
          <p class="fir">2（耶鲁）</p>
          <p class="sec">3（剑桥）</p>
        </div>
      </div>
    </div>

    <div class="supplier">
      <div class="s_tit">
        <h3>服务商家</h3>

        <div class="s_huan" ref="change">
          <p @click="referer(getStudyDetail)">换一换</p>
          <span
            @click="$router.push({path: '/home/studymore', query:{id,sourceDescription,showCity}})"
          >更多</span>
        </div>
      </div>

      <div class="s_item" v-for="(item,i) in merchant_data" :key="i">
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
            <a href="tel:400 877 1008" class="phone"></a>
          </span>
        </div>
      </div>
    </div>

    <div class="project" ref="wipe">
      <van-tabs
        v-model="active"
        title-active-color="#ED2530"
        :line-height="1"
        @click="onTabClick"
        sticky
      >
        <van-tab title="学校介绍">
          <div class="study_de">
            <div class="content">
              <van-row>
                <van-col span="8">
                  <div class="content_item">
                    <h3>录取率</h3>
                    <p>{{ detail_data.acceptanceRate }}%</p>
                  </div>
                </van-col>
                <van-col span="8">
                  <div class="content_item">
                    <h3>毕业率</h3>
                    <p>{{ detail_data.graduationRate }}%</p>
                  </div>
                </van-col>
                <van-col span="8">
                  <div class="content_item">
                    <h3>就业率</h3>
                    <p>{{ detail_data.employmentRate }}%</p>
                  </div>
                </van-col>
              </van-row>
              <!-- 二行 -->
              <van-row>
                <van-col span="8">
                  <div class="content_item">
                    <h3>毕业薪资</h3>
                    <p>{{ detail_data.salary }}%</p>
                  </div>
                </van-col>
                <van-col span="8">
                  <div class="content_item">
                    <h3>国际学生比例</h3>
                    <p>{{ detail_data.countryStudentProportion }}%</p>
                  </div>
                </van-col>
                <van-col span="8">
                  <div class="content_item">
                    <h3>学生总数量</h3>
                    <p>{{ detail_data.studentTotal }}%</p>
                  </div>
                </van-col>
              </van-row>
              <!-- 三行 -->
              <van-row>
                <van-col span="8">
                  <div class="content_item">
                    <h3>本科生数量</h3>
                    <p>{{ detail_data.undergraduatesTotal }}%</p>
                  </div>
                </van-col>
                <van-col span="8">
                  <div class="content_item">
                    <h3>研究生数量</h3>
                    <p>{{ detail_data.graduateStudentTotal }}%</p>
                  </div>
                </van-col>
                <van-col span="8">
                  <div class="content_item">
                    <h3>师生比例</h3>
                    <p>{{ detail_data.staffStudentRatio}}%</p>
                  </div>
                </van-col>
              </van-row>
              <!-- 四行 -->
              <van-row>
                <van-col span="8">
                  <div class="content_item">
                    <h3>男女比例</h3>
                    <p>{{ detail_data.maleFemaleRatio }}%</p>
                  </div>
                </van-col>
                <van-col span="8">
                  <div class="content_item">
                    <h3>办理周期</h3>
                    <p>{{ detail_data.cycle }}%</p>
                  </div>
                </van-col>
                <van-col span="8">
                  <div class="content_item">
                    <!-- <h3>就业率</h3>
                    <p>5%</p>-->
                  </div>
                </van-col>
              </van-row>
            </div>

            <p class="article" v-html="detail_data.schoolIntroduce">
              <!-- 麻省理工学院（Massachusetts Institute of Technology），简称MIT，是美国一所研究型私立大学，位于马萨诸塞州（麻省）的剑桥市，查尔斯河（Charles River）将其与波士顿的后湾区（Back Bay）隔开。麻省理工学院无论是在美国还是全世界都有非常重要的影响力，MIT培养了众多对世界产生影响的人士，是全球高科技和高等研究的先驱领导大学。
            麻省理工学院（英文全称：Massachusetts Institute of Technology， 简称MIT），位于美国马萨诸塞州剑桥市，占地面积168英亩（68.0公顷），吉祥物是海狸（Beaver），NCAA运动队绰号是工程师（Engineers），校训是“理论与实践并重”
            （Mens et Manus），英文翻译是：Mind and Hand。 MIT录取率极低，每年只录取2000人，保证了全世界最优秀的学子云集于MIT，每年能从MIT顺利毕业的人无疑是世界上最精英的一群人。
              2014年9月16日发布2014—2015年世界大学排名榜，美国麻省理工学院连续第三年位居榜首。-->
            </p>
          </div>
        </van-tab>
        <van-tab title="申请条件">
          <div class="condition" v-html="detail_data.applicationConditions">
            <!-- <h3>一. 需要参加的考试</h3>
            <p>
              We require the SAT Reasoning Test or the ACT Plus Writing with the writing test. We do not prefer one over the other.
              In addition, we require two SAT Subject Tests: one in math (level 1 or 2), and one in science (physics, chemistry, or
              biology e/m).
              1、SAT1或者ACT或者ielts
              2、SAT 2的两科
            </p>-->
          </div>
        </van-tab>
        <van-tab title="专业设置">
          <div class="condition" v-html="detail_data.professionalSetup">
            <h3>专业介绍</h3>
            <p>修读年限：4年</p>
          </div>
          <!-- <div class="condition">
            <h3>本科专业</h3>
            <p>文学：音乐学、创意写作、文学研究、语言学、戏剧艺术、艺术与设计、比较媒体研究、写作与人文</p>
          </div>-->

          <div id="swipe" ref="bs_swipe">
            <ul>
              <li v-for="i in 4">
                <img src="../../assets/images/study/swipe.png">
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="每年学费">
          <div class="mnxf" v-html="detail_data.annualFee">
            <van-row v-for="i in 2">
              <van-col span="6">
                <div class="content_item">
                  <h3>费用类型</h3>
                </div>
              </van-col>
              <van-col span="6">
                <div class="content_item">
                  <h3>学位</h3>
                </div>
              </van-col>
              <van-col span="6">
                <div class="content_item">
                  <h3>录取率</h3>
                </div>
              </van-col>
              <van-col span="6">
                <div class="content_item">
                  <h3>录取率</h3>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab title="截止日期">
          <div class="mnxf" v-html="detail_data.expirationDate">
            <van-row v-for="i in 3">
              <van-col span="12">
                <div class="content_item">
                  <h3>学位类型</h3>
                </div>
              </van-col>
              <van-col span="12">
                <div class="content_item">
                  <h3>截止日期</h3>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab title="开学日期">
          <div class="mnxf" v-html="detail_data.schoolBeginsDate">
            <van-row v-for="i in 3">
              <van-col span="12">
                <div class="content_item">
                  <h3>学位类型</h3>
                </div>
              </van-col>
              <van-col span="12">
                <div class="content_item">
                  <h3>截止日期</h3>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <con
      :simpleName="'海外网'"
      :head_img="head_img"
      :id="house_detail.merchant.id"
      :hot="hot"
      :typeOf="3"
      ref="con"
      :showCity="showCity"
      :sourceDescription="sourceDescription"
    />
  </div>
</template>

<script>
import { Tab, Tabs, Row, Col } from "vant";
import con from "../../components/conf";
import publicHead from "../../components/public_detail_head";
import city from "../../components/city_station";
import BScroll from "better-scroll";
import { BSConfigX } from "../../utils/config.js";
import { referer } from "../../utils/mixins";
const url = `/dhr/client/study_abroad/`;
export default {
  mixins: [referer],
  data() {
    return {
      active: 0,
      id: this.$route.params.id,
      detail_data: [],
      //供应商url
      refererURL: `/dhr/client/study_abroad/merchant_list`,
      sourceDescription: location.href,
      showCity: "",
      centerImg: require("../../assets/images/study/study.png")
    };
  },
  created() {
    this.getStudyDetail();
    this.getMerchantData();
  },
  methods: {
    getStudyDetail() {
      this.$fetch(url + this.id).then(res => {
        if (res.ErrCode == "0000") {
          this.detail_data = res.Result;

          this.showCity = this.detail_data.showCity;
        }
      });
    },

    onTabClick(i) {
      this.$nextTick(() => {
        if (this.$refs.bs_swipe) {
          this.bs = new BScroll(this.$refs.bs_swipe, BSConfigX);
        }
      });
    },

    // 咨询框
    showToast() {
      let con = this.$refs.con;
      con.eject();
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Row.name]: Row,
    [Col.name]: Col,
    con,
    publicHead,
    city
  }
};
</script>
<style lang="scss">
.study_detail {
  .van-tabs__wrap--scrollable .van-tab {
    flex-basis: 26% !important;
  }

  .van-row {
    border-bottom: 1px solid #eee;
    &:first-child {
      border-top: 1px solid #eee;
      background: #f4f5f6;
    }
    .van-col {
      border-right: 1px solid #eee;
      &:first-child {
        border-left: 1px solid #eee;
      }
    }
  }

  .mnxf {
    .van-row {
      height: 78px;
      .van-col {
        height: 78px;
      }
    }
  }
}
</style>

<style scoped lang="scss">
.study_detail {
  background-color: #f8f8f8;
  padding-bottom: 178px;
  padding-top: 100px;
  .ser_img_wrap {
    .card_item {
      color: #fff;
      position: relative;
      .imgs {
        border-radius: 6px;
        height: 435px;
        overflow: hidden;
        position: relative;
        width: 100%;
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

      .cont_txt {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-weight: 500;
        .badge {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          margin: auto;
          background: url("../../assets/images/study/badge.png") no-repeat
              center/106px,
            url("../../assets/images/study/yuan.png") no-repeat center/cover;
        }
        .dx {
          font-size: 30px;
          margin-top: 25px;
        }
        .yw,
        .addr,
        .website {
          font-size: 22px;
        }
        .yw {
          margin-top: 17px;
        }
        .addr {
          margin-top: 17px;
        }
        .website {
          margin-top: 17px;
          color: #9399a5;
        }
      }
    }
    .rank {
      display: flex;
      background-color: #fff;
      padding: 44px 0 30px;
      font-weight: 500;
      & > div {
        flex: 1;
        text-align: center;
        h3 {
          font-size: 24px;
        }
        div {
          width: 72px;
          height: 81px;
          background: url("../../assets/images/study/qizi.png") no-repeat center /
            cover;
          margin: 20px auto 0;
          line-height: 81px;
          color: #3db484;
          font-size: 30px;
          font-weight: bold;
        }
        .fir,
        .sec {
          font-size: 24px;
          color: #9399a5;
          margin-top: 20px;
        }
      }
      .rank_l {
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
            top: 7px;
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
    .study_de {
      padding-top: 20px;
    }
    .content {
      background-color: #fff;
      text-align: center;

      .content_item {
        font-weight: 500;
        padding: 15px 0;
        h3 {
          font-size: 22px;
          color: #9399a5;
        }
        p {
          font-size: 24px;
          color: #0d1c31;
        }
      }
    }
    .article {
      font-size: 24px;
      color: #9399a5;
      line-height: 48px;
      margin-top: 50px;
    }

    .condition {
      padding-top: 20px;
      font-size: 30px;

      h3 {
        font-size: 24px;
        color: #0d1c31;
      }
    }
    #swipe {
      width: 100%;
      overflow: hidden;
      ul {
        display: inline-block;
        white-space: nowrap;

        li {
          width: 270px;
          height: 180px;
          overflow: hidden;
          border-radius: 5px;
          display: inline-block;
          margin: 30px 30px 0 0;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .mnxf {
    padding-top: 20px;
    .content_item {
      height: 78px;
      line-height: 78px;
      font-size: 24px;
      color: #0d1c31;
      text-align: center;
    }
  }
}
</style>
