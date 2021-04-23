import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  [ADD_COUNTER](state, oldProduct) {
    oldProduct.count++
  },
  [ADD_TO_CART](state, newProduct) {
    newProduct.checked = true
    state.cartList.push(newProduct)
  }
}
