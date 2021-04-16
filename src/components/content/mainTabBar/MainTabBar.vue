<template>
  <tab-bar>
    <tab-bar-item v-for="item in tabBarData" :key="item.title" :path="item.path" activeColor="deepPink">
      <img slot="item-icon" :src="item.imgUrl">
      <img slot="item-icon-active" :src="item.activeImgUrl">
      <div slot="item-text">{{ item.title }}</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  data () {
    return {
      message: ' hello ',
      tabBarData: [
        {
          imgUrl: require('@/assets/img/tabbar/home.svg'),
          activeImgUrl: require('@/assets/img/tabbar/home_active.svg'),
          title: '首页',
          path: '/home'
        },
        {
          imgUrl: require('@/assets/img/tabbar/category.svg'),
          activeImgUrl: require('@/assets/img/tabbar/category_active.svg'),
          title: '分类',
          path: '/category'
        },
        {
          imgUrl: require('@/assets/img/tabbar/shopcart.svg'),
          activeImgUrl: require('@/assets/img/tabbar/shopcart_active.svg'),
          title: '购物车',
          path: '/cart'
        },
        {
          imgUrl: require('@/assets/img/tabbar/profile.svg'),
          activeImgUrl: require('@/assets/img/tabbar/profile_active.svg'),
          title: '我的',
          path: '/profile'
        }
      ]
    }
  },
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
