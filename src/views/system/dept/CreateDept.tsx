import api from '@/api/api'
import { IAction, IModalProp } from '@/types/modal'
import { Dept, User } from '@/types/types'
import { App, Form, Input, Modal, Select, TreeSelect } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'

export default function CreateDept(props: IModalProp<Dept.DeptItem>) {
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState<boolean>(false)
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  const [userList, setUserList] = useState<User.UserItem[]>([])
  useEffect(() => {
    getAllUserList()
  }, [])
  const getDeptList = async () => {
    const data = await api.getDeptList()
    setDeptList(data)
  }
  const getAllUserList = async () => {
    const data = await api.getAllUserList()
    setUserList(data)
  }
  useImperativeHandle(props.mRef, () => {
    return { open }
  })

  // 打开弹窗
  const open = (type: IAction, data?: Dept.EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    getDeptList()
    if (data) {
      form.setFieldsValue(data)
    }
  }
  //部门提交
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        await api.createDept(valid)
      } else {
        api.editDept(valid)
      }
      message.success('操作成功')
      handleCancel()
      props.update()
    }
  }
  // 关闭和重置弹框
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }
  return (
    <Modal
      title={action === 'create' ? '创建部门' : '编辑部门'}
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            placeholder='请选择上级部门'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
            treeData={deptList}
          />
        </Form.Item>
        <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' name='userName' rules={[{ required: true, message: '请选择负责人' }]}>
          <Select>
            {userList.map(item => {
              return (
                <Select.Option vale={item.userName} key={item._id}>
                  {item.userName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
