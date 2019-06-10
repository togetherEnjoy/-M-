<template>
  <div class="studytour_detail">
    <city ref="city"/>
    <publicHead :centerImg="centerImg" :backURL="backURL"/>
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
          <span>{{ app._goTime(List_data.startTime,List_data.endTime) | goTime() }}天</span>
        </p>
      </div>

      <div class="tour_det_b">
        <div class="left">
          <p>
            行程天数:
            <span>{{ app._goTime(List_data.startTime,List_data.endTime) | goTime() }}天</span>
          </p>
          <p>
            出发城市:
            <span>{{ List_data.departureCity }}</span>
          </p>
        </div>
        <div class="right">
          <p>
            <i class="justify">年龄</i>:
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
      <van-tabs v-model="active" title-active-color="#ED2530" :line-height="1" sticky>
        <van-tab title="详细行程">
          <div class="xcbox">
            <div class="day" v-for="(item, i) in detailedDescription" :key="i">
              <p class="day_title">
                <span class="whatday">{{ item.daytitle | days }}</span>
                <span class="na">{{ item.daytitle | title }}</span>
              </p>

              <p class="context" v-html="item.daycenten"></p>
            </div>
          </div>
        </van-tab>
        <van-tab title="费用说明">
          <div class="fybox">
            <div v-html="List_data.costDescription"></div>
          </div>
        </van-tab>
        <van-tab title="行前准备">
          <div class="fybox">
            <div v-html="List_data.preparation"></div>
          </div>
        </van-tab>
        <van-tab title="常见问题">
          <div class="fybox">
            <div v-html="List_data.question"></div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <con
      :simpleName="List_data.merchant.simpleName"
      :typeOf="4"
      :id="house_detail.merchant.id"
      :hot="List_data.hot"
      :showCity="List_data.showCity"
      :sourceDescription="href"
      :head_img="List_data.merchant.headPortrait"
    />
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import con from "../../components/conf";
import { UTCformat } from "../../api/UTCformat.js";
import publicHead from "../../components/public_detail_head";
import city from "../../components/city_station";
export default {
  inject: ["app"],
  data() {
    return {
      active: 0,
      List_data: {},
      detailedDescription: {},
      href: location.href,
      centerImg: require("../../assets/images/studytour/tour.png"),
      backURL: "/home/studytour"
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
      });
    },
    _UTCformat(t) {
      return UTCformat(t);
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
    con,
    publicHead,
    city
  }
};
</script>

<style scoped lang="scss">
.studytour_detail {
  padding-bottom: 178px;
  padding-top: 100px;
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

        .justify {
          position: relative;
          display: inline-block;
          height: 28px;
          text-align: justify;
          overflow: hidden;
          &:after {
            display: inline-block;
            content: "";
            width: 100%;
            height: 100%;
            text-align: justify;
            overflow: hidden;
          }
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
      padding-top: 20px;
      .day {
        margin-top: 20px;
        &:first-child {
          margin-top: 0;
        }
        .day_title {
          font-size: 35px;
        }
        p {
          font-size: 30px;
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
      padding-top: 20px;
      font-size: 30px;
      h3 {
        color: #0d1c31;
      }
    }
  }
}
</style>
