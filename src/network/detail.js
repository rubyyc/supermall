import { request } from './request'

export function getDetail(iid) {
  return request({
    url: 'http://152.136.185.210:7878/api/m5/detail',
    params: {
      iid
    }
  })
}

export class Goods {
  constructor (itemInfo, columns, services) {
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
