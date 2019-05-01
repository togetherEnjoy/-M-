<template>
  <div class="fo_typesheet">
    <div class="mask"></div>

    <div class="sheet_box" @click.stop>
      <div class="que">
        <p class="q_l">跟进类型</p>
        <p class="q_r" @click="determine">确定</p>
      </div>

      <ul>
        <li v-for="(item, i) in content" 
        :key="i" 
        v-text="item" 
        @click="selected(i)"
        :class="{col: color == i}"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
        content: [
            '跟进中',
            '到访',
            '约定',
            '签约',
            '其他',
        ],

        color: ''
    };
  },
  methods: {
      selected(i) {
          this.color = i
      },
      determine() {
          let parent = this.$parent.$el
          parent.classList.remove('open')
      }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.open .fo_typesheet .mask {
  background-color: #000;
}
.open .fo_typesheet .sheet_box {
    transform: none;
}
.fo_typesheet {
  visibility: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  .mask {
    position: fixed;
    background-color: transparent;
    opacity: 0.6;
    width: 100%;
    height: 100%;
    transition: all 0.15s ease-in-out;
  }
  .sheet_box {
    transform: translate3d(0, 100%, 0);
    transition: all 0.5s cubic-bezier(0.36, 0.66, 0.04, 1);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 630px;
    padding: 40px 30px;
    background-color: #fff;

    .que {
      display: flex;
      justify-content: space-between;
      font-weight: 500;
      .q_l {
        font-size: 34px;
      }
      .q_r {
        font-size: 28px;
        color: #5c98f8;
      }
    }

    ul {
      padding-top: 50px;
      li {
        text-align: center;
        font-size: 30px;
        font-weight: 500;
        margin-bottom: 40px;

        &.col {
            color: #5C98F8;
        }
      }
    }
  }
}
</style>
