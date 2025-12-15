import axios from 'axios'
import message from './message'
import env from '@/config/config'
import type { Result } from '@/types/types'

// 创建实例:
const http = axios.create({
  baseURL: '/mock',
  timeout: 8000,
  timeoutErrorMessage: '请求超时，请稍后再试',  
  withCredentials: true,
})

// 请求拦截器
http.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  // if (env.mock) {
  //   config.baseURL = env.mockApi
  // } else {
  //   config.baseURL = env.baseApi
  // }
  return config
})
// 响应拦截器
http.interceptors.response.use(res => {
  const data: Result = res.data
  if (data.code === 500001) {
    message.error(data.msg)
    localStorage.removeItem('token')
    return Promise.reject(data)
    // location.href = '/login'
  } else if (data.code != 0) {
    message.error(data.msg)
    return Promise.reject(data)
  }
  return data.data
})

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return http.get(url, { params })
  },
  post<T>(url: string, params?: object): Promise<T> {
    return http.post(url, params)
  },
}
