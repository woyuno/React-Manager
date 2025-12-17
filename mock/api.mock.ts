// example/mock/es.mock.ts
import Mock from 'mockjs'
import { defineMock } from 'vite-plugin-mock-dev-server'

export default defineMock([
  {
    // 登录
    url: '/mock/users/login',
    method: 'GET',
    response(req, res) {
      if (req.body.userName == 'admin' && req.body.password == '123') {
        res.end(
          JSON.stringify({
            code: 0,
            data: {
              token: 'token',
            },
            msg: '登录成功',
          })
        )
      } else {
        res.end(
          JSON.stringify({
            code: 500,
            msg: '登录失败',
            data: '',
          })
        )
      }
    },
  },
  {
    // 获取用户信息
    url: '/mock/users/getUserInfo',
    method: 'GET',
    response(req, res) {
      console.log()
      if (req.headers.authorization == 'Bearer token') {
        res.end(
          JSON.stringify({
            code: 0,
            data: {
              userName: '小明',
              userEmail: 'xxx@163.com',
            },
            msg: '登录成功',
          })
        )
      } else {
        res.end(
          JSON.stringify({
            code: 500,
            msg: 'token错误',
            data: '',
          })
        )
      }
    },
  },
  {
    // 获取用户列表
    url: '/mock/users/list',
    method: 'GET',
    response(req, res) {
      // 1. 鉴权
      if (req.headers.authorization !== 'Bearer token') {
        return res.end(JSON.stringify({ code: 500, msg: 'token错误', data: '' }))
      }
      // 2. 取分页参数（给个默认值）
      const pageSize = Number(req.query.pageSize) || 10
      // 3. 用 mockjs 生成数据
      const data = Mock.mock({
        [`list|${pageSize}`]: [
          {
            userId: "@string('number',6)",
            userName: '@cname',
            userEmail: '@email',
            'role|1': ['0', '1', '2', '3'],
            'state|1': ['1', '2', '3'],
            createTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
          },
        ],
        page: {
          pageNum: req.query.pageNum,
          pageSize: req.query.pageSize,
          total: 100,
        },
      })

      // 4. 返回统一格式
      res.end(
        JSON.stringify({
          code: 0,
          msg: 'success',
          data,
        })
      )
    },
  },
  {
    // 创建用户
    url: '/mock/users/create',
    method: 'POST',
    response(req, res) {
      res.end(
        JSON.stringify({
          code: 0,
          msg: 'success',
        })
      )
    },
  },
  {
    // 编辑用户
    url: '/mock/users/edit',
    method: 'POST',
    response(req, res) {
      res.end(
        JSON.stringify({
          code: 0,
          msg: 'success',
        })
      )
    },
  },
  {
    // 删除用户
    url: '/mock/users/delete',
    method: 'POST',
    response(req, res) {
      res.end(
        JSON.stringify({
          code: 0,
          msg: 'success',
        })
      )
    },
  },
  {
    // 获取部门列表
    url: '/mock/dept/list',
    method: 'GET',
    response(req, res) {
      res.end(
        JSON.stringify({
          code: 0,
          msg: 'success',
          data: [
            {
              _id: '123123',
              deptName: '研发部',
              parentId: '',
              userName: 'test',
              createTime: '2024-11-11',
              updateTime: '2024-11-11',
              children: [
                {
                  _id: '324234',
                  deptName: '大前端',
                  parentId: '123123',
                  userName: 'test',
                  createTime: '2024-11-11',
                  updateTime: '2024-11-11',
                  children: [],
                },
              ],
            },
          ],
        })
      )
    },
  },
  {
    // 获取当前账号下的所有用户
    url: '/mock/users/all/list',
    method: 'GET',
    response(req, res) {
      res.end(
        JSON.stringify({
          code: 0,
          msg: 'success',
          data: [
            {
              _id: '123123',
              userName: '小明',
            },
            {
              _id: '1231323',
              userName: '小红',
            },
            {
              _id: '12314323',
              userName: '小张',
            },
          ],
        })
      )
    },
  },
  {
    // 编辑部门
    url: '/mock/dept/edit',
    method: 'POST',
    response(req, res) {
      res.end(
        JSON.stringify({
          code: 0,
          msg: 'success',
          data: '',
        })
      )
    },
  },
  {
    // 删除部门
    url: '/mock/dept/delete',
    method: 'POST',
    response(req, res) {
      res.end(
        JSON.stringify({
          code: 0,
          msg: 'success',
          data: '',
        })
      )
    },
  },
  {
    // 获取菜单列表
    url: '/mock/menu/list',
    method: 'GET',
    response(req, res) {
      res.end(
        JSON.stringify({
          code: 0,
          msg: 'success',
          data: [
            {
              _id: '1',
              menuName: '工作台',
              menuType: 1,
              path: '/dashboard',
              icon: 'DesktopOutlined',
              menuState: 1,
              parentId: '',
              createTime: '2024-11-11',
              updateTime: '2024-11-11',
              children: [
                {
                  _id: '1-1',
                  menuName: '查看',
                  menuType: 2,
                  menuCode: 'dashboard@query',
                  parentId: '1',
                  createTime: '2024-11-11',
                  updateTime: '2024-11-11',
                },
              ],
            },
            {
              _id: '2',
              menuName: '系统管理',
              menuType: 1,
              path: 'system',
              icon: 'SettingOutlined',
              menuState: 1,
              createTime: '2024-11-11',
              updateTime: '2024-11-11',
              children: [
                {
                  _id: '2-1',
                  menuName: '用户管理',
                  menuType: 1,
                  path: '/userList',
                  icon: 'TeamOutlined',
                  menuState: 1,
                  parentId: '2',
                  createTime: '2024-11-11',
                  updateTime: '2024-11-11',
                  children: [
                    {
                      _id: '2-1-1',
                      menuName: '查看',
                      menuType: 2,
                      menuState: 1,
                      menuCode: 'use@query',
                      parentId: '2-1',
                      createTime: '2024-11-11',
                      updateTime: '2024-11-11',
                    },
                    {
                      _id: '2-1-2',
                      menuName: '新增',
                      menuType: 2,
                      menuState: 1,
                      menuCode: 'use@create',
                      parentId: '2-1',
                      createTime: '2024-11-11',
                      updateTime: '2024-11-11',
                    },
                    {
                      _id: '2-1-3',
                      menuName: '编辑',
                      menuType: 2,
                      menuState: 1,
                      menuCode: 'use@edit',
                      parentId: '2-1',
                      createTime: '2024-11-11',
                      updateTime: '2024-11-11',
                    },
                    {
                      _id: '2-1-4',
                      menuName: '删除',
                      menuType: 2,
                      menuState: 1,
                      menuCode: 'use@delete',
                      parentId: '2-1',
                      createTime: '2024-11-11',
                      updateTime: '2024-11-11',
                    },
                    {
                      _id: '2-1-5',
                      menuName: '批量删除',
                      menuType: 2,
                      menuState: 1,
                      menuCode: 'use@patchDelete',
                      parentId: '2-1',
                      createTime: '2024-11-11',
                      updateTime: '2024-11-11',
                    },
                  ],
                },
                {
                  _id: '2-2',
                  menuName: '菜单管理',
                  menuType: 1,
                  path: '/menuList',
                  icon: 'TeamOutlined',
                  menuState: 1,
                  parentId: '2',
                  createTime: '2024-11-11',
                  updateTime: '2024-11-11',
                },
                {
                  _id: '2-3',
                  menuName: '角色管理',
                  menuType: 1,
                  path: '/roleList',
                  icon: 'TrademarkCircleOutlined',
                  menuState: 1,
                  parentId: '2',
                  createTime: '2024-11-11',
                  updateTime: '2024-11-11',
                },
                {
                  _id: '2-4',
                  menuName: '部门管理',
                  menuType: 1,
                  path: '/deptList',
                  icon: 'ProfileOutlined',
                  menuState: 1,
                  parentId: '2',
                  createTime: '2024-11-11',
                  updateTime: '2024-11-11',
                },
              ],
            },
          ],
        })
      )
    },
  },
  {
    // 新增菜单
    url: '/mock/menu/create',
    method: 'POST',
    response(req, res) {
      res.end(
        JSON.stringify({
          code: 0,
          msg: 'success',
          data: '',
        })
      )
    },
  },
  {
    // 删除菜单
    url: '/mock/menu/delete',
    method: 'POST',
    response(req, res) {
      res.end(
        JSON.stringify({
          code: 0,
          msg: 'success',
          data: '',
        })
      )
    },
  },
  {
    // 获取用户菜单及权限
    url: '/mock/users/getPermissionList',
    method: 'GET',
    response(req, res) {
      res.end(
        JSON.stringify({
          code: 0,
          msg: 'success',
          data: {
            buttonList: ['dashboard@query', 'use@query', 'use@create'],
            menuList: [
              {
                _id: '1',
                menuName: '工作台',
                menuType: 1,
                path: '/dashboard',
                icon: 'DesktopOutlined',
                menuState: 1,
                parentId: '',
                createTime: '2024-11-11',
                updateTime: '2024-11-11',
                children: [
                  {
                    _id: '1-1',
                    menuName: '查看',
                    menuType: 2,
                    menuCode: 'dashboard@query',
                    parentId: '1',
                    createTime: '2024-11-11',
                    updateTime: '2024-11-11',
                  },
                ],
                buttons: [
                  {
                    _id: '1-1',
                    menuName: '查看',
                    menuType: 2,
                    menuCode: 'dashboard@query',
                    parentId: '1',
                    createTime: '2024-11-11',
                    updateTime: '2024-11-11',
                  },
                ],
              },
              {
                _id: '2',
                menuName: '系统管理',
                menuType: 1,
                path: 'system',
                icon: 'SettingOutlined',
                menuState: 1,
                createTime: '2024-11-11',
                updateTime: '2024-11-11',
                children: [
                  {
                    _id: '2-1',
                    menuName: '用户管理',
                    menuType: 1,
                    path: '/userList',
                    icon: 'TeamOutlined',
                    menuState: 1,
                    parentId: '2',
                    createTime: '2024-11-11',
                    updateTime: '2024-11-11',
                    children: [
                      {
                        _id: '2-1-1',
                        menuName: '查看',
                        menuType: 2,
                        menuState: 1,
                        menuCode: 'use@query',
                        parentId: '2-1',
                        createTime: '2024-11-11',
                        updateTime: '2024-11-11',
                      },
                      {
                        _id: '2-1-2',
                        menuName: '新增',
                        menuType: 2,
                        menuState: 1,
                        menuCode: 'use@create',
                        parentId: '2-1',
                        createTime: '2024-11-11',
                        updateTime: '2024-11-11',
                      },
                      {
                        _id: '2-1-3',
                        menuName: '编辑',
                        menuType: 2,
                        menuState: 1,
                        menuCode: 'use@edit',
                        parentId: '2-1',
                        createTime: '2024-11-11',
                        updateTime: '2024-11-11',
                      },
                      {
                        _id: '2-1-4',
                        menuName: '删除',
                        menuType: 2,
                        menuState: 1,
                        menuCode: 'use@delete',
                        parentId: '2-1',
                        createTime: '2024-11-11',
                        updateTime: '2024-11-11',
                      },
                      {
                        _id: '2-1-5',
                        menuName: '批量删除',
                        menuType: 2,
                        menuState: 1,
                        menuCode: 'use@patchDelete',
                        parentId: '2-1',
                        createTime: '2024-11-11',
                        updateTime: '2024-11-11',
                      },
                    ],
                    buttons: [
                      {
                        _id: '2-1-1',
                        menuName: '查看',
                        menuType: 2,
                        menuState: 1,
                        menuCode: 'use@query',
                        parentId: '2-1',
                        createTime: '2024-11-11',
                        updateTime: '2024-11-11',
                      },
                      {
                        _id: '2-1-2',
                        menuName: '新增',
                        menuType: 2,
                        menuState: 1,
                        menuCode: 'use@create',
                        parentId: '2-1',
                        createTime: '2024-11-11',
                        updateTime: '2024-11-11',
                      },
                      {
                        _id: '2-1-3',
                        menuName: '编辑',
                        menuType: 2,
                        menuState: 1,
                        menuCode: 'use@edit',
                        parentId: '2-1',
                        createTime: '2024-11-11',
                        updateTime: '2024-11-11',
                      },
                      {
                        _id: '2-1-4',
                        menuName: '删除',
                        menuType: 2,
                        menuState: 1,
                        menuCode: 'use@delete',
                        parentId: '2-1',
                        createTime: '2024-11-11',
                        updateTime: '2024-11-11',
                      },
                      {
                        _id: '2-1-5',
                        menuName: '批量删除',
                        menuType: 2,
                        menuState: 1,
                        menuCode: 'use@patchDelete',
                        parentId: '2-1',
                        createTime: '2024-11-11',
                        updateTime: '2024-11-11',
                      },
                    ],
                  },
                  {
                    _id: '2-2',
                    menuName: '菜单管理',
                    menuType: 1,
                    path: '/menuList',
                    icon: 'MenuOutlined',
                    menuState: 1,
                    parentId: '2',
                    createTime: '2024-11-11',
                    updateTime: '2024-11-11',
                    buttons: [],
                  },
                  {
                    _id: '2-3',
                    menuName: '角色管理',
                    menuType: 1,
                    path: '/roleList',
                    icon: 'TrademarkCircleOutlined',
                    menuState: 1,
                    parentId: '2',
                    createTime: '2024-11-11',
                    updateTime: '2024-11-11',
                    buttons: [],
                  },
                  {
                    _id: '2-4',
                    menuName: '部门管理',
                    menuType: 1,
                    path: '/deptList',
                    icon: 'ProfileOutlined',
                    menuState: 1,
                    parentId: '2',
                    createTime: '2024-11-11',
                    updateTime: '2024-11-11',
                    buttons: [],
                  },
                ],
              },
            ],
          },
        })
      )
    },
  },
])
