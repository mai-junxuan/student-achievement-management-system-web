import request from '@/utils/request'

const BASE_URL ="/student"

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

export function getStudentPage(current,size,queryVo) {
  return request({
    url: `${BASE_URL}/page/${current}/${size}`,
    methods: 'post',
    data: queryVo
  })
}

export function update(student) {
  return request({
    url: `${BASE_URL}/update`,
    methods: 'put',
    data: student
  })
}

export function save(student) {
  return request({
    url: `${BASE_URL}/save`,
    methods: 'post',
    data: student
  })
}
