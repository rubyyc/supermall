<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button @click.native="checkAllClick" class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{ totalPrice }}
    </div>
    <div class="calculate">
      去计算({{ checkLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  components: { CheckButton },
  computed: {
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.realPrice * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    ...mapGetters([
      'cartList'
    ])
  },
  methods: {
    checkAllClick() {
      console.log('----')
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  /*bottom: 40px;*/
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 58px;
}
.check-button {
  width: 21px;
  height: 21px;
  line-height: 21px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>
