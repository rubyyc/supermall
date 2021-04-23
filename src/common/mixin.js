import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'

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
    // console.log('i am mixin')
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      // console.log('bc')
      this.$refs.scroll.scrollTo(0, 0, 1000)
    }
  },
  components: {
    BackTop
  }
}
