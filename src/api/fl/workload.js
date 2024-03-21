import request from '@/utils/request'

export function listWorkload(query) {
    return request({
        url: '/fl/workload/list',
        method: 'get',
        params: query
    })
}

export function statWorkload(query) {
    return request({
        url: '/fl/workload/stat',
        method: 'get',
        params: query
    })
}

export function fls() {
    return request({
        url: '/fl/workload/fls',
        method: 'get'
    })
}
