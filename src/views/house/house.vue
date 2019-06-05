<template>
  <div class="house">
    <smenu
      :item="item"
      :country="menu.country"
      :athor="menu.housingDemand"
      :two="menu.hoseType"
      :three="menu.cost"
      :params1="'housingDemand'"
      :params2="'hoseType'"
      :params3="'cost'"
      @get_result="get_result"
    />

    <div class="sx_result" v-if="Object.keys(result_data).length > 0">
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

    <div class="thinklike" v-if="Object.keys(result_data).length > 0" @click="emptyall">
      <span></span>
      清空所有条件
    </div>

    <div class="house_wrap">
      <h3 class="like" v-if="Object.keys(result_data).length > 0">猜您喜欢</h3>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
      >
        <div
          class="list_box"
          v-for="(item, i) in allListData"
          :key="i"
          @click="$router.push({name: 'housedetail',params: {id: item.id}})"
        >
          <div class="l_left">
            <img v-lazy="item.coverImg">
            <p>{{ item.belongCountryName }}·{{ item.belongCityName }}</p>
          </div>
          <div class="l_right">
            <h3 class="tit text_overflow">{{ item.title }}</h3>
            <p
              class="de"
            >{{ houstType(item.hoseType) }} | {{ item.propertyRightYears }} | {{ item.minArea }}m-{{ item.maxArea }}m</p>
            <p class="price">
              <i class="le">
                ￥
                <span>{{ item.price }}</span>万起
              </i>

              <span class="ri">
                首付比例
                <i>{{ item.downPay }}%</i>
              </span>
            </p>
          </div>
        </div>
      </van-list>
    </div>

    <!-- <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>-->
  </div>
</template>

<script>
import smenu from "../../components/slideMenu";
import { screen_data } from "../../utils/mixins";
export default {
  mixins: [screen_data],
  data() {
    return {
      item: ["国家", "购房需求", "物业类型", "总价"],
      url: `/dhr/client/house/list`,
      menu: [] // 顶部筛选
    };
  },
  methods: {
    onLoad() {
      console.log("触发");
      this.getAllList(this.result_data);
    },
    // 获取menu
    getMenuData() {
      this.$fetch("/dhr/client/house/menu").then(res => {
        this.menu = res.Result;
        console.log(this.menu);
      });
    },
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
    }
  },

  created() {
    this.getMenuData();
  },
  components: {
    smenu
  }
};
</script>
<style lang="scss">
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
.like {
  font-size: 30px;
  font-weight: 500;
  padding-top: 30px;
}
</style>


<style scoped lang="scss">
.house {
  background-color: #f8f8f8;
  overflow: hidden;
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
  .like {
    font-size: 30px;
    font-weight: 500;
    padding-top: 30px;
  }

  .house_wrap {
    background-color: #fff;
    margin-top: 30px;
    padding: 0 30px;
    .list_box {
      display: flex;
      padding: 30px 0;
      border-bottom: 1px solid #e6e6e6;
      .l_left {
        width: 240px;
        height: 160px;
        border-radius: 5px;
        overflow: hidden;
        position: relative;
        img {
          height: 100%;
        }
        p {
          position: absolute;
          bottom: 10px;
          left: 10px;
          font-size: 20px;
          color: #fff;
          padding-left: 30px;
          &::after {
            position: absolute;
            content: "";
            width: 24px;
            height: 24px;
            left: 0;
            top: 2px;
            background: url("../../assets/images/house/posi.png") no-repeat
              center / cover;
          }
        }
      }
      .l_right {
        padding-left: 20px;
        font-size: 22px;
        flex: 1;
        overflow: hidden;
        .tit {
          font-size: 28px;
          font-weight: 500;
        }
        .de {
          color: #9399a5;
          margin-top: 20px;
        }
        .price {
          margin-top: 30px;
          .le {
            color: #ed2530;

            span {
              font-size: 28px;
              font-weight: bold;
            }
          }
          .ri {
            color: #9399a5;
            margin-left: 20px;
            i {
              color: #ed2530;
              font-size: 28px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
