<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import { getDetail, Goods } from 'network/detail'
export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {}
    }
  },
  created() {
    // this.iid = this.$route.params.iid
    // getDetail(this.iid).then(res => {
    //   console.log(res)
    // })
  },
  activated () {
    if (this.iid !== this.$route.params.iid) {
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        const data = res.result
        console.log(res)
        // 获取顶部轮播数据
        this.topImages = data.itemInfo.topImages
        console.log(this.topImages)
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      })
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  }
}
</script>

<style scoped>

</style>
