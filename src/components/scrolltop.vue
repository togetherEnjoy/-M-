<template>
  <div class="toTop" @click="top"></div>
</template>

<script>
import { scrollSmoothTo } from "../utils/intoView";
export default {
  data() {
    return {};
  },
  methods: {
    top() {
      //   document.scrollingElement.scrollTop = 0
      scrollSmoothTo(0);
      console.log(scrollSmoothTo);
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.toTop {
  width: 100px;
  height: 100px;
  background: url("../assets/images/top3.png") no-repeat center/cover;
  position: fixed;
  left: 0;
  bottom: 300px;
  animation: top 3s infinite;
}
@keyframes top {
    0%{
        transform: translateY(100px);
    }
    50%{
        transform: translateY(50px);
    }
    100%{
        transform: translateY(100px);
    }
}
</style>
