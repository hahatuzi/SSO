import request from '../utils/request'
import {getRefreshToken} from '../utils/auth'

// 登录方法
export function login(data) {
  return request({
    url: 'http://localhost:5050/auth/login',
    method: 'post',
    data: data
  })
}

export function refreshLogin(data) {
  return request({
    url: 'http://localhost:5050/auth/refresh',
    method: 'post',
    headers:{
      Authorization:`Bear ${getRefreshToken()}`
    },
    data: data
  })
}

export function getInfo(data) {
  return request({
    url: 'http://localhost:8100/api/customer',
    method: 'post',
    data: data
  })
}
