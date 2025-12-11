import { Form, Input, Button } from 'antd'
import style from './Login.module.less'
export default function Login() {
  const onFinish = () => {}
  return (
    <div className={style.login}>
      <div className={style.loginWrapper}>
        <div className={style.title}>系统登录</div>
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
