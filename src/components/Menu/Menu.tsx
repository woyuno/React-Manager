import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import './Menu.less'
import { useNavigate } from 'react-router-dom'
const SideMenu = () => {
  const navigate = useNavigate()
  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />,
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined />,
        },
      ],
    },
  ]
  const handleClickLogo = () => {
    navigate('/welcome')
  }
  return (
    <div className='sideMenu'>
      <div className='logo' onClick={handleClickLogo}>
        <img src='/imgs/logo.png' alt='' />
        <span>慕慕货运</span>
      </div>
      <Menu defaultSelectedKeys={['1']} mode='inline' theme='dark' items={items} />
    </div>
  )
}
export default SideMenu
