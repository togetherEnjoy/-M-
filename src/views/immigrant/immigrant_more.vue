<template>
  <div class="immig_more">
    <supplier :item="item" :athor="athor"></supplier>
  </div>
</template>

<script>
import supplier from "../../components/supplier";
export default {
  props: {},
  data() {
    return {
      item: ["国家", "移民项目"],
      athor: [
        "中国",
        "美国",
        "俄罗斯",
        "意大利",
        "德国",
        "英国",
        "加拿大",
        "泰国",
        "韩国"
      ]
    };
  },
  methods: {},
  components: {
    supplier
  }
};
</script>

<style scoped lang="scss">
</style>
