<template>
  <div class="study">
    <smenu
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
      @get_result="get_result"
    />


    <div class="sx_result" v-if="Object.keys(result_data).length > 1">
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
    </div>

    <div class="thinklike" v-if="Object.keys(result_data).length > 1" @click="emptyall">
      <span></span>
      清空所有条件
    </div>

    <div class="study_wrap">
      <h3 class="like" v-if="result_data.length > 0">猜您喜欢</h3>
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
            <img v-lazy="item.schoolBadgeImg">
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
// import { screen_data } from "../../utils/mixins";

const url = `/dhr/client/study_abroad/list`;
export default {
  // mixins: [screen_data],
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
      page: 1,
      limit: 10,
      count: "",
      loading: false,
      finished: false,

      allListData: [],
      result_data: {}
    };
  },
  created() {
    this.getStudyData();
  },
  methods: {
    // 获取list数据
    getAllList(box) {
      let params = {
        page: this.page,
        limit: this.limit
      };
      let keys = Object.keys(this.result_data);
      if (keys.length == 1 && keys[0] == "hostCountryNum") {
        
      } else {
        if (box) {
          let data = {};
          for (let k in box) {
            data[k] = box[k].id;
          }
          params = Object.assign(params, data);
        }
      }

      setTimeout(() => {
        this.$fetch(this.url, params).then(res => {
          if (res.ErrCode == "0000") {
            this.allListData = this.allListData.concat(res.Result.data);
            this.count = res.Result.count / 1;
            this.loading = false;
            if (this.allListData.length >= this.count) {
              this.finished = true;
              console.log("无更多数据");
            }
            this.page++;
          }
        });
      }, 500);
    },

    get_result(data) {
      this.result_data = data;
      console.log(this.result_data);
      this.page = 1;
    },

    empty(e) {
      let text = e.target.parentNode.parentNode;
      const type = text.getAttribute("typed");
      if (type in this.result_data) {
        this.$delete(this.result_data, type);
      }
      console.log(this.result_data);

      this.$children[0].sendObj = this.result_data;
      // 筛选数据
      this.page = 1;
      this.allListData = [];
      this.screenTheData();
    },
    emptyall() {
      this.result_data = {
        hostCountryNum: {
          id: 0,
          html: "",
          type: "hostCountryNum"
        }
      };

      this.$children[0].reset();
      this.$children[0].sendObj = this.result_data;
      // 筛选数据
      this.page = 1;
      this.allListData = [];
      this.screenTheData();
    },
    get_result(data, page) {
      this.result_data = data;
      console.log(this.result_data);
      this.page = 1;
    },
    onLoad() {
      this.getAllList();
    },
    // 筛选数据
    screenTheData() {
      this.getAllList(this.result_data);
    },
    // 获取留学国家
    getStudyData() {
      this.$fetch("/dhr/client/study_abroad/menu").then(res => {
        if (res.ErrCode == "0000") {
          console.log(res);
          let { IELTS, TOEFL, cost, country, rank, schoolType } = res.Result;
          this.country = country;
          this.athor = schoolType;
          this.two = rank;
          this.tf = TOEFL;
          this.ys = IELTS;
          this.fy = cost;
        }
      });
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
  .study_wrap {
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
        img {
          width: 80%;
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
            }
          }
        }
      }
    }
  }
  .sx_result {
    h3 {
      font-weight: 500;
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
              top: 8px;
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
