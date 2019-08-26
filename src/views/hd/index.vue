<template>
  <div class="hd">
    <publicHead :backURL="`/${cityJx}/`" />

    <div class="content">
      <div class="h_img">
        <img v-lazy="hd.coverImg" />
        <p>{{hd.title}}</p>
      </div>

      <h3>活动信息</h3>

      <div class="m_hd">
        <dl>
          <dt></dt>
          <dd>
            <p>{{_UTCTimeForMat(hd.startTime,'yy-mm-dd-noon')}}</p>
            <p class="s">持续{{_getHours(hd.startTime,hd.endTime)}}</p>
          </dd>
        </dl>
      </div>
      <div class="m_hd address">
        <dl>
          <dt></dt>
          <dd>{{hd.address}}</dd>
        </dl>
      </div>

      <h3>{{keynoteSpeaker}}</h3>
      <div class="jb">
        <div class="head">
          <div>
            <img v-lazy="hd.headImg" />
          </div>
          <p>{{hd.name}}</p>
        </div>
        <div class="txt">
          <p>{{hd.introduce||'无'}}</p>
        </div>
      </div>

      <h3>活动内容</h3>
      <ul class="hd_tx">
        <li v-html="hd.content"></li>
        <!-- <li>加拿大人气置业区域介绍</li>
        <li>加拿大人气置业区域介绍</li>-->
      </ul>
    </div>

    <con
      v-if="hd.merchant"
      ask="立即报名"
      hd_title="现在报名"
      :canShowMer="false"
      yuyue="立即报名"
      :head_img="hd.merchant.headPortrait"
      :simpleName="hd.merchant.simpleName"
      :id="hd.merchant.id"
      :typeOf="6"
      :hot="hd.hot"
      :sourceTitle="hd.title"
      :sourceDetailed="7"
      :showCity="hd.showCity||'空'"
      :sourceDescription="href"
      :myphone="hd.merchant.xuNiPhone || '400-877-1008'"
    />
  </div>
</template>

<script>
import { setCountryMode } from "../../utils/mixins";
import publicHead from "../../components/public_detail_head";
import con from "../../components/conf";
import { UTCTimeForMat, getHours, UTC } from "../../common/timeFormat";
import { setShareTitle } from "../../utils/mixins";
export default {
  mixins: [setCountryMode, setShareTitle],
  data() {
    return {
      hd: [],
      href: location.href,
      keynoteSpeaker:''
    };
  },
  metaInfo() {
    return {
      title: this.hd.merchant&& this.hd.title + "-" + this.hd.merchant.simpleName + "-去海外网",
      meta: [
        {
          name: "keywords",
          content:'海外活动'
           
        },
        {
          name: "description",
          content: `海外活动`
        }
      ]
    };
  },
  created() {
    this.getHDDetails();
  },
  methods: {
    getHDDetails() {
      this.$fetch("/dhr/merchant/activity/management/read", {
        id: this.$route.query.id
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.hd = res.Result.data;
          console.log(this.hd);
          this.keynoteSpeaker = res.Result.data.keynoteSpeaker == 1 ? '主讲嘉宾' : '主办方'

          this.iosTitleImg(
            this.hd.title + "-" + this.hd.merchant.simpleName + "-去海外网",
            this.hd.merchant.companyName + `${this.hd.merchant.describe?'-'+ this.hd.merchant.describe:''}`,
            this.hd.coverImg
          );
        }
      });
    },
    _UTCTimeForMat(utc, time) {
      return UTC(utc, time);
    },
    _getHours(s, e) {
      return getHours(s, e);
    }
  },
  components: {
    publicHead,
    con
  }
};
</script>

<style scoped lang="scss">
.hd {
  padding-top: 100px;
  padding-bottom: 150px;
  .content {
    padding: 30px;
    .h_img {
      width: 690px;
      height: 388px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;

      p {
        font-size: 32px;
        line-height: 44px;
        color: #fff;
        position: absolute;
        width: 90%;
        left: 50%;
        bottom: 18px;
        transform: translateX(-50%);
      }
    }

    h3 {
      font-size: 36px;
      padding-top: 40px;
    }
    .m_hd {
      color: #14213b;
      dl {
        display: flex;
        font-size: 32px;
        padding-top: 36px;
        dt {
          width: 40px;
          height: 40px;
          background: url("../../assets/images/hd.png") no-repeat center / cover;
        }
        dd {
          padding-left: 15px;
          .s {
            font-size: 24px;
            color: #656c7a;
          }
        }
      }
    }
    .m_hd.address {
      dt {
        // width: 70px;
        // height: 40px;
        background: url("../../assets/images/hd_loca.png") no-repeat center /
          cover !important;
      }
    }

    .jb {
      padding-top: 40px;
      .head {
        display: flex;
        align-items: center;
        div {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
        }
        p {
          color: #14213b;
          font-size: 32px;
          padding-left: 30px;
        }
      }
      .txt {
        padding-top: 40px;
        p {
          color: #656c7a;
          font-size: 32px;
        }
      }
    }

    .hd_tx {
      padding-top: 36px;
      font-size: 32px;
      color: #14213b;
    }
  }
}
</style>
