<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">
        购物车({{cartLength}})
      </div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComponents/CartList'
import { mapGetters } from 'vuex'
import CartBottomBar from './childComponents/CartBottomBar'
export default {
  name: 'Cart',
  computed: {
    ...mapGetters([
      'cartLength'
    ])
  },
  components: { CartBottomBar, CartList, NavBar }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.content {
  height: calc(100% - 44px);
}
</style>
