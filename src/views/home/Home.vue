<template>
<div id="home">
  <nav-bar class="home-nav">
    <div slot="center">
      购物街
    </div>
  </nav-bar>
  <tab-control ref="tabControl1" :titles="titles" @tabClick="tabClick" class="tab-control" v-show="isTabFixed"></tab-control>
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-views></feature-views>
    <tab-control ref="tabControl2" :titles="titles" @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView'
import FeatureViews from './childComponents/FeatureViews'

import { getHomeMultiData, getHomeGoods } from 'network/home'
// import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'
import { TOP_DISTANCE } from 'common/const'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureViews,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ['流行', '新款', '精选'],
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultiData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  // mounted () {
  //   // bus监听 爷孙/非父子组件的事件监听
  //   const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 500)
  //   this.ItemImgListener = () => {
  //     // console.log('bus接收成功')
  //     refresh()
  //   }
  //   this.$bus.$on('itemImageLoad', this.ItemImgListener)
  // },
  methods: {
    // 网络请求
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        // console.log('获取图片')
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        console.log(this.goods[type])
        // this.$refs.scroll.scroll.refresh()
      })
    },
    // 事件监听
    tabClick(index) {
      console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
        default:
          this.currentType = 'pop'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // backClick() {
    //   // console.log('bc')
    //   this.$refs.scroll.scrollTo(0, 0, 1000)
    // },
    // back top
    contentScroll(position) {
      // console.log(position)
      // const y = position.y
      this.isShowBackTop = -position.y > TOP_DISTANCE
      // 吸顶效果
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 上拉加载更多
    loadMore() {
      // console.log('loading----')
      this.getHomeGoods(this.currentType)
      // 进行下一次下拉更更多
      this.$refs.scroll.finishPullUp()
      this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  },
  destroyed() {
    console.log('destroy')
  },
  activated() {
    // console.log('activated')
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // console.log('deactivated')
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消全局事件
    this.$bus.$off('itemImageLoad', this.ItemImgListener)
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}
/*.tab-control {*/
/*  !*position: sticky;*!*/
/*  top: 44px;*/
/*  z-index: 9;*/
/*}*/
.content {
  /*height: 300px;*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
/*.content{*/
/*  height: calc(100% - 93px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/
</style>
