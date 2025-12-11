import { Form, Input, Button, message } from 'antd'
import style from './Login.module.less'
import api from '@/api/api'
import { Login } from '@/types/api'
export default function LoginFC() {
  const onFinish = async (values: Login.params) => {
    const data= await api.login(values)
    localStorage.setItem('token',data)
    message.open({
      content:'登录成功',
      type:'success'
    })
  }
  function aa(){
    message.error('sdfsdf')
  }
  return (
    <div className={style.login}>
      <div className={style.loginWrapper}>
        <div className={style.title} onClick={aa}>系统登录</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='username' rules={[{ required: true, message: '请输入账号' }]}>
            <Input size='large' />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password size='large' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block size='large'>
              确定
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
