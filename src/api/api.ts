import request from '@/utils/request'
import type { Login} from '@/types/api'

export default {
  login(params: Login.params) {
    return request.post<string>('/users/login', params)
  },
}
