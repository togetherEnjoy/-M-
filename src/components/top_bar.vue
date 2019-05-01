<template>
  <div class="top_bar">
    <slot name="back"></slot>
    <h3>{{ title }}</h3>
    <slot name="more"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: '消息'
    }
  },
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="scss">
.top_bar {
  height: 88px;
  line-height: 88px;
  text-align: center;
  background-color: #fff;
  position: relative;
  z-index: 3;
  h3 {
    color: #0d1c31;
    font-size: 36px;
    font-weight: 400;
  }
}
</style>
