/* 封装首页的网路请求 */

// 导入request
import {request} from "./request";

// 获取首页的数据
export function getHomeMultidata() {
  return request({
    /* 这个函数的返回值是promise,所以在Home.vue里面可以用.then去调用它 */
    url: '/home/multidata'
  })
}

// 获取首页商品的数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    // params -> 参数
    params: {
      type,
      page
    }
  })
}
