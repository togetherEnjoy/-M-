<template>
  <div class="studytour">
    <smenu
      v-if="comReferer"
      :item="item"
      :athor="athor"
      :two="two"
      :three="three"
      :showCity="false"
      :params1="'recruitStudent'"
      :params2="'countyNum'"
      :params3="'theme'"
      :what="2"
      oneData="招生对象"
      twoData="游学国家"
      threeData="游学主题"
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

    <!-- <div class="thinklike" v-if="Object.keys(result_data).length > 0" @click="emptyall">
      <span></span>
      清空所有条件
    </div>-->

    <div class="lx_content">
      <!-- <h3 class="like" v-if="Object.keys(result_data).length > 0">猜您喜欢</h3> -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="100"
      >
        <div
          class="lx_c_item"
          v-for="(item, i) in allListData"
          @click="getDetails(item.id)"
          :key="i"
        >
          <div class="imgs">
            <img v-lazy="item.coverImg" />
          </div>
          <div class="lx_r">
            <p class="tit">{{ item.title }}</p>

            <p class="price">
              价格 &nbsp;
              <b>￥</b>
              <i>{{ item.price }}</i>
              <span>{{ app._goTime(item.startTime,item.endTime) | goTime() }}天</span>
            </p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import smenu from "../../components/slideMenu";
import { screen_data, setShareTitle } from "../../utils/mixins";
import { SEOConfig } from "../../utils/config";
import { mapMutations } from "vuex";
export default {
  name: "studytour",
  mixins: [screen_data, setShareTitle],
  inject: ["app"],
  data() {
    return {
      item: ["招生对象", "游学国家", "游学主题"],
      athor: ["不限", "幼儿", "小学生", "初中生", "大学生", "在职人士", "亲子"],
      two: ["不限", "美国", "加拿大", "英国", "澳大利亚", "亚洲"],
      three: [
        "不限",
        "高端夏令营",
        "K12教育",
        "名校精英教育",
        "语言学校",
        "主题营地",
        "公益服务",
        "文化兴趣"
      ],
      isList: true,

      yx_menu: [],
      url: `/dhr/client/study_tour/list`,
      merchantUrl: `/dhr/client/study_tour/list`
    };
  },
  activated() {
    this.iosTitleImg(SEOConfig.studytour.title);
  },
  created() {
    this.getStudyTourdata();
  },
  methods: {
    getDetails(id) {
      if (!this.letter) {
        console.log(this.letter);
        this.$router.push({
          path: `/${this.cityJX}/studytour/detail`,
          query: { id, country: this.letter }
        });
        return;
      }
      this.$router.push({
        path: `/${this.cityJX}/studytour/${this.letter}/detail`,
        query: { id, country: this.letter }
      });
    },
    onLoad() {
      this.getAllList(this.result_data);
    },
    screenTheData() {
      this.getAllList(this.result_data);
    },
    // 获取游学menu
    getStudyTourdata() {
      this.$fetch("/dhr/client/study_tour/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.yx_menu = res.Result;
          this.athor = this.yx_menu.recruitStudent;
          this.two = this.yx_menu.country;
          console.log(this.two);
          this.three = this.yx_menu.theme;
        }
      });
    },
    // getStudyTourList() {
    //   this.$fetch("/dhr/client/study_tour/list", {
    //     page: this.page,
    //     limit: this.limit
    //   }).then(res => {
    //     if (res.ErrCode == "0000") {
    //       this.count = res.Result.count / 1;
    //       this.List_data = this.List_data.concat(res.Result.data);
    //       this.loading = false;
    //       if (this.List_data.length >= this.count) {
    //         this.finished = true;

    //       }
    //       this.page++;
    //     }
    //   });
    // }
    ...mapMutations({
      wxShare: "SET_SHARETITLE_IMG"
    })
  },

  components: {
    smenu
  }
};
</script>

<style scoped lang="scss">
.studytour {
  background-color: #f8f8f8;
  padding-top: 100px;
  .lx_content {
    padding: 15px 30px 40px;
    background-color: #fff;
    margin-top: 30px;
    .like {
      font-size: 30px;
      font-weight: 500;
      padding-bottom: 30px;
    }
    .lx_c_item {
      display: flex;
      padding: 15px 0;
      .imgs {
        width: 210px;
        height: 210px;
        border-radius: 5px;
        overflow: hidden;
        img {
          height: 100%;
        }
      }

      .lx_r {
        flex: 1;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .tit {
          font-size: 30px;
          font-weight: bold;
          line-height: 48px;
        }
        .price {
          margin-bottom: 5px;
          font-size: 22px;
          color: #9399a5;
          display: flex;
          align-items: center;
          b {
            color: #ed2530;
            margin-top: 5px;
          }
          i {
            color: #ed2530;
            font-size: 34px;
            width: 150px;
            font-weight: bold;
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
            border-radius: 4px;
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
      p {
        border-radius: 4px;
        width: 150px;
        height: 50px;
        border: 1px solid rgba(229, 229, 229, 1);
        text-align: center;
        line-height: 50px;
        font-size: 24px;
        margin-right: 30px;
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
            top: 11px;
            background: url("../../assets/images/study/close.png") no-repeat
              center/ cover;
          }
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
        &:nth-child(n + 5) {
          margin-top: 25px;
        }

        &.check {
          background-color: #ed2530;
          color: #fff;
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
