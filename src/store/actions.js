import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export const addCart = function ({ commit, state }, { product }) {
  return new Promise((resolve, reject) => {
    const oldProduct = state.cartList.find(
      item => item.iid === product.iid
    )
    if (oldProduct) {
      // console.log(ADD_COUNTER)
      commit(ADD_COUNTER, oldProduct)
      resolve('当前商品数量+1')
      // commit(ADD_TO_CART, product)
    } else {
      product.count = 1
      commit(ADD_TO_CART, product)
      resolve('成功添加商品')
    }
  })
}
