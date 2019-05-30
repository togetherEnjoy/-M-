<template>
  <div class="studytour_detail">
    <div class="ser_img_wrap">
      <div class="card_item">
        <div class="imgs">
          <img v-lazy="List_data.coverImg">
        </div>
      </div>
    </div>

    <div class="tour_det">
      <div class="tour_det_t">
        <div class="tit">
          <span>{{ List_data.title }}</span>
          | {{ List_data.subTitle }}
        </div>

        <p class="price">
          价格：
          <i>￥{{ List_data.price }}</i>
          <span>{{ _goTime(List_data.startTime,List_data.endTime) | goTime()  }}天</span>
        </p>
      </div>

      <div class="tour_det_b">
        <div class="left">
          <p>
            行程天数:
            <span>{{ _goTime(List_data.startTime,List_data.endTime) | goTime() }}天</span>
          </p>
          <p>
            出发城市:
            <span>{{ List_data.departureCity }}</span>
          </p>
        </div>
        <div class="right">
          <p>
            <i>年龄</i>:
            <span>{{ List_data.ages }}岁</span>
          </p>
          <p>
            出行日期:
            <span>{{ _UTCformat(List_data.startTime) }} {{ _UTCformat(List_data.endTime).substr(5)}}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="project" ref="wipe">
      <van-tabs v-model="active" title-active-color="#ED2530" :line-height="1">
        <van-tab title="详细行程">
          <div class="xcbox">
            <div class="day" v-for="(item, i) in detailedDescription" :key="i">
              <p>
                <span class="whatday">{{ item.daytitle | days }}</span>
                <span class="na">{{ item.daytitle | title }}</span>
              </p>

              <p class="context" v-html="item.daycenten"></p>
            </div>
          </div>
        </van-tab>
        <van-tab title="费用说明">
          <div class="fybox">
            <div v-html="List_data.costDescription">
              <!-- <h3>费用包含:</h3>
              <p>1.办理签证的费用；</p>
              <p>2.国内—目的地往返机票（含机场建设费和燃油附加税）；</p>
              <p>3.人身意外伤害险保险费；</p>
              <p>4.在境外的吃、住、行及学习参观费、小费。</p>
              <p>
                【公益服务与文化探索项目】费用包含
                项目费（在境外行程中统一安排的吃、住、行、符合航班要求的接/送机服务、学习参观费、资料费）、国际SOS紧急救援险费、境外旅行保险、注册报名费、服务费、出团物资及材料快递费。
                以上为参考费用说明，实际费用以合同为准。
              </p>-->
            </div>
          </div>
        </van-tab>
        <van-tab title="行前准备">
          <div class="fybox">
            <div v-html="List_data.preparation">
              <!-- <h3>除了现金还需要给孩子准备什么呢?</h3>
              <p>您可以为学生准备一些常用药品、电子词典、换洗衣物和穿着舒适的鞋等，具体的可以参照我们的出团手册，里面有详细的清单列表。 更多关于国外天气、时差、电话使用、行李清单等行前准备问题，还请参考新东方国际游学行走世界指南（含行前准备大全），您可以与您的后期签证老师索要相关资料。</p>-->
            </div>
          </div>
        </van-tab>
        <van-tab title="常见问题">
          <div class="fybox">
            <div v-html="List_data.question">
              <!-- <h3>住在学生公寓，是和外国学生一起?还是同团学生一起?</h3>
              <p>根据具体所报游学线路的情况不同，有的是和外国学生一起，有的是和本团学生一起。具体情况，您可以登录新东方国际游学官网youxue.xdf.cn了解更多，或者直接致电咨询热线，会有专业的游学顾问老师为您解答相关疑问。</p>-->
            </div>
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
import { UTCformat, goTime } from "../../api/UTCformat.js";
export default {
  inject: ['app'],
  data() {
    return {
      active: 0,
      List_data: {},
      detailedDescription: {}
    };
  },

  created() {
    this.$nextTick(() => {
      this.getTourDetail();
    });
  },
  methods: {
    getTourDetail() {
      let { id } = this.$route.params;
      this.$fetch(`/dhr/client/study_tour/${id}`).then(res => {
        if (res.ErrCode == "0000") {
          this.List_data = res.Result;
          this.detailedDescription = JSON.parse(res.Result.detailedDescription);
        }
        console.log(this.List_data);
        console.log(this.detailedDescription);
      });
    },
    _UTCformat(t) {
      return UTCformat(t);
    },
    _goTime(start, end) {
      return goTime(start, end);
    }
  },
  filters: {
    days(value) {
      return value.split("|")[0];
    },
    title(value) {
      return value.split("|")[1];
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    con
  }
};
</script>

<style scoped lang="scss">
.studytour_detail {
  padding-bottom: 110px;
  background-color: #f8f8f8;
  .ser_img_wrap {
    .card_item {
      color: #fff;
      position: relative;
      .imgs {
        border-radius: 6px;
        height: 500px;
        overflow: hidden;
        position: relative;
        width: 100%;
      }
    }
  }
  .tour_det {
    background-color: #fff;
    padding: 40px 30px;
    .tour_det_t {
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 20px;
      .tit {
        color: #9399a5;
        font-size: 28px;
        line-height: 48px;
        span {
          font-size: 34px;
          color: #0d1c31;
          font-weight: bold;
        }
      }

      .price {
        margin-bottom: 5px;
        font-size: 22px;
        color: #9399a5;
        margin-top: 15px;
        i {
          color: #ed2530;
          font-size: 34px;
        }
        span {
          width: 110px;
          height: 36px;
          display: inline-block;
          vertical-align: text-bottom;
          border: 1px solid #5c98f8;
          color: #5c98f8;
          font-size: 22px;
          line-height: 36px;
          text-align: center;
          margin-left: 20px;
        }
      }
    }
    .tour_det_b {
      display: flex;
      padding-top: 40px;
      div {
        font-size: 24px;
        flex: 1;
        p {
          color: #9399a5;
          &:first-child {
            margin-bottom: 25px;
          }
        }
        span {
          color: #0d1c31;
          margin-left: 20px;
        }
        i {
          display: inline-block;
          width: 100px;
          text-align: justify;
          text-align-last: justify;
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

    .xcbox {
      font-weight: 500;
      .day {
        p {
          font-size: 24px;
          .whatday {
            color: #0d1c31;
          }
          .na {
            color: #ed2530;
          }
        }
        .context {
          line-height: 48px;
        }
      }
    }
    .fybox {
      h3 {
        color: #0d1c31;
      }
    }
  }
}
</style>
