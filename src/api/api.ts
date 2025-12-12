import request from '@/utils/request'
import type { Login,User } from '@/types/types'

export default {
  // 登录
  login(params: Login.params) {
    return request.post<string>('/users/login', params)
  },

  // 获取用户信息
  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  },
}
