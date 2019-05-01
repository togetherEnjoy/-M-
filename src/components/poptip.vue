<template>
  <div class="pop" ref="pop">
    <div class="b" @click="toEdit">编辑</div>
    <div>删除</div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    toEdit() {
      this.$router.push('/customer/id/edit')
    // console.log(this.$parent.show = )
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.pop {
  width: 175px;
  height: 177px;
  color: #fff;
  background-color: #000;
  position: relative;
  border-radius: 6px;
  z-index: 3;
  // display: none;
  &::after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-right: 20px solid transparent;
    border-left: 20px solid transparent;
    border-bottom: 20px solid #000;
    top: -19px;
    right: 20px;
  }
  div {
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-size: 26px;
  }
  .b {
    border-bottom: 1px solid #eee;
  }
}
</style>
