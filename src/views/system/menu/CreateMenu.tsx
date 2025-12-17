import api from '@/api/api'
import { IAction, IModalProp } from '@/types/modal'
import { Menu } from '@/types/types'
import { InfoCircleOutlined } from '@ant-design/icons'
import { App, Form, Input, InputNumber, Modal, Radio, TreeSelect } from 'antd'
import { useImperativeHandle, useState } from 'react'

export default function CreateMenu(props: IModalProp<Menu.MenuItem>) {
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const [action, setAction] = useState<IAction>('create')
  const [visible, setVisible] = useState<boolean>(false)
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  // 菜单列表
  const getMenuList = async () => {
    const data = await api.getMenuList()
    setMenuList(data)
  }
  useImperativeHandle(props.mRef, () => {
    return { open }
  })

  // 打开弹窗
  const open = (type: IAction, data?: Menu.EditParams | { parentId?: string; orderBy?: number }) => {
    setAction(type)
    setVisible(true)
    getMenuList()
    if (data) {
      form.setFieldsValue(data)
    }
  }
  //提交
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        await api.createMenu(valid)
      } else {
        api.editMenu(valid)
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
      title={action === 'create' ? '创建菜单' : '编辑菜单'}
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }} initialValues={{ menuType: 1, menuState: 1 }}>
        <Form.Item name='_id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='上级菜单' name='parentId'>
          <TreeSelect
            placeholder='请选择上级菜单'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'menuName', value: '_id' }}
            treeData={menuList}
          />
        </Form.Item>
        <Form.Item label='菜单类型' name='menuType'>
          <Radio.Group>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
            <Radio value={3}>页面</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => {
            if (form.getFieldValue('menuType') === 2) {
              return (
                <Form.Item label='权限标识' name='menuCode'>
                  <Input placeholder='请输入权限标识' />
                </Form.Item>
              )
            } else {
              return (
                <>
                  <Form.Item label='菜单图标' name='icon'>
                    <Input placeholder='请输入菜单图标' />
                  </Form.Item>
                  <Form.Item label='路由地址' name='path'>
                    <Input placeholder='请输入路由地址' />
                  </Form.Item>
                </>
              )
            }
          }}
        </Form.Item>
        <Form.Item label='组件名称' name='component'>
          <Input placeholder='请输入组件名称' />
        </Form.Item>
        <Form.Item label='排序' name='orderBy' tooltip={{ title: '排序值越大越靠后', icon: <InfoCircleOutlined /> }}>
          <InputNumber placeholder='请输入排序值' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={2}>停用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
