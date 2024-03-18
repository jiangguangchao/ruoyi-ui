import request from '@/utils/request'

// 根据岗位查询人员任务分配序列
export function listUser(query) {
  return request({
    url: '/fl/assignWork/list',
    method: 'get',
    params: query
  })
}
