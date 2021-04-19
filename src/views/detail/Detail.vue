<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import { getDetail } from 'network/detail'
export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: []
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
        console.log(res)
        // 获取顶部轮播数据
        this.topImages = res.result.itemInfo.topImages
        console.log(this.topImages)
      })
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper
  }
}
</script>

<style scoped>

</style>
