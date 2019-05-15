<template>
  <div class="house">
    <smenu :item="item"/>

    <div class="house_wrap">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="100"
      >
        <div
          class="list_box"
          v-for="(item, i) in houseList"
          :key="i"
          @click="$router.push({name: 'housedetail',params: {id: item.id}})"
        >
          <div class="l_left">
            <img v-lazy="item.coverImg">
            <p>{{ item.belongCountryName }}·{{ item.belongCityName }}</p>
          </div>
          <div class="l_right">
            <h3 class="tit">{{ item.title }}</h3>
            <p class="de">独栋别墅 | {{ item.propertyRightYears }} | {{ item.minArea }}m-{{ item.maxArea }}m</p>
            <p class="price">
              <i class="le">
                ￥
                <span>{{ item.price }}</span>
                万起
              </i>

              <span class="ri">
                首付比例
                <i>10%</i>
              </span>
            </p>
          </div>
        </div>
      </van-list>
    </div>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import smenu from "../../components/slideMenu";
export default {
  props: {},
  data() {
    return {
      item: ["国家", "购房需求", "物业类型", "总价"],
      houseList: [],
      loading: false,
      finished: false,
      count: "",
      page: 1,
      limit: 10
    };
  },
  created() {},
  computed: {},
  methods: {
    onLoad() {
      this.getHouseList();
    },
    getHouseList() {
      this.$fetch("/dhr/client/house/list", {
        page: this.page,
        limit: this.limit
      }).then(res => {
        console.log(res.Result.data);
        if (res.ErrCode == "0000") {
          this.houseList = this.houseList.concat(res.Result.data);
          this.count = res.Result.count / 1;
          this.loading = false;
          if (this.houseList.length >= this.count) {
            this.finished = true;
            console.log("无更多数据");
          }
          this.page ++
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
.house {
  background-color: #f8f8f8;
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
            }
          }
          .ri {
            color: #9399a5;
            margin-left: 20px;
            i {
              color: #ed2530;
              font-size: 28px;
            }
          }
        }
      }
    }
  }
}
</style>
