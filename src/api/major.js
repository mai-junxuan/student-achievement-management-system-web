import request from '@/utils/request'

const BASE_URL ="/major"

export function getById(id) {
  return request({
    url: `${BASE_URL}/${id}`,
    method: 'GET'
  })
}


export function deleteById(id) {
  return request({
    url: `${BASE_URL}/${id}`,
    method: 'delete'
  })
}

export function getMajorPage(current,size,queryVo) {
  return request({
    url: `${BASE_URL}/page/${current}/${size}`,
    methods: 'post',
    data: queryVo
  })
}

export function update(major) {
  return request({
    url: `${BASE_URL}/update`,
    methods: 'put',
    data: major
  })
}

export function save(major) {
  return request({
    url: `${BASE_URL}/save`,
    methods: 'post',
    data: major
  })
}
