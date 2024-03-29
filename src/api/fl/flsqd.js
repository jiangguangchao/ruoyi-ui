import request from '@/utils/request'

// 查询放疗申请单列表
export function listFlsqd(query) {
  return request({
    url: '/fl/flsqd/list',
    method: 'get',
    params: query
  })
}

// 查询放疗申请单详细
export function getFlsqd(id) {
  return request({
    url: '/fl/flsqd/' + id,
    method: 'get'
  })
}

export function newId() {
  return request({
    url: '/fl/flsqd/newId',
    method: 'get'
  })
}

// 新增放疗申请单
export function addFlsqd(data) {
  return request({
    url: '/fl/flsqd',
    method: 'post',
    data: data
  })
}

// 修改放疗申请单
export function updateFlsqd(data) {
  return request({
    url: '/fl/flsqd',
    method: 'put',
    data: data
  })
}

//开启流程
export function startFlsqd(data) {
  return request({
    url: '/fl/flsqd/start',
    method: 'post',
    data: data
  })
}

//签名
export function signFlsqd(data) {
  return request({
    url: '/fl/flsqd/sign',
    method: 'post',
    data: data
  })
}

// 删除放疗申请单
export function delFlsqd(id) {
  return request({
    url: '/fl/flsqd/' + id,
    method: 'delete'
  })
}
