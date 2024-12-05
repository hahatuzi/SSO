import axios from "axios";

import {getToken, setToken, getFreshToken, setFreshToken } from './token.js'

const request = axios.create({
  baseUrl:'http://localhost:5050',
  headers:{
    Authorization: `Bear ${getToken()}`
  }
})

 function refreshToken () {
  refreshToken({
    method: 'post',
    headers:{
      Authorization:`Bear ${getFreshToken()}`
    },
    _isFreshToken: true
  }).then(res => {
    if (res.code == 200) {
      resolve(true) // 刷新成功
    } else {
      resolve(false) // 刷新失败
    }
  })
}
// 判断是否为刷新token的请求
function isFreshRequest (config) {
  return !!config._isFreshToken
}

request.interceptors.response.use(async (res) => {
  if (res.headers.Authorization){
    const token = res.headers.Authorization.replace('Bearer ', '')
    setToken(token)
    request.defaults.headers.Authorization = `Bearer ${token}`
  }
  if (res.headers.refreshToken) {
    const freshToken = res.headers.refreshToken.replace('Bearer ', '')
    setFreshToken(freshToken)
  }
  if (res.data.code === 401 && !isFreshRequest(res.config)) {
    const isSuccess = await refreshToken()
    if(isSuccess) {
      res.config.headers.Authorization = `Bearer ${getToken()}`
      const resp = await request.request(res.config)
      return resp
    } else {
      console.log('需要重新登录，refreshToken已经过期');
      
    }
  }
  return res.data
})

export default request