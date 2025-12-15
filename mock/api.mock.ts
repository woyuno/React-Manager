// example/mock/es.mock.ts
import { defineMock } from 'vite-plugin-mock-dev-server'
import Mock from 'mockjs'

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
])
