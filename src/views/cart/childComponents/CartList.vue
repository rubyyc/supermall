<template>
  <div class="car-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="item in cartList" :key="item.iid" :product="item">{{item}}</cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
  name: 'CartList',
  components: { CartListItem, Scroll },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.car-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
