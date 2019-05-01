<template>
  <div class="editcust" ref="edit">
    <div class="massage">
      <div class="m_item" @click="$router.push({name:setname})">
        <span class="m_name some">
          <i class="red">*</i>
          姓名
        </span>
        <span class="m_nas">
          吴彦祖
          <i class="ri"></i>
        </span>
      </div>

      <div class="m_phone" @click="setPhone" :style="hasPhone ? 'padding-left:0' : ''">
        <span class="some">
          <i class="red" v-if="hasPhone">*</i>
          手机号
        </span>
        <span class="gray">
          176 3097 1140
          <i class="ri" v-if="hasPhone"></i>
        </span>
      </div>

      <div class="m_source" @click="switchShow02">
        <span class="some">来源</span>
        <span class="gray">
          {{ source }}
          <i class="ri" v-if="hasPhone"></i>
        </span>
      </div>

      <div class="m_need" @click="switchShow01('open')">
        <span class="some">
          需求
          <i class="gray">(单选)</i>
        </span>

        <span class="gray">
          请选择
          <i class="ri"></i>
        </span>
      </div>

      <div class="m_yix" @click="switchShow01('open1')">
        <span class="some">意向</span>

        <span class="gray">
          请选择
          <i class="ri"></i>
        </span>
      </div>
    </div>

    <div ref="n1" class="nd">
      <div class="nd_head">
        <p class="nd_l">需求</p>
        <p class="nd_r" @click="closeAction('open')">确定</p>
      </div>

      <div class="nd_list" ref="scroll">
        <ul>
          <li
            v-for="(item, i) in columns"
            @click="getIndex(i)"
            :class="{'active': i == index}"
          >{{ item }}</li>
        </ul>
      </div>
    </div>

    <div ref="n1" class="nd2">
      <div class="nd_head">
        <p class="nd_l">意向</p>
        <p class="nd_r" @click="closeAction('open1')">确定</p>
      </div>

      <div class="nd_list">
        <ul>
          <li
            v-for="(item, i) in columns2"
            @click="getIndex(i)"
            :class="{'active': i == index}"
          >{{ item }}</li>
        </ul>
      </div>
    </div>

    <div ref="n1" class="nd3">
      <div class="nd_head">
        <p class="nd_l">来源</p>
        <p class="nd_r" @click="closeAction('open2')">确定</p>
      </div>

      <div class="nd_list">
        <ul>
          <li
            v-for="(item, i) in columns3"
            @click="getIndex(i)"
            :class="{'active': i == index}"
          >{{ item }}</li>
        </ul>
      </div>
    </div>

    <div class="mask" @click="closeAction"></div>
  </div>
</template>

<script>
import { Popup, Picker } from "vant";
import BScroll from "better-scroll";
export default {
  props: {
    hasPhone: {
      default: false
    },
    setname: {
      default: "setname"
    },
    source: {
      default: "去海外网"
    }
  },
  data() {
    return {
      columns: ["房产", "移民", "留学", "游学", "医疗", "婚礼"],
      columns2: ["高", "中", "低"],
      columns3: ["去海外网", "老客户介绍", "自拓客", "渠道介绍", "公司数据"],
      index: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      let scroll = this.$refs.scroll;
      this.sc = new BScroll(scroll, {
        click: true
      });
    });
  },
  methods: {
    switchShow01(op) {
      let edit = this.$refs.edit;
      edit.classList.add(op);
    },
    closeAction(op) {
      let edit = this.$refs.edit;
      if (edit.classList.contains("open")) {
        edit.classList.remove("open");
      } else {
        edit.classList.remove("open1");
        edit.classList.remove("open2");
      }
    },

    switchShow02() {
      if (this.hasPhone) {
        let edit = this.$refs.edit;
        edit.classList.add('open2');
      }
    },

    setPhone() {
      if (!this.hasPhone) return;
      this.$router.push({ name: "setPhone" });
    },

    getIndex(i) {
      this.index = i;
    }
  },
  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker
  }
};
</script>

<style scoped lang="scss">
.massage {
  margin-top: 30px;
  padding-left: 30px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  div {
    height: 91px;
    border-bottom: 1px solid #e5e5e5;
    line-height: 91px;
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    padding-right: 73px;
    &:not(:first-child) {
      padding-left: 15px;
    }
    .red {
      color: #ed2530;
    }
    span {
      position: relative;
    }

    .ri {
      background: url("../assets/images/customer/right_jiant.png") no-repeat
        center / cover;
      width: 24px;
      height: 24px;
      position: absolute;
      right: -44px;
      top: 34px;
    }
    .some {
      color: #0d1c31;
    }
    .gray {
      color: #9399a5;
    }
  }
}

.open .nd,
.open1 .nd2,
.open2 .nd3 {
  transform: none;
}

.nd,
.nd2,
.nd3 {
  width: 100%;
  height: 520px;
  background-color: #fff;
  padding: 40px 30px 35px;
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  transform: translate3d(0, 100%, 0);
  transition: all 0.5s cubic-bezier(0.36, 0.66, 0.04, 1);

  .nd_head {
    display: flex;
    justify-content: space-between;
    .nd_l {
      font-size: 34px;
      font-weight: 500;
    }
    .nd_r {
      font-size: 28px;
      font-weight: 500;
      color: #5c98f8;
      align-self: center;
    }
  }
  .nd_list {
    height: 360px;
    margin-top: 50px;
    overflow: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      height: auto;
      li {
        font-size: 30px;
        color: #9399a5;
        text-align: center;
        height: 68px;
        line-height: 68px;

        &.active {
          color: #5c98f8;
        }
      }
    }
  }
}

.open .mask,
.open1 .mask,
.open2 .mask {
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.4);
}
.mask {
  position: fixed;
  visibility: hidden;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  transition: all 0.15s ease-in-out;
}
</style>

<style lang="scss">
.w_need,
.w_need2 {
  height: 520px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  .van-popup--bottom {
    height: 520px !important;

    .van-picker {
      height: 100%;
    }
  }

  .van-picker__cancel {
    font-size: 30px !important;
  }

  .van-picker-column__item {
    font-size: 30px !important;
    height: initial !important;
  }

  .van-picker__columns {
    height: 500px !important;
  }

  .van-picker-column {
    height: 500px !important;
  }

  .van-picker-column__item--selected {
    color: #5c98f8 !important;
  }

  .van-picker__confirm {
    font-size: 30px !important;
  }

  .van-picker__toolbar {
    height: 122px !important;
    line-height: 122px !important;
  }

  .van-ellipsis,
  .van-hairline--top-bottom {
    height: 68px !important;
    line-height: 68px !important;
  }
}
</style>

