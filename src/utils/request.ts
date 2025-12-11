import axios from 'axios'
import { message } from 'antd'
import env from '@/config/config'
import type { Result } from '@/types/api'

// 创建实例:
const http = axios.create({
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
  if (env.mock) {
    config.baseURL = env.mockApi
  } else {
    config.baseURL = env.baseApi
  }
  return config
})
// 响应拦截器
http.interceptors.response.use(response => {
  // const data: Result = res.data
  // if (data.code === 500001) {
  //   message.error(data.code + ':' + data.msg)
  //   localStorage.removeItem('token')
  //   return Promise.reject(data)
  //   // location.href = '/login'
  // } else if (data.code != 0) {
  //   message.error(data.code + ':' + data.msg)
  //   return Promise.reject(data)
  // }
  // return data.data

  const res = response.data
  if (res.code !== 200) {
    message.error(res.code + ':' + res.msg)
    return Promise.reject(new Error(res.msg))
  }

  return response.data
})

export default {
  get<T>(url: string, params?: object): Promise<T> {
    return http.get(url, { params })
  },
  post<T>(url: string, params?: object): Promise<T> {
    return http.post(url, params)
  },
}
