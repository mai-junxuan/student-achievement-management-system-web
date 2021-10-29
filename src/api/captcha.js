import request from '@/utils/request'

const BASE_URL = '/captcha'

export function getCaptcha() {
  return request({
    url: `${BASE_URL}/get`,
    method: 'get',
  })
}
