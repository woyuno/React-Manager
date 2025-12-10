import './Login.less'
import { Form, Input, Button } from 'antd'
export default function Login() {
  const onFinish = () => {}
  return (
    <div className='login'>
      <div className='login-wrapper'>
        <div className='title'>系统登录</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input size='large'/>
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password  size='large'/>
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
