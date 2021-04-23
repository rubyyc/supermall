import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export const addCart = function ({ commit, state }, { product }) {
  const oldProduct = state.cartList.find(
    item => item.iid === product.iid
  )
  if (oldProduct) {
    commit(ADD_COUNTER, oldProduct)
  } else {
    product.count = 1
    commit(ADD_TO_CART, product)
  }
}
