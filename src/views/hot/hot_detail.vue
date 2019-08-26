<template>
  <div class="hot_detail" ref="hotD">
    <div class="top_bar">
      <div class="t_l" @click="$router.push({path: `/`})"></div>
      <div class="t_c">
        <img src="../../assets/images/hot/blacktit.png" />
      </div>
      <div class="t_r">
        <span class="search"></span>
        <span class="download" style="display:none"></span>
      </div>
    </div>

    <div class="hot_content">
      <h3>{{content['name']}}</h3>

      <p class="hover">
        {{ simpleName }} · {{ _getDateDiff(content['createdAt']) }}
        <span>评论数：{{ count }}</span>
      </p>

      <div class="ctx">
        <div class="ctx_t" v-html="content['content']"></div>
      </div>
    </div>

    <!-- 相关文章 -->
    <div class="rel_box">
      <h1>相关文章</h1>
      <div
        v-for="(list, i) in hot_content_list.slice(0,3)"
        :key="i"
        @click="reload(list.id, list.name)"
        style="cursor:pointer"
      >
        <div class="rel" style="cursor:pointer">
          <div class="hot_item" v-if="!list.coverImg1 && !list.coverImg2">
            <div class="item_left">
              <p class="txt">{{ list.name }}</p>
              <p class="hover">
                <i v-if="list.merchant.simpleName">{{ list.merchant.simpleName }}</i>
                · {{ _getDateDiff(list.createdAt) }}
                <span>评论数：{{ list.comment.length }}</span>
              </p>
            </div>
            <div class="item_right">
              <img :src="list.coverImg" />
            </div>
          </div>

          <div class="hot_all" v-if="list.coverImg && list.coverImg1 && list.coverImg2">
            <div class="all_t">
              <p>{{ list.name }}</p>
            </div>
            <div class="all_c">
              <div>
                <img :src="list.coverImg" />
              </div>
              <div>
                <img :src="list.coverImg1" />
              </div>
              <div>
                <img :src="list.coverImg2" />
              </div>
            </div>
            <div class="all_b">
              <p class="hover">
                <i>{{ list.merchant.simpleName }}</i>
                · {{ _getDateDiff(list.createdAt) }}
                <span>评论数：{{ list.comment.length }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 评论 -->
    <div class="comment">
      <h3>评论</h3>
      <div class="c_item" v-for="comm in comment">
        <div class="human">
          <div class="heads">
            <div class="heads_box">
              <img src="../../assets/images/hot/common.png" />
            </div>
          </div>
          <p>热心网友</p>
        </div>

        <div class="c_hua">
          <p>{{ comm.content }}</p>
        </div>
      </div>
      <!-- <p class="lookmore" @click="moreComment"  v-show="count > 5">查看更多</p> -->
    </div>

    <!-- 评论 -->
    <div class="publish">
      <p @click="getUpCom">发表评论</p>
    </div>

    <!-- 咨询 -->
    <con
      v-if="content.merchant"
      :simpleName="simpleName"
      :id="content.merchant.id"
      :showCity="content.showCity"
      :head_img="content.merchant.headPortrait"
      :myphone="content.merchant.xuNiPhone||phone"
      :sourceDescription="href"
      :typeOf="5"
      :hot="content.hot"
      :sourceTitle="content.name"
      :sourceDetailed="1"
    />

    <!-- 评论组 -->
    <div class="from_group" @touchmove.prevent ref="inpBox">
      <p>
        <span @click="sendComment">发布</span>
      </p>
      <textarea placeholder ref="inp" :v-model="comment_content" minlength="5"></textarea>
    </div>

    <div class="mask" @click="down" @touchmove.prevent></div>

    
      <top  v-show="stop"/>

  </div>
</template>

<script>
const MORE_LIMIT = 5;
const TEXT_LEN = 5;
import { Toast } from "vant";
import { getDateDiff } from "../../api/api.js";
import { mapGetters, mapMutations } from "vuex";
import { type } from "os";
import con from "../../components/conf";
import wxApi from "../../common/wxapi.js";
import { setCountryMode, phone, setShareTitle } from "../../utils/mixins";
import top from "../../components/scrolltop";

export default {
  mixins: [setCountryMode, phone, setShareTitle],
  data() {
    return {
      href: location.href,
      content: {},
      // 评论内容
      comment_content: "",
      // 评论数
      count: "",
      comment: [],
      page: 1,
      limit: 5,
      head_img: require("../../assets/images/hot/logo2.png"),
      hot_content_list: [],

      index: 3,

      simpleName: "",
      hotTitle: "",
      stop: false
    };
  },
  mounted() {
    window.addEventListener("scroll", () => {
      this.stop = document.scrollingElement.scrollTop > 800;
    });
  },

  computed: {
    tit() {
      return this.title;
    },
    ...mapGetters(["list", "title"])
  },
  metaInfo() {
    return {
      title:
        this.content.merchant &&
        this.hotTitle + "-" + this.content.merchant.simpleName + "-去海外网"
      // meta: [{
      //         name: "keywords",
      //         content: this.keywords
      //     },
      //     {
      //         name: "description",
      //         content: this.description
      //     }
      // ]
    };
  },
  methods: {
    reload(id, name) {
      console.log(name);
      let type = this.$route.query.type;
      this.hotTitle = name;
      // localStorage.setItem("title", name);
      // this.set_tit(name || localStorage.getItem("title"));
      this.$router.push({
        path: `/${this.cityJX}/news/${type}/newsd`,
        query: { id }
      });
      this.getDetails();
      // this.$router.go(0);
    },

    // 加载更多评论
    moreComment() {
      this.limit += MORE_LIMIT;
      this.getComment();
    },
    // 获取评论api
    getComment() {
      this.$fetch(
        `/dhr/client/comment/list?soft_language_id=${this.content.id}`,
        {
          page: 1,
          limit: 50
        }
      ).then(res => {
        this.comment = res.Result.data;
        console.log(this.comment);
        this.count = res.Result.count;
      });
    },
    // 发送评论api
    sendComment() {
      this.comment_content = this.$refs.inp.value;
      this.$post("/dhr/client/comment", {
        soft_language_id: this.content.id,
        content: this.comment_content
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.getComment();
          Toast.success({
            duration: 2000,
            message: "发表成功"
          });
          let hotD = this.$refs.hotD;
          hotD.classList.remove("open");
          document.body.style.overflow = "";
        } else {
          Toast.fail("发表失败");
        }
      });
    },
    // 获取详情api
    getDetails(name) {
      document.documentElement.scrollTop = 0 + "px";
      let { id } = this.$route.query;
      this.$fetch(`/dhr/client/article/${id}`).then(res => {
        if (res.ErrCode == "0000") {
          this.content = res.Result;
          console.log(this.content)
          this.hotTitle = this.content.name;

          this.simpleName = this.content.merchant.simpleName;
          this.getComment();
          // androd
          // this.titleImg(this.content.name + "-去海外网", this.content.coverImg);
          // localStorage.setItem("desc", this.content.describe);

          // ios
          this.iosTitleImg(
            this.content.name +
              "-" +
              this.content.merchant.simpleName +
              "-去海外网",
            this.content.describe,
            this.content.coverImg,
            this.content.merchant_id
          );
        }
      });
    },
    getUpCom() {
      let hotD = this.$refs.hotD;
      let inp = this.$refs.inp;
      let inpBox = this.$refs.inpBox;
      let timer = null;
      hotD.classList.add("open");
      inp.focus();
      document.body.style.overflow = "hidden";
    },
    down() {
      let hotD = this.$refs.hotD;
      hotD.classList.remove("open");
      document.body.style.overflow = "";
    },
    _getDateDiff(t) {
      return getDateDiff(t);
    },
    // 获取列表
    getList() {
      let { index } = this.$route.query;
      console.log(index);
      let params = {
        page: this.page,
        limit: this.limit,
        checkState: 1
      };
      if (index == 0) {
        params = Object.assign(params, { by: "createdAt" });
      } else {
        params = Object.assign(params, { cate: index });
      }
      console.log(params);
      this.$fetch(`/dhr/client/article/list`, params).then(res => {
        console.log(res);
        if (res.Result.data.length > 0) {
          this.list_data = res.Result.data;
          this.hot_content_list = this.list_data;
          console.log(this.hot_content_list);
        }
      });
    },
    ...mapMutations({
      set_tit: "SET_TITLE"
    })
  },
  destroyed() {
    localStorage.removeItem("desc");
    // window.removeEventListener("scroll");
  },
  // beforeRouteLeave(to, from, next) {
  //   document.title =
  //     "去海外网，海外房产，移民，留学，游学，东南亚，美国，英国，澳洲，加拿大，日本，希腊，圣基茨，塞浦路斯";
  //   next();
  // },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(vm.content);
      document.title = vm.tit || localStorage.getItem("title") || "";
      // document.body.scrollTop = 0;
      // document.documentElement.scrollTop = 0;
      // window.pageYOffset = 0;
    });
  },
  created() {
    this.getList();
    this.getDetails();
  },
  components: {
    con,
    top
  }
};
</script>
<style>
.van-toast--default {
  font-size: 25px !important;
  width: 2rem !important;
  height: 2rem !important;
}
</style>


<style scoped lang="scss">
.hot_detail {
  // overflow: hidden;
  // height: 100vh;
  // position: relative;
  padding-bottom: 190px;
  scroll-behavior: smooth;
  &.open .mask {
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.4);
  }
  &.open .from_group {
    // transform: scale(1);
    transform: none;
  }

  width: 100%;
  // -webkit-overflow-scrolling: touch;
  // position: absolute;
  // left: 0;
  // top: 0;
  // right: 0;
  // bottom: 0;
  background-color: #f6f6f6;
  // z-index: 1;
  .top_bar {
    padding: 0 30px;
    // margin-top: 10px;
    height: 90px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dddddd;
    .t_l {
      background: url("../../assets/images/hot/logo2.png") no-repeat center /
        cover;
      width: 48px;
      height: 60px;
      align-self: center;
    }
    .t_c {
      align-self: center;
      width: 210px;
      height: 40px;
      img {
        display: block;
        width: 100%;
      }
    }
    .t_r {
      align-self: center;
      display: flex;

      span {
        width: 36px;
        height: 36px;
      }
      .search {
        display: none;
        background: url("../../assets/images/hot/search2.png") no-repeat center /
          cover;
        margin-right: 19px;
      }
      .download {
        background: url("../../assets/images/hot/download2.png") no-repeat
          center / cover;
      }
    }
  }

  .hot_content {
    background-color: #fff;
    padding: 30px;
    h3 {
      font-size: 38px;
      line-height: 60px;
      font-weight: bold;
    }

    .ctx {
      margin-top: 50px;
      .ctx_img {
        border-radius: 4px;
        height: 460px;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .ctx_t {
        margin-top: 45px;
        font-size: 34px;
        line-height: 60px;
        font-weight: 500;
        img {
          width: 690px !important;
          height: 460px !important;
          display: block;
        }
      }
    }
  }

  .rel_box {
    background-color: #fff;
    margin-top: 30px;
    overflow: hidden;
    h1 {
      margin: 30px 0 0 30px;
    }
    .rel {
      // background-color: #fff;
      padding: 0 30px;
      .hot_item {
        display: flex;
        justify-content: space-between;
        padding: 30px 0;
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
          width: 210px;
          height: 140px;
          border-radius: 4px;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .hot_all {
        padding: 30px 0;
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
      }
    }
  }

  .hover {
    line-height: 24px;
    color: #9399a5;
    font-size: 24px;
    margin-top: 20px;
    span {
      margin-left: 30px;
    }
  }

  .comment {
    padding: 30px;
    background-color: #fff;
    margin-top: 30px;
    position: relative;
    // margin-bottom: 168px;
    h3 {
      font-size: 30px;
      font-weight: bold;
    }

    .c_item {
      padding-top: 30px;
      .human {
        display: flex;
        .heads {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #9399a5;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          .heads_box {
          }
          img {
            // display: block;
            width: 30px;
            height: 39px;
          }
        }
        p {
          font-weight: 500;
          font-size: 30px;
          margin-left: 10px;
          align-self: center;
        }
      }
    }

    .c_hua {
      padding-left: 70px;
      padding-bottom: 30px;
      border-bottom: 1px solid #e5e5e5;
      margin-top: 23px;
      font-size: 24px;
      font-weight: 500;
      color: #9399a5;
      line-height: 48px;
      p {
        font-size: 24px;
      }
    }

    .lookmore {
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      margin-top: 20px;
    }
  }

  .publish {
    width: 210px;
    height: 70px;
    line-height: 70px;
    background-color: #6ec6c8;
    border-radius: 35px 0px 0px 35px;
    color: #fff;
    font-size: 28px;
    font-weight: 500;
    position: fixed;
    bottom: 180px;
    right: 0px;
    p {
      text-align: center;
      padding-left: 71px;
      &::after {
        position: absolute;
        content: "";
        width: 32px;
        height: 32px;
        background: url("../../assets/images/hot/commont.png") no-repeat
          center/cover;
        left: 30px;
        top: 20px;
      }
    }
  }

  .mask {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    visibility: hidden;
    width: 100%;
    height: 100vh;
    background-color: transparent;
    transition: all 0.15s ease-in-out;
  }

  .from_group {
    width: 100%;
    background-color: #fff;
    padding: 0 30px 30px;
    position: fixed;
    bottom: 0;
    left: 0;
    transform: translatey(100%);
    transition: all 0.3s ease-out;
    z-index: 99999;
    p {
      font-size: 24px;
      color: #ed2530;
      font-weight: 500;
      padding: 30px 0;
      text-align: right;
    }
    textarea {
      height: 280px;
      width: 100%;
      width: calc(100% - 29px);
      font-size: 24px;
      color: #9399a5;
      background-color: #f8f8f8;
      padding: 24px 29px;
    }
  }
}
</style>
