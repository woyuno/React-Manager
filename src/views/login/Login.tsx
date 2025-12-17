import api from '@/api/api'
import { Login } from '@/types/types'
import { Button, Form, Input } from 'antd'
import style from './login.module.less'
// import message from '@/utils/message'
import { useState } from 'react'
export default function LoginFC() {
  const [loading, setLoading] = useState<boolean>(false)
  const onFinish = async (values: Login.params) => {
    try {
      setLoading(true)
      const data: any = await api.login(values)
      setLoading(false)
      localStorage.setItem('token', data.token)
      // message.success('登录成功')
      setTimeout(() => {
        location.href = '/welcome'
      })
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className={style.login}>
      <div className={style.loginWrapper}>
        <div className={style.title}>系统登录</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='userName' rules={[{ required: true, message: '请输入账号' }]}>
            <Input size='large' />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password size='large' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block size='large' loading={loading}>
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
