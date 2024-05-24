import request from '@/utils/request'

// 查询放射治疗列表
export function listRadiotherapy(query) {
  return request({
    url: '/fl/radiotherapy/list',
    method: 'get',
    params: query
  })
}

// 查询放射治疗详细
export function getRadiotherapy(id) {
  return request({
    url: '/fl/radiotherapy/' + id,
    method: 'get'
  })
}

// 查询放疗单
export function getFlds(query) {
  return request({
    url: '/fl/radiotherapy/fld',
    method: 'get',
    params: query
  })
}

// 新增放射治疗
export function addRadiotherapy(data) {
  return request({
    url: '/fl/radiotherapy',
    method: 'post',
    data: data
  })
}

// 修改放射治疗
export function updateRadiotherapy(data) {
  return request({
    url: '/fl/radiotherapy',
    method: 'put',
    data: data
  })
}

// 修改放射治疗
export function updateSchTime(data) {
  return request({
    url: '/fl/radiotherapy/updateSchTime',
    method: 'put',
    data: data
  })
}

// 移除时间安排
export function removeSchTime(data) {
  return request({
    url: '/fl/radiotherapy/removeSchTime',
    method: 'put',
    data: data
  })
}

// 删除放射治疗
export function delRadiotherapy(id) {
  return request({
    url: '/fl/radiotherapy/' + id,
    method: 'delete'
  })
}
