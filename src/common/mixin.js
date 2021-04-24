import { debounce } from './utils'
import BackTop from 'components/content/backTop/BackTop'
import { POP, NEW, SELL } from './const'
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

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType)
    }
  }
}
