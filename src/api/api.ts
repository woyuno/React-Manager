import type { Dept, Login, Menu, ResultPage, User } from '@/types/types'
import request from '@/utils/request'

export default {
  // 登录
  login(params: Login.params) {
    return request.post<string>('/users/login', params)
  },
  // 获取用户信息
  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  },
  // 获得菜单及权限列表
  getPermissionList() {
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>('/users/getPermissionList')
  },

  // 获取用户列表
  getUserList(params: User.params) {
    return request.get<ResultPage<User.UserItem>>('/users/list', params)
  },
  // 创建用户
  createUser(params: User.CreatePrams) {
    return request.post('/users/create', params)
  },
  // 编辑用户
  editeUser(params: User.EditPrams) {
    return request.post('/users/edit', params)
  },
  // 删除和批量删除用户
  delUser(params: { userIds: number[] }) {
    return request.post('/users/delete', params)
  },

  // 部门管理
  // 部门列表
  getDeptList(params?: Dept.Params) {
    return request.get<Dept.DeptItem[]>('/dept/list', params)
  },
  // 获取当前账号下的所有用户
  getAllUserList() {
    return request.get<User.UserItem[]>('/users/all/list')
  },
  // 创建部门
  createDept(params: Dept.CreateParams) {
    return request.post('/dept/create', params)
  },
  // 编辑部门
  editDept(params: Dept.EditParams) {
    return request.post('/dept/edit', params)
  },
  // 删除部门
  deleteDept(params: { _id: string }) {
    return request.post('/dept/delete', params)
  },
  // 菜单管理
  getMenuList(params?: Menu.Params) {
    return request.get<Menu.MenuItem[]>('/menu/list', params)
  },
  // 创建菜单
  createMenu(params: Menu.CreateParams) {
    return request.post('/menu/create', params)
  },
  // 编辑菜单
  editMenu(params: Menu.EditParams) {
    return request.post('/menu/edit', params)
  },
  // 删除菜单
  deleteMenu(params: { _id: string }) {
    return request.post('/menu/delete', params)
  },
}
