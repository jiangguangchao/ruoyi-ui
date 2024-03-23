import request from '@/utils/request'

// 查询放疗机器列表
export function listMachine(query) {
  return request({
    url: '/fl/machine/list',
    method: 'get',
    params: query
  })
}

// 查询放疗机器详细
export function getMachine(id) {
  return request({
    url: '/fl/machine/' + id,
    method: 'get'
  })
}

// 新增放疗机器
export function addMachine(data) {
  return request({
    url: '/fl/machine',
    method: 'post',
    data: data
  })
}

// 修改放疗机器
export function updateMachine(data) {
  return request({
    url: '/fl/machine',
    method: 'put',
    data: data
  })
}

// 删除放疗机器
export function delMachine(id) {
  return request({
    url: '/fl/machine/' + id,
    method: 'delete'
  })
}
