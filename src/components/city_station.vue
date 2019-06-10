<template>
  <div class="city_station" ref="citys">
    <div class="choise_city">
      <div class="close" @click="close_city"></div>
      <div class="xz">
        <p>选择城市</p>
      </div>
    </div>

    <div class="loca_hot">
      <div class="loca_city">
        <h3>定位城市</h3>
        <div class="city_wrap">
          <div class="l_city">{{nowCity}}</div>
          <p>重新定位</p>
        </div>
      </div>
      <div class="hot_city">
        <h3>热门城市</h3>
        <ul>
          <li
            v-for="item in citys.hot"
            @click="choseCity(item.id,item.city,$event)"
            ref="li"
          >{{ item.city }}</li>
        </ul>
      </div>
    </div>

    <div class="opened_city">
      <h3>已开通城市</h3>
      <ul>
        <li
          v-for="item in citys.all"
          @click="choseCity(item.id,item.city,$event)"
          ref="li"
        >{{ item.city }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { bus } from "../utils/event";
export default {
  data() {
    return {
      citys: [],
      nowCity: "深圳"
    };
  },
  methods: {
    choseCity(num, city, e) {
      let item = this.$refs.li;
      item.forEach(val => {
        if (val.classList.contains("redd")) {
          val.classList.remove("redd");
        }
      });
      e.target.classList.add("redd");
      this.nowCity = city;
      bus.$emit("sendCity", this.nowCity);
      this.$store.commit("SET_NUMBER", num);
    },
    getCityCount() {
      this.$fetch("/dhr/showCity").then(res => {
        if (res.ErrCode == "0000") {
          this.citys = res.data;
        }
      });
    },

    close_city() {
      let citys = this.$refs.citys;
      citys.classList.remove("show");
      document.body.style = "inherit";
      this.$emit("getCity", this.nowCity);
    }
  },
  created() {
    this.getCityCount();
  }
};
</script>

<style scoped lang="scss">
.city_station {
  background-color: #f5f7f9;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  font-size: 28px;
  transition: all 500ms cubic-bezier(0.79, 0.465, 0.67, 1);
  transform: translateY(-100%);
  &.show {
    transform: none;
  }
  h3 {
    font-size: 34px;
    font-weight: bold;
  }

  .redd {
    background: #ed2530;
    color: #fff;
  }
  @media screen and (max-width: 760px) {
    ul {
      display: flex;
      margin-top: 30px;
      flex-wrap: wrap;
      li {
        height: 64px;
        padding: 0 28px;
        line-height: 64px;
        background-color: #f5f7f9;
        border-radius: 4px;
        margin-right: 50px;
        text-align: center;
        margin-top: 30px;
        // &:nth-child(n + 5) {
        //   margin-top: 30px;
        // }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }

  .choise_city {
    background-color: #fff;
    height: 88px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    position: relative;
    .close {
      position: absolute;
      width: 32px;
      height: 32px;
      background: url("../assets/images/close.png") no-repeat center/cover;
      left: 32px;
      top: 28px;
    }
    .xz {
      font-size: 36px;
      font-weight: 500;
      line-height: 88px;
      p {
      }
    }
  }
  .loca_hot {
    background-color: #fff;
    padding: 50px 30px;

    .loca_city {
      .city_wrap {
        margin-top: 30px;
        display: flex;
        .l_city {
          height: 64px;
          line-height: 64px;
          padding: 0 30px 0 60px;
          background-color: #f5f7f9;
          position: relative;
          border-radius: 4px;
          &::after {
            position: absolute;
            content: "";
            width: 20px;
            height: 25px;
            background: url("../assets/images/red_posi.png") no-repeat
              center/cover;
            left: 28px;
            top: 20px;
          }
        }
        p {
          line-height: 64px;
          padding-left: 38px;
          position: relative;
          margin-left: 30px;
          &::after {
            position: absolute;
            content: "";
            width: 27px;
            height: 26px;
            background: url("../assets/images/location.png") no-repeat
              center/cover;
            left: 0;
            top: 21px;
          }
        }
      }
    }
    .hot_city {
      margin-top: 45px;
    }
  }
  .opened_city {
    background-color: #fff;
    padding: 50px 30px;
  }
}

@media screen and (min-width: 768px) {
  ul {
    display: flex;
    margin-top: 30px;
    flex-wrap: wrap;
    li {
      height: 64px;
      padding: 0 28px;
      line-height: 64px;
      background-color: #f5f7f9;
      border-radius: 4px;
      margin-right: 50px;
      text-align: center;
        margin-top: 30px;
      // &:nth-child(n + 5) {
      //   margin-top: 30px;
      // }
      // &:nth-child(4n) {
      //   margin-right: 0;
      // }
    }
  }
}
</style>
