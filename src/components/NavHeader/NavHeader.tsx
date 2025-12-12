import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Dropdown, Switch } from 'antd'
import type { MenuProps } from 'antd'
import { userBearStore } from '@/store/store'
import './NavHeader.less'

const NavHeader = () => {
  const userInfo = userBearStore(state => state.userInfo)
  const breadList = [
    {
      title: '首页',
    },
    {
      title: '工作台',
    },
  ]
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: userInfo.userEmail,
    },
    {
      key: '2',
      label: '退出',
    },
  ]

  return (
    <div className='navHeader'>
      <div className='left'>
        <MenuFoldOutlined />
        <Breadcrumb items={breadList} className='ml' />
      </div>
      <div className='right'>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' className='mr' />
        <Dropdown menu={{ items: items }} trigger={['click']}>
          <span className='nickName'>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
