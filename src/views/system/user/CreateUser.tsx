import api from '@/api/api'
import type { IAction, IModalProp } from '@/types/modal'
import type { User } from '@/types/types'
import { App, Form, Input, Modal, Select } from 'antd'
import { useImperativeHandle, useState } from 'react'

export default function CreateUser(props: IModalProp<User.UserItem>) {
  const { message } = App.useApp()
  const [visible, setVisible] = useState<boolean>(false)
  const [action, setAction] = useState<IAction>('create')
  // 暴露子组件open方法
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    }
  })
  // 调用弹框显示方法
  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type)
    setVisible(true)
    if (type == 'edit') {
      form.setFieldsValue(data)
    }
  }
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      // console.log('valid', valid)
      // console.log('xxx',form.getFieldsValue())
      if (action === 'create') {
        const data = await api.createUser(valid)
        message.success('创建成功')
      } else {
        const data = await api.editeUser(valid)
        message.success('修改成功')
      }
      hendleCancel()
      props.update()
    }
  }
  const hendleCancel = () => {
    setVisible(false)
    form.resetFields()
  }
  const [form] = Form.useForm()

  return (
    <Modal
      title={action === 'create' ? '创建用户' : '编辑用户'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={hendleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item name='userId' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='用户邮箱' name='userEmail' rules={[{ required: true, message: '请输入用户邮箱' }]}>
          <Input placeholder='请输入用户邮箱' />
        </Form.Item>
        <Form.Item label='手机号' name='mobile'>
          <Input type='number' placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item label='部门' name='deptId' rules={[{ required: true, message: '请输入部门' }]}>
          <Input placeholder='请输入部门' />
        </Form.Item>
        <Form.Item label='岗位' name='job'>
          <Input placeholder='请输入岗位' />
        </Form.Item>
        <Form.Item label='状态' name='state'>
          <Select>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='角色' name='roleList'>
          <Input placeholder='请输入角色'></Input>
        </Form.Item>
      </Form>
    </Modal>
  )
}
