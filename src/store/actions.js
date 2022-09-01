// 代码规范
import {
  Add_COUNTER,
  Add_TO_CART
} from './mutation-type'

export default {
  // 有判断逻辑的，放在actions里面
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.判断oldProduct +1 或者新添加 做了两件事，所以放在actions比较好
      if (oldProduct) { // 数量+1
        // oldProduct.count += 1
        context.commit(Add_COUNTER, oldProduct)
        resolve('当前商品数量 +1')
      } else {          // 添加新商品
        payload.count = 1
        context.commit(Add_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}
