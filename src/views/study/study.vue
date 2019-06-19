<template>
  <div class="study">
    <smenu
      v-if="comReferer"
      :item="item"
      :country="country"
      :athor="athor"
      :two="two"
      :tf="tf"
      :ys="ys"
      :fy="fy"
      :more="true"
      :params1="'schoolType'"
      :params2="'rank'"
      :what="1"
      oneData="类别"
      twoData="国内排名"
      threeData="更多"
      @get_result="get_result"
    />

    <!-- <div class="sx_result" v-if="Object.keys(result_data).length > 0">
      <h3>筛选结果</h3>
      <div class="condition">
        <div v-for="(item,i) of result_data" :key="i" class="sel" v-if="item.html != ''">
          <p v-if="item.html != ''" :typed="item.type">
            <span>{{ item.html }}</span>
            <i>
              <span @click.self="empty"></span>
            </i>
          </p>
        </div>
      </div>
    </div>-->
    <!-- 
    <div
      class="thinklike"
      v-if="Object.keys(result_data).length > 0"
      @click.stop.prevent="emptyall"
    >
      <span></span>
      清空所有条件
    </div>-->

    <div class="study_wrap">
      <!-- <h3 class="like" v-if="Object.keys(result_data).length > 0">猜您喜欢</h3> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
      >
        <div
          class="study_item"
          v-for="(item, i) in allListData"
          :key="i"
          @click="$router.push({path: `/home/study/${item.id}`})"
        >
          <div class="imgs">
            <div class="imgs_box">
              <img v-lazy="item.schoolBadgeImg">
            </div>
          </div>

          <div class="content">
            <h3>{{ item.schoolName }}</h3>
            <p class="yw">{{ item.englishName }}</p>
            <p class="addr">{{ item.hostCountry }} {{ item.hostCity }}</p>
            <p class="pm">
              <span>
                国内综合排名：
                <i>{{ item.countryRanking }}</i>
              </span>
              <span class="r">
                录取率：
                <i>{{ item.acceptanceRate }}.0%</i>
              </span>
            </p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import smenu from "../../components/slideMenu";
import { mapGetters, mapMutations } from "vuex";
import { screen_data } from "../../utils/mixins";

const url = `/dhr/client/study_abroad/list`;
export default {
  mixins: [screen_data],
  data() {
    return {
      item: ["国家", "类别", "国内排名", "更多"],
      country: [],
      athor: [],
      two: [],
      tf: [],
      ys: [],
      fy: [],
      study_menu: [],
      url: `/dhr/client/study_abroad/list`,
      merchantUrl: `/dhr/client/study_abroad/merchant/list`
    };
  },
  created() {
    this.getStudyData();
    this.searchCountry();
  },
  methods: {
    onLoad() {
      if (this.$route.query.id + 1) {
        let id = this.$route.query.id;
        this.result_data.hostCountryNum = this.filterCountry(id);
      }

      // console.log(222)
      this.getAllList(this.result_data);
    },
    // 获取留学国家
    getStudyData() {
      this.$fetch("/dhr/client/study_abroad/menu").then(res => {
        if (res.ErrCode == "0000") {
          console.log(res.Result);
          let { IELTS, TOEFL, cost, country, rank, schoolType } = res.Result;
          this.country = country;
          this.athor = schoolType;
          this.two = rank;
          this.tf = TOEFL;
          this.ys = IELTS;
          this.fy = cost;
          console.log(this.tf);
        }
      });
    },

    searchCountry() {
      let id = this.$route.query.id;
      console.log(id);
    },

    filterCountry(id) {
      switch (id) {
        case 0:
          return {
            id: 0,
            html: "美国",
            type: "hostCountryNum"
          };
        case 1:
          return {
            id: 1,
            html: "英国",
            type: "hostCountryNum"
          };
        case 2:
          return {
            id: 2,
            html: "加拿大",
            type: "hostCountryNum"
          };
        case 3:
          return {
            id: 3,
            html: "澳大利亚",
            type: "hostCountryNum"
          };
      }
    }
  },
  activated() {},
  watch: {
    $route(val) {
      // console.log(val);
    }
  },

  components: {
    smenu
  }
};
</script>

<style scoped lang="scss">
.study {
  background-color: #f8f8f8;
  padding-top: 100px;
  .study_wrap {
    // padding-top:
    .like {
      font-size: 30px;
      font-weight: 500;
      padding-top: 30px;
    }
    margin-top: 30px;
    padding: 0 30px;
    background-color: #fff;
    .study_item {
      padding: 30px 0;
      display: flex;
      border-bottom: 1px solid #e5e5e5;
      .imgs {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        border: 5px solid rgba(228, 228, 228, 1);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        .imgs_box {
          width: 106px;
          height: 106px;
          border-radius: 50%;
          overflow: hidden;
        }
        img {
          width: 100%;
        }
      }
      .content {
        padding-left: 30px;
        font-weight: 500;
        h3 {
          font-size: 30px;
        }
        .yw {
          font-size: 22px;
          color: #9399a5;
          margin-top: 10px;
        }
        .addr {
          font-size: 22px;
          margin-top: 10px;
          padding-left: 30px;
          position: relative;
          &::after {
            position: absolute;
            content: "";
            width: 24px;
            height: 24px;
            background: url("../../assets/images/study/posi.png") no-repeat
              center / cover;
            left: 0;
            top: 3px;
          }
        }
        .pm {
          margin-top: 16px;
          color: #9399a5;
          font-size: 24px;
          display: flex;
          justify-content: space-between;
          span {
            i {
              font-size: 34px;
              color: #ed2530;
              width: 80px;
              display: inline-block;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .sx_result {
    h3 {
      font-weight: 500;
      font-size: 30px;
    }
    padding: 30px;
    background-color: #fff;
    margin-top: 30px;
    transition: all 0.3s ease;
    .condition {
      display: flex;
      flex-wrap: wrap;
      padding: 30px 0 40px;

      .sel {
        margin-right: 30px;
        p {
          width: 150px;
          height: 50px;
          border: 1px solid rgba(229, 229, 229, 1);
          text-align: center;
          line-height: 50px;
          font-size: 24px;
          color: #9399a5;
          position: relative;
          border-radius: 4px;
          i {
            position: absolute;
            width: 26px;
            height: 23px;
            color: #fff;
            background: url("../../assets/images/study/sx.png") no-repeat right
              bottom / 26px 23px;

            right: 0;
            bottom: 0;
            font-size: 8px;

            span {
              position: absolute;
              width: 10px;
              height: 10px;
              right: 2px;
              top: 11px;
              background: url("../../assets/images/study/close.png") no-repeat
                center/ cover;
            }
          }

          &.check {
            background-color: #ed2530;
            color: #fff;
          }
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
        &:nth-child(n + 5) {
          margin-top: 25px;
        }
      }
    }
  }

  .thinklike {
    color: #9399a5;
    font-size: 24px;
    font-weight: 500;
    padding-top: 32px;
    padding-left: 30px;
    span {
      display: inline-block;
      vertical-align: bottom;
      width: 30px;
      height: 30px;
      background: url("../../assets/images/immig/laj.png") no-repeat center /
        cover;
    }
  }
}
</style>
