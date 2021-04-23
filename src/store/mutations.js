import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  [ADD_COUNTER](state, oldProduct) {
    oldProduct.count++
  },
  [ADD_TO_CART](state, newProduct) {
    state.cartList.push(newProduct)
  }
}
