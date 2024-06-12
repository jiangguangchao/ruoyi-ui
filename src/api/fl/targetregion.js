import request from '@/utils/request'

// 查询靶区列表
export function listTargetregion(query) {
  return request({
    url: '/fl/targetregion/list',
    method: 'get',
    params: query
  })
}

// 查询靶区详细
export function getTargetregion(id) {
  return request({
    url: '/fl/targetregion/' + id,
    method: 'get'
  })
}

// 新增靶区
export function addTargetregion(data) {
  return request({
    url: '/fl/targetregion',
    method: 'post',
    data: data
  })
}

// 修改靶区
export function updateTargetregion(data) {
  return request({
    url: '/fl/targetregion',
    method: 'put',
    data: data
  })
}

// 删除靶区
export function delTargetregion(id) {
  return request({
    url: '/fl/targetregion/' + id,
    method: 'delete'
  })
}
