<template>
  <div class="study_detail">
    <div class="ser_img_wrap">
      <div class="card_item">
        <div class="imgs">
          <img src="../../assets/images/study/detail.png">
        </div>

        <div class="cont_txt">
          <div class="badge"></div>
          <p class="dx">哈佛大学</p>
          <p class="yw">Harvard University</p>
          <p class="addr">美国 马萨诸塞-波士顿</p>
          <p class="website">http://www.harvard.edu/</p>
        </div>
      </div>
      <div class="rank">
        <div class="rank_l">
          <h3>国内排名</h3>
          <div>2</div>
          <p class="fir">1（耶鲁）</p>
          <p class="sec">3（剑桥）</p>
        </div>
        <div class="rank_r">
          <h3>国际排名</h3>
          <div>1</div>
          <p class="fir">2（耶鲁）</p>
          <p class="sec">3（剑桥）</p>
        </div>
      </div>
    </div>

    <div class="supplier">
      <div class="s_tit">
        <h3>移民供应商</h3>

        <div class="s_huan">
          <p>
            换一换
            <span @click="$router.push({path: '/home/studymore'})">更多</span>
          </p>
        </div>
      </div>

      <div class="s_item" v-for="i in 4">
        <div class="heads_img">
          <img src="../../assets/images/study/sjhead.png">
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

    <div class="project" ref="wipe">
      <van-tabs v-model="active" title-active-color="#ED2530" :line-height="1" @click="onTabClick">
        <van-tab title="学校介绍">
          <div class="content">
            <van-row v-for="i in 4">
              <van-col span="8">
                <div class="content_item">
                  <h3>录取率</h3>
                  <p>5%</p>
                </div>
              </van-col>
              <van-col span="8">
                <div class="content_item">
                  <h3>录取率</h3>
                  <p>5%</p>
                </div>
              </van-col>
              <van-col span="8">
                <div class="content_item">
                  <h3>录取率</h3>
                  <p>5%</p>
                </div>
              </van-col>
            </van-row>
          </div>

          <p class="article">
            麻省理工学院（Massachusetts Institute of Technology），简称MIT，是美国一所研究型私立大学，位于马萨诸塞州（麻省）的剑桥市，查尔斯河（Charles River）将其与波士顿的后湾区（Back Bay）隔开。麻省理工学院无论是在美国还是全世界都有非常重要的影响力，MIT培养了众多对世界产生影响的人士，是全球高科技和高等研究的先驱领导大学。
            麻省理工学院（英文全称：Massachusetts Institute of Technology， 简称MIT），位于美国马萨诸塞州剑桥市，占地面积168英亩（68.0公顷），吉祥物是海狸（Beaver），NCAA运动队绰号是工程师（Engineers），校训是“理论与实践并重”
            （Mens et Manus），英文翻译是：Mind and Hand。 MIT录取率极低，每年只录取2000人，保证了全世界最优秀的学子云集于MIT，每年能从MIT顺利毕业的人无疑是世界上最精英的一群人。
            2014年9月16日发布2014—2015年世界大学排名榜，美国麻省理工学院连续第三年位居榜首。
          </p>
        </van-tab>
        <van-tab title="申请条件">
          <div class="condition">
            <h3>一. 需要参加的考试</h3>
            <p>
              We require the SAT Reasoning Test or the ACT Plus Writing with the writing test. We do not prefer one over the other.
              In addition, we require two SAT Subject Tests: one in math (level 1 or 2), and one in science (physics, chemistry, or
              biology e/m).
              1、SAT1或者ACT或者ielts
              2、SAT 2的两科
            </p>
          </div>
        </van-tab>
        <van-tab title="专业设置">
          <div class="condition">
            <h3>专业介绍</h3>
            <p>修读年限：4年</p>
          </div>
          <div class="condition">
            <h3>本科专业</h3>
            <p>文学：音乐学、创意写作、文学研究、语言学、戏剧艺术、艺术与设计、比较媒体研究、写作与人文</p>
          </div>

          <div id="swipe" ref="bs_swipe">
            <ul>
              <li v-for="i in 4">
                <img src="../../assets/images/study/swipe.png">
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="每年学费">
          <div class="mnxf">
            <van-row v-for="i in 7">
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
          <div class="mnxf">
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
          <div class="mnxf">
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

    <con :simpleName="'海外网'"/>
  </div>
</template>

<script>
import { Tab, Tabs, Row, Col } from "vant";
import con from "../../components/conf";
import BScroll from "better-scroll";
import { BSConfigX } from "../../utils/config.js";
export default {
  props: {},
  data() {
    return {
      active: 0
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTabClick(i) {
      this.$nextTick(() => {
        if (this.$refs.bs_swipe) {
          this.bs = new BScroll(this.$refs.bs_swipe, BSConfigX);
        }
      });
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Row.name]: Row,
    [Col.name]: Col,
    con
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
          margin: auto;
          background: url("../../assets/images/study/学校校徽图.png") no-repeat
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
          font-size: 22px;
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
