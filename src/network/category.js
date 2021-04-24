import { request } from './request'

export function getCategory() {
  return request({
    url: 'http://152.136.185.210:7878/api/m5/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: 'http://152.136.185.210:7878/api/m5/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: 'http://152.136.185.210:7878/api/m5/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
