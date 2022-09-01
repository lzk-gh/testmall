import {
  Add_COUNTER,
  Add_TO_CART
} from './mutation-type'

export default {
  // 在index.js里面导入
  // mutations唯一的目的就是修改state的状态
  // mutations中的每个方法尽可能完成的事件比较单一一点
  // 数量+1
  [Add_COUNTER](state, payload) {
    payload.count ++;
  },
  // 添加新的商品
  [Add_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
