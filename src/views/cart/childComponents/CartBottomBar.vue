<template>
  <div v-if="cartList.length" class="bottom-bar">
    <div class="check-content">
      <check-button @click.native="checkAllClick" class="check-button" :is-checked="isCheckedAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{ totalPrice }}
    </div>
    <div class="calculate" @click="calculateClick">
      去计算({{ checkLength }})
    </div>
  </div>
  <div v-else class="toast">
    购物车为空
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  components: { CheckButton },
  computed: {
    ...mapGetters([
      'cartList'
    ]),
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
    isCheckedAll() {
      if (this.cartList.length) {
        return this.cartList.length && this.cartList.find(item => item.checked === false) === undefined
      }
      return false
    }
  },
  methods: {
    checkAllClick() {
      console.log('----')
      // 1. 全选-> 不全选
      if (this.isCheckedAll) {
        this.cartList.forEach(item => {
          item.checked = false
        })
      } else {
        this.cartList.forEach(item => {
          item.checked = true
        })
      }
      // this.isCheckedAll = !this.isCheckedAll
    },
    calculateClick() {
      if (this.cartList.length) {
        if (this.cartList.find(item => item.checked === true)) {
          this.$toast.show('结算成功')
        } else {
          this.$toast.show('请选择结算的商品', 1500)
        }
      } else {
        this.$toast.show('请添加商品到购物车')
      }
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
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-tint);
  padding: 8px 10px;
  /*background-color: var(--color-tint);*/
  z-index: 999;
}
</style>
