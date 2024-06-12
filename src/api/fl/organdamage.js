import request from '@/utils/request'

// 查询器官危害列表
export function listOrgandamage(query) {
  return request({
    url: '/fl/organdamage/list',
    method: 'get',
    params: query
  })
}

// 查询器官危害详细
export function getOrgandamage(id) {
  return request({
    url: '/fl/organdamage/' + id,
    method: 'get'
  })
}

// 新增器官危害
export function addOrgandamage(data) {
  return request({
    url: '/fl/organdamage',
    method: 'post',
    data: data
  })
}

// 修改器官危害
export function updateOrgandamage(data) {
  return request({
    url: '/fl/organdamage',
    method: 'put',
    data: data
  })
}

// 删除器官危害
export function delOrgandamage(id) {
  return request({
    url: '/fl/organdamage/' + id,
    method: 'delete'
  })
}
