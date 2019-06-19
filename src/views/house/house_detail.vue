<template>
  <div class="house_detail">
    <city ref="city"/>
    <publicHead :centerImg="centerImg" backURL="/home/house"/>
    <van-swipe @change="onChange">
      <!-- :style="`width:${viewWidth}px`" -->
      <van-swipe-item v-for="item in banner_img">
        <div class="hd_img">
          <img v-lazy="item">
        </div>
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{ banner_img.length }}</div>
    </van-swipe>

    <div class="details">
      <div class="d_t">
        <h3>{{ house_detail.title }}</h3>
        <div class="addr">
          <p>{{ house_detail.belongCountryName }} • {{ house_detail.belongCityName }} </p>
        </div>

        <div class="cans">
          <div class="cans_i">
            <p class="pri">
              ￥
              <span>{{ house_detail.price }}</span>万起
            </p>
            <p class="dottal">总价</p>
          </div>
          <div class="cans_i">
            <p class="pri">
              <span>{{ house_detail.downPay }}</span>%
            </p>
            <p class="dottal">首付</p>
          </div>
          <div class="cans_i">
            <p class="pri">
              <span>{{ house_detail.returnRate }}</span>%
            </p>
            <p class="dottal">回报率</p>
          </div>
        </div>

        <div class="yh">
          <p class="yh_l">优惠折扣</p>
          <p class="yh_r">{{ house_detail.discount }}</p>
        </div>

        <div class="dl" style="display:none">
          <p class="dl_l">
            代理商：
            <span>侨外移民</span>
          </p>

          <p class="dl_r">
            供应商：
            <span>明良海外</span>
          </p>
        </div>
      </div>

      <div class="d_b">
        <div class="dbl">
          <p class="dbld">
            项目面积：
            <span>{{ house_detail.minArea}}~{{ house_detail.maxArea }}㎡</span>
          </p>
          <p class="dbld">
            物业类型：
            <span>{{ houstType(house_detail.hoseType) }}</span>
          </p>
          <p class="dbld">
            交房标准：
            <span>{{ deliverCriterion(house_detail.deliverCriterion) }}</span>
          </p>
        </div>
        <div class="dbl">
          <p class="dbld">
            产权年限：
            <span>{{ house_detail.propertyRightYears }}</span>
          </p>
          <p class="dbld">
            交房时间：
            <span>{{ house_detail.deliveryTime }}</span>
          </p>
          <p class="dbld" v-if="house_detail.optionalRoomType">
            可选户型：
            <span
              v-for="(item,i) in useHx(house_detail.optionalRoomType)"
              :key="i"
            >{{ useHx(house_detail.optionalRoomType).length>0? item+' ':item }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="project">
      <van-tabs v-model="active"  sticky  :line-height="1">
        <van-tab title="项目简介">
          <div class="content" v-html="house_detail.content"></div>
        </van-tab>
        <van-tab title="周边设施">
          <div class="zb_content">
            <div class="education">
              <h3 v-if="peripheral.education">{{ peripheral.education.name }}</h3>
              <p v-if="peripheral.education" v-html="peripheral.education.content"></p>
            </div>
            <div class="shop">
              <h3 v-if="peripheral.education">{{ peripheral.shopping.name }}</h3>
              <p v-if="peripheral.education" v-html="peripheral.shopping.content"></p>
            </div>

            <div class="leisure">
              <h3 v-if="peripheral.education">{{ peripheral.leisuretime.name }}</h3>
              <p v-if="peripheral.education" v-html="peripheral.leisuretime.content"></p>
            </div>

            <div class="hospot">
              <h3 v-if="peripheral.education">{{ peripheral.hospital.name }}</h3>
              <p v-if="peripheral.education" v-html="peripheral.hospital.content"></p>
            </div>

            <div class="traffic">
              <h3 v-if="peripheral.education">{{ peripheral.traffic.name }}</h3>
              <p v-if="peripheral.education" v-html="peripheral.traffic.content"></p>
            </div>
          </div>
        </van-tab>
        <van-tab title="物业配套">
          <div class="wy_content">
            <div class="kt">
              <h3>空调设施</h3>
              <p>
                <span v-if="property.airConditioning.SplitType">√</span> 分体式空调
              </p>
            </div>
            <div class="cf">
              <h3>厨房配置</h3>
              <p>
                <span v-if="property.kitchen.Refrigerator">√</span> 冰箱
              </p>
              <p>
                <span v-if="property.kitchen.Oven.Washingmachine">√</span> 烤箱
              </p>
              <p>
                <span v-if="property.kitchen.Dishwasher">√</span> 洗碗机
              </p>
              <p>
                <span v-if="property.kitchen.MicrowaveOven">√</span> 微波炉
              </p>
              <p>
                <span v-if="property.kitchen.Heater">√</span> 热水器
              </p>
              <p>
                <span v-if="property.kitchen.Cupboard">√</span> 橱柜
              </p>
              <p>
                <span v-if="property.kitchen.Washingmachine">√</span> 洗衣机
              </p>
            </div>
            <div class="wy">
              <h3>卫浴配置</h3>
              <p>
                <span v-if="property.bathroom.Bathtub">√</span> 浴缸
              </p>
              <p>
                <span v-if="property.bathroom.shower">√</span> 淋浴
              </p>
              <p>
                <span v-if="property.bathroom.Basin">√</span> 台盆
              </p>
              <p>
                <span v-if="property.bathroom.Pedestalpan">√</span> 坐便器
              </p>
            </div>

            <div class="tcc">
              <h3>停车场</h3>
              <p>
                <span v-show="property.yard.Doublegarage">√</span> 单车库
              </p>
              <p>
                <span v-show="property.yard.Singlegarage">√</span> 双车库
              </p>
            </div>

            <div class="hy">
              <h3>花园配置</h3>
              <!-- <p>√ 私人庭院</p> -->
              <p>
                <span v-if="property.Garden.PrivateCourtyard">√</span> 私人庭院
              </p>
              <p>
                <span v-if="property.Garden.SwimmingPool">√</span> 游泳池
              </p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <con
      :simpleName="house_detail.merchant.simpleName"
      :id="house_detail.merchant.id"
      :typeOf="1"
      :myphone="house_detail.merchant.phone"
      :hot="house_detail.hot"
      :showCity="house_detail.showCity"
      :sourceDescription="href"
      :head_img="house_detail.merchant.headPortrait"
    />
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
import publicHead from "../../components/public_detail_head";
import city from "../../components/city_station";
import con from "../../components/conf";
export default {
  data() {
    return {
      current: 0,
      active: 0,
      house_detail: {},
      // 轮播图
      banner_img: [],
      // 周边设施
      peripheral: {},

      property: {},
      swipe: [],
      href: location.href,

      centerImg: require("../../assets/images/house/house_center.png"),
      backURL: ""
    };
  },
  created() {
    this.getHouseDetail();
    // this.getSwipeData();
  },
  methods: {

    getHouseDetail() {
      let { id } = this.$route.params;
      this.$fetch(`/dhr/client/house/${id}`).then(res => {
        if (res.ErrCode == "0000") {
          this.house_detail = res.Result;
          console.log(this.house_detail)
          let json = JSON.parse;
          let img = Object.values(json(this.house_detail.templateImgs));

          let img1 = Object.values(json(this.house_detail.appearanceImg));
          let img2 = Object.values(json(json(this.house_detail.apartmentImgs)));
          let img3 = Object.values(json(this.house_detail.peripheralImgs));
          let img4 = Object.values(json(this.house_detail.localtionImgs));
          this.banner_img = this.banner_img.concat(img, img1, img2, img3, img4)
          this.banner_img.push(this.house_detail.coverImg)


          this.property = JSON.parse(res.Result.property);
          this.peripheral = JSON.parse(res.Result.peripheral);
        }
      });
    },
    onChange(index) {
      this.current = index;
    },
    // 房产类型
    houstType(type) {
      switch (type) {
        case 1:
          return "独栋别墅";
        case 2:
          return "联排别墅";
        case 3:
          return "精品住宅";
        case 4:
          return "双拼别墅";
      }
    },
    // 可选户型
    useHx(data) {
      const type = ["一室", "二室", "三室", "四室", "四室以上"];
      let newData = data.split(",");
      let showD = [];
      let map = newData.map((val, index) => {
        let number = Number(val);
        if (number) {
          showD.unshift(type[index]);
        }
      });
      return showD;
    },
    // 交房标准
    deliverCriterion(data) {
      switch (data) {
        case 1:
          return "精装交付";
        case 0:
          return "其他";
      }
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

<style lang="scss">
.house_detail {
  // overflow-x: hidden;
  .custom-indicator {
    position: absolute;
    width: 90px;
    height: 36px;
    border-radius: 18px 0px 0px 18px;
    background-color: #ed2530;
    text-align: center;
    line-height: 36px;
    color: #fff;
    right: 0;
    bottom: 20px;
  }
  .van-tabs__content {
    padding: 0 30px !important;
  }
}

// 去掉tabs的边框
.van-hairline--top-bottom::after {
  border-width: 0 !important;
}

// 加粗选择的tabs
.van-tab--active {
  font-weight: 700 !important;
}

// tab 下的 line
.van-tabs__line {
  height: 2px !important;
}
</style>


<style scoped lang="scss">
.house_detail {
  background-color: #f8f8f8;
  padding-bottom: 208px;
  padding-top: 100px;
  .hd_img {
    width: 100%;
    height: 500px;
  }

  .details {
    padding: 35px 30px;
    background-color: #fff;
    .d_t {
      border-bottom: 1px solid #e6e6e6;
      padding-bottom: 40px;
      h3 {
        font-size: 34px;
        font-weight: bold;
      }

      .addr {
        font-size: 22px;
        color: #9399a5;
        position: relative;
        padding-left: 30px;
        margin-top: 17px;
        &::after {
          position: absolute;
          content: "";
          left: 0;
          top: 2px;
          width: 24px;
          height: 24px;
          background: url("../../assets/images/house/posi.png") no-repeat center /
            cover;
        }
      }

      .cans {
        display: flex;
        // justify-content: space-around;
        font-size: 22px;
        padding: 35px 0 25px 0;
        .cans_i {
          flex: 1;
          text-align: center;
          .pri {
            color: #ed2530;
            span {
              font-size: 34px;
              font-weight: Bold;
            }
          }
          .dottal {
            color: #9399a5;
            font-weight: 500;
            margin-top: 10px;
            font-size: 24px;
          }
        }
      }

      .yh {
        display: flex;
        height: 36px;
        font-size: 22px;
        font-weight: 500;
        line-height: 36px;
        .yh_l {
          width: 118px;
          height: 36px;
          background-color: #ed2530;
          border-radius: 3px;
          color: #fff;

          text-align: center;
        }
        .yh_r {
          color: #ed2530;
          margin-left: 14px;
        }
      }

      .dl {
        display: flex;
        font-size: 22px;
        font-weight: 500;
        color: #9399a5;
        margin-top: 40px;
        span {
          color: #ed2530;
        }
        p {
          flex: 1;
        }

        .dl_l {
        }
        .dl_r {
        }
      }
    }
    .d_b {
      display: flex;
      padding-top: 40px;
      .dbl {
        flex: 1;

        .dbld {
          color: #9399a5;
          font-size: 28px;
          margin-bottom: 30px;
          span {
            color: #0d1c31;
          }
          &:last-child {
            margin: 0;
          }
        }
      }
    }
  }

  .project {
    margin-top: 30px;
    background-color: #fff;
    // padding: 0 30px;
    // color: #9399a5;
    line-height: 48px;
    font-size: 24px;
    .content {
      padding: 30px 0;
      font-size: 30px;
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
    .zb_content,
    .wy_content {
      font-size: 30px;
      & > div {
        padding: 35px 0 30px 0;
        border-bottom: 1px solid #e5e5e5;
      }
      h3 {
        font-size: 28px;
        font-weight: 500;
        position: relative;
        padding-left: 50px;
        color: #0d1c31;
        margin-bottom: 7px;
        &::after {
          position: absolute;
          content: "";
          width: 36px;
          height: 36px;
          left: 0;
          top: 7px;
        }
      }
      .education {
        h3 {
          &::after {
            background: url("../../assets/images/house/jy.png") no-repeat
              center/cover;
          }
        }
      }
      .shop {
        h3 {
          &::after {
            background: url("../../assets/images/house/gw.png") no-repeat
              center/cover;
          }
        }
      }
      .leisure {
        h3 {
          &::after {
            background: url("../../assets/images/house/xx.png") no-repeat
              center/cover;
          }
        }
      }
      .hospot {
        h3 {
          &::after {
            background: url("../../assets/images/house/gu.png") no-repeat
              center/cover;
          }
        }
      }
      .traffic {
        h3 {
          &::after {
            background: url("../../assets/images/house/jt.png") no-repeat
              center/cover;
          }
        }
      }
    }
    .wy_content {
      p {
        position: relative;
        padding-left: 25px;
        span {
          position: absolute;
          left: 0;
          top: 1px;
        }
      }
      .kt {
        h3 {
          &::after {
            background: url("../../assets/images/house/kt.png") no-repeat
              center/cover;
          }
        }
      }
      .cf {
        h3 {
          &::after {
            background: url("../../assets/images/house/cf.png") no-repeat
              center/cover;
          }
        }
      }

      .wy {
        h3 {
          &::after {
            background: url("../../assets/images/house/wy.png") no-repeat
              center/cover;
          }
        }
      }

      .tcc {
        h3 {
          &::after {
            background: url("../../assets/images/house/tcc.png") no-repeat
              center/cover;
          }
        }
      }
      .hy {
        h3 {
          &::after {
            background: url("../../assets/images/house/hy.png") no-repeat
              center/cover;
          }
        }
      }
    }
  }
}
</style>
