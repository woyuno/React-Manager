import api from '@/api/api'
import { IAction } from '@/types/modal'
import { Menu } from '@/types/types'
import { App, Button, Form, Input, Select, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useRef, useState } from 'react'
import CreateMenu from './CreateMenu'

export default function MenuList() {
  const { modal, message } = App.useApp()
  const [form] = Form.useForm()
  const [data, setData] = useState<Menu.MenuItem[]>([])
  const menuRef = useRef<{
    open: (type: IAction, data?: Menu.EditParams | { parentId?: string; orderBy?: number }) => void
  }>(null)

  useEffect(() => {
    getMenuList()
  }, [])
  // 创建
  const handleCreate = () => {
    console.log(data.length)
    menuRef.current?.open('create', {
      orderBy: data.length,
    })
  }
  // 列表上点击添加部门
  const handleSubCreate = (record: Menu.MenuItem) => {
    menuRef.current?.open('edit', { parentId: record._id, orderBy: record.children?.length })
  }

  // 重置
  const handleReset = () => {
    form.resetFields()
  }

  // 菜单列表
  const getMenuList = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    setData(data)
  }
  // 编辑
  const handleEdit = (record: Menu.MenuItem) => {
    console.log('record', record)
    menuRef.current?.open('edit', record)
  }
  // 删除
  const handleDelete = (id: string) => {
    modal.confirm({
      title: '确认删除吗？',
      content: '确认删除该菜单吗?',
      cancelText: '取消',
      onOk() {
        handleDelSubmit(id)
      },
      onCancel() {},
    })
  }
  //删除提交
  const handleDelSubmit = async (_id: string) => {
    await api.deleteMenu({
      _id,
    })
    message.success('删除成功')
    getMenuList()
  }

  const columns: ColumnsType<Menu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 150,
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render(value: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面',
        }[value]
      },
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode',
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: '组件名称',
      dataIndex: 'component',
      key: 'component',
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render(value, record) {
        return (
          <Space>
            <Button
              type='text'
              onClick={() => {
                handleSubCreate(record)
              }}
            >
              新增
            </Button>
            <Button
              type='text'
              onClick={() => {
                handleEdit(record)
              }}
            >
              编辑
            </Button>
            <Button
              type='text'
              onClick={() => {
                handleDelete(record._id)
              }}
              danger
            >
              删除
            </Button>
          </Space>
        )
      },
    },
  ]
  return (
    <div>
      <Form className='search-form' layout='inline' form={form} initialValues={{ menuState: 1 }}>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select style={{ width: 100 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type='primary' className='mr' onClick={getMenuList}>
            搜索
          </Button>
          <Button type='default' onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>菜单列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} dataSource={data} pagination={false} />
      </div>
      <CreateMenu mRef={menuRef} update={getMenuList} />
    </div>
  )
}
