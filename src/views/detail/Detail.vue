<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
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
      this.$refs.scroll.scrollTo(0, 0, 0)
      this.iid = this.$route.params.iid
      getDetail(this.iid).then(res => {
        const data = res.result
        // console.log(res)
        // 获取顶部轮播数据
        this.topImages = data.itemInfo.topImages
        // console.log(this.topImages)
        // 获取商品简单描述
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 获取商品的商店的信息
        this.shop = new Shop(data.shopInfo)
        // detailInfo
        this.detailInfo = data.detailInfo
        // GoodsParam
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // commentinfo
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 1000)
      })
      // 获取推荐商品
      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.list
      })
    }
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>
