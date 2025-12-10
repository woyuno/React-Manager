import axios from 'axios'
import { message } from 'antd'
import env from '@/config/config'
console.log(env)

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
  console.log(env)
  if (env.mock) {
    config.baseURL = env.mockApi
  } else {
    config.baseURL = env.baseApi
  }
  return config
})
// 响应拦截器
http.interceptors.response.use(res => {
  const data = res.data
  if (data.code === 500001) {
    message.error(data.msg)
    localStorage.removeItem('token')
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
