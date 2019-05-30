<template>

  <div>
    <slot name="sad"></slot>
    {{ obj.a }}

    <p v-if="Object.keys(obj).length > 0">数据改动  {{ obj.a }}</p>
    <button @click="td">按钮</button>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      obj: {
          
      },
      i: 1
    };
  },
  computed: {},
  created() {},
  mounted() {
    //   obj.a = 1111
    //   this.$set(this.obj, 'a', 1111)
    // this.obj = Object.assign(this.obj, {
    //   a: 1111112
    // });
  },
  methods: {
    td() {
        // this.obj.a ++
        // console.log(this.obj.a)
    //   this.$forceUpdate()
  
      this.$set(this.obj, 'a', this.i++)
     
    //   this.obj = Object.assign(this.obj, {
    //     a: this.i++
    //   });
    //   this.$forceUpdate()
       console.log(this.obj.a)
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
p {
    background: red;
    color: #fff;
    width: 100px;
    height: 100px;
}
</style>
