<template>
  <div class="pp">
    <van-popup v-model="show" position="bottom" :overlay="true">
      <van-picker

        title="请选择区域代理城市"
        :columns="columns"
      
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"]
    };
  },
  mounted() {
    console.log(this.show);
  },
  watch: {
    show(val) {
      console.log(11);
    }
  },
  methods: {
    onCancel() {},
    onConfirm() {},
    onChange() {}
  },
  components: {}
};
</script>

<style  lang="scss">
.pp {
    height: 520px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}


</style>
