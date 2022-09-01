import { request} from "@/network/request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

/* 详情页商品数据 */
/* 面向对象封装思想: 把服务器返回的数据先封装成一个类，然后创建对象。再传给对应组件，组件再去展示 */
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

/* 详情页店家信息 */
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParams {
  constructor(paramsInfo) {
    // images可能没有值(某些商品有值,有些商品没有值)
    this.images = paramsInfo.info.images ? paramsInfo.info.images[0] : "";
    this.info = paramsInfo.info.set;
    this.rule = paramsInfo.rule.tables;
    this.disclaimer = paramsInfo.rule.disclaimer
      ? paramsInfo.rule.disclaimer
      : "";
  }
}
