import api from '@/api/api'
import type { IAction } from '@/types/modal'
import { User } from '@/types/types'
import { useAntdTable } from 'ahooks'
import { App, Button, Form, Input, Modal, Select, Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useRef, useState } from 'react'
import CreateUser from './CreateUser'

export default function UserList() {
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const [userIds, setUserIds] = useState<number[]>([])
  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void
  }>(null)

  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: User.params) => {
    return api
      .getUserList({
        ...formData,
        pageNum: current,
        pageSize: pageSize,
      })
      .then(data => {
        return {
          total: data.page.total,
          list: data.list,
        }
      })
  }

  const { tableProps, search } = useAntdTable(getTableData, { form })
  // 点击新增:
  const handleCreate = () => {
    userRef.current?.open('create')
  }

  // 点击编辑
  const handleEdit = (record: User.UserItem) => {
    userRef.current?.open('edit', record)
  }
  // 点击删除
  const handleDel = (userId: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗?</span>,
      onOk: () => {
        handleUserSubmit([userId])
      },
    })
  }
  // 删除用户接口
  const handleUserSubmit = async (ids: number[]) => {
    await api.delUser({
      userIds: ids,
    })
    message.success('删除成功')
    search.reset()
  }
  // 批量删除
  const handlePathConfirm = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该批用户吗?</span>,
      onOk: () => {
        handleUserSubmit(userIds)
      },
    })
  }

  const columns: ColumnsType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(value: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通哦用户',
        }[value]
      },
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(value: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期',
        }[value]
      },
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      // key: 'address',
      render(value, record: User.UserItem) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDel(record.userId as number)}>
              删除
            </Button>
          </Space>
        )
      },
    },
  ]
  return (
    <div className='userList'>
      <Form form={form} className='search-form' layout='inline' initialValues={{ state: 0 }}>
        <Form.Item name='userId' label='用户Id'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='username' label='用户名'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 120 }}>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>试用期</Select.Option>
            <Select.Option value={3}>离职</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Space>
            <Button type='primary' className='mr' onClick={search.submit}>
              搜索
            </Button>
            <Button type='default' onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
            <Button type='primary' danger onClick={handlePathConfirm}>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          bordered
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: userIds,
            onChange: selectedRowKeys => {
              setUserIds(selectedRowKeys as number[])
            },
          }}
          columns={columns}
          rowKey='userId'
          {...tableProps}
        />
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          search.reset()
        }}
      />
    </div>
  )
}
