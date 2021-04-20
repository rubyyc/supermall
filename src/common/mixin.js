import { debounce } from './utils'

export const itemListenerMixin = {
  data() {
    return {
      ItemImgListener: null
    }
  },
  mounted () {
    const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 500)
    this.ItemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.ItemImgListener)
    console.log('i am mixin')
  }
}
