<template>

  <div>
    <slot name="sad"></slot>
    {{ obj.a }}

    <p v-if="Object.keys(obj).length > 0">数据改动  {{ obj.a }}</p>
    <button @click="td">按钮</button>
  </div>
</template>
<script>
import request,{fetch,post} from '../utils/request'
console.log(fetch)
export default {
  data() {
    return {
      obj: {
          
      },
      i: 1
    };
  },
  computed: {},
  created() {
    console.log(request)
    
  },
  mounted() {
    
  },
  methods: {
    td() {
      request.post('/dhr/advertise/img/home').then(res => {
        console.log(res)
      })
    }
  },

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
