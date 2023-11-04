import request from '@/utils/request'

// 查询放疗流程记录列表
export function listFllcjl(query) {
  return request({
    url: '/fl/fllcjl/list',
    method: 'get',
    params: query
  })
}

// 查询放疗流程记录详细
export function getFllcjl(flid) {
  return request({
    url: '/fl/fllcjl/' + flid,
    method: 'get'
  })
}

// 新增放疗流程记录
export function addFllcjl(data) {
  return request({
    url: '/fl/fllcjl',
    method: 'post',
    data: data
  })
}

// 修改放疗流程记录
export function updateFllcjl(data) {
  return request({
    url: '/fl/fllcjl',
    method: 'put',
    data: data
  })
}

// 删除放疗流程记录
export function delFllcjl(flid) {
  return request({
    url: '/fl/fllcjl/' + flid,
    method: 'delete'
  })
}
