<template>
  <div class="immigrant">
    <div>
      <van-tabs title-inactive-color="#0D1C31" title-active-color="#ED2530">
        <van-tab v-for="index in country" :title="index">
          <div class="card">
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
        // ["全部", "希腊", "圣基茨", "美国", "澳大利亚", "加拿大"]
      country: ["全部", "希腊", "圣基茨", "美国", "澳大利亚", "加拿大"]
    };
  },
  created() {
    this.getImmigrantList()
  },
  methods: {
    getImmigrantList() {
      this.$fetch('/dhr/client/migrate/list').then(res => {
        console.log(res)
      })
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>

<style lang="scss">
.immigrant {
  .van-tabs__nav--line {
    padding: 0.4rem 0.4rem 0.4rem 0 !important;
  }
}
</style>


<style scoped lang="scss">
.immigrant {
  background-color: #f8f8f8;

  .card {
    margin-top: 30px;
    padding: 0 30px;
    background-color: #fff;
    .card_wrap {
      padding: 30px 0 20px 0;
      border-bottom: 1px solid #E5E5E5; 
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
          transform: translate(-50%,-50%);
          text-align: center;
          h1 {
            font-size: 48px;
            font-weight: bold;
            position: relative;
            &::after {
                position: absolute;
                content: '';
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
              color: #9399A5;
              font-size: 22px;
              .m {
                  color: #ED2530;
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 19px;
              }
          }
      }
    }
  }
}
</style>
