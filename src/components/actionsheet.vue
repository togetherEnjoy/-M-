<template>
  <div class="sheet">
    <div class="sheet_box">
     <div class="s_one">
        <div  @click.stop>{{ one }}</div>
        <slot></slot>
     </div>
      
      <div class="s_two" @click.stop="close">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    one: {
      default: '呼叫 400-877-108'
    }
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    close() {
      let parent = this.$el.parentElement;
      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.open .sheet_box {
  transform: none !important;
}
.sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  visibility: hidden;
  width: 100%;
  height: 100%;
  background-color: transparent;
  transition: all 0.15s ease-in-out;

  .sheet_box {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    transform: translate3d(0, 100%, 0);
    transition: all 0.5s cubic-bezier(0.36, 0.66, 0.04, 1);
    div {
      width: 690px;
      background: #fff;
      border-radius: 8px;
      text-align: center;
      line-height: 99px;
      font-size: 34px;
      margin: 0 auto;
    }
    .s_one {
      color: #5c98f8;
      margin-bottom: 10px;
    }
    .s_two {
      color: #ed2530;
      margin-bottom: 20px;
    }
  }
}
</style>
