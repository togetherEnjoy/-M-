<template>
  <div class="nav">
    <ul class="nav_di">
      <li v-for="(item, i) in navList" :key="i" navLi ref="list">
        <p v-text="item.ntitle" @click="open(i)"></p>
        <i class="san"></i>
        <ul id="nav_ch">
          <li v-for="(items, ind) in item.nitem" :key="ind">
            <router-link :to="items.item_url" v-text="items.item_name"></router-link>
          </li>
        </ul>

        <div class="mask" @click="close"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    navList: {
      default() {
        return [
          {
            ntitle: "类型",
            nitem: [
              {
                item_name: "不限",
                item_url: "/"
              },
              {
                item_name: "房产",
                item_url: "/"
              },
              {
                item_name: "移民",
                item_url: "/"
              },
              {
                item_name: "留学",
                item_url: "/"
              },
              {
                item_name: "游学",
                item_url: "/"
              },
              {
                item_name: "医疗",
                item_url: "/"
              },
              {
                item_name: "婚礼",
                item_url: "/"
              },
              {
                item_name: "定制游",
                item_url: "/"
              }
            ]
          },
          {
            ntitle: "意向",
            nitem: [
              {
                item_name: "不限",
                item_url: "/"
              },
              {
                item_name: "高",
                item_url: "/"
              },
              {
                item_name: "中",
                item_url: "/"
              },
              {
                item_name: "底",
                item_url: "/"
              }
            ]
          },
          {
            ntitle: "进度",
            nitem: [
              {
                item_name: "不限",
                item_url: "/"
              },
              {
                item_name: "未跟进",
                item_url: "/"
              },
              {
                item_name: "电话沟通",
                item_url: "/"
              },
              {
                item_name: "到访/见面",
                item_url: "/"
              },
              {
                item_name: "预定",
                item_url: "/"
              },
              {
                item_name: "签约",
                item_url: "/"
              },
              {
                item_name: "成交",
                item_url: "/"
              }
            ]
          },
          {
            ntitle: "排序",
            nitem: [
              {
                item_name: "默认排序（跟进时间从近到远）",
                item_url: "/"
              },
              {
                item_name: "录入时间从近到远",
                item_url: "/"
              },
              {
                item_name: "录入时间从远到近",
                item_url: "/"
              }
            ]
          }
        ];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    open(i) {
      let list = this.$refs.list;
      if (list[i].classList.contains("active")) {
        list[i].classList.remove("active");
        return;
      }
      list.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });
      list[i].classList.add("active");
    },
    close() {
      let list = this.$refs.list;
      list.forEach(val => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.nav {
  height: 106px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 15px 0px rgba(16, 29, 55, 0.06);
  position: relative;
  .nav_di {
    display: flex;
    position: relative;
    [navLi] {
      width: 25%;
      text-align: center;
      font-size: 28px;
      height: 106px;
      line-height: 106px;
      position: relative;
      overflow: hidden;
      p {
        margin-left: -25px;
        position: relative;
      }
      .san {
        position: absolute;
        right: 25px;
        top: 42px;
        width: 24px;
        height: 24px;
        background: url("../assets/images/customer/grays.png") no-repeat center /
          cover;
      }
      &.active > p {
        color: #5c98f8;
      }
      &.active > .san {
        background: url("../assets/images/customer/blues.png") no-repeat center /
          cover;
      }

      &.active .mask {
        display: block;
      }

      &.active #nav_ch {
        display: block;
        opacity: 1;
      }
    }

    #nav_ch {
      display: none;
      opacity: 0;
      transition: opacity 0.4s;
      width: 750px;
      position: fixed;
      top: 194px;
      left: 0;
      z-index: 2;

      li {
        line-height: initial;
        height: 80px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 28px;
        text-align: center;
        line-height: 80px;
        background-color: #fff;
        &:last-child {
          border: none;
        }

        &:first-child {
          background-color: #f8f8f8;
        }
      }
    }
  }

  .mask {
    position: fixed;
    top: 194px;
    left: 0;
    right: 0;
    bottom: 99px;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
    display: none;
  }
}
</style>
