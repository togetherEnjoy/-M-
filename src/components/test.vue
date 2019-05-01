<template>
  <div>
    <van-tabs
      :color="'#ED2530'"
      :title-active-color="'#ED2530'"
      :title-inactive-color="'#0D1C31'"
      :line-width="50"
      animated
       @click="getList"
    >
      <van-tab v-for="index in 8" :title="'标签 ' + index">
        <div>
          <van-swipe indicator-color="white" :autoplay="3000">
            <van-swipe-item v-if="list_data.length > 0" v-for="sw in list_data.slice(0, 4)">
              <div class="swip_se" @click="$router.push({path: `/news/newsd`,query: {id: sw.id}})">
                <div class="img_b">
                  <img v-lazy="sw.coverImg">
                </div>
                <div class="sw_mask"></div>
                <p class="sw_txt">{{ sw.name }}</p>
              </div>
            </van-swipe-item>
          </van-swipe>

          <div v-if="list_data.length > 0" v-for="(list, i) in list_data.slice(4)" :key="i">
            <div class="hot_wrap">
              <div
                class="hot_item"
                @click="$router.push({path: `/news/newsd`,query: {id: list.id}})"
                v-if="!list.coverImg1 && !list.coverImg2"
              >
                <div class="item_left">
                  <p class="txt">{{ list.name }}</p>
                  <p class="hover">
                    {{ list.simpleName }}
                    <span>评论数：{{list.commentCount}}</span>
                  </p>
                </div>
                <div class="item_right">
                  <img v-lazy="list.coverImg">
                </div>
              </div>

              <div
                class="hot_all"
                @click="$router.push({path:  `/news/newsd`,query: {id: list.id}})"
                v-if="list.coverImg && list.coverImg1 && list.coverImg2"
                :key="i"
              >
                <div class="all_t">
                  <p>{{ list.name }}</p>
                </div>
                <div class="all_c">
                  <div>
                    <img v-lazy="list.coverImg">
                  </div>
                  <div>
                    <img v-lazy="list.coverImg1">
                  </div>
                  <div>
                    <img v-lazy="list.coverImg2">
                  </div>
                </div>
                <div class="all_b">
                  <p class="hover">
                    {{ list.simpleName }} {{_getDateDiff(list.createdAt)}}
                    <span>评论数：{{list.commentCount}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from "vant";
export default {
  props: {},
  data() {
    return {
        list_data: [],
    };
  },
    created() {
    this.getList();
  },
  methods: {
    getList(index, title) {
      this.index = index
      console.log(this.index)
      if (index == 0) {
        index = false;
      }

      this.$fetch(
        // ?showCityNum=0
        `/dhr/client/article/list${index ? "?cate=" + index + '&showCity=0' : "?showCity=0"}`
      ).then(res => {
        // console.log(res);
        if (res.Result.data.length > 0) {
          this.list_data = res.Result.data;
          console.log(this.list_data);

          this.$store.commit("SET_LIST", this.list_data);
        }
      }).catch(err => {
        console.log(err)
      });
    },

  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  }
};
</script>

<style scoped lang="scss">
</style>
