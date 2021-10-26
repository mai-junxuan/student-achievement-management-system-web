import request from '@/utils/request'

const BASE_URL ="/course"

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

export function getCoursePage(current,size,queryVo) {
  return request({
    url: `${BASE_URL}/page/${current}/${size}`,
    methods: 'post',
    data: queryVo
  })
}

export function update(course) {
  return request({
    url: `${BASE_URL}/update`,
    methods: 'put',
    data: course
  })
}

export function save(course) {
  return request({
    url: `${BASE_URL}/save`,
    methods: 'post',
    data: course
  })
}

export function getTypeList() {
  return request({
    url: `${BASE_URL}/getTypeList`,
    methods: 'get'
  })
}
