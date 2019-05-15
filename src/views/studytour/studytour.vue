<template>
  <div class="studytour">
    <smenu :item="item" :athor="athor" :two="two" :three="three" :showCity="false"/>
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
    <div class="lx_content">
      <h3 class="like" v-if="result_data.length > 0">猜您喜欢</h3>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="100"
      >
        <div
          class="lx_c_item"
          v-for="(item, i) in List_data"
          @click="$router.push({path: `/home/studytour/${item.id}`})"
          :key="i"
        >
          <div class="imgs">
            <img v-lazy="item.coverImg">
          </div>
          <div class="lx_r">
            <p class="tit">{{ item.title }}</p>

            <p class="price">
              价格：
              <i>￥{{ item.price }}</i>
              <span>{{ item.days }}</span>
            </p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import smenu from "../../components/slideMenu";
export default {
  props: {},
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

      result_data: [],
      List_data: [],
      loading: false,
      finished: false,
      count: "",
      page: 1,
      limit: 10
    };
  },
  computed: {},
  created() {},
  methods: {
    onLoad() {
      this.getStudyTourList();
    },
    getStudyTourList() {
      this.$fetch("/dhr/client/study_tour/list", {
        page: this.page,
        limit: this.limit
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.count = res.Result.count / 1;
          this.List_data = this.List_data.concat(res.Result.data);
          this.loading = false;
          if (this.List_data.length >= this.count) {
            this.finished = true;
            console.log("无更多数据");
          }
          this.page++;
        }
        console.log(this.List_data);
      });
    }
  },
  components: {
    smenu
  }
};
</script>

<style scoped lang="scss">
.studytour {
  background-color: #f8f8f8;
  .lx_content {
    padding: 40px 30px;
    padding-top: 40px;
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
          i {
            color: #ed2530;
            font-size: 34px;
          width: 150px;
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
