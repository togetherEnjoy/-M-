<template>
  <div id="app">
    <!-- <transition :name="transitionName" mode="out-in"> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    <!-- </transition> -->

    <!-- <transition name="fade" mode="out-in"> -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- </transition> -->
  </div>
</template>
<script>
import { goTime } from "./api/UTCformat.js";

export default {
  provide() {
    return {
      app: this
    };
  },
  data() {
    return {
      transitionName: ""
    };
  },
  methods: {
    _goTime(start, end) {
      // console.log(goTime(start, end))
      return goTime(start, end);
    }
  },

};
</script>

<style lang="scss">
@import "../src/assets/css/reset.scss";
#app {
  background-color: #fff;
  // height: 100vh;

  // position: absolute;
  // right: 0;
  // left: 0;
  // top: 0;
  // bottom: 0;
}
</style>
