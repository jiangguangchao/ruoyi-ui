import request from '@/utils/request'

// 查询排班列表
export function listSchedule(query) {
  return request({
    url: '/fl/schedule/list',
    method: 'get',
    params: query
  })
}

// 查询排班详细
export function getSchedule(id) {
  return request({
    url: '/fl/schedule/' + id,
    method: 'get'
  })
}

// 保存排班
export function save(data) {
  return request({
    url: '/fl/schedule/save',
    method: 'post',
    data: data
  })
}

// 新增排班
export function addSchedule(data) {
  return request({
    url: '/fl/schedule',
    method: 'post',
    data: data
  })
}

// 修改排班
export function updateSchedule(data) {
  return request({
    url: '/fl/schedule',
    method: 'put',
    data: data
  })
}

// 删除排班
export function delSchedule(id) {
  return request({
    url: '/fl/schedule/' + id,
    method: 'delete'
  })
}
