<template>
  <div class="dateds">
    <van-popup v-model="show1" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        :item-height="155"
      />
    </van-popup>
  </div>
</template>

<script>
import { getMonthDays } from "../common/tool.js";
export default {
  props: ['show'],
  data() {
    return {
      show1: this.show,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(2010, 10, 1),
      maxDate: new Date(2050, 10, 1),
      currentDate: new Date()
    };
  },
  mounted() {},
  methods: {},
  watch: {},
  components: {}
};
</script>

<style lang="scss">

</style>
