<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>

export default {

}
</script>

<style lang="scss">
@import '../src/assets/css/reset.scss';
#app {
  background-color: #fff;
  height: 100vh;
}

</style>
