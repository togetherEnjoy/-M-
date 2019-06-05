<template>
  <div class="house_detail">
    <van-swipe @change="onChange">
      <!-- :style="`width:${viewWidth}px`" -->
      <van-swipe-item v-for="item in swipe">
        <div class="hd_img">
          <img v-lazy="item.img">
        </div>
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{ swipe.length }}</div>
    </van-swipe>

    <div class="details">
      <div class="d_t">
        <h3>{{ house_detail.title }}</h3>
        <div class="addr">
          <p>{{ house_detail.belongCountryName }} • {{ house_detail.belongCityName }} {{ house_detail.labels }}</p>
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
            <span>{{  house_detail.minArea}}~{{ house_detail.maxArea }}㎡</span>
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
          <p class="dbld">
            可选户型：
            <span v-for="(item,i) in useHx(house_detail.optionalRoomType)" :key="i">{{ item }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="project">
      <van-tabs v-model="active" title-active-color="#ED2530" :line-height="1" sticky>
        <van-tab title="项目简介">
          <div class="content" v-html="house_detail.content">
            <!-- <p>在科学研究方面，美国学者赢得了大量的诺贝尔奖，尤其是在生物和医学领域。美国国家健康研究中心是美国生物医学的聚焦点，并已完成人类基因组计划，使人类对肿瘤、阿兹海默症等疾病的治愈研究进入重要阶段。航空和航天研究的政府机构是美国国家航空航天局。波音公司和洛克希德·马丁公司一类的私营企业也扮演了重要角色。美国国家科学院、美国国家工程院、美国国家医学院和美国国家自然基金会，是美国科学界最高水平的四大学术机构。除自然基金会外，其他三院分别授予院士头衔。</p>

            <div class="imgs">
              <img src="../../assets/images/house/pro.png">
            </div>

            <p>在科学研究方面，美国学者赢得了大量的诺贝尔奖，尤其是在生物和医学领域。美国国家健康研究中心是美国生物医学的聚焦点，并已完成人类基因组计划，使人类对肿瘤、阿兹海默症等疾病的治愈研究进入重要阶段。航空和航天研究的政府机构是美国国家航空航天局。波音公司和洛克希德·马丁公司一类的私营企业也扮演了重要角色。美国国家科学院、美国国家工程院、美国国家医学院和美国国家自然基金会，是美国科学界最高水平的四大学术机构。除自然基金会外，其他三院分别授予院士头衔。</p>
            <p>在科学研究方面，美国学者赢得了大量的诺贝尔奖，尤其是在生物和医学领域。美国国家健康研究中心是美国生物医学的聚焦点，并已完成人类基因组计划，使人类对肿瘤、阿兹海默症等疾病的治愈研究进入重要阶段。航空和航天研究的政府机构是美国国家航空航天局。波音公司和洛克希德·马丁公司一类的私营企业也扮演了重要角色。美国国家科学院、美国国家工程院、美国国家医学院和美国国家自然基金会，是美国科学界最高水平的四大学术机构。除自然基金会外，其他三院分别授予院士头衔。</p> -->
          </div>
        </van-tab>
        <van-tab title="周边设施">
          <div class="zb_content">
            <div class="education">
              <h3>教育</h3>
              <p>Pimpama州立小学</p>
              <p>Pimpama州立中学-高中</p>
              <p>国王基督徒学院</p>
            </div>
            <div class="shop">
              <h3>购物</h3>
              <p>
                Coomera，Upper Coomera和Pimpama Junction购物中心都位
                于附近
              </p>
            </div>

            <div class="leisure">
              <h3>休闲</h3>
              <p>时代广场–5.8公里</p>
              <p>中央公园（东南入口）-6.9公里</p>
              <p>港口公园</p>
            </div>

            <div class="hospot">
              <h3>医疗</h3>
              <p>驾车5分钟到Pimpama医疗中心</p>
              <p>驾车5分钟到Medicross医疗Coomera</p>
              <p>驾车25分钟到黄金海岸大学综合医疗中心</p>
            </div>

            <div class="traffic">
              <h3>交通</h3>
              <p>驾车5分钟到Ormeau火车站</p>
              <p>驾车7分钟到Coomera 火车站</p>
              <p>驾车40分钟到布里斯班CBD</p>
              <p>驾车30分钟到黄金海岸CBD</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="物业配套">
          <div class="wy_content">
            <div class="kt">
              <h3>空调设施</h3>
              <p><span v-if="property.airConditioning.SplitType">√</span> 分体式空调</p>
            </div>
            <div class="cf">
              <h3>厨房配置</h3>
              <p><span v-if="property.kitchen.Refrigerator">√</span> 冰箱</p>
              <p><span v-if="property.kitchen.Oven.Washingmachine">√</span> 烤箱</p>
              <p><span v-if="property.kitchen.Dishwasher">√</span> 洗碗机</p>
              <p><span v-if="property.kitchen.MicrowaveOven">√</span> 微波炉</p>
              <p><span v-if="property.kitchen.Heater">√</span> 热水器</p>
              <p><span v-if="property.kitchen.Cupboard">√</span> 橱柜</p>
              <p><span v-if="property.kitchen">√</span> 洗衣机</p>
            </div>
            <div class="wy">
              <h3>卫浴配置</h3>
              <p><span v-if="property.bathroom.Bathtub">√</span> 浴缸</p>
              <p><span  v-if="property.bathroom.shower">√</span> 淋浴</p>
              <p><span v-if="property.bathroom.Basin">√</span> 台盆</p>
              <p><span v-if="property.bathroom.Pedestalpan">√</span> 坐便器</p>
            </div>

            <div class="tcc">
              <h3>停车场</h3>
              <p><span v-show="property.Garden.PrivateCourtyard">√</span> 单车库</p>
              <p><span>√</span> 双车库</p>
            </div>

            <div class="hy">
              <h3>花园配置</h3>
              <!-- <p>√ 私人庭院</p> -->
              <p><span v-show="property.Garden.PrivateCourtyard">√</span> 私人庭院</p>
              <p><span v-if="property.Garden.SwimmingPool">√</span> 游泳池</p>
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
export default {
  data() {
    return {
      current: 0,
      active: 0,
      house_detail: {},
      property: {},
      swipe: []
    };
  },
  created() {
    this.getHouseDetail()
    this.getSwipeData()
  },
  methods: {
    // 轮播
    getSwipeData() {
      this.$fetch('/dhr/advertise/img/home').then(res => {
        console.log(res)
        if (res.ErrCode == '0000') {
          this.swipe = res.Result.data
        }
      })
    },
    getHouseDetail() {
      let { id } = this.$route.params
      this.$fetch(`/dhr/client/house/${id}`).then(res => {
        console.log(res.Result)
        if (res.ErrCode == '0000') {
          this.house_detail = res.Result
          this.property = JSON.parse(res.Result.property)
          console.log(this.house_detail)
        }
      })
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
          return "双拼别墅"
      }
    },
    // 可选户型
    useHx(data) {
      const type = ['一室','二室','三室','四室','四室以上']
      let newData = data.split(',')
      let showD = []
      let map = newData.map((val, index) => {
        let number = Number(val)
        if (number) {
          showD.unshift(type[index])
        }
      })
      return showD
    },
    // 交房标准
    deliverCriterion(data) {
      console.log(data)
      switch (data) {
        case 1: 
          return '精装交付';
        case 0:
          return '其他'
      }
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    con
  }
};
</script>

<style lang="scss">
.house_detail {
  width: 100%;
  overflow-x: hidden;
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
  margin-bottom: 158px;
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
          background: url("../../assets/images/house/posi.png") no-repeat
            center / cover;
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
          font-size: 24px;
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
      padding-top: 20px;
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
