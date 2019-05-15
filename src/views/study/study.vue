<template>
  <div class="study">
    <smenu :item="item" :athor="athor" :two="two" :more="true" @get_result="get_result"/>

    <div class="sx_result" v-if="result_data.length > 0">
      <h3>筛选结果</h3>
      <div class="condition">
        <p v-for="i in result_data">
          {{ i }}
          <i>
            <span @click.self="empty"></span>
          </i>
        </p>
      </div>
    </div>

    <div class="study_wrap">
      <h3 class="like" v-if="result_data.length > 0">猜您喜欢</h3>
      <div class="study_item" v-for="i in 10" @click="$router.push({path: '/home/study/123'})">
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
  </div>
</template>

<script>
import smenu from "../../components/slideMenu";
export default {
  props: {},
  data() {
    return {
      item: ["国家", "类别", "国内排名", "更多"],
      athor: ["不限", "小学", "中学", "高中", "本科", "硕士", "博士"],
      two: ["不限", "1~10名", "11~20名", "21~50名", "51~100名", "100名以后"],
      three: ["", "", "", "", "", ""],

      result_data: []
    };
  },
  computed: {},
  created() {
    this.getStudyList()
  },
  mounted() {},
  methods: {
    getStudyList() {
      this.$fetch("/dhr/client/study_abroad/list").then(res => {
        console.log(res);
      });
    },

    get_result(data) {
      this.result_data = data;
      console.log(this.result_data);
    },
    empty(e) {
      let text = e.target.parentNode.parentNode.innerText;
      let index = this.result_data.findIndex(item => {
        return item == text;
      });
      this.result_data.splice(index, 1);
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
      p {
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
            top: 8px;
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
}
</style>
