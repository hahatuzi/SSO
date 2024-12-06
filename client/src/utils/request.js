import axios from "axios";
import {refreshLogin} from '../api/index'
import {getToken, setToken, getRefreshToken, setRefreshToken, removeToken ,removeRefreshToken } from './auth'
import router from '@/router'

let isRefreshToken = false // 是否需要重新刷新token


const request = axios.create({
  baseUrl:'http://localhost:5050',
})

 async function refreshToken () {
  const res = await refreshLogin()
  if (res.code == 0) {
    console.log('刷新成功');
    let {accessToken, refreshToken} = res.data
    accessToken &&  setToken(accessToken)
    refreshToken &&  setRefreshToken(refreshToken)
  }
}

request.interceptors.request.use(config => {
  
  // 无需刷新token
  if (getToken() && !isRefreshToken) {
    config.headers['Authorization'] = `Bearer ${getToken()}`
  }
  // 需要刷新token
  if (getRefreshToken() && isRefreshToken) {
    config.headers['Authorization'] = `Bearer ${getRefreshToken()}`
  }
  
  return config
})

request.interceptors.response.use( (res) => {
    try {
      const {code , data} = res.data
      if (code == 0) {

        return  Promise.resolve(res.data)
      } else if (code == 2) {
        // 2 -- token过期,需要重新刷新token
        isRefreshToken = true
        refreshToken()
        return  Promise.resolve(res.data)
      } else if (code == 3) {
        // 3 --- token和refreshToken均过期
        isRefreshToken = false
        removeToken()
        removeRefreshToken()
        alert('需要重新登录，refreshToken已经过期');
        router.replace({ path:"/login" });
        return  Promise.resolve(res.data)
      }
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  },
  error => {
    console.log('err---' + error)
    let { message } = error || '';
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }else if (message.includes('Request failed with status code 403')) {
      message = '登录状态已过期，请重新登录'
      useUserStore().logOut().then(() => {
        router.replace({ path:  "/login"});
      })
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    } 
    alert(message)
    return Promise.reject(error)
  }
)
export default request