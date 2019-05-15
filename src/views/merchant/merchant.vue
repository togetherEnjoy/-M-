<template>
  <div class="merchant">
    <div class="head_wrap">
      <div class="hbc">
        <div class="imgs">
          <img src="../../assets/images/merchant/logo.png">
        </div>
        <span></span>
      </div>

      <div class="bigimg">
        <img src="../../assets/images/merchant/banner.png">
      </div>

      <div class="m_sl">
        <div class="sl_item">
          <p class="num">290</p>
          <p class="txt">产品数</p>
        </div>
        <div class="sl_item">
          <p class="num">128</p>
          <p class="txt">文章数</p>
        </div>
        <div class="sl_item">
          <p class="num">334</p>
          <p class="txt">咨询量</p>
        </div>
      </div>
    </div>

    <div class="house">
      <div class="top_bar">
        <h1>海外好房</h1>
        <p style="cursor:pointer" v-on:click="$router.push({path: '/home/house'})">探索更多海外房产</p>
      </div>

      <van-tabs :line-height="0">
        <van-tab title="房产">
          <div class="h_cate">
            <div class="house_wrap">
              <div
                class="list_box"
                v-for="item in 10"
                @click="$router.push({name: 'housedetail',params: {id: 123}})"
              >
                <div class="l_left">
                  <img src="../../assets/images/house/house.png">
                  <p>美国·迈阿密</p>
                </div>
                <div class="l_right">
                  <h3 class="tit">迈阿密市中心智能公寓 Yotelpad</h3>
                  <p class="de">独栋别墅 | 永久产权 | 89-109m</p>
                  <p class="price">
                    <i class="le">
                      ￥
                      <span>330</span>
                      万起
                    </i>

                    <span class="ri">
                      首付比例
                      <i>10%</i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </van-tab>

        <van-tab title="移民">
          <div class="ym">
            <div class="card_wrap" v-for="i in 3" @click="$router.push({path: '/home/immig/123'})">
              <div class="card_item">
                <div class="imgs">
                  <img src="../../assets/images/immig/immig.png">
                </div>

                <div class="txt">
                  <h1>澳洲创业移民</h1>
                  <p>移民速度最快的澳洲商业移民签证</p>
                </div>
              </div>

              <div class="card_ds">
                <div>
                  <p class="m">3-6个月</p>
                  <p>办理周期</p>
                </div>
                <div>
                  <p class="m">永久居民</p>
                  <p>身份类别</p>
                </div>
                <div>
                  <p class="m">20-50万澳币</p>
                  <p>投资额度</p>
                </div>
                <div>
                  <p class="m">无居住要求</p>
                  <p>居住要求</p>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="留学">
          <div class="lx">
            <div
              class="study_item"
              v-for="i in 10"
              @click="$router.push({path: '/home/study/123'})"
            >
              <div class="imgs">
                <img src="../../assets/images/study/学校校徽图.png">
              </div>

              <div class="content">
                <h3>哈佛大学</h3>
                <p class="yw">Harvard University</p>
                <p class="addr">美国 巴恩斯特布尔县</p>
                <p class="pm">
                  <span>
                    国内综合排名：
                    <i>2</i>
                  </span>
                  <span class="r">
                    录取率：
                    <i>6.0%</i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="游学">
          <div class="yx">
            <div
              class="lx_c_item"
              v-for="item in 4"
              @click="$router.push({path: '/home/studytour/123'})"
            >
              <div class="imgs">
                <img src="../../assets/images/home/lx.png">
              </div>
              <div class="lx_r">
                <p class="tit">
                  伯克利学分夏校SSD - 你们陪我长
                  大，我陪你们旅行
                </p>

                <p class="price">
                  价格：
                  <i>￥3900</i>
                  <span>7天6晚</span>
                </p>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="医疗"></van-tab>
        <van-tab title="婚礼"></van-tab>
        <van-tab title="定制游"></van-tab>
      </van-tabs>
    </div>

    <div class="house hot">
      <div class="top_bar">
        <h1>海外热门</h1>
        <p style="cursor:pointer" v-on:click="$router.push({path: '/home/house'})">探索更多海外热门</p>
      </div>

      <van-tabs :line-height="0">
        <van-tab title="精选">
          <div style="margin-top:30px">
            <div>
              <div class="hot_wrap">
                <div class="hot_item">
                  <div class="item_left">
                    <p class="txt">海外房迷|澳房市供需逆转陷低迷 高杠杆者或被迫离场？</p>
                    <p class="hover">
                      皇包车 · 2天前
                      <span>评论数：10</span>
                    </p>
                  </div>
                  <div class="item_right">
                    <img src="../../assets/images/hot/1.png">
                  </div>
                </div>

                <div class="hot_all">
                  <div class="all_t">
                    <p>海外房迷|澳房市供需逆转陷低迷 高杠杆者或被迫离场？</p>
                  </div>
                  <div class="all_c">
                    <div>
                      <img src="../../assets/images/hot/1.png">
                    </div>
                    <div>
                      <img src="../../assets/images/hot/2.png">
                    </div>
                    <div>
                      <img src="../../assets/images/hot/3.png">
                    </div>
                  </div>
                  <div class="all_b">
                    <p class="hover">
                      皇包车 · 2天前
                      <span>评论数：5</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="幼儿"></van-tab>
        <van-tab title="小学生"></van-tab>
        <van-tab title="初中生"></van-tab>
        <van-tab title="高中生"></van-tab>
        <van-tab title="大学生"></van-tab>
        <van-tab title="在职人士"></van-tab>
        <van-tab title="亲子"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
export default {
  props: {},
  data() {
    return {
      merchant: ["房产", "移民", "留学", "游学", "医疗", "婚礼", "定制游"],
      hot: [
        "精选",
        "幼儿",
        "小学生",
        "初中生",
        "高中生",
        "大学生",
        "在职人士",
        "亲子"
      ]
    };
  },
  methods: {},
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>
<style lang="scss">
.merchant {
  .van-tabs__nav--line {
    padding: 30px 0 !important;
    // margin-right: 30px;
  }
  .van-tab {
    display: inline-block;
    margin-right: 18px;
    font-weight: 500;
    white-space: nowrap;
    padding: 19px 28px;
    border-radius: 4px;
    background-color: #f5f5f5;
    font-size: 28px;
    flex-basis: initial !important;
    .van-ellipsis {
      text-overflow: initial !important;
      overflow: initial !important;
    }

    &.van-tab--active {
      background: linear-gradient(
        90deg,
        rgba(237, 77, 86, 1),
        rgba(237, 37, 48, 1)
      );
      color: #fff;
    }
  }
}
</style>

<style scoped lang="scss">
.merchant {
  background-color: #f8f8f8;
  .head_wrap {
    background-color: #fff;
    .hbc {
      display: flex;
      height: 100px;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      .imgs {
        width: 177px;
        height: 35px;
      }
      span {
        height: 36px;
        width: 36px;
        background: url("../../assets/images/merchant/house_icon_share@2x.png")
          no-repeat center / cover;
      }
    }
    .bigimg {
      height: 265px;
    }
    .m_sl {
      display: flex;
      padding: 30px 0;
      .sl_item {
        flex: 1;
        text-align: center;
        border-right: 1px solid #eeeeee;
        &:last-child {
          border: none;
        }
        .num {
          font-size: 48px;
          font-weight: bold;
        }
        .txt {
          margin-top: 30px;
          font-size: 30px;
          color: #9399a5;
        }
      }
    }
  }

  .house {
    background-color: #fff;
    margin-top: 30px;
    padding: 50px 0 50px 30px;
    overflow: hidden;
    .h_cate {
      margin-top: 39px;
      padding-right: 30px;
    }
    .top_bar {
      display: flex;
      justify-content: space-between;
      padding-right: 30px;
      align-items: center;
      h1 {
        font-size: 48px;
      }
      p {
        font-size: 24px;
        color: #9399a5;
        position: relative;
        padding-right: 30px;
        &::after {
          position: absolute;
          content: "";
          right: 0;
          top: 9px;
          width: 18px;
          height: 18px;
          background: url("../../assets/images/home/ri.png") no-repeat
            center/cover;
        }
      }
    }

    .house_wrap {
      background-color: #fff;
      margin-top: 30px;
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

    .ym {
      margin-right: 30px;
      .card_wrap {
        padding: 30px 0 20px 0;
        border-bottom: 1px solid #e5e5e5;
        .card_item {
          color: #fff;
          position: relative;
          .imgs {
            border-radius: 6px;
            height: 400px;
            overflow: hidden;
            position: relative;
            &::after {
              position: absolute;
              content: "";
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background-color: #000;
              opacity: 0.3;
            }
          }
          .txt {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            h1 {
              font-size: 48px;
              font-weight: bold;
              position: relative;
              &::after {
                position: absolute;
                content: "";
                width: 120px;
                height: 2px;
                background-color: #fff;
                left: 50%;
                bottom: 0;
                margin-left: -60px;
                margin-top: 10px;
              }
            }
            p {
              line-height: 36px;
              font-size: 24px;
              width: 195px;
              margin: 10px auto 0;
            }
          }
        }

        .card_ds {
          display: flex;
          height: 117px;
          justify-content: space-around;
          align-items: center;
          text-align: center;
          & > div {
            color: #9399a5;
            font-size: 22px;
            .m {
              color: #ed2530;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 19px;
            }
          }
        }
      }
    }
    .lx {
      padding-top: 20px;
      padding-right: 30px;
      .study_item {
        padding: 30px 0;
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        .imgs {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 5px solid rgba(228, 228, 228, 1);
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
            span {
              i {
                font-size: 34px;
                color: #ed2530;
              }
            }
            .r {
              margin-left: 25px;
            }
          }
        }
      }
    }
    .yx {
      padding-top: 20px;
      padding-right: 30px;
      .lx_c_item {
        display: flex;
        padding: 15px 0;
        .imgs {
          width: 210px;
          height: 210px;
          border-radius: 5px;
          overflow: hidden;
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
      }
    }
  }
  .hot {
    margin-top: 0;
    padding-top: 0;
    .hot_wrap {
      background-color: #fff;
      .hot_item {
        display: flex;
        padding: 30px 30px 30px 0;
        border-bottom: 1px solid #e5e5e5;

        .item_left {
          margin-right: 21px;
          width: 429px;
          .txt {
            font-size: 30px;
            line-height: 40px;
            font-weight: bold;
          }
        }

        .item_right {
          width: 240px;
          height: 160px;
          border-radius: 4px;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }

      .hover {
        line-height: 24px;
        color: #9399a5;
        font-size: 22px;
        margin-top: 50px;
        span {
          margin-left: 30px;
        }
      }

      .hot_all {
        padding: 30px 30px 30px 0;
        border-bottom: 1px solid #e5e5e5;

        .all_t {
          p {
            font-size: 30px;
            line-height: 40px;
            font-weight: bold;
          }
        }

        .all_c {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
          div {
            width: 210px;
            height: 140px;
            border-radius: 4px;
            overflow: hidden;
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        // .all_b {

        // }
      }
    }
  }
  .house_ca {
    overflow: hidden;
    height: auto;

    ul {
      display: inline-block;
      white-space: nowrap;

      li {
        display: inline-block;
        margin-right: 18px;
        font-weight: 500;
        white-space: nowrap;
        padding: 19px 28px;
        border-radius: 4px;
        background-color: #f5f5f5;
        font-size: 28px;

        &.active {
          background: linear-gradient(
            90deg,
            rgba(237, 77, 86, 1),
            rgba(237, 37, 48, 1)
          );
          color: #fff;
        }
      }
    }
  }
}
</style>
