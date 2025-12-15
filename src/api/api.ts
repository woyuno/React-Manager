import request from '@/utils/request'
import type { Login, ResultPage, User } from '@/types/types'

export default {
  // 登录
  login(params: Login.params) {
    return request.post<string>('/users/login', params)
  },

  // 获取用户信息
  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  },

  // 获取用户列表
  getUserList(params:User.params) {
    return request.get<ResultPage<User.UserItem>>('/users/list',params)
  },
  // 创建用户
  createUser(params:User.CreatePrams){
    return request.post('/users/create',params)
  }
}
