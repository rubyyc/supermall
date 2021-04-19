import { request } from './request'

export function getDetail(iid) {
  return request({
    url: 'http://152.136.185.210:7878/api/m5/detail',
    params: {
      iid
    }
  })
}
