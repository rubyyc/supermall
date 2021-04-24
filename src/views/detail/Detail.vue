<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :show="show"></toast>
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
import DetailBottomBar from './childComponents/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
// import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'
import { TOP_DISTANCE } from 'common/const'
import { mapActions } from 'vuex'
import Toast from '../../components/common/toast/Toast'
export default {
  name: 'Detail',
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      message: '',
      show: false
    }
  },
  created() {
    // this.iid = this.$route.params.iid
    // getDetail(this.iid).then(res => {
    //   console.log(res)
    // })
    if (this.iid !== this.$route.params.iid) {
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0, 0)
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
          this.$refs.scroll && this.$refs.scroll.refresh()
        }, 1000)
      })
      // 获取推荐商品
      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.list
      })
      // console.log(this.themeTopYs)
      this.$nextTick(() => {
        // this.$refs.scroll.refresh()
      })
    }
  },
  activated () {
    // if (this.iid !== this.$route.params.iid) {
    //   this.$refs.scroll.scrollTo(0, 0, 0)
    //   this.iid = this.$route.params.iid
    //   getDetail(this.iid).then(res => {
    //     const data = res.result
    //     // console.log(res)
    //     // 获取顶部轮播数据
    //     this.topImages = data.itemInfo.topImages
    //     // console.log(this.topImages)
    //     // 获取商品简单描述
    //     this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    //     // 获取商品的商店的信息
    //     this.shop = new Shop(data.shopInfo)
    //     // detailInfo
    //     this.detailInfo = data.detailInfo
    //     // GoodsParam
    //     this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    //     // commentinfo
    //     if (data.rate.cRate !== 0) {
    //       this.commentInfo = data.rate.list[0]
    //     }
    //     setTimeout(() => {
    //       this.$refs.scroll.refresh()
    //     }, 1000)
    //   })
    //   // 获取推荐商品
    //   getRecommend().then(res => {
    //     // console.log(res)
    //     this.recommends = res.data.list
    //   })
    // }
  },
  methods: {
    ...mapActions([
      'addCart'
    ]),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)
    },
    titleClick(index) {
      // console.log('titleClick---', index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1500)
    },
    contentScroll(position) {
      // console.log('scroll', position)
      const positionY = -position.y
      // console.log(positionY)
      const length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        const iPos = this.themeTopYs[i]
        if (positionY >= iPos && positionY < this.themeTopYs[i + 1]) {
          // console.log(this.currentIndex)
          if (this.currentIndex !== i) {
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
          break
        }
      }
      this.isShowBackTop = -position.y > TOP_DISTANCE
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.realPrice = this.goods.realPrice
      product.iid = this.iid
      // console.log(product)
      this.addCart({ product }).then(res => {
        console.log(res)
        this.show = true
        this.message = res
        setTimeout(() => {
          this.show = false
          this.message = ''
        }, 1500)
      })
    }
  },
  deactivated() {
    // console.log('---deactivated--')
  },
  destroyed() {
    // console.log('destoryed')
    this.$bus.$off('itemImageLoad', this.ItemImgListener)
  },
  components: {
    Toast,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
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
  height: calc(100% - 93px);
}
</style>
